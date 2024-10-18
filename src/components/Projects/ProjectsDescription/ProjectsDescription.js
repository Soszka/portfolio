import { useEffect, useState } from 'react';
import styles from './ProjectsDescription.module.scss';
import { useTranslation } from 'react-i18next';

const ProjectsDescription = ({ selectedProject }) => {
  const [displayedProject, setDisplayedProject] = useState(selectedProject);
  const [fadeState, setFadeState] = useState('fadeIn');
  const { t } = useTranslation();

  useEffect(() => {
    if (selectedProject !== displayedProject) {
      setFadeState('fadeOut');
      const timeout = setTimeout(() => {
        setDisplayedProject(selectedProject);
        setFadeState('fadeIn');
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [selectedProject, displayedProject]);

  return (
    <div className={`${styles.container} ${styles[fadeState]}`}>
      {displayedProject ? (
        <>
          <div className={styles.project}>
            <h1 className={styles.projectName}>
              {t(displayedProject.titleKey)}
            </h1>
            <p className={styles.projectDescription}>
              {t(displayedProject.descriptionKey)}
            </p>
          </div>
          <div className={styles.projectTools}>
            {displayedProject.icons.map((icon, index) => (
              <img
                key={index}
                src={icon}
                className={styles.projectToolsIcon}
                alt="icon"
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.defaultMessage}>
          <p>{t('projects.hoverMessage')}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsDescription;
