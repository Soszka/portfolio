import {  faCode, faGears, faGraduationCap, faLaptopFile, faScrewdriverWrench, faChalkboard, faCalendarDays, faDiagramProject } from '@fortawesome/free-solid-svg-icons';
import JourneyPhoto1 from '../../src/assets/HomePhotos/JourneyPhoto1.jpg';
import JourneyPhoto2 from '../../src/assets/HomePhotos/JourneyPhoto2.jpg';
import JourneyPhoto3 from '../../src/assets/HomePhotos/JourneyPhoto3.jpg';
import JourneyPhoto4 from '../../src/assets/HomePhotos/JourneyPhoto4.jpg';
import AdventagesPhoto1 from '../../src/assets/HomePhotos/adventagesPhoto1.png';
import AdventagesPhoto2 from '../../src/assets/HomePhotos/adventagesPhoto2.jpg';
import AdventagesPhoto3 from '../../src/assets/HomePhotos/advenatgesPhoto3.png'
import AdventagesPhoto4 from '../../src/assets/HomePhotos/advenatgesPhoto4.png';
import AdventagesPhoto5 from '../../src/assets/HomePhotos/adventagesPhoto5.jpg';
import AdventagesPhoto6 from '../../src/assets/HomePhotos/adventagesPhoto6.jpg';
import HardSkillsPhoto1 from '../../src/assets/SkillsPhotos/hardSkillsPhoto1.png';
import HardSkillsPhoto2 from '../../src/assets/SkillsPhotos/hardSkillsPhoto2.png';
import HardSkillsPhoto3 from '../../src/assets/SkillsPhotos/hardSkillsPhoto3.png';
import HardSkillsPhoto4 from '../../src/assets/SkillsPhotos/hardSkillsPhoto4.png';
import HardSkillsPhoto5 from '../../src/assets/SkillsPhotos/hardSkillsPhoto5.png';
import HardSkillsPhoto6 from '../../src/assets/SkillsPhotos/hardSkillsPhoto6.png';
import HardSkillsPhoto7 from '../../src/assets/SkillsPhotos/hardSkillsPhoto7.png';
import HardSkillsPhoto8 from '../../src/assets/SkillsPhotos/hardSkillsPhoto8.png';
import SoftSkillsPhoto1 from '../../src/assets/SkillsPhotos/softSkillsPhoto1.jpg';
import SoftSkillsPhoto2 from '../../src/assets/SkillsPhotos/softSkillsPhoto2.jpg';
import SoftSkillsPhoto3 from '../../src/assets/SkillsPhotos/softSkillsPhoto3.jpg';
import SoftSkillsPhoto4 from '../../src/assets/SkillsPhotos/softSkillsPhoto4.jpg';
import SoftSkillsPhoto5 from '../../src/assets/SkillsPhotos/softSkillsPhoto5.jpg';
import EducationPhoto1 from  '../../src/assets/SkillsPhotos/educationPhoto1.jpg';
import EducationPhoto2 from  '../../src/assets/SkillsPhotos/educationPhoto2.jpg';



