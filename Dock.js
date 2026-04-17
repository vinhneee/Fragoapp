class DockNavigation {
  constructor() {
    this.dockOuter = document.getElementById('dockOuter');
    this.dockPanel = document.getElementById('dockPanel');
    this.dockItems = document.querySelectorAll('.dock-item');
    this.mouseX = null;
    
    this.config = {
      baseSize: 50,
      magnification: 70,
      distance: 150
    };
    
    this.init();
  }
  
  init() {
    this.setActivePage();
    this.setupEventListeners();
    this.setupSmoothTransition();
  }
  
  setActivePage() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
    this.dockItems.forEach(item => {
      const page = item.getAttribute('data-page');
      if (page === currentPage) {
        item.classList.add('active');
      }
    });
  }
  
  setupEventListeners() {
    this.dockPanel.addEventListener('mousemove', (e) => {
      this.mouseX = e.pageX;
      this.updateMagnification();
    });
    
    this.dockPanel.addEventListener('mouseleave', () => {
      this.mouseX = null;
      this.resetAllItems();
    });
    
    this.dockItems.forEach(item => {
      const link = item.querySelector('.dock-link');
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.transitionToPage(href);
      });
    });
  }
  
  updateMagnification() {
    if (this.mouseX === null) return;
    
    this.dockItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(this.mouseX - itemCenter);
      
      let scale = 1;
      if (distance < this.config.distance) {
        const ratio = (this.config.distance - distance) / this.config.distance;
        scale = 1 + (ratio * 0.4); // Tăng scale tối đa 1.4x
      }
      
      item.style.transform = `translateY(-${scale * 2}px) scale(${scale})`;
    });
  }
  
  resetAllItems() {
    this.dockItems.forEach(item => {
      item.style.transform = 'translateY(0) scale(1)';
    });
  }
  
  setupSmoothTransition() {
    window.addEventListener('load', () => {
      document.body.style.opacity = '0';
      setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
      }, 100);
    });
  }
  
  transitionToPage(href) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DockNavigation();
});
class DockNavigation {
  setupEventListeners() {
    this.dockItems.forEach(item => {
      const link = item.querySelector('.dock-link');
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'prefetch';
        preloadLink.href = href;
        document.head.appendChild(preloadLink);
      });
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        document.querySelector('.content').style.opacity = '0';
        document.querySelector('.content').style.transition = 'opacity 0.2s ease';
        
        setTimeout(() => {
          window.location.href = href;
        }, 200);
      });
    });
  }
}