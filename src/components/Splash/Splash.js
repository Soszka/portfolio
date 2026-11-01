import { technologyIcons } from './technologyIcons';
import styles from './Splash.module.scss';
import cursorStyles from './MagneticCursor.module.scss';
import Achivments from '../Achivments/Achivments';
import splashPhoto from '../../assets/HomePhotos/heroPortraitExact.webp';
import Navigation from '../Navigation/Navigation';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import usePortalNavigation from '../Skills/usePortalNavigation';
import { warmSkills } from '../Skills/preloadSkills';

const Splash = ({ active = true, orbitHandoff }) => {
  const { state } = useLocation();
  const handoff = useRef(null);
  handoff.current = orbitHandoff || state;
  const { t } = useTranslation();
  const enterPortal = usePortalNavigation();
  const imageStageRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useLayoutEffect(() => {
    const stage = imageStageRef.current;
    if (!stage) return undefined;
    if (!active) {
      stage.dataset.motionPaused = 'true';
      stage.parentElement.dataset.motionPaused = 'true';
      stage.dataset.pointerActive = 'false';
      pointerRef.current.active = false;
      return undefined;
    }

    const iconNodes = Array.from(
      stage.querySelectorAll('[data-magnetic-icon]')
    );
    const cursor = stage.querySelector('[data-field-cursor]');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionPreference.matches;
    const modestDevice = (navigator.hardwareConcurrency || 8) <= 4 ||
      (navigator.deviceMemory || 8) <= 4;
    let particles = [];
    let stageWidth = 0;
    let stageHeight = 0;
    let frameId = null;
    let lastRenderedTime = 0;
    const inherited = handoff.current;
    let motionTime = (inherited?.orbitClock || 0) / .14 + (inherited?.orbitTime === undefined ? 0 :
      Math.max(0, performance.now() - inherited.orbitTime) / 1000);
    let compactMotion = window.innerWidth <= 768;
    let navigationOpen = false;
    let stageVisible = true;
    let visibilityObserver;
    let navigationObserver;
    let resizeObserver;
    const navigation = document.querySelector('nav[data-menu-open]');
    const refreshStageVisibility = () => {
      const stageRect = stage.getBoundingClientRect();
      stageVisible =
        stageRect.bottom > -100 && stageRect.top < window.innerHeight + 100;
    };

    const syncNavigationState = () => {
      navigationOpen = Boolean(
        window.innerWidth <= 1200 && navigation?.dataset.menuOpen === 'true'
      );
      if (!navigationOpen) refreshStageVisibility();
      lastRenderedTime = 0;
      syncAnimation();
    };

    const setStageSize = () => {
      const nextWidth = stage.clientWidth;
      const nextHeight = stage.clientHeight;
      if (!nextWidth || !nextHeight) return;
      compactMotion = window.innerWidth <= 768;
      // Scale with the field, including large monitors; keep the laptop proportions.
      const scale = Math.max(0.54, Math.min(nextWidth / 720, nextHeight / 620) * 1.08);

      if (!particles.length) {
        particles = technologyIcons.map((icon, index) => {
          const lane = index % 3;
          const phase = (Math.floor(index / 3) / 9) * Math.PI * 2 + lane * .23 - Math.PI / 2;
          const angle = phase + motionTime * .14;
          const depth = [0.82, 0.96, 1.12][lane];
          const orbitX = 0.24 + lane * 0.095;
          const orbitY = 0.205 + lane * 0.098;
          const tilt = -0.12;
          const orbitCos = Math.cos(tilt);
          const orbitSin = Math.sin(tilt);
          const radius = (icon.size * scale * depth) / 2;

          return {
            x: nextWidth * (.5 + Math.cos(angle) * orbitX * orbitCos - Math.sin(angle) * orbitY * orbitSin),
            y: nextHeight * (.49 + Math.cos(angle) * orbitX * orbitSin + Math.sin(angle) * orbitY * orbitCos),
            phase,
            offsetX: 0,
            offsetY: 0,
            velocityX: 0,
            velocityY: 0,
            nextBounce: 0,
            orbitX,
            orbitY,
            orbitCos,
            orbitSin,
            lane,
            depth,
            radius,
            rotation: (index % 5 - 2) * 7,
            seed: index * 1.731 + 0.4,
          };
        });
      } else if (stageWidth && stageHeight) {
        particles.forEach((particle, index) => {
          particle.x = (particle.x / stageWidth) * nextWidth;
          particle.y = (particle.y / stageHeight) * nextHeight;
          particle.offsetX *= nextWidth / stageWidth;
          particle.offsetY *= nextHeight / stageHeight;
          particle.velocityX *= nextWidth / stageWidth;
          particle.velocityY *= nextHeight / stageHeight;
          particle.radius = (technologyIcons[index].size * scale * particle.depth) / 2;
        });
      }

      stageWidth = nextWidth;
      stageHeight = nextHeight;

      iconNodes.forEach((node, index) => {
        const diameter = particles[index].radius * 2;
        node.style.width = `${diameter}px`;
        node.style.height = `${diameter}px`;
        node.style.opacity = particles[index].depth < 0.9 ? '0.86' : '1';
      });

    };

    const animateField = (time) => {
      frameId = null;
      if (navigationOpen || !stageVisible || document.hidden) return;

      // Follow the display on desktop. A hard 60 Hz gate discards whole frames
      // at 75/120/144 Hz and produces an uneven cadence even with spare CPU time.
      const minimumFrameTime = compactMotion || modestDevice ? 1000 / 30 : 0;
      if (
        minimumFrameTime &&
        lastRenderedTime &&
        time - lastRenderedTime < minimumFrameTime - 1
      ) {
        frameId = window.requestAnimationFrame(animateField);
        return;
      }

      // Coalesce high-frequency mouse events into one layout read per rendered frame.
      const pointer = pointerRef.current;
      if (pointer.dirty) {
        const rect = stage.getBoundingClientRect();
        pointer.x = (pointer.clientX - rect.left) * stageWidth / (rect.width || stageWidth);
        pointer.y = (pointer.clientY - rect.top) * stageHeight / (rect.height || stageHeight);
        if (cursor) cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
        pointer.dirty = false;
      }
      const deltaTime = lastRenderedTime
        ? Math.min((time - lastRenderedTime) / 1000, 0.05)
        : 0;
      lastRenderedTime = time;
      if (!reducedMotion) motionTime += deltaTime;

      const steps = Math.max(1, Math.ceil(deltaTime / .012));
      const dt = deltaTime / steps;
      const breathing = [0, 1, 2].map(lane => 1 + Math.sin(motionTime * .65 + lane) * .008);

      particles.forEach((particle, index) => {
        // Nine evenly spaced slots per lane share one clock: they cannot bunch up
        // or overtake each other. Cursor offsets never alter the orbital phase.
        const angle = particle.phase + motionTime * .14;
        const { orbitX, orbitY, orbitCos, orbitSin } = particle;
        const breathe = breathing[particle.lane];
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const baseX = stageWidth * (.5 + (cos * orbitX * orbitCos - sin * orbitY * orbitSin) * breathe);
        const baseY = stageHeight * (.49 + (cos * orbitX * orbitSin + sin * orbitY * orbitCos) * breathe);
        if (reducedMotion) {
          particle.offsetX = particle.offsetY = 0;
          particle.velocityX = particle.velocityY = 0;
        } else {
          // Kick the actual icon, then let a damped spring return it to its moving slot.
          // Cooldown prevents repeated impulses from accumulating on every frame.
          if (pointer.active && motionTime >= particle.nextBounce) {
            const dx = baseX + particle.offsetX - pointer.x;
            const dy = baseY + particle.offsetY - pointer.y;
            const distance = Math.hypot(dx, dy);
            const reach = particle.radius + Math.min(stageWidth, stageHeight) * .12;
            if (distance < reach) {
              const nx = distance > .01 ? dx / distance : Math.cos(particle.seed);
              const ny = distance > .01 ? dy / distance : Math.sin(particle.seed);
              const kick = particle.radius * (14 + 14 * (1 - distance / reach));
              const outwardSpeed = particle.velocityX * nx + particle.velocityY * ny;
              const impulse = Math.max(0, kick - outwardSpeed);
              particle.velocityX += nx * impulse;
              particle.velocityY += ny * impulse;
              particle.nextBounce = motionTime + .28;
            }
          }
          // Small integration steps keep the bounce consistent on 30 and 60 Hz devices.
          // Most icons are on their orbit with a resting spring. Only integrate
          // icons that have actually been displaced by the pointer or an edge.
          for (let step = 0; step < steps &&
            (particle.offsetX || particle.offsetY || particle.velocityX || particle.velocityY); step++) {
            particle.velocityX += (-14 * particle.offsetX - 4.8 * particle.velocityX) * dt;
            particle.velocityY += (-14 * particle.offsetY - 4.8 * particle.velocityY) * dt;
            particle.offsetX += particle.velocityX * dt;
            particle.offsetY += particle.velocityY * dt;
          }
          // Keep energetic interactions inside the visible field.
          const x = baseX + particle.offsetX;
          const y = baseY + particle.offsetY;
          if (x < particle.radius || x > stageWidth - particle.radius) {
            particle.offsetX = Math.max(particle.radius, Math.min(stageWidth - particle.radius, x)) - baseX;
            particle.velocityX *= -.55;
          }
          if (y < particle.radius || y > stageHeight - particle.radius) {
            particle.offsetY = Math.max(particle.radius, Math.min(stageHeight - particle.radius, y)) - baseY;
            particle.velocityY *= -.55;
          }
        }
        particle.x = baseX + particle.offsetX;
        particle.y = baseY + particle.offsetY;
        particle.rotation = (index % 3 - 1) * 5 + Math.sin(motionTime * .6 + particle.seed) * 3
          + Math.max(-18, Math.min(18, particle.velocityX / particle.radius));
        const node = iconNodes[index];
        node.style.transform = `translate3d(${particle.x - particle.radius}px, ${particle.y - particle.radius}px, 0) rotate(${particle.rotation}deg)`;
      });

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(animateField);
      }
    };

    function syncAnimation() {
      if (document.hidden || navigationOpen || !stageVisible) {
        pointerRef.current.active = false;
        stage.dataset.pointerActive = 'false';
      }
      const running = stageVisible && !navigationOpen && !document.hidden;
      stage.dataset.motionPaused = String(!running || reducedMotion);
      stage.parentElement.dataset.motionPaused = stage.dataset.motionPaused;
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      frameId = null;
      lastRenderedTime = 0;
      // Reduced motion draws one static frame, then leaves the animation loop stopped.
      if (running) frameId = window.requestAnimationFrame(animateField);
    }

    const handleMotionPreference = () => {
      reducedMotion = motionPreference.matches;
      syncAnimation();
    };

    const handleNavigationToggle = (event) => {
      navigationOpen = Boolean(
        window.innerWidth <= 1200 && event.detail?.open
      );
      if (!navigationOpen) refreshStageVisibility();
      lastRenderedTime = 0;
      syncAnimation();
    };

    syncNavigationState();
    setStageSize();
    window.addEventListener(
      'portfolio:navigation-toggle',
      handleNavigationToggle
    );
    window.addEventListener('resize', setStageSize);
    document.addEventListener('visibilitychange', syncAnimation);
    motionPreference.addEventListener('change', handleMotionPreference);

    resizeObserver = new ResizeObserver(() => {
      setStageSize();
      syncAnimation();
    });
    resizeObserver.observe(stage);

    if (navigation && 'MutationObserver' in window) {
      navigationObserver = new MutationObserver(syncNavigationState);
      navigationObserver.observe(navigation, {
        attributes: true,
        attributeFilter: ['data-menu-open'],
      });
    }

    if ('IntersectionObserver' in window) {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          stageVisible = entry.isIntersecting;
          lastRenderedTime = 0;
          syncAnimation();
        },
        { rootMargin: '0px' }
      );
      visibilityObserver.observe(stage);
    }

    // Paint the inherited orbital phase before the browser presents the new route.
    if (frameId !== null) window.cancelAnimationFrame(frameId);
    animateField(performance.now());
    syncAnimation();

    return () => {
      window.cancelAnimationFrame(frameId);
      visibilityObserver?.disconnect();
      navigationObserver?.disconnect();
      resizeObserver?.disconnect();
      document.removeEventListener('visibilitychange', syncAnimation);
      motionPreference.removeEventListener('change', handleMotionPreference);
      window.removeEventListener(
        'portfolio:navigation-toggle',
        handleNavigationToggle
      );
      window.removeEventListener('resize', setStageSize);
    };
  }, [active]);

  const handlePointerMove = (event) => {
    const stage = imageStageRef.current;
    if (!stage) return;

    if (event.pointerType && event.pointerType !== 'mouse') return;
    const pointer = pointerRef.current;
    pointer.clientX = event.clientX;
    pointer.clientY = event.clientY;
    pointer.active = true;
    if (stage.dataset.pointerActive !== 'true') stage.dataset.pointerActive = 'true';
    pointer.dirty = true;
  };

  const resetPointerPosition = () => {
    const stage = imageStageRef.current;
    if (!stage) return;

    pointerRef.current.active = false;
    stage.dataset.pointerActive = 'false';
  };

  return (
    <div className={styles.splash}>
      <section className={styles.hero} data-portal-return={state?.portalReturn || undefined} aria-label={t('splash.socha')}>
        <Navigation />
        <div className={styles.content}>
          <div
            ref={imageStageRef}
            className={styles.imageStage + ' ' + cursorStyles.field}
            data-chaos-field
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointerPosition}
          >
            <span className={cursorStyles.cursor} data-field-cursor aria-hidden="true"><i /><i /></span>
            <span className={styles.photoGlow} aria-hidden="true" />
            <span className={styles.magneticMist} aria-hidden="true" />
            <svg className={styles.orbits} viewBox="0 0 800 800" aria-hidden="true">
              <defs>
                <radialGradient id="splash-star-light">
                  <stop stopColor="#fff" />
                  <stop offset=".15" stopColor="#b9ecff" />
                  <stop offset=".35" stopColor="#189fff" stopOpacity=".7" />
                  <stop offset="1" stopColor="#008cff" stopOpacity="0" />
                </radialGradient>
                {[0, 1, 2, 3, 4].map(index => (
                  <linearGradient key={index} id={`splash-orbit-light-${index}`} x1="0" y1="0" x2="1" y2="1" gradientTransform={`rotate(${index * 67} .5 .5)`}>
                    <stop stopColor="#1384e9" stopOpacity=".04" />
                    <stop offset=".19" stopColor="#168fe9" stopOpacity=".22" />
                    <stop offset=".38" stopColor="#48baff" stopOpacity=".52" />
                    <stop offset=".54" stopColor="#0874d3" stopOpacity=".05" />
                    <stop offset=".73" stopColor="#0874d3" stopOpacity=".02" />
                    <stop offset=".89" stopColor="#22a2fa" stopOpacity=".32" />
                    <stop offset="1" stopColor="#1384e9" stopOpacity=".08" />
                  </linearGradient>
                ))}
              </defs>
              <g fill="none">
                {[143, 207, 268, 326, 392].map((radius, index) => (
                  <circle key={radius} cx="400" cy="400" r={radius} stroke={`url(#splash-orbit-light-${index})`} strokeWidth={index % 2 ? '.85' : '.65'} />
                ))}
              </g>
              <g fill="#b8edff">
                {[0, 1, 2, 3, 4].map(group => (
                  <g key={group} className={styles.starGroup} style={{ '--twinkle-duration': `${4.8 + group * .7}s`, '--twinkle-delay': `${group * -1.7}s` }}>
                    {Array.from({ length: 13 }, (_, item) => {
                      const index = item * 5 + group;
                      const radius = 95 + Math.sqrt(((index * 37) % 67) / 67) * 295;
                      const x = 400 + radius * Math.cos(index * 2.39996);
                      const y = 400 + radius * Math.sin(index * 2.39996);
                      return <g key={index}>
                        <circle cx={x} cy={y} r={index % 4 === 0 ? 11 : 6} fill="url(#splash-star-light)" />
                        <circle cx={x} cy={y} r={index % 4 === 0 ? 1.5 : .75} />
                      </g>;
                    })}
                  </g>
                ))}
              </g>
            </svg>

            {technologyIcons.map((icon, index) => {
              const IconComponent = icon.component;

              return (
                <span
                  key={icon.name}
                  className={styles.techIcon}
                  data-magnetic-icon
                  data-technology={icon.name}
                  title={icon.name}
                  style={{
                    '--tech-color': icon.color,
                    '--icon-tilt': `${index % 2 ? -10 : 10}deg`,
                  }}
                >
                  <span className={styles.techIconCore}>
                    {icon.src && <img src={icon.src} alt="" />}
                    {icon.brandIcon && (
                      <FontAwesomeIcon icon={icon.brandIcon} aria-hidden="true" />
                    )}
                    {IconComponent && <IconComponent />}
                  </span>
                </span>
              );
            })}

            <div className={styles.image}>
              <span className={styles.portraitHalo} aria-hidden="true" />
              <img
                className={styles.personPhoto}
                alt={t('splash.socha')}
                src={splashPhoto}
                width="861"
                height="1000"
                fetchPriority="high"
                decoding="async"
              />
            </div>

          </div>
          <div className={styles.description}>
            <h1 className={styles.name}>
              {t('splash.socha').split(' ')[0]} <span className={styles.surname}>Socha</span>
              <span className={styles.nameHalo} aria-hidden="true">{t('splash.socha').split(' ')[0]} <span className={styles.surname}>Socha</span></span>
              <span className={styles.nameShine} aria-hidden="true">{t('splash.socha').split(' ')[0]} <span className={styles.surname}>Socha</span></span>
            </h1>
            <p className={styles.role}>{t('splash.frontend.developer')}</p>
            <span className={styles.divider} aria-hidden="true" />
            <p className={styles.summary}>{t('splash.description')}</p>
            <div className={styles.contactRow}><Button component={Link} to="/skills" onPointerEnter={warmSkills} onFocus={warmSkills} onClick={enterPortal} className={styles.button}>
              {t('navigation.link.skills')}
            </Button></div>
          </div>
        </div>
      </section>
      <Achivments />
    </div>
  );
};

export default Splash;
