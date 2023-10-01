import styles from './ProjectsList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import clsx from 'clsx';

const ProjectsList = () => {
  return (
    <div className={styles.projectsList}>
        <div className={styles.project} code="js" created="bootcamp" responsivness="no">
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles.blogPage)}>
              <h5>JavaScript Blog</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles.blogCode)}>
              <div className={styles.content}>
                <p>Javascript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project} code="react" created="bootcamp" responsivness="no">
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles.pizzeriaPage)}>
              <h5>Pizzeria</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles.pizzeriaCode)}>
              <div className={styles.content}>
                <p>Javascript, HTML, SCSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project} code="js" created="bootcamp" responsivness="no">
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles.ToDoPage)}>
              <h5>To-Do List</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles.ToDoCode)}>
              <div className={styles.content}>
                <p>React, Redux, SCSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project} code="js" created="by-me" responsivness="yes">
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles.cityPage)}>
              <h5>Rzeszów City</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles.cityCode)}>
              <div className={styles.content}>
                <p>Javascript, HTML, SCSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project} code="js" created="course" responsivness="yes">
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles.dragDropPage)}>
              <h5>Drag&Drop Project</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles.dragDropCode)}>
              <div className={styles.content}>
                <p>Typescript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project} code="angular" created="course" responsivness="yes">
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles.receipeBookPage)}>
              <h5>Receipe Book</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles.receipeBookCode)}>
              <div className={styles.content}>
                <p>Angular, NgRx, SCSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project} code="angular" created="course" responsivness="yes">
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles.fitnessAppPage)}>
              <h5>Fitness App</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles.fitnessAppCode)}>
              <div className={styles.content}>
                <p>Angular, NgRx, SCSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project} code="react" created="by-me" responsivness="yes">
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles.portfolioPage)}>
              <h5>Portfolio</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles.portfolioCode)}>
              <div className={styles.content}>
                <p>React, Redux, SCSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project} code="react" created="by-me" responsivness="yes">
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles.nutritionAppPage)}>
              <h5>Nutrition app</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles.nutritionAppCode)}>
              <div className={styles.content}>
                <p>Angular, NgRx, SCSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default ProjectsList;