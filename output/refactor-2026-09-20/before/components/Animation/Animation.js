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
    let visible = false;
    let frame = null;
    let previous = null;
    let dirty = true;
    let virtualWidth = 0;
    let virtualHeight = 0;
    let lines = [];
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
      virtualWidth = window.innerWidth;
      virtualHeight = window.innerHeight;
      canvas.width = Math.max(1, Math.round(canvas.clientWidth));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight));
      const minWidth = virtualWidth < 1200 ? 5 : 10;
      const maxWidth = virtualWidth < 1200 ? 1 : 3;
      sprites.clear();
      // Retain the original density, positions, colours and pulse duration.
      lines = Array.from({ length: Math.ceil(virtualWidth / minWidth) }, () => {
        const width = random(minWidth, maxWidth);
        const hue = random(20, 23) * 10;
        return {
          x: random(0, virtualWidth), width, hue,
          height: random(360, 750),
          ttl: random(200, virtualWidth < 768 ? 20 : 40),
          life: preference.matches ? 50 : 0,
          sprite: getSprite(width, hue),
        };
      });
      dirty = false;
    };

    const draw = (elapsed) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(canvas.width / virtualWidth, canvas.height / virtualHeight);
      for (const line of lines) {
        line.life += elapsed * 60 / 1000;
        if (line.life > line.ttl) {
          line.life %= line.ttl;
          line.x = random(0, virtualWidth);
        }
        const half = line.ttl / 2;
        ctx.globalAlpha = Math.abs(((line.life + half) % line.ttl) - half) / half;
        const scaleY = line.height / 750;
        ctx.drawImage(line.sprite, line.x - line.sprite.width / 2,
          virtualHeight / 2 + 360 - line.height - 40 * scaleY,
          line.sprite.width, 830 * scaleY);
      }
      ctx.restore();
    };

    const loop = (time) => {
      frame = null;
      if (!visible || document.hidden) return;
      if (dirty) reset();
      const elapsed = previous === null ? 1000 / 60 : time - previous;
      if (previous === null || elapsed >= 1000 / 30 - 0.5) {
        draw(Math.min(elapsed, 100));
        previous = time;
      }
      if (!preference.matches) frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previous = null;
      container.dataset.motionPaused = String(!visible || document.hidden || preference.matches);
      if (visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resize = () => { dirty = true; sync(); };
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(container);
    resizeObserver.observe(canvas);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    sync();

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
      sprites.clear();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.animationContainer} data-aos="slide-left">
      <img className={styles.image} src={aboutPhoto} alt="Myphoto" loading="lazy" decoding="async" />
      <canvas ref={canvasRef} id="canvas" data-testid="about-animation" className={styles.animationCanvas} aria-hidden="true" />
    </div>
  );
};

export default Animation;
