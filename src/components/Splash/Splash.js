import styles from './Splash.module.scss';
import Achivments from '../Achivments/Achivments';
import splashPhoto from '../../assets/HomePhotos/heroPortraitExact.png';
import angularIcon from '../../assets/ProjectsPhotos/angularIcon.png';
import angularMaterialIcon from '../../assets/ProjectsPhotos/angularMaterialIcon.png';
import cssIcon from '../../assets/ProjectsPhotos/cssIcon.png';
import firebaseIcon from '../../assets/ProjectsPhotos/firebaseIcon.png';
import gitIcon from '../../assets/ProjectsPhotos/gitIcon.png';
import htmlIcon from '../../assets/ProjectsPhotos/htmlIcon.png';
import javaScriptIcon from '../../assets/ProjectsPhotos/javaScriptIcon.png';
import materialUiIcon from '../../assets/ProjectsPhotos/materialUi.png';
import ngrxIcon from '../../assets/ProjectsPhotos/ngrxIcon.png';
import npmIcon from '../../assets/ProjectsPhotos/npmIcon.png';
import reactIcon from '../../assets/ProjectsPhotos/reactIcon.png';
import reduxIcon from '../../assets/ProjectsPhotos/reduxIcon.png';
import rxjsIcon from '../../assets/ProjectsPhotos/rxjsIcon.png';
import sassIcon from '../../assets/ProjectsPhotos/sassIcon.png';
import typeScriptIcon from '../../assets/ProjectsPhotos/typeScriptIcon.png';
import webpackIcon from '../../assets/ProjectsPhotos/webpackIcon.png';
import javaIcon from '../../assets/TechIcons/java.png';
import springIcon from '../../assets/TechIcons/spring.png';
import postgresqlIcon from '../../assets/TechIcons/postgresql.png';
import dockerIcon from '../../assets/TechIcons/docker.png';
import kubernetesIcon from '../../assets/TechIcons/kubernetes.png';
import Navigation from '../Navigation/Navigation';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBootstrap, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

const VscodeIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path
      fill="#22a8f2"
      d="M72 6 31 42 12 27 3 36l22 18L3 73l10 10 19-16 40 27 25-11V17L72 6Zm2 24v43L43 51l31-21Z"
    />
    <path fill="#0877bd" d="M74 30 43 51l31 22V30Zm0 0 12-8v57l-12-6V30Z" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path
      fill="#38bdf8"
      d="M49 25c-13 0-21 7-25 21 6-7 13-10 20-8 4 1 7 4 11 7 6 5 13 11 27 11 13 0 21-7 25-21-6 7-13 10-20 8-4-1-7-4-11-7-6-5-13-11-27-11ZM24 50C11 50 3 57-1 71c6-7 13-10 20-8 4 1 7 4 11 7 6 5 13 11 27 11 13 0 21-7 25-21-6 7-13 10-20 8-4-1-7-4-11-7-6-5-13-11-27-11Z"
    />
  </svg>
);

const PlaywrightIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path
      fill="#2ead66"
      d="M12 21c16 5 31 4 44-2l5 45c-4 18-15 29-31 30C16 86 9 71 10 55l2-34Z"
    />
    <path
      fill="#d64b78"
      d="M43 13c16 7 31 8 46 4l-4 40C79 73 68 82 53 83 41 73 36 60 37 45l6-32Z"
    />
    <path fill="#fff" d="M52 35c5-5 10-5 15 0-5 4-10 4-15 0Zm8 28c8 1 14-2 19-9-2 12-8 18-18 18-8-1-14-6-17-15 5 4 10 6 16 6Z" />
    <circle cx="28" cy="45" r="4" fill="#fff" />
  </svg>
);

const KafkaIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="none" stroke="#f5f7ff" strokeWidth="6">
      <path d="M50 20v22M28 68l18-12M72 68 54 56" />
      <circle cx="50" cy="49" r="12" />
      <circle cx="50" cy="13" r="8" />
      <circle cx="21" cy="73" r="8" />
      <circle cx="79" cy="73" r="8" />
    </g>
  </svg>
);

const HibernateIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path fill="#bcae79" d="m19 12 20 12v52L19 88 5 79V21l14-9Zm62 0 14 9v58l-14 9-20-12V24l20-12Z" />
    <path fill="#59666c" d="M35 24h31l-8 14H35V24Zm7 38h23v14H34l8-14Z" />
  </svg>
);

const TerraformIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path fill="#7b42bc" d="m10 18 25 14v28L10 46V18Zm29 16 25 14v28L39 62V34Zm29-16 22 13v26L68 44V18Zm0 31 22 13v26L68 75V49Z" />
  </svg>
);

const NginxIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path fill="#15a34a" d="M50 4 90 27v46L50 96 10 73V27L50 4Z" />
    <path fill="#fff" d="M29 72V28h9l24 28V28h10v44h-9L39 44v28H29Z" />
  </svg>
);

const RedisIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path fill="#a41e22" d="m50 8 43 19-43 18L7 27 50 8Zm0 28 43 18-43 19L7 54l43-18Zm0 27 43 15-43 17L7 78l43-15Z" />
    <path fill="#ef3e36" d="m50 8 43 19-43 18L7 27 50 8Z" />
    <path fill="#fff" d="m50 17 10 5-10 5-10-5 10-5Zm-22 8 8 4-8 4-8-4 8-4Zm44 0 8 4-8 4-8-4 8-4Z" />
  </svg>
);

const MavenIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path fill="none" stroke="#e34f79" strokeWidth="10" strokeLinecap="round" d="M9 76c8-43 20-60 35-50 8 6 8 33 16 37 8 4 16-13 30-49" />
    <path fill="none" stroke="#f4a340" strokeWidth="6" strokeLinecap="round" d="M13 75c13-27 24-36 35-28 9 7 10 22 19 21 8-1 14-13 22-33" />
  </svg>
);

const particleSpawns = [
  [0.07, 0.09],
  [0.18, 0.06],
  [0.29, 0.11],
  [0.4, 0.06],
  [0.51, 0.1],
  [0.62, 0.06],
  [0.73, 0.11],
  [0.84, 0.06],
  [0.94, 0.11],
  [0.07, 0.27],
  [0.12, 0.4],
  [0.07, 0.53],
  [0.12, 0.66],
  [0.07, 0.79],
  [0.12, 0.91],
  [0.93, 0.27],
  [0.88, 0.4],
  [0.93, 0.53],
  [0.88, 0.66],
  [0.93, 0.79],
  [0.88, 0.91],
  [0.22, 0.9],
  [0.36, 0.94],
  [0.66, 0.94],
  [0.79, 0.9],
  [0.5, 0.04],
  [0.25, 0.16],
  [0.75, 0.16],
  [0.25, 0.85],
  [0.5, 0.92],
  [0.75, 0.85],
  [0.5, 0.16],
];

const technologyIcons = [
  { name: 'Sass', src: sassIcon, color: '#f06ca9', size: 50 },
  { name: 'HTML5', src: htmlIcon, color: '#ff6a2f', size: 48 },
  { name: 'Firebase', src: firebaseIcon, color: '#ffbd32', size: 45 },
  { name: 'CSS3', src: cssIcon, color: '#4c8cff', size: 46 },
  { name: 'Bootstrap', brandIcon: faBootstrap, color: '#8c43ff', size: 46 },
  { name: 'RxJS', src: rxjsIcon, color: '#ed1493', size: 49 },
  { name: 'TypeScript', src: typeScriptIcon, color: '#4c9cff', size: 49 },
  { name: 'Angular', src: angularIcon, color: '#f628a8', size: 51 },
  { name: 'NgRx', src: ngrxIcon, color: '#9a28c8', size: 49 },
  { name: 'VS Code', component: VscodeIcon, color: '#21a5ef', size: 51 },
  { name: 'Material UI', src: materialUiIcon, color: '#2196f3', size: 50 },
  { name: 'React', src: reactIcon, color: '#61dafb', size: 64 },
  { name: 'Webpack', src: webpackIcon, color: '#72c7ff', size: 49 },
  { name: 'Redux', src: reduxIcon, color: '#9a72ff', size: 49 },
  { name: 'JavaScript', src: javaScriptIcon, color: '#ffe43b', size: 48 },
  {
    name: 'Angular Material',
    src: angularMaterialIcon,
    color: '#ff9d28',
    size: 48,
  },
  { name: 'npm', src: npmIcon, color: '#ff4d4d', size: 48 },
  { name: 'Git', src: gitIcon, color: '#ff6544', size: 46 },
  { name: 'Tailwind CSS', component: TailwindIcon, color: '#38bdf8', size: 48 },
  { name: 'GitHub', brandIcon: faGithub, color: '#ffffff', size: 47 },
  { name: 'Java', src: javaIcon, color: '#ff6b2d', size: 53 },
  { name: 'Spring', src: springIcon, color: '#78dc42', size: 51 },
  { name: 'PostgreSQL', src: postgresqlIcon, color: '#58a9f8', size: 53 },
  { name: 'Docker', src: dockerIcon, color: '#24c7ff', size: 55 },
  { name: 'Kubernetes', src: kubernetesIcon, color: '#5d89ff', size: 53 },
  { name: 'Playwright', component: PlaywrightIcon, color: '#2ead66', size: 51 },
  { name: 'Apache Kafka', component: KafkaIcon, color: '#f5f7ff', size: 49 },
  { name: 'Hibernate', component: HibernateIcon, color: '#bcae79', size: 49 },
  { name: 'Terraform', component: TerraformIcon, color: '#7b42bc', size: 50 },
  { name: 'Nginx', component: NginxIcon, color: '#15a34a', size: 49 },
  { name: 'Redis', component: RedisIcon, color: '#ef3e36', size: 51 },
  { name: 'Maven', component: MavenIcon, color: '#e34f79', size: 50 },
];

