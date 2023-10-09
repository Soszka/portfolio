import {  faCode, faGears, faGraduationCap } from '@fortawesome/free-solid-svg-icons';


const initialState = {

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
      pageLink: 'https://github.com/Soszka/Javascript-blog',
      githubLink: 'https://soszka.github.io/Javascript-blog',
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
      pageLink: 'https://github.com/Soszka/Javascript-blog',
      githubLink: 'https://soszka.github.io/Javascript-blog',
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
      pageLink: 'https://github.com/Soszka/Javascript-blog',
      githubLink: 'https://soszka.github.io/Javascript-blog',
    },
    {
      id: 4,
      name: 'Rzeszów City',
      code: "javascript",
      created: "by-me",
      responsivness:"yes",
      cardFrontStyle: 'cityPage',
      cardBackStyle: 'cityCode',
      tools: 'Javascript, HTML, SCSS',
      pageLink: 'https://github.com/Soszka/Javascript-blog',
      githubLink: 'https://soszka.github.io/Javascript-blog',
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
      pageLink: 'https://github.com/Soszka/Javascript-blog',
      githubLink: 'https://soszka.github.io/Javascript-blog',
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
      pageLink: 'https://github.com/Soszka/Javascript-blog',
      githubLink: 'https://soszka.github.io/Javascript-blog',
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
      pageLink: 'https://github.com/Soszka/Javascript-blog',
      githubLink: 'https://soszka.github.io/Javascript-blog',
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
        {url: 'https://i.postimg.cc/59sPCs11/HTML-logo.png', title: 'HTML'},
        {url: 'https://i.postimg.cc/vmHn8kMJ/CSS-SASS.png', title: 'CSS & SASS'},
        {url: 'https://i.postimg.cc/xqrhGLt2/Java-Script-Type-Script.png', title: 'JavaScript & TypScript'},
        {url: 'https://i.postimg.cc/L581Sk03/React-Redux.png', title: 'React & Redux'},
        {url: 'https://i.postimg.cc/sxWRvq8j/Angular-Ng-Rx.png', title: 'Angular & NgRx'},
        {url: 'https://i.postimg.cc/tCXhJsXZ/Webpack-Npm.png', title: 'NPM & Webpack'},
        {url: 'https://i.postimg.cc/BQyMhtXV/Visual-logo.png', title: 'Visual Studio Code'},
        {url: 'https://i.postimg.cc/4d5Ww596/Jira-logo.png', title: 'Basic Projects Management'}
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
        {url: 'https://i.postimg.cc/9XtBBKrL/splash-photo.png', title: 'Team Work'},
        {url: 'https://i.postimg.cc/1RCRxjqK/Screenshot-20210125-151129.png', title: 'Problem Solving'},
        {url: 'https://i.postimg.cc/9XtBBKrL/splash-photo.png', title: 'Analytical Thinking'},
        {url: 'https://i.postimg.cc/1RCRxjqK/Screenshot-20210125-151129.png', title: 'Creativity'},
        {url: 'https://i.postimg.cc/9XtBBKrL/splash-photo.png', title: 'Punctuality'}
      ]
    }
  ],
};

export default initialState;