import {
  faCode,
  faGears,
  faGraduationCap,
  faLaptopFile,
  faScrewdriverWrench,
  faChalkboard,
  faCalendarDays,
  faDiagramProject,
  faEnvelope,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import AdventagesPhoto1 from '../../src/assets/HomePhotos/adventagesPhoto1.png';
import AdventagesPhoto2 from '../../src/assets/HomePhotos/adventagesPhoto2.jpg';
import AdventagesPhoto3 from '../../src/assets/HomePhotos/advenatgesPhoto3.png';
import AdventagesPhoto4 from '../../src/assets/HomePhotos/adventagesPhoto4.jpg';
import AdventagesPhoto5 from '../../src/assets/HomePhotos/adventagesPhoto5.jpg';
import AdventagesPhoto6 from '../../src/assets/HomePhotos/adventagesPhoto6.jpg';
import CoreWebPhoto1 from '../../src/assets/SkillsPhotos/CoreWebPhoto1.png';
import CoreWebPhoto2 from '../../src/assets/SkillsPhotos/CoreWebPhoto2.png';
import CoreWebPhoto3 from '../../src/assets/SkillsPhotos/CoreWebPhoto3.png';
import CoreWebPhoto4 from '../../src/assets/SkillsPhotos/CoreWebPhoto4.png';
import LibPhoto1 from '../../src/assets/SkillsPhotos/LibPhoto1.png';
import LibPhoto2 from '../../src/assets/SkillsPhotos/LibPhoto2.png';
import LibPhoto3 from '../../src/assets/SkillsPhotos/LibPhoto3.png';
import LibPhoto4 from '../../src/assets/SkillsPhotos/LibPhoto4.png';
import ToolsPhoto1 from '../../src/assets/SkillsPhotos/ToolsPhoto1.png';
import ToolsPhoto2 from '../../src/assets/SkillsPhotos/ToolsPhoto2.png';
import ToolsPhoto3 from '../../src/assets/SkillsPhotos/ToolsPhoto3.png';
import {
  faInstagram,
  faLinkedin,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import CaloriesPage from '../assets/ProjectsPhotos/CaloriesCounterPage.png';
import Portfolio from '../assets/ProjectsPhotos/PortfolioPage.png';
import ProgressPage from '../assets/ProjectsPhotos/ProgressCounterPage.png';

import angularIcon from '../assets/ProjectsPhotos/angularIcon.png';
import firebaseIcon from '../assets/ProjectsPhotos/firebaseIcon.png';
import angularMaterialIcon from '../assets/ProjectsPhotos/angularMaterialIcon.png';
import rxjsIcon from '../assets/ProjectsPhotos/rxjsIcon.png';
import sassIcon from '../assets/ProjectsPhotos/sassIcon.png';
import typeScriptIcon from '../assets/ProjectsPhotos/typeScriptIcon.png';
import ngrxIcon from '../assets/ProjectsPhotos/ngrxIcon.png';
import htmlIcon from '../assets/ProjectsPhotos/htmlIcon.png';
import reactIcon from '../assets/ProjectsPhotos/reactIcon.png';
import reduxIcon from '../assets/ProjectsPhotos/reduxIcon.png';
import javascriptIcon from '../assets/ProjectsPhotos/javaScriptIcon.png';
import materialUiIcon from '../assets/ProjectsPhotos/materialUi.png';

const initialState = {
  achivments: [
    {
      id: 1,
      icon: faGraduationCap,
      titleKey: 'achivements.studies.title',
      descriptionKey: 'achivements.studies.description',
    },
    {
      id: 2,
      icon: faDiagramProject,
      titleKey: 'achivements.projects.title',
      descriptionKey: 'achivements.projects.description',
    },
    {
      id: 3,
      icon: faLaptopFile,
      titleKey: 'achivements.courses.title',
      descriptionKey: 'achivements.courses.description',
    },
    {
      id: 4,
      icon: faScrewdriverWrench,
      titleKey: 'achivements.technologies.title',
      descriptionKey: 'achivements.technologies.description',
    },
    {
      id: 5,
      icon: faChalkboard,
      titleKey: 'achivements.internship.title',
      descriptionKey: 'achivements.internship.description',
    },
    {
      id: 6,
      icon: faCalendarDays,
      titleKey: 'achivements.experience.title',
      descriptionKey: 'achivements.experience.description',
    },
  ],

  journeyItems: [
    {
      id: 1,
      image: 'studiesImg',
      key: 'studies',
      aosDelay: '0',
      buttonKey: 'github',
      buttonHref: 'https://github.com/Soszka',
      isExternal: true,
    },
    {
      id: 2,
      image: 'coursesImg',
      key: 'courses',
      aosDelay: '200',
      buttonKey: 'seeSkills',
      buttonHref: '/skills',
      isExternal: false,
    },
    {
      id: 3,
      image: 'projectsImg',
      key: 'projects',
      aosDelay: '400',
      buttonKey: 'seeProjects',
      buttonHref: '/projects',
      isExternal: false,
    },
    {
      id: 4,
      image: 'internshipImg',
      key: 'internship',
      aosDelay: '600',
      buttonKey: 'linkedin',
      buttonHref: 'https://www.linkedin.com',
      isExternal: true,
    },
  ],

  adventages: [
    {
      id: 1,
      image: AdventagesPhoto1,
      key: 'responsiveness',
      aosDelay: '0',
    },
    {
      id: 2,
      image: AdventagesPhoto2,
      key: 'uxUi',
      aosDelay: '250',
    },
    {
      id: 3,
      image: AdventagesPhoto3,
      key: 'libraries',
      aosDelay: '500',
    },
    {
      id: 4,
      image: AdventagesPhoto4,
      key: 'frameworks',
      aosDelay: '0',
    },
    {
      id: 5,
      image: AdventagesPhoto5,
      key: 'optimization',
      aosDelay: '250',
    },
    {
      id: 6,
      image: AdventagesPhoto6,
      key: 'creativity',
      aosDelay: '500',
    },
  ],

  contactItems: [
    {
      id: 1,
      link: 'https://www.instagram.com/yourusername',
      aosDelay: 0,
      icon: faInstagram,
      key: 'instagram',
    },
    {
      id: 2,
      link: 'https://www.linkedin.com/in/yourusername',
      aosDelay: 200,
      icon: faLinkedin,
      key: 'linkedin',
    },
    {
      id: 3,
      link: 'https://www.facebook.com/yourusername',
      aosDelay: 400,
      icon: faFacebook,
      key: 'facebook',
    },
    {
      id: 4,
      link: 'mailto:your.email@example.com',
      aosDelay: 600,
      icon: faEnvelope,
      key: 'email',
    },
  ],

  skills: [
    {
      id: 1,
      nameKey: 'skills.skillsList.0.name',
      icon: faCode,
      descriptionKey: 'skills.skillsList.0.description',
      slides: [
        { url: CoreWebPhoto1, title: 'HTML' },
        { url: CoreWebPhoto2, title: 'CSS & SASS' },
        { url: CoreWebPhoto3, title: 'JavaScript & TypeScript' },
        { url: CoreWebPhoto4, title: 'NPM & Webpack' },
      ],
    },
    {
      id: 2,
      nameKey: 'skills.skillsList.1.name',
      icon: faLayerGroup,
      descriptionKey: 'skills.skillsList.1.description',
      slides: [
        { url: LibPhoto2, title: 'Angular, RxJs & NgRx' },
        { url: LibPhoto1, title: 'React & Redux' },
        { url: LibPhoto3, title: 'Material ( UI & Angular )' },
        { url: LibPhoto4, title: 'Bootsrtap & Tailwind' },
      ],
    },
    {
      id: 3,
      nameKey: 'skills.skillsList.2.name',
      icon: faGears,
      descriptionKey: 'skills.skillsList.2.description',
      slides: [
        { url: ToolsPhoto2, title: 'Git' },
        { url: ToolsPhoto1, title: 'Visual Studio Code' },
        { url: ToolsPhoto3, title: 'Github & Bitbucket' },
      ],
    },
  ],

  projects: [
    {
      id: 1,
      image: CaloriesPage,
      titleKey: 'projects.list.0.title',
      code: 'angular',
      page: 'https://licznikkalorii.vercel.app/',
      icons: [
        typeScriptIcon,
        rxjsIcon,
        firebaseIcon,
        sassIcon,
        angularMaterialIcon,
        angularIcon,
      ],
      descriptionKey: 'projects.list.0.description',
    },
    {
      id: 2,
      image: ProgressPage,
      titleKey: 'projects.list.1.title',
      code: 'angular',
      page: 'https://licznikprogresu.vercel.app/',
      icons: [
        angularIcon,
        ngrxIcon,
        firebaseIcon,
        rxjsIcon,
        sassIcon,
        angularMaterialIcon,
      ],
      descriptionKey: 'projects.list.1.description',
    },
    {
      id: 3,
      image: Portfolio,
      titleKey: 'projects.list.2.title',
      code: 'react',
      page: 'https://bartlomiejsocha.pl/',
      icons: [
        reactIcon,
        reduxIcon,
        htmlIcon,
        materialUiIcon,
        javascriptIcon,
        sassIcon,
      ],
      descriptionKey: 'projects.list.2.description',
    },
  ],
};

export default initialState;
