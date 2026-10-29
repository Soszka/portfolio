import { useEffect } from 'react';

// Pause decorative CSS animations when they cannot be seen.
export default function useMotionVisibility(ref) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    let visible = false;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      element.dataset.motionPaused = String(!visible || document.hidden || preference.matches);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
    };
  }, [ref]);
}
