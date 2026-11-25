'use strict';

/**
 * Núcleo Orientado a Objetos e Orientado a Eventos:
 * - EventBus: barramento desacoplado de eventos (+ CustomEvent no document).
 * - SafeDOM: criação declarativa de nós sem injeção HTML, avaliação dinâmica ou estilo inline.
 * - StorageService: persistência segura com whitelist de chaves.
 */
(function (global) {
  class EventBus {
    constructor() {
      this.listeners = new Map();
    }

    on(eventName, handler) {
      if (typeof handler !== 'function') {
        return function () {};
      }
      if (!this.listeners.has(eventName)) {
        this.listeners.set(eventName, new Set());
      }
      const bucket = this.listeners.get(eventName);
      bucket.add(handler);

      return () => {
        bucket.delete(handler);
      };
    }

    emit(eventName, detail) {
      const payload = detail === undefined ? null : detail;
      const bucket = this.listeners.get(eventName);
      if (bucket) {
        bucket.forEach((handler) => {
          try {
            handler(payload);
          } catch (err) {
            // Falha isolada de um ouvinte não interrompe os demais
            if (typeof console !== 'undefined' && console.error) {
              console.error('EventBus handler error on ' + eventName, err);
            }
          }
        });
      }

      if (typeof document !== 'undefined' && typeof CustomEvent === 'function') {
        document.dispatchEvent(new CustomEvent('md:' + eventName, { detail: payload }));
      }
    }
  }

  class SafeDOM {
    static sanitizeUrl(rawUrl, fallback) {
      const safeFallback = fallback || '#';
      if (typeof rawUrl !== 'string') {
        return safeFallback;
      }
      const trimmed = rawUrl.trim();
      if (!trimmed) {
        return safeFallback;
      }
      if (trimmed.startsWith('#') || trimmed.startsWith('assets/') || trimmed.startsWith('./')) {
        return trimmed;
      }
      try {
        const parsed = new URL(trimmed, 'https://example.invalid');
        if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
          return parsed.href;
        }
      } catch (_err) {
        return safeFallback;
      }
      return safeFallback;
    }

    static clear(node) {
      if (!node) {
        return;
      }
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }

    static el(tag, attrs, children) {
      const node = document.createElement(tag);
      if (attrs && typeof attrs === 'object') {
        Object.keys(attrs).forEach((key) => {
          const val = attrs[key];
          if (val === undefined || val === null || val === false) {
            return;
          }
          if (key === 'className') {
            node.className = String(val);
            return;
          }
          if (key === 'text') {
            node.textContent = String(val);
            return;
          }
          if (key === 'hidden') {
            node.hidden = Boolean(val);
            return;
          }
          if (key === 'style') {
            // Política estrita CSP: estilos inline bloqueados por segurança
            return;
          }
          if (key === 'dataset' && typeof val === 'object') {
            Object.keys(val).forEach((dKey) => {
              if (val[dKey] !== undefined && val[dKey] !== null) {
                node.dataset[dKey] = String(val[dKey]);
              }
            });
            return;
          }
          if (key === 'href' || key === 'src') {
            node.setAttribute(key, SafeDOM.sanitizeUrl(String(val), '#'));
            return;
          }
          if (key === 'target' && val === '_blank') {
            node.setAttribute('target', '_blank');
            node.setAttribute('rel', 'noopener noreferrer');
            return;
          }
          if (val === true) {
            node.setAttribute(key, '');
            return;
          }
          node.setAttribute(key, String(val));
        });
      }

      if (children !== undefined && children !== null) {
        const list = Array.isArray(children) ? children : [children];
        list.forEach((child) => {
          if (child === undefined || child === null || child === false) {
            return;
          }
          if (typeof child === 'string' || typeof child === 'number') {
            node.appendChild(document.createTextNode(String(child)));
          } else if (child instanceof Node) {
            node.appendChild(child);
          }
        });
      }
      return node;
    }

    static svg(tag, attrs, children) {
      const ns = 'http://www.w3.org/2000/svg';
      const node = document.createElementNS(ns, tag);
      if (attrs && typeof attrs === 'object') {
        Object.keys(attrs).forEach((key) => {
          const val = attrs[key];
          if (val !== undefined && val !== null) {
            node.setAttribute(key, String(val));
          }
        });
      }
      if (children !== undefined && children !== null) {
        const list = Array.isArray(children) ? children : [children];
        list.forEach((child) => {
          if (typeof child === 'string') {
            node.appendChild(document.createTextNode(child));
          } else if (child instanceof Node) {
            node.appendChild(child);
          }
        });
      }
      return node;
    }
  }

  class StorageService {
    constructor() {
      this.allowedKeys = new Set(['md_portfolio_theme', 'md_portfolio_tab']);
    }

    get(key, fallback) {
      if (!this.allowedKeys.has(key)) {
        return fallback;
      }
      try {
        const val = global.localStorage.getItem(key);
        return val !== null ? val : fallback;
      } catch (_err) {
        return fallback;
      }
    }

    set(key, value) {
      if (!this.allowedKeys.has(key)) {
        return;
      }
      try {
        global.localStorage.setItem(key, String(value));
      } catch (_err) {
        // Ignora silenciosamente se storage estiver restrito
      }
    }
  }

  global.MDCore = Object.freeze({
    EventBus: EventBus,
    SafeDOM: SafeDOM,
    StorageService: StorageService
  });
})(window);
