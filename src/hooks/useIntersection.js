// src/hooks/useIntersection.js
import { useEffect, useRef } from 'react';

export function useIntersection(callback, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry.target);
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [callback, options]);

  return ref;
}

export default useIntersection;
