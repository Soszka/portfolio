import styles from './ProjectCardSm.module.scss';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useState, forwardRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LinkIcon from '@material-ui/icons/Link';
import React from 'react';
import Fade from '@material-ui/core/Fade';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} timeout={800} />;
});

const ProjectsCardSm = ({ project }) => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    document.body.style.overflow = 'hidden';
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div
      className={styles.project}
      style={{ backgroundImage: `url(${project.imageSm})` }}
    >
      <h3 className={styles.projectName}>{t(project.titleKey)}</h3>
      <Button className={styles.projectButton} onClick={handleOpenDialog}>
        {t('projects.see')}
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullScreen
        PaperProps={{ className: styles.dialogPaper }}
        TransitionComponent={Transition}
      >
        <div className={styles.dialogHeader}>
          <IconButton
            aria-label="close"
            className={styles.closeButton}
            onClick={handleCloseDialog}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.dialogContent}>
          <h2>{t(project.titleKey)}</h2>
          <p>{t(project.descriptionKey)}</p>
          <div className={styles.iconsContainer}>
            {[...project.icons, ...project.iconsSm].map((icon, index) => (
              <div key={index} className={styles.iconItem}>
                <img
                  src={icon}
                  alt={`Icon ${index}`}
                  className={styles.iconImage}
                />
              </div>
            ))}
          </div>
          <div className={styles.linkContainer}>
            <IconButton
              href={project.page}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkContainerIcon}
            >
              <LinkIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectsCardSm;
