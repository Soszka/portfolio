import { useEffect, useRef, useState } from 'react';

// Observe each element separately, so lower rows do not finish their entrance off screen.
export default function useScrollReveal(refs, count) {
  const [states, setStates] = useState(() => {
    const immediate = typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    return Array.from({ length: count }, () => ({ visible: Boolean(immediate), delay: 0 }));
  });
  const seen = useRef(new Set());

  useEffect(() => {
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let observer;
    const finish = () => {
      refs.current.forEach((_, index) => seen.current.add(index));
      setStates(Array.from({ length: count }, () => ({ visible: true, delay: 0 })));
      observer?.disconnect();
    };
    if (preference?.matches || !('IntersectionObserver' in window)) {
      finish();
      return undefined;
    }
    const observePending = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(entries => {
        const indices = entries.filter(entry => entry.isIntersecting &&
          (entry.intersectionRatio >= .24 || entry.boundingClientRect.height > window.innerHeight * 3))
          .map(entry => refs.current.indexOf(entry.target))
          .filter(index => index >= 0 && !seen.current.has(index))
          .sort((a, b) => a - b);
        if (!indices.length) return;
        indices.forEach(index => {
          seen.current.add(index);
          observer.unobserve(refs.current[index]);
        });
        setStates(current => current.map((state, index) => {
          const order = indices.indexOf(index);
          return order < 0 ? state : { visible: true, delay: Math.min(order * 140, 420) };
        }));
      }, {
        threshold: .24,
        // Pixel margins keep the trigger consistent on tall phones and wide monitors.
        rootMargin: `0px 0px -${Math.round(window.innerHeight * .18)}px 0px`,
      });
      refs.current.forEach((element, index) => {
        if (element && !seen.current.has(index)) observer.observe(element);
      });
    };
    const onPreferenceChange = () => { if (preference.matches) finish(); };
    observePending();
    window.addEventListener('resize', observePending);
    preference?.addEventListener('change', onPreferenceChange);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', observePending);
      preference?.removeEventListener('change', onPreferenceChange);
    };
  }, [refs, count]);

  return states;
}
