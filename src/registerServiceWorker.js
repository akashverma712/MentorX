// simple registration
export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = '/sw.js';
        navigator.serviceWorker.register(swUrl).then(reg => {
          console.log('Service worker registered: ', reg);
        }).catch(err => {
          console.warn('Service worker registration failed: ', err);
        });
      });
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs =>
        regs.forEach(r => r.unregister())
      );
    }
  }
  