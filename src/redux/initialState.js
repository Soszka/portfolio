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

  projects: [
    {
      id: 1,
      name: 'JavaScript Blog',
      code: 'javascript',
      created: 'bootcamp',
      responsivness: 'no',
      cardFrontStyle: 'blogPage',
      cardBackStyle: 'blogCode',
      tools: 'Javascript, HTML, CSS',
      pageLink: 'https://soszka.github.io/Javascript-blog',
      githubLink: 'https://github.com/Soszka/Javascript-blog',
    },
    {
      id: 2,
      name: 'City Layout',
      code: 'javascript',
      created: 'by-me',
      responsivness: 'yes',
      cardFrontStyle: 'cityPage',
      cardBackStyle: 'cityCode',
      tools: 'Javascript, HTML, SCSS',
      pageLink: 'https://soszka.github.io/SCSS-cityLayout/',
      githubLink: 'https://github.com/Soszka/SCSS-cityLayout',
    },
    {
      id: 3,
      name: 'Zamorski Finanse',
      code: 'angular',
      created: 'by-me',
      responsivness: 'yes',
      cardFrontStyle: 'zamorskiFinansePage',
      cardBackStyle: 'zamorskiFinanseCode',
      tools: 'Angular, NgRx, SCSS',
      pageLink: 'https://zamorskifinanse.vercel.app',
      githubLink: 'https://github.com/Soszka/Angular-zamorskiFinanse',
    },
    {
      id: 4,
      name: 'Receipe Book',
      code: 'angular',
      created: 'course',
      responsivness: 'yes',
      cardFrontStyle: 'receipeBookPage',
      cardBackStyle: 'receipeBookCode',
      tools: 'Angular, Typescript, CSS',
      pageLink: 'https://receipebookapp.vercel.app/recipes',
      githubLink: 'https://github.com/Soszka/Angular-receipeBookApp',
    },
    {
      id: 5,
      name: 'Portfolio',
      code: 'react',
      created: 'by-me',
      responsivness: 'yes',
      cardFrontStyle: 'portfolioPage',
      cardBackStyle: 'portfolioCode',
      tools: 'React, Redux, SCSS',
      pageLink: 'https://bartlomiejsocha.vercel.app',
      githubLink: 'https://github.com/Soszka/portfolio',
    },
    {
      id: 6,
      name: 'To-Do List',
      code: 'react',
      created: 'bootcamp',
      responsivness: 'no',
      cardFrontStyle: 'ToDoPage',
      cardBackStyle: 'ToDoCode',
      tools: 'React, Redux, SCSS',
      pageLink: 'https://react-app-soszka.vercel.app',
      githubLink: 'https://github.com/Soszka/React-app',
    },
    {
      id: 7,
      name: 'Drag&Drop Project',
      code: 'javascript',
      created: 'course',
      responsivness: 'yes',
      cardFrontStyle: 'dragDropPage',
      cardBackStyle: 'dragDropCode',
      tools: 'Typescript, HTML, CSS',
      pageLink: 'https://soszka.github.io/Typescript-dragAndDropProject/',
      githubLink: 'https://github.com/Soszka/Typescript-dragAndDropProject',
    },
    {
      id: 8,
      name: 'Pizzeria',
      code: 'javascript',
      created: 'bootcamp',
      responsivness: 'no',
      cardFrontStyle: 'pizzeriaPage',
      cardBackStyle: 'pizzeriaCode',
      tools: 'Javascript, HTML, SCSS',
      pageLink: 'https://project-pizzeria.soszka1.repl.co/',
      githubLink: 'https://github.com/Soszka/Javascript-pizzeriaApp',
    },
    {
      id: 9,
      name: 'Fitness App',
      code: 'angular',
      created: 'course',
      responsivness: 'yes',
      cardFrontStyle: 'fitnessAppPage',
      cardBackStyle: 'fitnessAppCode',
      tools: 'Angular, Typescript, CSS',
      pageLink: 'https://angular-fitness-app.vercel.app/',
      githubLink: 'https://github.com/Soszka/Angular-fitnessApp',
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
};

export default initialState;
