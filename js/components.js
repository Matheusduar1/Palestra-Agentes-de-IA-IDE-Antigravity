'use strict';

/**
 * Controladores OOP orientados a eventos da interface.
 * Todos os componentes recebem { bus, data, storage } via injeção de dependência.
 */
(function (global) {
  const { SafeDOM } = global.MDCore;

  class ThemeController {
    constructor({ bus, storage }) {
      this.bus = bus;
      this.storage = storage;
      this.button = document.getElementById('theme-toggle-btn');
      this.labelEl = document.getElementById('theme-toggle-label');
      this.current = 'light';
    }

    init() {
      const saved = this.storage.get('md_portfolio_theme', 'light');
      const initial = saved === 'dark' ? 'dark' : 'light';
      this.apply(initial, false);

      if (this.button) {
        this.button.addEventListener('click', () => {
          this.apply(this.current === 'light' ? 'dark' : 'light', true);
        });
      }
    }

    apply(theme, persist) {
      this.current = theme === 'dark' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.current);

      if (this.button) {
        const isDark = this.current === 'dark';
        this.button.setAttribute('aria-pressed', String(isDark));
        this.button.setAttribute(
          'aria-label',
          isDark ? 'Alternar para tema claro dos slides' : 'Alternar para tema escuro Semana Técnica'
        );
      }

      if (this.labelEl) {
        this.labelEl.textContent = this.current === 'dark' ? 'Tema: Broadcast' : 'Tema: Slides';
      }

      if (persist) {
        this.storage.set('md_portfolio_theme', this.current);
      }
      this.bus.emit('theme:changed', { theme: this.current });
    }
  }

  class TabRouter {
    constructor({ bus, storage }) {
      this.bus = bus;
      this.storage = storage;
      this.validTabs = ['apresentacao', 'slides', 'demos', 'perguntas', 'video', 'sobre'];
      this.tabs = Array.from(document.querySelectorAll('[role="tab"][data-tab]'));
      this.panels = new Map();
      this.current = 'apresentacao';
    }

    init() {
      document.querySelectorAll('[role="tabpanel"][data-panel]').forEach((panel) => {
        this.panels.set(panel.dataset.panel, panel);
      });

      this.tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          this.activate(tab.dataset.tab, { updateHash: true, focusPanel: false });
        });

        tab.addEventListener('keydown', (event) => {
          let nextIndex = null;
          if (event.key === 'ArrowRight') {
            nextIndex = (index + 1) % this.tabs.length;
          } else if (event.key === 'ArrowLeft') {
            nextIndex = (index - 1 + this.tabs.length) % this.tabs.length;
          } else if (event.key === 'Home') {
            nextIndex = 0;
          } else if (event.key === 'End') {
            nextIndex = this.tabs.length - 1;
          }
          if (nextIndex !== null) {
            event.preventDefault();
            const targetTab = this.tabs[nextIndex];
            targetTab.focus();
            this.activate(targetTab.dataset.tab, { updateHash: true, focusPanel: false });
          }
        });
      });

      window.addEventListener('hashchange', () => {
        const fromHash = this.parseHash(window.location.hash);
        if (fromHash && fromHash !== this.current) {
          this.activate(fromHash, { updateHash: false, focusPanel: false });
        }
      });

      this.bus.on('tab:request', (payload) => {
        if (payload && payload.tab) {
          this.activate(payload.tab, { updateHash: true, focusPanel: true });
        }
      });

      const initialHash = this.parseHash(window.location.hash);
      const savedTab = this.storage.get('md_portfolio_tab', 'apresentacao');
      const initialTab = initialHash || (this.validTabs.includes(savedTab) ? savedTab : 'apresentacao');
      this.activate(initialTab, { updateHash: Boolean(initialHash), focusPanel: false, skipScroll: true });
    }

    parseHash(hash) {
      if (typeof hash !== 'string') {
        return null;
      }
      const clean = hash.replace(/^#/, '').trim().toLowerCase();
      return this.validTabs.includes(clean) ? clean : null;
    }

    activate(tabName, options) {
      const opts = options || {};
      const target = this.validTabs.includes(tabName) ? tabName : 'apresentacao';
      this.current = target;

      this.tabs.forEach((tab) => {
        const isActive = tab.dataset.tab === target;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      this.panels.forEach((panel, key) => {
        panel.hidden = key !== target;
      });

      this.storage.set('md_portfolio_tab', target);

      if (opts.updateHash && window.location.hash !== '#' + target) {
        try {
          window.history.replaceState(null, '', '#' + target);
        } catch (_err) {
          window.location.hash = target;
        }
      }

      if (!opts.skipScroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      this.bus.emit('tab:changed', { tab: target });
    }
  }

  class SlideDeckExplorer {
    constructor({ bus, data }) {
      this.bus = bus;
      this.slides = data.slides;
      this.index = 0;

      this.counterEl = document.getElementById('slide-counter');
      this.progressEl = document.getElementById('slide-progress-fill');
      this.stageEl = document.getElementById('slide-stage-host');
      this.notesEl = document.getElementById('slide-notes-host');
      this.thumbsEl = document.getElementById('slide-thumbs-host');
      this.prevBtn = document.getElementById('slide-prev-btn');
      this.nextBtn = document.getElementById('slide-next-btn');
      this.zoomBtn = document.getElementById('slide-zoom-btn');
      this.dialogEl = document.getElementById('slide-zoom-dialog');
      this.dialogBody = document.getElementById('slide-dialog-body');
      this.dialogTitle = document.getElementById('slide-dialog-title');
      this.dialogClose = document.getElementById('slide-dialog-close');
      this.slidesPanel = document.getElementById('panel-slides');
    }

    init() {
      if (!this.stageEl || !this.notesEl || !this.thumbsEl) {
        return;
      }

      this.renderThumbnails();
      this.renderCurrent();

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => this.go(this.index - 1));
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.go(this.index + 1));
      }
      if (this.zoomBtn && this.dialogEl) {
        this.zoomBtn.addEventListener('click', () => this.openZoom());
      }
      if (this.dialogClose && this.dialogEl) {
        this.dialogClose.addEventListener('click', () => this.dialogEl.close());
      }

      document.addEventListener('keydown', (event) => {
        const slidesVisible = this.slidesPanel && !this.slidesPanel.hidden;
        const dialogOpen = this.dialogEl && this.dialogEl.open;
        if (!slidesVisible && !dialogOpen) {
          return;
        }
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
          return;
        }
        if (event.key === 'ArrowRight') {
          this.go(this.index + 1);
        } else if (event.key === 'ArrowLeft') {
          this.go(this.index - 1);
        }
      });
    }

    go(nextIdx) {
      if (nextIdx < 0) {
        this.index = this.slides.length - 1;
      } else if (nextIdx >= this.slides.length) {
        this.index = 0;
      } else {
        this.index = nextIdx;
      }
      this.renderCurrent();
      if (this.dialogEl && this.dialogEl.open) {
        this.populateZoomBody();
      }
      this.bus.emit('slide:changed', { slide: this.slides[this.index] });
    }

    renderThumbnails() {
      SafeDOM.clear(this.thumbsEl);
      this.slides.forEach((slide, idx) => {
        const btn = SafeDOM.el(
          'button',
          {
            type: 'button',
            className: 'slide-thumb-btn',
            dataset: { slideIdx: String(idx) }
          },
          [
            SafeDOM.el('span', {
              className: 'slide-thumb-num',
              text: 'SLIDE ' + slide.number + ' • ' + slide.timestamp
            }),
            SafeDOM.el('span', { className: 'slide-thumb-title', text: slide.title })
          ]
        );
        btn.addEventListener('click', () => this.go(idx));
        this.thumbsEl.appendChild(btn);
      });
    }

    renderCurrent() {
      const slide = this.slides[this.index];
      if (this.counterEl) {
        this.counterEl.textContent = 'Slide ' + slide.number + ' / ' + String(this.slides.length).padStart(2, '0');
      }
      if (this.progressEl) {
        this.progressEl.setAttribute('data-progress', String(this.index + 1));
      }

      Array.from(this.thumbsEl.children).forEach((btn, idx) => {
        btn.classList.toggle('is-active', idx === this.index);
      });

      SafeDOM.clear(this.stageEl);
      this.stageEl.appendChild(this.buildSlideVisual(slide));

      SafeDOM.clear(this.notesEl);
      this.notesEl.appendChild(this.buildNotesPanel(slide));
    }

    buildSlideVisual(slide) {
      const header = SafeDOM.el('div', { className: 'slide-header-block' }, [
        SafeDOM.el('span', { className: 'badge', text: slide.eyebrow }),
        SafeDOM.el('h3', { className: 'slide-title', text: slide.title }),
        SafeDOM.el('p', { className: 'slide-subtitle', text: slide.subtitle })
      ]);

      const body = SafeDOM.el('div', { className: 'slide-canvas-body' });

      if (slide.layout === 'cover') {
        body.appendChild(
          SafeDOM.el('div', { className: 'slide-cover-hero' }, [
            SafeDOM.el('div', { className: 'slide-box is-highlight' }, [
              SafeDOM.el('div', { className: 'slide-box-kicker', text: slide.badge }),
              SafeDOM.el('h4', { className: 'slide-box-title', text: 'Do Chat Passivo à Autonomia Real' }),
              SafeDOM.el('p', {
                className: 'slide-box-text',
                text: 'Apresentação conduzida ao vivo para alunos de Redes, Informática e Desenvolvimento de Sistemas na ETEC de Embu das Artes.'
              })
            ]),
            SafeDOM.el('img', {
              src: 'assets/ai-core-neural.jpg',
              alt: 'Núcleo neural AI Core usado na capa dos slides de Matheus Duarte',
              className: 'slide-cover-art',
              loading: 'lazy'
            })
          ])
        );
      } else if (slide.layout === 'comparison') {
        const grid = SafeDOM.el('div', { className: 'slide-two-col' });
        slide.cards.forEach((c) => {
          const ul = SafeDOM.el('ul', { className: 'compare-list' });
          c.bullets.forEach((b) => ul.appendChild(SafeDOM.el('li', { text: b })));
          grid.appendChild(
            SafeDOM.el('div', { className: c.highlight ? 'slide-box is-highlight' : 'slide-box' }, [
              SafeDOM.el('div', { className: 'slide-box-kicker', text: c.kicker }),
              SafeDOM.el('h4', { className: 'slide-box-title', text: c.title }),
              ul
            ])
          );
        });
        body.appendChild(grid);
      } else if (slide.layout === 'orbital') {
        const cols = SafeDOM.el('div', { className: 'slide-orbital-grid' });
        const leftStack = SafeDOM.el('div', { className: 'slide-funnel' });
        slide.pillars.forEach((p) => {
          leftStack.appendChild(
            SafeDOM.el('div', { className: 'slide-box' }, [
              SafeDOM.el('div', { className: 'slide-box-kicker', text: p.kicker }),
              SafeDOM.el('h4', { className: 'slide-box-title', text: p.title }),
              SafeDOM.el('p', { className: 'slide-box-text', text: p.text })
            ])
          );
        });
        const hub = SafeDOM.el('div', { className: 'slide-orbital-hub' }, [
          SafeDOM.el('img', {
            src: 'assets/ai-core-neural.jpg',
            alt: 'Núcleo Neural conectado às ferramentas',
            className: 'slide-hub-core',
            loading: 'lazy'
          }),
          SafeDOM.el('span', { className: 'slide-box-kicker', text: 'BRAÇOS DE EXECUÇÃO REAL' })
        ]);
        const satWrap = SafeDOM.el('div', { className: 'slide-hub-satellites' });
        slide.satellites.forEach((s) => {
          satWrap.appendChild(SafeDOM.el('span', { className: 'badge badge-cyan', text: s }));
        });
        hub.appendChild(satWrap);
        cols.appendChild(leftStack);
        cols.appendChild(hub);
        body.appendChild(cols);
      } else if (slide.layout === 'loop') {
        const cols = SafeDOM.el('div', { className: 'slide-two-col' });
        const left = SafeDOM.el('div', { className: 'slide-funnel' });
        slide.cards.forEach((c) => {
          left.appendChild(
            SafeDOM.el('div', { className: 'slide-box' }, [
              SafeDOM.el('div', { className: 'slide-box-kicker', text: c.kicker }),
              SafeDOM.el('h4', { className: 'slide-box-title', text: c.title }),
              SafeDOM.el('p', { className: 'slide-box-text', text: c.text })
            ])
          );
        });
        const cycle = SafeDOM.el('div', { className: 'loop-nodes' });
        slide.steps.forEach((st, idx) => {
          cycle.appendChild(
            SafeDOM.el('div', { className: idx === 0 ? 'loop-node is-current' : 'loop-node' }, [
              SafeDOM.el('span', { className: 'loop-node-tag', text: 'ETAPA 0' + (idx + 1) }),
              SafeDOM.el('h4', { className: 'loop-node-title', text: st })
            ])
          );
        });
        cols.appendChild(left);
        cols.appendChild(cycle);
        body.appendChild(cols);
      } else if (slide.layout === 'mcp') {
        const cols = SafeDOM.el('div', { className: 'slide-two-col' });
        slide.cards.forEach((c) => {
          cols.appendChild(
            SafeDOM.el('div', { className: 'slide-box' }, [
              SafeDOM.el('div', { className: 'slide-box-kicker', text: c.kicker }),
              SafeDOM.el('h4', { className: 'slide-box-title', text: c.title }),
              SafeDOM.el('p', { className: 'slide-box-text', text: c.text })
            ])
          );
        });
        body.appendChild(cols);
        body.appendChild(
          SafeDOM.el('div', { className: 'terminal-window' }, [
            SafeDOM.el('div', { className: 'terminal-titlebar' }, [
              SafeDOM.el('span', { text: 'MCP Protocol • Entrada -> payload.json' })
            ]),
            SafeDOM.el('div', { className: 'terminal-body' }, [
              SafeDOM.el('p', { className: 'terminal-line is-cmd', text: 'ENTRADA: ' + slide.promptSample }),
              SafeDOM.el('p', { className: 'terminal-line is-ok', text: slide.payloadSample })
            ])
          ])
        );
      } else if (slide.layout === 'funnel') {
        const cols = SafeDOM.el('div', { className: 'slide-two-col' });
        const left = SafeDOM.el('div', { className: 'slide-funnel' });
        slide.cards.forEach((c) => {
          left.appendChild(
            SafeDOM.el('div', { className: 'slide-box' }, [
              SafeDOM.el('div', { className: 'slide-box-kicker', text: c.kicker }),
              SafeDOM.el('h4', { className: 'slide-box-title', text: c.title }),
              SafeDOM.el('p', { className: 'slide-box-text', text: c.text })
            ])
          );
        });
        const funnel = SafeDOM.el('div', { className: 'slide-funnel' });
        slide.funnelSteps.forEach((fs, idx) => {
          funnel.appendChild(
            SafeDOM.el('div', { className: idx === 3 ? 'funnel-step step-4' : 'funnel-step' }, [
              SafeDOM.el('strong', { text: fs.title + ': ' }),
              SafeDOM.el('span', { text: fs.desc })
            ])
          );
        });
        cols.appendChild(left);
        cols.appendChild(funnel);
        body.appendChild(cols);
      } else if (slide.layout === 'antigravity') {
        const cards = SafeDOM.el('div', { className: 'grid-3' });
        slide.cards.forEach((c) => {
          cards.appendChild(
            SafeDOM.el('div', { className: 'slide-box' }, [
              SafeDOM.el('div', { className: 'slide-box-kicker', text: c.kicker }),
              SafeDOM.el('h4', { className: 'slide-box-title', text: c.title }),
              SafeDOM.el('p', { className: 'slide-box-text', text: c.text })
            ])
          );
        });
        body.appendChild(cards);
        body.appendChild(
          SafeDOM.el('div', { className: 'slide-box is-highlight' }, [
            SafeDOM.el('div', { className: 'slide-box-kicker', text: 'ANTIGRAVITY 2.0 • FLUXO PARALELO' }),
            SafeDOM.el('p', {
              className: 'slide-box-text',
              text: 'Orquestrador Central (Hydrogen • Argon • Carbon • Orchestrator) -> Linux Sandbox 01 & 02 + Agentes em Segundo Plano.'
            })
          ])
        );
      } else if (slide.layout === 'terminal' || slide.layout === 'security') {
        const cards = SafeDOM.el('div', { className: 'grid-3' });
        slide.cards.forEach((c) => {
          cards.appendChild(
            SafeDOM.el('div', { className: 'slide-box' }, [
              SafeDOM.el('div', { className: 'slide-box-kicker', text: c.kicker }),
              SafeDOM.el('h4', { className: 'slide-box-title', text: c.title }),
              SafeDOM.el('p', { className: 'slide-box-text', text: c.text })
            ])
          );
        });
        body.appendChild(cards);

        const termBody = SafeDOM.el('div', { className: 'terminal-body' });
        slide.terminalLines.forEach((line) => {
          const cls = line.startsWith('✔')
            ? 'terminal-line is-ok'
            : line.startsWith('>') || line.includes('$')
              ? 'terminal-line is-cmd'
              : 'terminal-line';
          termBody.appendChild(SafeDOM.el('p', { className: cls, text: line }));
        });
        body.appendChild(
          SafeDOM.el('div', { className: 'terminal-window' }, [
            SafeDOM.el('div', { className: 'terminal-titlebar' }, [
              SafeDOM.el('div', { className: 'terminal-dots' }, [
                SafeDOM.el('span', { className: 'terminal-dot dot-red' }),
                SafeDOM.el('span', { className: 'terminal-dot dot-amber' }),
                SafeDOM.el('span', { className: 'terminal-dot dot-green' })
              ]),
              SafeDOM.el('span', { text: slide.terminalTitle })
            ]),
            termBody
          ])
        );
      } else if (slide.layout === 'conclusion') {
        const cards = SafeDOM.el('div', { className: 'grid-3' });
        slide.cards.forEach((c) => {
          cards.appendChild(
            SafeDOM.el('div', { className: 'slide-box' }, [
              SafeDOM.el('div', { className: 'slide-box-kicker', text: c.kicker }),
              SafeDOM.el('h4', { className: 'slide-box-title', text: c.title }),
              SafeDOM.el('p', { className: 'slide-box-text', text: c.text })
            ])
          );
        });
        body.appendChild(cards);

        const svgEl = SafeDOM.svg(
          'svg',
          { viewBox: '0 0 640 160', class: 'slide-curve-svg', role: 'img', 'aria-label': 'Curva de transição de valor: Passado Escrita Manual para Futuro Arquitetura e Revisão' },
          [
            SafeDOM.svg('path', {
              d: 'M 40 125 C 220 125, 360 35, 590 35',
              fill: 'none',
              stroke: '#1A73E8',
              'stroke-width': '4',
              'stroke-dasharray': '8 6'
            }),
            SafeDOM.svg('circle', { cx: '40', cy: '125', r: '10', fill: '#64748B' }),
            SafeDOM.svg('circle', { cx: '590', cy: '35', r: '10', fill: '#10B981' }),
            SafeDOM.svg('text', { x: '40', y: '150', fill: '#64748B', 'font-size': '13', 'font-weight': '700' }, 'Passado: Escrita Manual de Código'),
            SafeDOM.svg('text', { x: '385', y: '22', fill: '#1A73E8', 'font-size': '13', 'font-weight': '700' }, 'Futuro: Arquitetura e Revisão →')
          ]
        );
        body.appendChild(svgEl);
      }

      const footer = SafeDOM.el('div', { className: 'slide-footer-mark' }, [
        SafeDOM.el('span', { text: 'MATHEUS DUARTE  |  2026' }),
        SafeDOM.el('span', { text: 'SEMANA TÉCNICA ETEC DE EMBU' })
      ]);

      return SafeDOM.el('div', {}, [header, body, footer]);
    }

    buildNotesPanel(slide) {
      const list = SafeDOM.el('ul', { className: 'compare-list' });
      slide.keyPoints.forEach((pt) => list.appendChild(SafeDOM.el('li', { text: pt })));

      return SafeDOM.el('aside', { className: 'card speaker-notes-card' }, [
        SafeDOM.el('div', { className: 'badge badge-success', text: 'Explicação ao Vivo • ' + slide.timestamp }),
        SafeDOM.el('h3', { className: 'pillar-title', text: 'O que apresentei neste slide' }),
        SafeDOM.el('p', { className: 'section-desc', text: slide.speakerSummary }),
        SafeDOM.el('h4', { className: 'slide-box-title', text: 'Pontos-chave da fala' }),
        list,
        SafeDOM.el(
          'button',
          {
            type: 'button',
            className: 'btn btn-primary',
            dataset: { seekSeconds: String(slide.seconds), seekLabel: 'Slide ' + slide.number + ' — ' + slide.title }
          },
          ['Assistir este trecho no Vídeo (' + slide.timestamp + ')']
        )
      ]);
    }

    openZoom() {
      this.populateZoomBody();
      if (typeof this.dialogEl.showModal === 'function') {
        this.dialogEl.showModal();
      }
    }

    populateZoomBody() {
      const slide = this.slides[this.index];
      if (this.dialogTitle) {
        this.dialogTitle.textContent = 'Slide ' + slide.number + ' — ' + slide.title;
      }
      if (this.dialogBody) {
        SafeDOM.clear(this.dialogBody);
        this.dialogBody.appendChild(
          SafeDOM.el('div', { className: 'slide-stage' }, [this.buildSlideVisual(slide)])
        );
      }
    }
  }

  class AgentLoopSimulator {
    constructor({ bus, data }) {
      this.bus = bus;
      this.scenarios = data.simulatorScenarios;
      this.mdPresets = data.mdPresets;
      this.scenarioIdx = 0;
      this.mode = 'strict'; // 'strict' (Default HITL) | 'turbo'
      this.state = 'IDLE'; // IDLE | PLAN | ACT_WAIT | ACT | OBSERVE | REPEAT | DONE
      this.timerId = null;

      this.scenariosHost = document.getElementById('sim-scenarios-host');
      this.modeStrictBtn = document.getElementById('sim-mode-strict');
      this.modeTurboBtn = document.getElementById('sim-mode-turbo');
      this.runBtn = document.getElementById('sim-run-btn');
      this.resetBtn = document.getElementById('sim-reset-btn');
      this.nodesHost = document.getElementById('sim-nodes-host');
      this.logHost = document.getElementById('sim-log-host');
      this.hitlGate = document.getElementById('sim-hitl-gate');
      this.hitlCmd = document.getElementById('sim-hitl-cmd');
      this.approveBtn = document.getElementById('sim-approve-btn');
      this.denyBtn = document.getElementById('sim-deny-btn');

      this.mdTabsHost = document.getElementById('md-presets-tabs');
      this.mdTitleEl = document.getElementById('md-preset-title');
      this.mdSubEl = document.getElementById('md-preset-subtitle');
      this.mdCodeEl = document.getElementById('md-preset-code');
      this.mdIndex = 0;
    }

    init() {
      if (this.scenariosHost && this.nodesHost && this.logHost) {
        this.renderScenarios();
        this.renderNodes();
        this.reset();

        if (this.modeStrictBtn) {
          this.modeStrictBtn.addEventListener('click', () => this.setMode('strict'));
        }
        if (this.modeTurboBtn) {
          this.modeTurboBtn.addEventListener('click', () => this.setMode('turbo'));
        }
        if (this.runBtn) {
          this.runBtn.addEventListener('click', () => this.start());
        }
        if (this.resetBtn) {
          this.resetBtn.addEventListener('click', () => this.reset());
        }
        if (this.approveBtn) {
          this.approveBtn.addEventListener('click', () => this.approveAction());
        }
        if (this.denyBtn) {
          this.denyBtn.addEventListener('click', () => this.denyAction());
        }
      }

      if (this.mdTabsHost && this.mdCodeEl) {
        this.renderMdPresets();
        this.selectMdPreset(0);
      }
    }

    get scenario() {
      return this.scenarios[this.scenarioIdx];
    }

    setMode(nextMode) {
      this.mode = nextMode === 'turbo' ? 'turbo' : 'strict';
      if (this.modeStrictBtn) {
        this.modeStrictBtn.classList.toggle('is-active', this.mode === 'strict');
        this.modeStrictBtn.setAttribute('aria-pressed', String(this.mode === 'strict'));
      }
      if (this.modeTurboBtn) {
        this.modeTurboBtn.classList.toggle('is-active', this.mode === 'turbo');
        this.modeTurboBtn.setAttribute('aria-pressed', String(this.mode === 'turbo'));
      }
      this.reset();
    }

    renderScenarios() {
      SafeDOM.clear(this.scenariosHost);
      this.scenarios.forEach((sc, idx) => {
        const btn = SafeDOM.el('button', {
          type: 'button',
          className: idx === this.scenarioIdx ? 'scenario-btn is-active' : 'scenario-btn',
          text: sc.label + ' (' + sc.timestamp + ')'
        });
        btn.addEventListener('click', () => {
          this.scenarioIdx = idx;
          Array.from(this.scenariosHost.children).forEach((el, cIdx) => {
            el.classList.toggle('is-active', cIdx === idx);
          });
          this.renderNodes();
          this.reset();
        });
        this.scenariosHost.appendChild(btn);
      });
    }

    renderNodes() {
      const sc = this.scenario;
      const phases = [
        { id: 'PLAN', title: '1. Planejar', desc: sc.planText },
        { id: 'ACT', title: '2. Agir', desc: sc.actText },
        { id: 'OBSERVE', title: '3. Observar', desc: sc.observeText },
        { id: 'REPEAT', title: '4. Repetir & Validar', desc: sc.repeatText }
      ];
      SafeDOM.clear(this.nodesHost);
      phases.forEach((p) => {
        const card = SafeDOM.el('div', { className: 'loop-node', dataset: { phase: p.id } }, [
          SafeDOM.el('span', { className: 'loop-node-tag', text: 'Aguardando' }),
          SafeDOM.el('h4', { className: 'loop-node-title', text: p.title }),
          SafeDOM.el('p', { className: 'loop-node-desc', text: p.desc })
        ]);
        this.nodesHost.appendChild(card);
      });
    }

    updatePhaseVisual(currentPhase, completedSet) {
      Array.from(this.nodesHost.children).forEach((node) => {
        const ph = node.dataset.phase;
        const isCurrent = ph === currentPhase;
        const isDone = completedSet.has(ph);
        node.classList.toggle('is-current', isCurrent);
        node.classList.toggle('is-done', isDone);
        const tag = node.querySelector('.loop-node-tag');
        if (tag) {
          tag.textContent = isDone ? 'Concluído' : isCurrent ? 'Em execução...' : 'Aguardando';
        }
      });
    }

    appendLog(type, text) {
      const p = SafeDOM.el('p', { className: 'terminal-line is-' + type, text: text });
      this.logHost.appendChild(p);
      this.logHost.scrollTop = this.logHost.scrollHeight;
    }

    clearTimer() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    }

    reset() {
      this.clearTimer();
      this.state = 'IDLE';
      if (this.hitlGate) {
        this.hitlGate.hidden = true;
      }
      this.updatePhaseVisual(null, new Set());
      SafeDOM.clear(this.logHost);
      this.appendLog(
        'muted',
        'Pasta travada: ' + this.scenario.workspace + ' | Modo: ' + (this.mode === 'strict' ? 'Default / Strict HITL' : 'Turbo Autônomo')
      );
      this.appendLog('cmd', '> "' + this.scenario.prompt + '"');
      this.appendLog('muted', 'Clique em "Executar Loop" para simular o raciocínio do agente.');
    }

    start() {
      this.reset();
      this.state = 'PLAN';
      this.updatePhaseVisual('PLAN', new Set());
      this.appendLog('muted', this.scenario.logs[1].text);

      this.timerId = setTimeout(() => {
        if (this.mode === 'strict') {
          this.state = 'ACT_WAIT';
          this.updatePhaseVisual('ACT', new Set(['PLAN']));
          this.appendLog('warn', '[HITL LOCK] Aguardando aprovação humana para executar na pasta do projeto...');
          if (this.hitlCmd) {
            this.hitlCmd.textContent = this.scenario.actionCommand;
          }
          if (this.hitlGate) {
            this.hitlGate.hidden = false;
          }
        } else {
          this.runActAndRest();
        }
      }, 650);
    }

    approveAction() {
      if (this.state !== 'ACT_WAIT') {
        return;
      }
      if (this.hitlGate) {
        this.hitlGate.hidden = true;
      }
      this.appendLog('ok', '[HITL APROVADO] Permissão concedida somente para: ' + this.scenario.workspace);
      this.runActAndRest();
    }

    denyAction() {
      if (this.state !== 'ACT_WAIT') {
        return;
      }
      this.clearTimer();
      this.state = 'IDLE';
      if (this.hitlGate) {
        this.hitlGate.hidden = true;
      }
      this.appendLog('warn', '[CANCELADO] Ação bloqueada pelo humano no modo Default (HITL). Nenhum arquivo alterado.');
    }

    runActAndRest() {
      this.state = 'ACT';
      this.updatePhaseVisual('ACT', new Set(['PLAN']));
      this.appendLog('cmd', this.scenario.logs[2].text);

      this.timerId = setTimeout(() => {
        this.state = 'OBSERVE';
        this.updatePhaseVisual('OBSERVE', new Set(['PLAN', 'ACT']));
        this.appendLog('warn', this.scenario.logs[3].text);

        this.timerId = setTimeout(() => {
          this.state = 'DONE';
          this.updatePhaseVisual(null, new Set(['PLAN', 'ACT', 'OBSERVE', 'REPEAT']));
          this.appendLog('ok', this.scenario.logs[4].text);
          this.bus.emit('simulator:completed', { scenarioId: this.scenario.id, mode: this.mode });
        }, 700);
      }, 700);
    }

    renderMdPresets() {
      SafeDOM.clear(this.mdTabsHost);
      this.mdPresets.forEach((preset, idx) => {
        const btn = SafeDOM.el('button', {
          type: 'button',
          className: idx === 0 ? 'scenario-btn is-active' : 'scenario-btn',
          text: preset.filename
        });
        btn.addEventListener('click', () => this.selectMdPreset(idx));
        this.mdTabsHost.appendChild(btn);
      });
    }

    selectMdPreset(idx) {
      this.mdIndex = idx;
      const preset = this.mdPresets[idx];
      Array.from(this.mdTabsHost.children).forEach((btn, i) => {
        btn.classList.toggle('is-active', i === idx);
      });
      if (this.mdTitleEl) {
        this.mdTitleEl.textContent = preset.filename;
      }
      if (this.mdSubEl) {
        this.mdSubEl.textContent = preset.subtitle;
      }
      if (this.mdCodeEl) {
        this.mdCodeEl.textContent = preset.code;
      }
    }
  }

  class DemoShowcaseController {
    constructor({ data }) {
      this.demos = data.demos;
      this.host = document.getElementById('demos-grid-host');
    }

    init() {
      if (!this.host) {
        return;
      }
      SafeDOM.clear(this.host);
      this.demos.forEach((demo) => {
        const tags = SafeDOM.el('div', { className: 'demo-tags' });
        demo.stack.forEach((t) => tags.appendChild(SafeDOM.el('span', { className: 'demo-tag', text: t })));

        const card = SafeDOM.el('article', { className: 'card card-interactive demo-card' }, [
          SafeDOM.el('div', {}, [
            SafeDOM.el('div', { className: 'demo-card-header' }, [
              SafeDOM.el('span', { className: 'badge badge-neutral', text: demo.badge }),
              SafeDOM.el('span', { className: 'demo-brand-dot ' + demo.theme, 'aria-hidden': 'true' })
            ]),
            SafeDOM.el('h3', { className: 'pillar-title', text: demo.title }),
            SafeDOM.el('p', { className: 'section-desc', text: demo.whatIShowed })
          ]),
          SafeDOM.el('div', {}, [
            tags,
            SafeDOM.el('p', { className: 'fallback-notice', text: 'Aprendizado: ' + demo.keyTakeaway }),
            SafeDOM.el('div', { className: 'demo-footer' }, [
              SafeDOM.el('span', { className: 'mono', text: 'Minutagem: ' + demo.timestamp }),
              SafeDOM.el(
                'button',
                {
                  type: 'button',
                  className: 'btn btn-ghost btn-sm',
                  dataset: { seekSeconds: String(demo.seconds), seekLabel: demo.title }
                },
                ['Ver no Vídeo']
              )
            ])
          ])
        ]);

        this.host.appendChild(card);
      });
    }
  }

  class QAController {
    constructor({ data }) {
      this.items = data.qaItems;
      this.category = 'Todas';
      this.query = '';
      this.host = document.getElementById('qa-list-host');
      this.searchInput = document.getElementById('qa-search-input');
      this.filterHost = document.getElementById('qa-filter-pills');
      this.countEl = document.getElementById('qa-result-count');
    }

    init() {
      if (!this.host) {
        return;
      }

      if (this.filterHost) {
        const categories = ['Todas', 'Carreira', 'Segurança', 'Arquitetura & Ferramentas'];
        SafeDOM.clear(this.filterHost);
        categories.forEach((cat) => {
          const btn = SafeDOM.el('button', {
            type: 'button',
            className: cat === this.category ? 'filter-pill is-active' : 'filter-pill',
            text: cat
          });
          btn.addEventListener('click', () => {
            this.category = cat;
            Array.from(this.filterHost.children).forEach((el) => {
              el.classList.toggle('is-active', el.textContent === cat);
            });
            this.render();
          });
          this.filterHost.appendChild(btn);
        });
      }

      if (this.searchInput) {
        this.searchInput.addEventListener('input', (event) => {
          this.query = String(event.target.value || '').trim().toLowerCase();
          this.render();
        });
      }

      this.render();
    }

    render() {
      const filtered = this.items.filter((item) => {
        const matchCat = this.category === 'Todas' || item.category === this.category;
        if (!matchCat) {
          return false;
        }
        if (!this.query) {
          return true;
        }
        const hay = (item.question + ' ' + item.audienceContext + ' ' + item.answer + ' ' + item.category).toLowerCase();
        return hay.includes(this.query);
      });

      if (this.countEl) {
        this.countEl.textContent = filtered.length + ' de ' + this.items.length + ' perguntas exibidas';
      }

      SafeDOM.clear(this.host);
      if (filtered.length === 0) {
        this.host.appendChild(
          SafeDOM.el('div', { className: 'card' }, [
            SafeDOM.el('p', {
              className: 'section-desc',
              text: 'Nenhuma pergunta encontrada para esse termo. Limpe a busca para visualizar todas as respostas da palestra.'
            })
          ])
        );
        return;
      }

      filtered.forEach((item, idx) => {
        const panelId = 'qa-panel-' + item.id;
        const expanded = idx === 0 && !this.query;

        const trigger = SafeDOM.el(
          'button',
          {
            type: 'button',
            className: 'qa-trigger',
            'aria-expanded': String(expanded),
            'aria-controls': panelId
          },
          [
            SafeDOM.el('div', { className: 'qa-trigger-main' }, [
              SafeDOM.el('div', { className: 'qa-meta-line' }, [
                SafeDOM.el('span', { className: 'badge', text: item.timestamp }),
                SafeDOM.el('span', { className: 'badge badge-neutral', text: item.category })
              ]),
              SafeDOM.el('h3', { className: 'qa-question-title', text: item.question })
            ]),
            SafeDOM.el('span', { className: 'qa-chevron', text: '+', 'aria-hidden': 'true' })
          ]
        );

        const panel = SafeDOM.el('div', { id: panelId, className: 'qa-answer-panel', hidden: !expanded }, [
          SafeDOM.el('p', { className: 'fallback-notice', text: 'Contexto da plateia: ' + item.audienceContext }),
          SafeDOM.el('p', { text: item.answer }),
          SafeDOM.el(
            'button',
            {
              type: 'button',
              className: 'btn btn-ghost btn-sm',
              dataset: { seekSeconds: String(item.seconds), seekLabel: 'Q&A (' + item.timestamp + ')' }
            },
            ['Ir para este momento no Vídeo (' + item.timestamp + ')']
          )
        ]);

        trigger.addEventListener('click', () => {
          const isOpen = trigger.getAttribute('aria-expanded') === 'true';
          trigger.setAttribute('aria-expanded', String(!isOpen));
          panel.hidden = isOpen;
        });

        this.host.appendChild(SafeDOM.el('article', { className: 'qa-item' }, [trigger, panel]));
      });
    }
  }

  class VideoChapterController {
    constructor({ bus, data }) {
      this.bus = bus;
      this.presentation = data.presentation;
      this.chapters = data.videoChapters;
      this.iframeEl = document.getElementById('youtube-player-iframe');
      this.chaptersHost = document.getElementById('video-chapters-host');
      this.statusEl = document.getElementById('video-current-chapter');
      this.externalLinkEl = document.getElementById('video-direct-link');
      this.activeSeconds = this.presentation.youtubeStartSeconds;
    }

    init() {
      this.renderChapters();
      this.bus.on('video:seek', (payload) => {
        if (!payload || typeof payload.seconds !== 'number') {
          return;
        }
        this.seekTo(payload.seconds, payload.label || 'Trecho selecionado', true);
      });
    }

    renderChapters() {
      if (!this.chaptersHost) {
        return;
      }
      SafeDOM.clear(this.chaptersHost);
      this.chapters.forEach((ch) => {
        const btn = SafeDOM.el(
          'button',
          {
            type: 'button',
            className: ch.seconds === this.activeSeconds ? 'chapter-btn is-active' : 'chapter-btn',
            dataset: { seconds: String(ch.seconds) }
          },
          [
            SafeDOM.el('span', { className: 'chapter-time', text: ch.time }),
            SafeDOM.el('span', {}, [
              SafeDOM.el('span', { className: 'chapter-title', text: ch.title }),
              SafeDOM.el('span', { className: 'chapter-desc', text: ch.desc })
            ])
          ]
        );
        btn.addEventListener('click', () => {
          this.seekTo(ch.seconds, ch.time + ' — ' + ch.title, false);
        });
        this.chaptersHost.appendChild(btn);
      });
    }

    seekTo(seconds, label, switchTab) {
      const clamped = Math.max(190, Math.min(4200, Math.round(seconds)));
      this.activeSeconds = clamped;

      if (switchTab) {
        this.bus.emit('tab:request', { tab: 'video' });
      }

      if (this.iframeEl) {
        const embedUrl =
          'https://www.youtube-nocookie.com/embed/' +
          this.presentation.youtubeId +
          '?start=' +
          clamped +
          '&end=' +
          this.presentation.youtubeEndSeconds +
          '&autoplay=1&rel=0';
        this.iframeEl.setAttribute('src', SafeDOM.sanitizeUrl(embedUrl));
      }

      if (this.externalLinkEl) {
        const watchUrl = 'https://www.youtube.com/watch?v=' + this.presentation.youtubeId + '&t=' + clamped + 's';
        this.externalLinkEl.setAttribute('href', SafeDOM.sanitizeUrl(watchUrl));
      }

      if (this.statusEl) {
        this.statusEl.textContent = 'Ponto ativo: ' + label;
      }

      if (this.chaptersHost) {
        Array.from(this.chaptersHost.children).forEach((btn) => {
          btn.classList.toggle('is-active', Number(btn.dataset.seconds) === clamped);
        });
      }
    }
  }

  class ProfileController {
    constructor({ data }) {
      this.profile = data.profile;
      this.expHost = document.getElementById('profile-experience-host');
      this.eduHost = document.getElementById('profile-education-host');
      this.skillsFilterHost = document.getElementById('profile-skills-filter');
      this.skillsHost = document.getElementById('profile-skills-host');
      this.activitiesHost = document.getElementById('profile-activities-host');
      this.skillFilter = 'top';
    }

    init() {
      this.renderExperience();
      this.renderEducation();
      this.renderActivities();
      this.renderSkillFilters();
      this.renderSkills();
    }

    renderExperience() {
      if (!this.expHost) {
        return;
      }
      SafeDOM.clear(this.expHost);
      this.profile.experiences.forEach((exp) => {
        const children = [
          SafeDOM.el('div', { className: 'qa-meta-line' }, [
            SafeDOM.el('span', { className: exp.current ? 'badge badge-success' : 'badge badge-neutral', text: exp.period }),
            SafeDOM.el('span', { className: 'badge badge-neutral', text: exp.type })
          ]),
          SafeDOM.el('h4', { className: 'pillar-title', text: exp.role }),
          SafeDOM.el('p', { className: 'mono', text: exp.company + ' • ' + exp.location }),
          SafeDOM.el('p', { className: 'section-desc', text: exp.description })
        ];
        if (exp.skills && exp.skills.length > 0) {
          const tags = SafeDOM.el('div', { className: 'demo-tags' });
          exp.skills.forEach((s) => tags.appendChild(SafeDOM.el('span', { className: 'demo-tag', text: s })));
          children.push(tags);
        }
        const item = SafeDOM.el(
          'article',
          { className: exp.current ? 'card timeline-item is-current' : 'card timeline-item' },
          children
        );
        this.expHost.appendChild(item);
      });
    }

    renderEducation() {
      if (!this.eduHost) {
        return;
      }
      SafeDOM.clear(this.eduHost);
      this.profile.education.forEach((ed) => {
        this.eduHost.appendChild(
          SafeDOM.el('article', { className: 'card' }, [
            SafeDOM.el('span', { className: 'badge', text: ed.period }),
            SafeDOM.el('h4', { className: 'pillar-title', text: ed.course }),
            SafeDOM.el('p', { className: 'mono', text: ed.school }),
            SafeDOM.el('p', { className: 'section-desc', text: ed.description })
          ])
        );
      });
    }

    renderActivities() {
      if (!this.activitiesHost) {
        return;
      }
      SafeDOM.clear(this.activitiesHost);
      this.profile.activities.forEach((act) => {
        this.activitiesHost.appendChild(SafeDOM.el('li', { text: act }));
      });
    }

    renderSkillFilters() {
      if (!this.skillsFilterHost) {
        return;
      }
      const filters = [
        { id: 'top', label: 'Principais (Top 5)' },
        { id: 'all', label: 'Todas (' + this.profile.skills.length + ')' },
        { id: 'ti', label: 'TI & Infra' },
        { id: 'dev', label: 'Dev, Dados & Arduino' },
        { id: 'audiovisual', label: 'Audiovisual' },
        { id: 'gestao', label: 'Gestão, Office & Logística' }
      ];
      SafeDOM.clear(this.skillsFilterHost);
      filters.forEach((f) => {
        const btn = SafeDOM.el('button', {
          type: 'button',
          className: f.id === this.skillFilter ? 'filter-pill is-active' : 'filter-pill',
          text: f.label
        });
        btn.addEventListener('click', () => {
          this.skillFilter = f.id;
          Array.from(this.skillsFilterHost.children).forEach((el) => {
            el.classList.toggle('is-active', el.textContent === f.label);
          });
          this.renderSkills();
        });
        this.skillsFilterHost.appendChild(btn);
      });
    }

    renderSkills() {
      if (!this.skillsHost) {
        return;
      }
      const list = this.profile.skills.filter((s) => {
        if (this.skillFilter === 'top') {
          return s.top;
        }
        if (this.skillFilter === 'all') {
          return true;
        }
        return s.category === this.skillFilter;
      });

      SafeDOM.clear(this.skillsHost);
      list.forEach((skill) => {
        this.skillsHost.appendChild(
          SafeDOM.el('span', {
            className: skill.top ? 'skill-chip is-top' : 'skill-chip',
            text: skill.top ? '★ ' + skill.name : skill.name
          })
        );
      });
    }
  }

  global.MDComponents = Object.freeze({
    ThemeController: ThemeController,
    TabRouter: TabRouter,
    SlideDeckExplorer: SlideDeckExplorer,
    AgentLoopSimulator: AgentLoopSimulator,
    DemoShowcaseController: DemoShowcaseController,
    QAController: QAController,
    VideoChapterController: VideoChapterController,
    ProfileController: ProfileController
  });
})(window);
