import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITEKEY || '1x00000000000000000000AA';

let scriptPromise = null;

function loadTurnstile() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      s.onload = () => resolve(window.turnstile);
      s.onerror = () => reject(new Error('Failed to load Turnstile script'));
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

const Turnstile = forwardRef(function Turnstile({ onTokenChange }, ref) {
  const containerRef = useRef(null);
  const widgetId = useRef(null);
  const cbRef = useRef(onTokenChange);
  cbRef.current = onTokenChange;

  useImperativeHandle(ref, () => ({
    getToken() {
      if (window.turnstile && widgetId.current != null) {
        try {
          return window.turnstile.getResponse(widgetId.current) || null;
        } catch {
          return null;
        }
      }
      return null;
    },
    reset() {
      cbRef.current?.(null);
      if (window.turnstile && widgetId.current != null) {
        try {
          window.turnstile.reset(widgetId.current);
        } catch {}
      }
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((ts) => {
        if (cancelled || !containerRef.current || widgetId.current != null) return;
        widgetId.current = ts.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: 'auto',
          appearance: 'always',
          callback: (token) => cbRef.current?.(token),
          'expired-callback': () => cbRef.current?.(null),
          'error-callback': () => cbRef.current?.(null),
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={containerRef} />;
});

export default Turnstile;
