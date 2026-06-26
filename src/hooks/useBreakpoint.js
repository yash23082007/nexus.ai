// src/hooks/useBreakpoint.js
import { useState, useEffect, useRef } from 'react';

const MOBILE_BREAKPOINT = 768; // md breakpoint

export function useBreakpoint() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );
  const isMobileRef = useRef(isMobile);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? window.innerWidth;
      const mobile = width < MOBILE_BREAKPOINT;

      if (mobile !== isMobileRef.current) {
        isMobileRef.current = mobile;
        setIsMobile(mobile);
      }
    });

    // Observe document root for full-width tracking
    observer.observe(document.documentElement);

    return () => observer.disconnect();
  }, []);

  return isMobile;
}

export default useBreakpoint;
