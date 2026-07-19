import { useEffect, useRef } from 'react';
import styles from './CursorEffect.module.scss';

const CursorEffect = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!finePointer || reduceMotion) return undefined;

    let frameId;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    const trail = Array.from({ length: 4 }, () => ({
      x: targetX,
      y: targetY,
    }));

    const render = () => {
      ringX += (targetX - ringX) * 0.17;
      ringY += (targetY - ringY) * 0.17;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      trail.forEach((point, index) => {
        const leader = index === 0 ? { x: ringX, y: ringY } : trail[index - 1];
        point.x += (leader.x - point.x) * 0.32;
        point.y += (leader.y - point.y) * 0.32;
        const element = trailRefs.current[index];
        if (element) {
          element.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
        }
      });

      frameId = requestAnimationFrame(render);
    };

    const showCursor = () => {
      ringRef.current?.classList.add(styles.visible);
      dotRef.current?.classList.add(styles.visible);
      trailRefs.current.forEach((element) =>
        element?.classList.add(styles.visible)
      );
    };

    const updateCursorMode = (source) => {
      const chaosField = source?.closest?.('[data-chaos-field]');
      const target = source?.closest?.(
        'a, button, input, label, [role="button"]'
      );
      const isInChaosField = Boolean(chaosField);
      const isInteractive = Boolean(target) && !isInChaosField;
      ringRef.current?.classList.toggle(styles.interactive, isInteractive);
      ringRef.current?.classList.toggle(styles.chaosField, isInChaosField);
      dotRef.current?.classList.toggle(styles.chaosField, isInChaosField);
      trailRefs.current.forEach((element) =>
        element?.classList.toggle(styles.chaosField, isInChaosField)
      );

      if (labelRef.current) {
        if (isInChaosField) {
          labelRef.current.textContent = '';
        } else {
          labelRef.current.textContent = target?.tagName === 'A' ? 'GO' : 'CLICK';
        }
      }
    };

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      updateCursorMode(document.elementFromPoint(targetX, targetY));
      showCursor();
    };

    const handlePointerOver = (event) => {
      updateCursorMode(event.target);
    };

    const handlePointerDown = () => {
      ringRef.current?.classList.add(styles.pressed);
    };

    const handlePointerUp = () => {
      ringRef.current?.classList.remove(styles.pressed);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, {
      passive: true,
    });
    document.addEventListener('pointerdown', handlePointerDown, {
      passive: true,
    });
    document.addEventListener('pointerup', handlePointerUp, { passive: true });
    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <span
          key={index}
          ref={(element) => {
            trailRefs.current[index] = element;
          }}
          className={styles.trail}
          style={{ '--trail-index': index }}
          aria-hidden="true"
        />
      ))}
      <span ref={ringRef} className={styles.ring} aria-hidden="true">
        <span className={styles.orbit} />
        <span ref={labelRef} className={styles.label} />
      </span>
      <span ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
};

export default CursorEffect;
