import styles from './Projects.module.scss';
import Title from '../Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Projects = () => {
  return (
    <div>
      <Title>My Projects</Title>
      <div className={styles.projectForm}>

      </div>
      <div className={styles.projectsList}>
        <div className={styles.project}>
          <div className={styles.projectCard}>
            <div className={styles.projectCardFront}>
              <h5>JavaScript Blog</h5>
            </div>
            <div className={styles.projectCardBack}>
              <div className={styles.content}>
                <p>Javasacript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project}>
          <div className={styles.projectCard}>
            <div className={styles.projectCardFront}>
              <h5>Pizzeria</h5>
            </div>
            <div className={styles.projectCardBack}>
              <div className={styles.content}>
                <p>Javasacript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project}>
          <div className={styles.projectCard}>
            <div className={styles.projectCardFront}>
              <h5>To-Do List</h5>
            </div>
            <div className={styles.projectCardBack}>
              <div className={styles.content}>
                <p>Javasacript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project}>
          <div className={styles.projectCard}>
            <div className={styles.projectCardFront}>
              <h5>Rzeszów City</h5>
            </div>
            <div className={styles.projectCardBack}>
              <div className={styles.content}>
                <p>Javasacript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project}>
          <div className={styles.projectCard}>
            <div className={styles.projectCardFront}>
              <h5>Drag&Drop Projects</h5>
            </div>
            <div className={styles.projectCardBack}>
              <div className={styles.content}>
                <p>Javasacript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project}>
          <div className={styles.projectCard}>
            <div className={styles.projectCardFront}>
              <h5>Receipe Book</h5>
            </div>
            <div className={styles.projectCardBack}>
              <div className={styles.content}>
                <p>Javasacript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project}>
          <div className={styles.projectCard}>
            <div className={styles.projectCardFront}>
              <h5>Fitness App</h5>
            </div>
            <div className={styles.projectCardBack}>
              <div className={styles.content}>
                <p>Javasacript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project}>
          <div className={styles.projectCard}>
            <div className={styles.projectCardFront}>
              <h5>Portfolio</h5>
            </div>
            <div className={styles.projectCardBack}>
              <div className={styles.content}>
                <p>Javasacript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.project}>
          <div className={styles.projectCard}>
            <div className={styles.projectCardFront}>
              <h5>Nutrition app</h5>
            </div>
            <div className={styles.projectCardBack}>
              <div className={styles.content}>
                <p>Javasacript, HTML, CSS</p>
                <div className={styles.links}>
                  <a href="https://github.com/Soszka/Javascript-blog"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href="https://soszka.github.io/Javascript-blog/"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;