const Splash = () => {
  const { t } = useTranslation();
  const imageStageRef = useRef(null);
  const personPhotoRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const stage = imageStageRef.current;
    const portrait = personPhotoRef.current;
    if (!stage || !portrait) return undefined;

    const iconNodes = Array.from(
      stage.querySelectorAll('[data-magnetic-icon]')
    );
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const alphaMask = { data: null, width: 0, height: 0 };
    let particles = [];
    let stageWidth = 0;
    let stageHeight = 0;
    let frameId;
    let previousTime = 0;

    const preparePortraitMask = () => {
      if (!portrait.complete || !portrait.naturalWidth) return;

      const canvas = document.createElement('canvas');
      canvas.width = portrait.naturalWidth;
      canvas.height = portrait.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(portrait, 0, 0);
      alphaMask.data = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
      alphaMask.width = canvas.width;
      alphaMask.height = canvas.height;
    };

    const setStageSize = () => {
      const nextWidth = stage.clientWidth;
      const nextHeight = stage.clientHeight;
      const scale = Math.min(
        1.08,
        Math.max(0.55, (nextWidth / 720) * 1.05)
      );

      if (!particles.length) {
        particles = technologyIcons.map((icon, index) => {
          const [spawnX, spawnY] = particleSpawns[index];
          const angle = 0.72 + index * 2.39996;
          const speed = 33 + (index % 6) * 3.8;
          const radius = (icon.size * scale) / 2;

          return {
            x: spawnX * nextWidth,
            y: spawnY * nextHeight,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius,
            rotation: (index * 47) % 360,
            spin: (index % 2 ? -1 : 1) * (10 + (index % 5) * 4),
            seed: index * 1.731 + 0.4,
            cursorHitAt: -1000,
          };
        });
      } else if (stageWidth && stageHeight) {
        particles.forEach((particle, index) => {
          particle.x = (particle.x / stageWidth) * nextWidth;
          particle.y = (particle.y / stageHeight) * nextHeight;
          particle.radius = (technologyIcons[index].size * scale) / 2;
        });
      }

      stageWidth = nextWidth;
      stageHeight = nextHeight;
    };

    const samplePortraitAlpha = (x, y, metrics) => {
      if (!alphaMask.data || !metrics.width || !metrics.height) return false;

      const normalizedX = (x - metrics.left) / metrics.width;
      const normalizedY = (y - metrics.top) / metrics.height;
      if (
        normalizedX < 0 ||
        normalizedX > 1 ||
        normalizedY < 0 ||
        normalizedY > 1
      ) {
        return false;
      }

      const imageX = Math.min(
        alphaMask.width - 1,
        Math.max(0, Math.round(normalizedX * (alphaMask.width - 1)))
      );
      const imageY = Math.min(
        alphaMask.height - 1,
        Math.max(0, Math.round(normalizedY * (alphaMask.height - 1)))
      );

      return alphaMask.data[(imageY * alphaMask.width + imageX) * 4 + 3] > 38;
    };

    const touchesPortrait = (particle, metrics) => {
      const diagonal = particle.radius * 0.72;
      const samples = [
        [0, 0],
        [particle.radius, 0],
        [-particle.radius, 0],
        [0, particle.radius],
        [0, -particle.radius],
        [diagonal, diagonal],
        [-diagonal, diagonal],
        [diagonal, -diagonal],
        [-diagonal, -diagonal],
      ];

      return samples.some(([offsetX, offsetY]) =>
        samplePortraitAlpha(
          particle.x + offsetX,
          particle.y + offsetY,
          metrics
        )
      );
    };

    const resolveParticleCollisions = () => {
      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        for (
          let secondIndex = firstIndex + 1;
          secondIndex < particles.length;
          secondIndex += 1
        ) {
          const first = particles[firstIndex];
          const second = particles[secondIndex];
          const deltaX = second.x - first.x;
          const deltaY = second.y - first.y;
          const distance = Math.max(Math.hypot(deltaX, deltaY), 0.001);
          const minimumDistance = first.radius + second.radius + 4;

          if (distance >= minimumDistance) continue;

          const normalX = deltaX / distance;
          const normalY = deltaY / distance;
          const overlap = minimumDistance - distance;
          first.x -= normalX * overlap * 0.5;
          first.y -= normalY * overlap * 0.5;
          second.x += normalX * overlap * 0.5;
          second.y += normalY * overlap * 0.5;

          const relativeVelocity =
            (second.vx - first.vx) * normalX +
            (second.vy - first.vy) * normalY;

          if (relativeVelocity < 0) {
            const impulse = -relativeVelocity * 0.96;
            first.vx -= impulse * normalX;
            first.vy -= impulse * normalY;
            second.vx += impulse * normalX;
            second.vy += impulse * normalY;
            first.spin *= -0.9;
            second.spin *= -0.9;
          }
        }
      }
    };

    const animateField = (time) => {
      const deltaTime = previousTime
        ? Math.min((time - previousTime) / 1000, 0.034)
        : 0;
      previousTime = time;

      const stageRect = stage.getBoundingClientRect();
      const portraitRect = portrait.getBoundingClientRect();
      const portraitMetrics = {
        left: portraitRect.left - stageRect.left,
        top: portraitRect.top - stageRect.top,
        width: portraitRect.width,
        height: portraitRect.height,
        centerX: portraitRect.left - stageRect.left + portraitRect.width / 2,
        centerY: portraitRect.top - stageRect.top + portraitRect.height / 2,
      };

      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.vx += Math.sin(time * 0.00071 + particle.seed) * 7 * deltaTime;
          particle.vy +=
            Math.cos(time * 0.00093 + particle.seed * 1.4) * 7 * deltaTime;

          if (pointerRef.current.active) {
            const pointer = pointerRef.current;
            const pointerDeltaX = particle.x - pointer.x;
            const pointerDeltaY = particle.y - pointer.y;
            const pointerDistance = Math.max(
              Math.hypot(pointerDeltaX, pointerDeltaY),
              1
            );
            const cursorRadius = stageWidth < 576 ? 26 : 36;
            const collisionDistance = particle.radius + cursorRadius;

            if (pointerDistance < collisionDistance) {
              const normalX = pointerDeltaX / pointerDistance;
              const normalY = pointerDeltaY / pointerDistance;
              const overlap = collisionDistance - pointerDistance;
              particle.x += normalX * (overlap + 3);
              particle.y += normalY * (overlap + 3);

              if (time - particle.cursorHitAt > 115) {
                const velocityAlongNormal =
                  particle.vx * normalX + particle.vy * normalY;

                if (velocityAlongNormal < 0) {
                  particle.vx -= 2.15 * velocityAlongNormal * normalX;
                  particle.vy -= 2.15 * velocityAlongNormal * normalY;
                }

                const impact = 185 + (index % 5) * 13;
                particle.vx += normalX * impact;
                particle.vy += normalY * impact;
                particle.spin *= -1.35;
                particle.cursorHitAt = time;
              }
            }
          }

          const speed = Math.hypot(particle.vx, particle.vy);
          const maximumSpeed = pointerRef.current.active ? 170 : 78;
          const minimumSpeed = 28;
          if (speed > maximumSpeed) {
            particle.vx = (particle.vx / speed) * maximumSpeed;
            particle.vy = (particle.vy / speed) * maximumSpeed;
          } else if (speed < minimumSpeed && speed > 0) {
            particle.vx = (particle.vx / speed) * minimumSpeed;
            particle.vy = (particle.vy / speed) * minimumSpeed;
          }

          particle.x += particle.vx * deltaTime;
          particle.y += particle.vy * deltaTime;
          particle.rotation += particle.spin * deltaTime;
        }

        const edge = 7;
        if (particle.x - particle.radius < edge) {
          particle.x = particle.radius + edge;
          particle.vx = Math.abs(particle.vx);
          particle.spin *= -0.82;
        } else if (particle.x + particle.radius > stageWidth - edge) {
          particle.x = stageWidth - particle.radius - edge;
          particle.vx = -Math.abs(particle.vx);
          particle.spin *= -0.82;
        }

        if (particle.y - particle.radius < edge) {
          particle.y = particle.radius + edge;
          particle.vy = Math.abs(particle.vy);
          particle.spin *= -0.82;
        } else if (particle.y + particle.radius > stageHeight - edge) {
          particle.y = stageHeight - particle.radius - edge;
          particle.vy = -Math.abs(particle.vy);
          particle.spin *= -0.82;
        }

        if (!reducedMotion && touchesPortrait(particle, portraitMetrics)) {
          const awayX = particle.x - portraitMetrics.centerX;
          const awayY = particle.y - portraitMetrics.centerY;
          const awayLength = Math.max(Math.hypot(awayX, awayY), 1);
          const normalX = awayX / awayLength;
          const normalY = awayY / awayLength;
          const velocityAlongNormal =
            particle.vx * normalX + particle.vy * normalY;

          for (
            let pushAttempt = 0;
            pushAttempt < 10 && touchesPortrait(particle, portraitMetrics);
            pushAttempt += 1
          ) {
            particle.x += normalX * 3;
            particle.y += normalY * 3;
          }

          if (velocityAlongNormal < 0) {
            particle.vx -= 2.05 * velocityAlongNormal * normalX;
            particle.vy -= 2.05 * velocityAlongNormal * normalY;
          } else {
            particle.vx += normalX * 18;
            particle.vy += normalY * 18;
          }
          particle.spin *= -1.08;
        }

        const node = iconNodes[index];
        const diameter = particle.radius * 2;
        node.style.width = `${diameter}px`;
        node.style.height = `${diameter}px`;
        node.style.transform = `translate3d(${particle.x - particle.radius}px, ${
          particle.y - particle.radius
        }px, 0) rotate(${particle.rotation}deg)`;
      });

      if (!reducedMotion) resolveParticleCollisions();

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(animateField);
      }
    };

    setStageSize();
    preparePortraitMask();
    portrait.addEventListener('load', preparePortraitMask);
    window.addEventListener('resize', setStageSize);
    frameId = window.requestAnimationFrame(animateField);

    return () => {
      window.cancelAnimationFrame(frameId);
      portrait.removeEventListener('load', preparePortraitMask);
      window.removeEventListener('resize', setStageSize);
    };
  }, []);

  const handlePointerMove = (event) => {
    const stage = imageStageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    pointerRef.current = { x, y, active: true };
  };

  const resetPointerPosition = () => {
    const stage = imageStageRef.current;
    if (!stage) return;

    pointerRef.current.active = false;
  };

  return (
    <div className={styles.splash}>
      <Navigation />
      <div className={styles.content} data-aos="zoom-out">
        <div
          ref={imageStageRef}
          className={styles.imageStage}
          data-chaos-field
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointerPosition}
        >
          <span className={styles.photoGlow} aria-hidden="true" />
          <span className={styles.magneticMist} aria-hidden="true" />
          <span className={styles.cosmicCloud} aria-hidden="true" />

          {technologyIcons.map((icon, index) => {
            const IconComponent = icon.component;

            return (
              <span
                key={icon.name}
                className={styles.techIcon}
                data-magnetic-icon
                title={icon.name}
                style={{
                  '--tech-color': icon.color,
                  '--particle-delay': `${index * -0.13}s`,
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
              ref={personPhotoRef}
              className={styles.personPhoto}
              alt={t('splash.socha')}
              src={splashPhoto}
            />
          </div>

        </div>
        <div className={styles.description}>
          <p>
            <span>{t('splash.hello.world')}</span>! {t('splash.my.name')}{' '}
          </p>
          <p>{t('splash.socha')}</p>
          <p>{t('splash.frontend.developer')}</p>
          <p>{t('splash.description')}</p>
          <Button href="#contact" className={styles.button}>
            {t('splash.btn.contact')}
          </Button>
        </div>
      </div>
      <Achivments />
    </div>
  );
};

export default Splash;
