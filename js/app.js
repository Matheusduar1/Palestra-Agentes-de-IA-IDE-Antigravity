'use strict';

/**
 * Orquestrador principal da aplicação (PortfolioApp).
 * Inicializa barramento de eventos, controladores OOP e delegação global.
 */
(function (global) {
  class PortfolioApp {
    constructor() {
      this.data = global.MDPortfolioData;
      this.bus = new global.MDCore.EventBus();
      this.storage = new global.MDCore.StorageService();
      this.controllers = [];
    }

    start() {
      if (!this.data || !global.MDComponents) {
        return;
      }

      const deps = {
        bus: this.bus,
        data: this.data,
        storage: this.storage
      };

      this.controllers = [
        new global.MDComponents.ThemeController(deps),
        new global.MDComponents.TabRouter(deps),
        new global.MDComponents.SlideDeckExplorer(deps),
        new global.MDComponents.AgentLoopSimulator(deps),
        new global.MDComponents.DemoShowcaseController(deps),
        new global.MDComponents.QAController(deps),
        new global.MDComponents.VideoChapterController(deps),
        new global.MDComponents.ProfileController(deps)
      ];

      this.controllers.forEach((ctrl) => ctrl.init());
      this.bindGlobalDelegation();
    }

    bindGlobalDelegation() {
      document.addEventListener('click', (event) => {
        const tabTrigger = event.target.closest('[data-open-tab]');
        if (tabTrigger) {
          this.bus.emit('tab:request', { tab: tabTrigger.dataset.openTab });
          return;
        }

        const seekTrigger = event.target.closest('[data-seek-seconds]');
        if (seekTrigger) {
          const secs = Number(seekTrigger.dataset.seekSeconds);
          if (!Number.isNaN(secs)) {
            this.bus.emit('video:seek', {
              seconds: secs,
              label: seekTrigger.dataset.seekLabel || 'Trecho da apresentação'
            });
          }
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.start();
  });
})(window);
