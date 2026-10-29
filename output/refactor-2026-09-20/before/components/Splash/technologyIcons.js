import angularIcon from '../../assets/ProjectsPhotos/angularIcon.webp';
import cssIcon from '../../assets/ProjectsPhotos/cssIcon.webp';
import firebaseIcon from '../../assets/ProjectsPhotos/firebaseIcon.webp';
import gitIcon from '../../assets/ProjectsPhotos/gitIcon.webp';
import htmlIcon from '../../assets/ProjectsPhotos/htmlIcon.webp';
import javaScriptIcon from '../../assets/ProjectsPhotos/javaScriptIcon.webp';
import ngrxIcon from '../../assets/ProjectsPhotos/ngrxIcon.webp';
import reactIcon from '../../assets/ProjectsPhotos/reactIcon.webp';
import rxjsIcon from '../../assets/ProjectsPhotos/rxjsIcon.webp';
import sassIcon from '../../assets/ProjectsPhotos/sassIcon.webp';
import typeScriptIcon from '../../assets/ProjectsPhotos/typeScriptIcon.webp';
import webpackIcon from '../../assets/ProjectsPhotos/webpackIcon.webp';
import javaIcon from '../../assets/TechIcons/java.webp';
import springIcon from '../../assets/TechIcons/spring.webp';
import postgresqlIcon from '../../assets/TechIcons/postgresql.webp';
import dockerIcon from '../../assets/TechIcons/docker.webp';
import kubernetesIcon from '../../assets/TechIcons/kubernetes.webp';
import { faBootstrap, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VscodeIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path
      fill="#22a8f2"
      d="M72 6 31 42 12 27 3 36l22 18L3 73l10 10 19-16 40 27 25-11V17L72 6Zm2 24v43L43 51l31-21Z"
    />
    <path fill="#0877bd" d="M74 30 43 51l31 22V30Zm0 0 12-8v57l-12-6V30Z" />
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
    <path fill="#aa211b" d="M8 61 50 43 92 61V74L50 95 8 76ZM8 42 50 24 92 42V55L50 76 8 57ZM8 23 50 5 92 23V36L50 57 8 38Z" />
    <path fill="#ff543b" d="m8 61 42-18 42 18-42 20Zm0-19 42-18 42 18-42 20Zm0-19L50 5l42 18-42 20Z" />
    <path fill="#dc3324" d="M50 43 92 23V36L50 57Zm0 19 42-20V55L50 76Zm0 19 42-20V74L50 95Z" />
    <ellipse cx="34" cy="22" rx="9" ry="4" fill="#fff0d9" />
    <path fill="#fff0d9" d="m60 15 4 4 8 1-6 4 1 5-8-3-7 2 2-5-5-4 8 1Z" />
  </svg>
);

const MavenIcon = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path fill="none" stroke="#e34f79" strokeWidth="10" strokeLinecap="round" d="M9 76c8-43 20-60 35-50 8 6 8 33 16 37 8 4 16-13 30-49" />
    <path fill="none" stroke="#f4a340" strokeWidth="6" strokeLinecap="round" d="M13 75c13-27 24-36 35-28 9 7 10 22 19 21 8-1 14-13 22-33" />
  </svg>
);


export const technologyIcons = [
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
  { name: 'React', src: reactIcon, color: '#61dafb', size: 64 },
  { name: 'Webpack', src: webpackIcon, color: '#72c7ff', size: 49 },
  { name: 'JavaScript', src: javaScriptIcon, color: '#ffe43b', size: 48 },
  { name: 'Git', src: gitIcon, color: '#ff6544', size: 46 },
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


export function TechnologyGlyph({ icon }) {
  const Component = icon.component;
  if (icon.src) return <img src={icon.src} alt="" />;
  if (icon.brandIcon) return <FontAwesomeIcon icon={icon.brandIcon} aria-hidden="true" />;
  return Component ? <Component /> : null;
}
