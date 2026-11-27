import { useEffect } from 'react';

/**
 * Registers the service worker and handles install prompt.
 */
export function usePWA() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
          .catch(err => console.warn('SW registration failed', err));
      });
    }
  }, []);
}