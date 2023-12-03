import {  faCode, faGears, faGraduationCap, faLaptopFile, faScrewdriverWrench, faChalkboard, faCalendarDays, faDiagramProject } from '@fortawesome/free-solid-svg-icons';


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
      image: 'https://i.postimg.cc/ZKMbpXCZ/IMG-20220625-133555.jpg',
      title: 'Studies',
      description: 'Throughout my academic journey in the IT department, I had to create my first own website',
      aosDelay: '0'
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/VL0DhGtK/pexels-sora-shimazaki-5935794.jpg',
      title: 'Bootcamp',
      description: 'While attending the bootcamp program, I had the opportunity to create complex applications',
      aosDelay: '250'
    },
    {
      id: 3,
      image: 'https://i.postimg.cc/NjHG5cHR/pexels-sora-shimazaki-5926389.jpg',
      title: 'Courses',
      description: 'The courses helped me expand my knowledge by learning new technologies and languages',
      aosDelay: '500'
    },
    {
      id: 4,
      image: 'https://i.postimg.cc/sxHhFdh3/Computer-programmer-jpeg.jpg',
      title: 'Job',
      description: 'Currently, I am looking for a job where I want to take my first steps in Front End Development',
      aosDelay: '750'
    }
  ],

  adventages: [
    {
      id: 1,
      image: 'https://i.postimg.cc/sDQH0Cbq/Zrzut-ekranu-2023-09-28-211542.png',
      title: 'Responsivness',
      description: 'Pages that adapt perfectly to different devices and screen sizes',
      aosDelay: '0'
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/13Z2rhdG/pexels-negative-space-97077.jpg',
      title: 'UX/UI',
      description: 'Design with an emphasis on the user, ensuring intuitive and aesthetic user interfaces',
      aosDelay: '250'
    },
    {
      id: 3,
      image: 'https://i.postimg.cc/6qxKk8Qq/React-Redux2.png"',
      title: 'Libraries',
      description: 'Effective use of popular libraries for optimized project work',
      aosDelay: '500'
    },
    {
      id: 4,
      image: 'https://i.postimg.cc/85DrTzcK/Angular-Ng-Rx2.png',
      title: 'Frameworks',
      description: 'Ability to create dynamic applications using advanced frameworks',
      aosDelay: '0'
    },
    {
      id: 5,
      image: 'https://i.postimg.cc/sgmwZQy5/Computer-programmer-jpeg.jpg',
      title: 'Optimization',
      description: 'Page optimization for better performance and loading speed',
      aosDelay: '250'
    },
    {
      id: 6,
      image: 'https://i.postimg.cc/8zXLShNX/pexels-kevin-ku-577585.jpg',
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
      name: 'Receipe Book',
      code: "angular",
      created: "course",
      responsivness:"yes",
      cardFrontStyle: 'receipeBookPage',
      cardBackStyle: 'receipeBookCode',
      tools: 'Angular, NgRx, SCSS',
      pageLink: 'https://receipebookapp.vercel.app/recipes',
      githubLink: 'https://github.com/Soszka/Angular-receipeBookApp',
    },
    {
      id: 7,
      name: 'Fitness App',
      code: "angular",
      created: "course",
      responsivness:"yes",
      cardFrontStyle: 'fitnessAppPage',
      cardBackStyle: 'fitnessAppCode',
      tools: 'Angular, NgRx, SCSS',
      pageLink: 'https://github.com/Soszka/Javascript-blog',
      githubLink: 'https://soszka.github.io/Javascript-blog',
    },
    {
      id: 8,
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
      id: 9,
      name: 'Nutrition App',
      code: "angular",
      created: "by-me",
      responsivness:"yes",
      cardFrontStyle: 'nutritionAppPage',
      cardBackStyle: 'nutritionAppCode',
      tools: 'Javascript, HTML, SCSS',
      pageLink: 'https://github.com/Soszka/Javascript-blog',
      githubLink: 'https://soszka.github.io/Javascript-blog',
    }
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
        {url: 'https://i.postimg.cc/05GSNWd5/IMG-20220625-133541.jpg', title: 'Power Engineer'},
        {url: 'https://i.postimg.cc/hPSdQLpL/IMG-20220625-133555-1.jpg', title: 'Project Manager'}
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
        {url: 'https://i.postimg.cc/MZNyh4cc/HTML-logo.png', title: 'HTML'},
        {url: 'https://i.postimg.cc/Dz6rHwsF/CSS-SASS.png', title: 'CSS & SASS'},
        {url: 'https://i.postimg.cc/T1LnKjsY/Java-Script-Type-Script.png', title: 'JavaScript & TypScript'},
        {url: 'https://i.postimg.cc/J4X6yy0P/React-Redux.png', title: 'React & Redux'},
        {url: 'https://i.postimg.cc/ydWJ5H9b/Angular-Ng-Rx.png', title: 'Angular & NgRx'},
        {url: 'https://i.postimg.cc/W3fMpYXH/Webpack-Npm.png', title: 'NPM & Webpack'},
        {url: 'https://i.postimg.cc/rsBxx06G/Visual-logo.png', title: 'Visual Studio Code'},
        {url: 'https://i.postimg.cc/85CRSgBv/nowajira.png', title: 'Basic Projects Management'}
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
        {url: 'https://i.postimg.cc/QtNhXhtj/pexels-fauxels-3183150.jpg', title: 'Team Work'},
        {url: 'https://i.postimg.cc/R03KVN0S/pexels-negative-space-160107.jpg', title: 'Problem Solving'},
        {url: 'https://i.postimg.cc/sgmwZQy5/Computer-programmer-jpeg.jpg"', title: 'Analytical Thinking'},
        {url: 'https://i.postimg.cc/8zXLShNX/pexels-kevin-ku-577585.jpg', title: 'Creativity'},
        {url: 'https://i.postimg.cc/Kz9FjwkB/portfolio-Page-Punctuality.jpg', title: 'Punctuality'}
      ]
    }
  ],
};

export default initialState;