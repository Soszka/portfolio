import React, { useEffect, useRef } from 'react';
import styles from './Animation.module.scss';
import aboutPhoto from '../../assets/HomePhotos/aboutPhoto1.webp';

const random = (min, max) => Math.round(Math.random() * (max - min)) + min;

const Animation = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const modestDevice = (navigator.hardwareConcurrency || 8) <= 4 ||
      (navigator.deviceMemory || 8) <= 4;
    let visible = false;
    let nearby = false;
    let frame = null;
    let previous = null;
    let nextDraw = null;
    let preparation = null;
    let dirty = true;
    let virtualWidth = 0;
    let virtualHeight = 0;
    let lines = [];
    let atlas = null;
    const sprites = new Map();

    // Cache each beam with its glow once, rather than blur the whole canvas every frame.
    const getSprite = (width, hue) => {
      const key = width + ':' + hue;
      if (sprites.has(key)) return sprites.get(key);
      const sprite = document.createElement('canvas');
      sprite.width = width + 80;
      sprite.height = 830;
      const paint = sprite.getContext('2d');
      const gradient = paint.createLinearGradient(0, 40, 0, 790);
      gradient.addColorStop(0, `hsla(${hue}, 100%, 65%, 0)`);
      gradient.addColorStop(0.5, `hsla(${hue}, 100%, 65%, 1)`);
      gradient.addColorStop(1, `hsla(${hue}, 100%, 65%, 0)`);
      paint.fillStyle = gradient;
      paint.filter = 'blur(13px)';
      paint.fillRect(40, 40, width, 750);
      paint.filter = 'none';
      paint.globalCompositeOperation = 'lighter';
      paint.fillRect(40, 40, width, 750);
      sprites.set(key, sprite);
      return sprite;
    };

    const reset = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight));
      // A stable scene keeps the beams' proportions independent of monitor height.
      // Beyond Full HD the visible panel stops growing, so its density can stay stable too.
      virtualWidth = Math.min(window.innerWidth, 1920);
      virtualHeight = virtualWidth < 768 ? 844 : 1080;
      const scaleX = canvas.width / virtualWidth;
      const scaleY = canvas.height / virtualHeight;
      const minWidth = virtualWidth < 1200 ? 5 : 10;
      const maxWidth = virtualWidth < 1200 ? 1 : 3;
      sprites.clear();
      // Bake the same glowing beams at their final display size once on resize.
      // Each frame can then copy native-size images without resampling them.
      const beams = Array.from({ length: Math.ceil(virtualWidth / minWidth) }, () => {
        const width = random(minWidth, maxWidth);
        const hue = random(20, 23) * 10;
        const height = random(360, 750);
        const source = getSprite(width, hue);
        return {
          x: random(0, canvas.width),
          y: Math.round((virtualHeight / 2 + 360 - height - 40 * height / 750) * scaleY),
          ttl: random(200, virtualWidth < 768 ? 20 : 40),
          life: preference.matches ? 50 : 0,
          width: Math.max(1, Math.round(source.width * scaleX)),
          height: Math.max(1, Math.round(source.height * height / 750 * scaleY)),
          source,
        };
      });
      // One shared atlas avoids uploading and switching between hundreds of canvases.
      // Pack by actual sprite height instead of reserving the tallest cell for
      // every beam. Keep their original draw order for identical alpha blending.
      const area = beams.reduce((sum, beam) => sum + (beam.width + 2) * (beam.height + 2), 0);
      const atlasWidth = Math.max(Math.max(...beams.map(beam => beam.width + 2)), Math.ceil(Math.sqrt(area)));
      let sourceX = 0;
      let sourceY = 0;
      let rowHeight = 0;
      const packed = [...beams].sort((a, b) => b.height - a.height);
      for (const beam of packed) {
        if (sourceX + beam.width + 2 > atlasWidth) {
          sourceX = 0;
          sourceY += rowHeight;
          rowHeight = 0;
        }
        beam.sourceX = sourceX;
        beam.sourceY = sourceY;
        sourceX += beam.width + 2;
        rowHeight = Math.max(rowHeight, beam.height + 2);
      }
      atlas = document.createElement('canvas');
      atlas.width = atlasWidth;
      atlas.height = sourceY + rowHeight;
      const paint = atlas.getContext('2d');
      lines = beams.map(({ source, ...beam }) => {
        paint.drawImage(source, beam.sourceX, beam.sourceY, beam.width, beam.height);
        return beam;
      });
      sprites.clear();
      dirty = false;
    };

    const draw = (elapsed) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      for (const line of lines) {
        line.life += elapsed * 60 / 1000;
        if (line.life > line.ttl) {
          line.life %= line.ttl;
          line.x = random(0, canvas.width);
        }
        const half = line.ttl / 2;
        ctx.globalAlpha = Math.abs(((line.life + half) % line.ttl) - half) / half;
        ctx.drawImage(atlas, line.sourceX, line.sourceY, line.width, line.height,
          Math.round(line.x - line.width / 2), line.y, line.width, line.height);
      }
      ctx.restore();
    };

    const loop = (time) => {
      frame = null;
      if (!visible || document.hidden) return;
      if (dirty) reset();
      const elapsed = previous === null ? 1000 / 60 : time - previous;
      // Smooth desktop pulsation while retaining 30 Hz on small/modest devices.
      // Schedule against a deadline, not the last RAF, to avoid a 48 Hz cadence
      // on 144 Hz displays. The life clock still uses the actual elapsed time.
      const interval = 1000 / (modestDevice || window.innerWidth < 768 ? 30 : 60);
      if (nextDraw === null || time >= nextDraw - .5) {
        draw(Math.min(elapsed, 100));
        previous = time;
        nextDraw = nextDraw === null ? time + interval :
          nextDraw + Math.max(1, Math.floor((time - nextDraw) / interval) + 1) * interval;
      }
      if (!preference.matches) frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previous = null;
      nextDraw = null;
      container.dataset.motionPaused = String(!visible || document.hidden || preference.matches);
      if (visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    // Prepare expensive blur sprites during idle time just before the section
    // enters view, instead of doing that work in its first animation frame.
    const cancelPreparation = () => {
      if (preparation !== null) window.cancelIdleCallback(preparation);
      preparation = null;
    };
    const prepare = () => {
      if (!('requestIdleCallback' in window) || preparation !== null || !dirty || !nearby || document.hidden) return;
      preparation = window.requestIdleCallback(() => {
        preparation = null;
        if (dirty && nearby && !document.hidden) reset();
      });
    };
    const proximityObserver = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      if (nearby) prepare(); else cancelPreparation();
    }, { rootMargin: '500px' });
    const resize = () => {
      if (canvas.width === Math.round(canvas.clientWidth) &&
        canvas.height === Math.round(canvas.clientHeight)) return;
      dirty = true;
      prepare();
      sync();
    };
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(container);
    proximityObserver.observe(container);
    resizeObserver.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    sync();

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      proximityObserver.disconnect();
      cancelPreparation();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
      sprites.clear();
      lines = [];
      atlas = null;
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.animationContainer}>
      <img className={styles.image} src={aboutPhoto} alt="Myphoto" loading="lazy" decoding="async" />
      <canvas ref={canvasRef} id="canvas" data-testid="about-animation" className={styles.animationCanvas} aria-hidden="true" />
    </div>
  );
};

export default Animation;
