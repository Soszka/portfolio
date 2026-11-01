import React, { createRef, useRef } from 'react';
import styles from './ProjectsDescription.module.scss';
import { useTranslation } from 'react-i18next';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const ProjectsDescription = ({ selectedProject }) => {
  const { t } = useTranslation();
  const nodeRefs = useRef(new Map());
  const projectId = selectedProject?.id ?? 'default';
  if (!nodeRefs.current.has(projectId)) nodeRefs.current.set(projectId, createRef());
  const nodeRef = nodeRefs.current.get(projectId);

  return (
    <div className={styles.container}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={projectId}
          nodeRef={nodeRef}
          timeout={300}
          classNames={{
            enter: styles.fadeEnter,
            enterActive: styles.fadeEnterActive,
            exit: styles.fadeExit,
            exitActive: styles.fadeExitActive,
          }}
          unmountOnExit
        >
          <div ref={nodeRef} className={styles.content}>
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
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default ProjectsDescription;
