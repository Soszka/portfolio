import { useLayoutEffect, useRef } from 'react';

// Center the visual weight of the glyphs, including their side bearings and tracking.
// Measuring once per text/font combination also handles zoom and translated labels.
export default function useOpticalMetricAlignment(ref, value, label) {
  const canvasRef = useRef(null);
  const offsets = useRef(new Map());

  useLayoutEffect(() => {
    const metric = ref.current;
    if (!metric || typeof CanvasRenderingContext2D === 'undefined') return undefined;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx || !('letterSpacing' in ctx)) return undefined;
    let disposed = false;

    const align = () => {
      if (disposed) return;
      [...metric.children].forEach((element, index) => {
        const style = getComputedStyle(element);
        const text = style.textTransform === 'uppercase'
          ? element.textContent.toUpperCase() : element.textContent;
        const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const key = `${font}|${style.letterSpacing}|${text}`;
        let offset = offsets.current.get(key);
        if (offset === undefined) {
          const size = parseFloat(style.fontSize);
          const padding = Math.ceil(size / 4);
          ctx.font = font;
          ctx.letterSpacing = style.letterSpacing;
          const advance = ctx.measureText(text).width;
          canvas.width = Math.ceil(advance + 2 * padding);
          canvas.height = Math.ceil(size * 1.6 + 2 * padding);
          ctx.font = font;
          ctx.letterSpacing = style.letterSpacing;
          ctx.textBaseline = 'alphabetic';
          ctx.fillText(text, padding, padding + size);
          const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          let weight = 0;
          let weightedX = 0;
          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const alpha = pixels[(y * canvas.width + x) * 4 + 3];
              weight += alpha;
              weightedX += (x + .5) * alpha;
            }
          }
          offset = weight ? advance / 2 - (weightedX / weight - padding) : 0;
          if (offsets.current.size > 64) offsets.current.clear();
          offsets.current.set(key, offset);
        }
        element.style.setProperty(index === 0 ? '--number-optical-shift' : '--label-optical-shift', `${offset.toFixed(3)}px`);
      });
    };

    align();
    document.fonts?.ready.then(align);
    // Replace any cached fallback-font measurements once web fonts finish loading.
    const fontsLoaded = () => { offsets.current.clear(); align(); };
    document.fonts?.addEventListener('loadingdone', fontsLoaded);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(align) : null;
    [...metric.children].forEach(element => observer?.observe(element));
    return () => {
      disposed = true;
      observer?.disconnect();
      document.fonts?.removeEventListener('loadingdone', fontsLoaded);
    };
  }, [ref, value, label]);
}
