
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * SG NEURAL CORE: Service Worker Registration
 * Purpose: Ensures background persistence for driver mission alerts and push telemetry.
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    try {
      /**
       * TACTICAL FIX: Origin Resolution
       * In many cloud IDEs or sandboxed previews, './service-worker.js' may resolve to the 
       * wrong origin (e.g., the parent frame at ai.studio) instead of the local sandbox.
       * We force resolution against the current window's absolute location.
       */
      const swUrl = new URL('service-worker.js', window.location.href).href;
      
      navigator.serviceWorker.register(swUrl, { scope: './' })
        .then(registration => {
          console.log('SG Neural Core: Service Worker Synchronized', registration.scope);
        })
        .catch(err => {
          // Graceful degradation: If the environment strictly prohibits Service Workers
          // (common in some private/highly restricted browser contexts), we log it as telemetry 
          // but allow the main neural link (App) to remain active.
          if (err.message.includes('origin') || err.message.includes('SecurityError')) {
            console.info('SG Neural Core: Service Worker limited by origin sandbox. Background notifications may be restricted.');
          } else {
            console.warn('SG Neural Core: Service Worker link disrupted:', err.message);
          }
        });
    } catch (e) {
      console.debug('SG Neural Core: Service Worker initialization bypassed.');
    }
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Critical Fault: Root element mapping failed.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