const initialState = {

  achivments: [
    {
      id: 1,
      icon: faGraduationCap,
      number: 'Two',
      description: 'Completed fields of study where passion for front end development was born'
    },
    {
      id: 2,
      icon: faDiagramProject,
      number: 'Twelve',
      description: 'Realized projects, ranging from small websites to more extensive applications.'
    },
    {
      id: 3,
      icon: faLaptopFile,
      number: 'Seven',
      description: 'Finished online courses that deepened my knowledge more and more'
    },
    {
      id: 4,
      icon: faScrewdriverWrench,
      number: 'Nineteen',
      description: 'Learned technologies and tools that I have met and implemented in projects'
    },
    {
      id: 5,
      icon: faChalkboard,
      number: 'One',
      description: 'Completed bootcamp that helped me grow more into web development'
    },
    {
      id: 6,
      icon: faCalendarDays,
      number: 'Ten',
      description: 'Years since I first encountered code and web development'
    }
  ],

  journeyItems: [
    {
      id: 1,
      image: JourneyPhoto1,
      title: 'Studies',
      description: 'Throughout my academic journey in the IT department, I had to create my first own website',
      aosDelay: '0'
    },
    {
      id: 2,
      image: JourneyPhoto2,
      title: 'Bootcamp',
      description: 'While attending the bootcamp program, I had the opportunity to create complex applications',
      aosDelay: '250'
    },
    {
      id: 3,
      image: JourneyPhoto3,
      title: 'Courses',
      description: 'The courses helped me expand my knowledge by learning new technologies and languages',
      aosDelay: '500'
    },
    {
      id: 4,
      image: JourneyPhoto4,
      title: 'Job',
      description: 'Currently, I am looking for a job where I want to take my first steps in Front End Development',
      aosDelay: '750'
    }
  ],

  adventages: [
    {
      id: 1,
      image: AdventagesPhoto1,
      title: 'Responsivness',
      description: 'Pages that adapt perfectly to different devices and screen sizes',
      aosDelay: '0'
    },
    {
      id: 2,
      image: AdventagesPhoto2,
      title: 'UX/UI',
      description: 'Design with an emphasis on the user, ensuring intuitive and aesthetic user interfaces',
      aosDelay: '250'
    },
    {
      id: 3,
      image: AdventagesPhoto3,
      title: 'Libraries',
      description: 'Effective use of popular libraries for optimized project work',
      aosDelay: '500'
    },
    {
      id: 4,
      image: AdventagesPhoto4,
      title: 'Frameworks',
      description: 'Ability to create dynamic applications using advanced frameworks',
      aosDelay: '0'
    },
    {
      id: 5,
      image: AdventagesPhoto5,
      title: 'Optimization',
      description: 'Page optimization for better performance and loading speed',
      aosDelay: '250'
    },
    {
      id: 6,
      image: AdventagesPhoto6,
      title: 'Creativity',
      description: 'A creative approach to solving problems and designing unique solutions',
      aosDelay: '500'
    },
  ],
  
  projects: [
    {
      id: 1,
      name: 'JavaScript Blog',
      code: "javascript",
      created: "bootcamp",
      responsivness:"no",
      cardFrontStyle: 'blogPage',
      cardBackStyle: 'blogCode',
      tools: 'Javascript, HTML, CSS',
      pageLink: 'https://soszka.github.io/Javascript-blog',
      githubLink: 'https://github.com/Soszka/Javascript-blog',
    },
    {
      id: 2,
      name: 'City Layout',
      code: "javascript",
      created: "by-me",
      responsivness:"yes",
      cardFrontStyle: 'cityPage',
      cardBackStyle: 'cityCode',
      tools: 'Javascript, HTML, SCSS',
      pageLink: 'https://soszka.github.io/SCSS-cityLayout/',
      githubLink: 'https://github.com/Soszka/SCSS-cityLayout',
    },
    {
      id: 3,
      name: 'Zamorski Finanse',
      code: "angular",
      created: "by-me",
      responsivness:"yes",
      cardFrontStyle: 'zamorskiFinansePage',
      cardBackStyle: 'zamorskiFinanseCode',
      tools: 'Angular, NgRx, SCSS',
      pageLink: 'https://zamorskifinanse.vercel.app',
      githubLink: 'https://github.com/Soszka/Angular-zamorskiFinanse',
    },
    {
      id: 4,
      name: 'Receipe Book',
      code: "angular",
      created: "course",
      responsivness:"yes",
      cardFrontStyle: 'receipeBookPage',
      cardBackStyle: 'receipeBookCode',
      tools: 'Angular, Typescript, CSS',
      pageLink: 'https://receipebookapp.vercel.app/recipes',
      githubLink: 'https://github.com/Soszka/Angular-receipeBookApp',
    },
    {
      id: 5,
      name: 'Portfolio',
      code: "react",
      created: "by-me",
      responsivness: "yes",
      cardFrontStyle: 'portfolioPage',
      cardBackStyle: 'portfolioCode',
      tools: 'React, Redux, SCSS',
      pageLink: 'https://bartlomiejsocha.vercel.app',
      githubLink: 'https://github.com/Soszka/portfolio',
    },
    {
      id: 6,
      name: 'To-Do List',
      code: "react",
      created: "bootcamp",
      responsivness:"no",
      cardFrontStyle: 'ToDoPage',
      cardBackStyle: 'ToDoCode',
      tools: 'React, Redux, SCSS',
      pageLink: 'https://react-app-soszka.vercel.app',
      githubLink: 'https://github.com/Soszka/React-app',
    },
    {
      id: 7,
      name: 'Drag&Drop Project',
      code: "javascript",
      created: "course",
      responsivness:"yes",
      cardFrontStyle: 'dragDropPage',
      cardBackStyle: 'dragDropCode',
      tools: 'Typescript, HTML, CSS',
      pageLink: 'https://soszka.github.io/Typescript-dragAndDropProject/',
      githubLink: 'https://github.com/Soszka/Typescript-dragAndDropProject',
    },
    {
      id: 8,
      name: 'Pizzeria',
      code: "javascript",
      created: "bootcamp",
      responsivness:"no",
      cardFrontStyle: 'pizzeriaPage',
      cardBackStyle: 'pizzeriaCode',
      tools: 'Javascript, HTML, SCSS',
      pageLink: 'https://project-pizzeria.soszka1.repl.co/',
      githubLink: 'https://github.com/Soszka/Javascript-pizzeriaApp',
    },
    {
      id: 9,
      name: 'Fitness App',
      code: "angular",
      created: "course",
      responsivness:"yes",
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
      name: 'education',
      icon: faGraduationCap,
      description: ` Education is an essential element of success in the IT industry.
      it not only provides the necessary technical skills, but also develops creativity,
      logical thinking and the ability to solve problems.`,
      slides : [
        {url: EducationPhoto1, title: 'Power Engineer'},
        {url: EducationPhoto2, title: 'Project Manager'}
      ]
    },
    {
      id: 2,
      name: 'hard skilss',
      icon: faCode,
      description: ` Hard skills, play a pivotal role in achieving excellence in specific technical domains.
      They encompass the knowledge, expertise, and proficiency required to solve complex problems,
      and contribute effectively within one's chosen industry.`,
      slides : [
        {url:  HardSkillsPhoto1, title: 'HTML'},
        {url:  HardSkillsPhoto2, title: 'CSS & SASS'},
        {url:  HardSkillsPhoto3, title: 'JavaScript & TypScript'},
        {url:  HardSkillsPhoto4, title: 'React & Redux'},
        {url:  HardSkillsPhoto5, title: 'Angular & NgRx'},
        {url:  HardSkillsPhoto6, title: 'NPM & Webpack'},
        {url:  HardSkillsPhoto7, title: 'Visual Studio Code'},
        {url:  HardSkillsPhoto8, title: 'Basic Projects Management'}
      ]
    },
    {
      id: 3,
      name: 'soft skills',
      icon: faGears,
      description: ` Soft skills are a fundamental component of success in any professional field.
      They not only enhance effective communication and interpersonal relationships but also foster adaptability,
      leadership, and emotional intelligence.`,
      slides: [
        {url: SoftSkillsPhoto1, title: 'Team Work'},
        {url: SoftSkillsPhoto2,  title: 'Problem Solving'},
        {url: SoftSkillsPhoto3,  title: 'Analytical Thinking'},
        {url: SoftSkillsPhoto4,  title: 'Creativity'},
        {url: SoftSkillsPhoto5,  title: 'Punctuality'}
      ]
    }
  ],
};

export default initialState;