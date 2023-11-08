import styles from './ProjectsList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import clsx from 'clsx';

const ProjectsList = ({ filteredProjects}) => {
  return (
    <div className={styles.projectsList}>
      {filteredProjects.map((project) => (
        <div key={project.id} className={styles.project} code={project.code} created={project.created} data-aos="zoom-in" responsivness={project.responsivness}>
          <div className={styles.projectCard}>
            <div className={clsx(styles.projectCardFront, styles[project.cardFrontStyle])}>
              <h5>{project.name}</h5>
            </div>
            <div className={clsx(styles.projectCardBack, styles[project.cardBackStyle])}>
              <div className={styles.content}>
                <p>{project.tools}</p>
                <div className={styles.links}>
                  <a href={project.pageLink} rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
                  <a href={project.githubLink} rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faPaperclip} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsList;

