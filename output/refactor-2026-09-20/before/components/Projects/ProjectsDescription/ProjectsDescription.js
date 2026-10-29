import React from 'react';
import styles from './ProjectsDescription.module.scss';
import { useTranslation } from 'react-i18next';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const ProjectsDescription = ({ selectedProject }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={selectedProject ? selectedProject.id : 'default'}
          timeout={300}
          classNames={{
            enter: styles.fadeEnter,
            enterActive: styles.fadeEnterActive,
            exit: styles.fadeExit,
            exitActive: styles.fadeExitActive,
          }}
          unmountOnExit
        >
          {selectedProject ? (
            <>
              <div className={styles.project}>
                <h1 className={styles.projectName}>
                  {t(selectedProject.titleKey)}
                </h1>
                <p className={styles.projectDescription}>
                  {t(selectedProject.descriptionKey)}
                </p>
              </div>
              <div className={styles.projectTools}>
                {selectedProject.icons.map((icon, index) => (
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
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default ProjectsDescription;
