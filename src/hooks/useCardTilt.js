import { useCallback, useEffect, useRef } from 'react';
// Same +/-15 degree perspective and inverse image parallax as the project cards.
// Read the stable outer surface; transform only its child to avoid pointer jitter.
export default function useCardTilt() {
  const frame = useRef(null);
  const pending = useRef(null);
  const preference = useRef(null);
  const active = useRef(null);
  const reset = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    pending.current = null;
    if (active.current) {
      const { card, image, glare } = active.current;
      card?.style.removeProperty('transform');
      image?.style.removeProperty('transform');
      glare?.style.removeProperty('transform');
      active.current = null;
    }
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)');
    preference.current = media;
    const onPreferenceChange = () => { if (!media.matches) reset(); };
    const onVisibility = () => { if (document.hidden) reset(); };
    media.addEventListener?.('change', onPreferenceChange);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', reset);
    return () => {
      reset();
      media.removeEventListener?.('change', onPreferenceChange);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', reset);
    };
  }, [reset]);
  const onPointerMove = event => {
    if (event.pointerType !== 'mouse' || !preference.current?.matches) return;
    const surface = event.currentTarget;
    // Mouse events can arrive much faster than the display refreshes. Store only
    // the latest coordinates; measure layout once, before any style writes.
    pending.current = { surface, clientX: event.clientX, clientY: event.clientY };
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const { surface, clientX, clientY } = pending.current;
      pending.current = null;
      const bounds = surface.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = Math.max(-.5, Math.min(.5, (clientX - bounds.left) / bounds.width - .5));
      const y = Math.max(-.5, Math.min(.5, (clientY - bounds.top) / bounds.height - .5));
      if (active.current?.surface !== surface) {
        active.current = {
          surface,
          card: surface.querySelector('[data-tilt-card]'),
          image: surface.querySelector('[data-tilt-image]'),
          glare: surface.querySelector('[data-tilt-glare]'),
        };
      }
      const { card, image, glare } = active.current;
      // Write only to the three moving layers, avoiding inherited custom
      // properties that invalidate styles throughout the entire card subtree.
      if (card) card.style.transform = `rotateX(${y * -30}deg) rotateY(${x * 30}deg)`;
      if (image) image.style.transform = `translate(${x * -40}px, ${y * -40}px)`;
      // A circle's farthest-corner radius depends on the pointer position.
      // Scaling a cached centered gradient preserves that exact falloff without
      // repainting a new radial gradient for every pointer position.
      const radius = Math.hypot(bounds.width * (.5 + Math.abs(x)), bounds.height * (.5 + Math.abs(y)));
      const scale = radius / Math.hypot(bounds.width, bounds.height);
      if (glare) glare.style.transform = `translate(${x * bounds.width}px, ${y * bounds.height}px) scale(${scale})`;
    });
  };
  return { onPointerMove, onPointerLeave: reset };
}
