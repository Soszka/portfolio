import styles from './ProjectCardSm.module.scss';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const ProjectsCardSm = ({ project }) => {
  const { t } = useTranslation();

  return (
    <div
      className={styles.project}
      style={{ backgroundImage: `url(${project.imageSm})` }}
    >
      <h3 className={styles.projectName}>{t(project.titleKey)}</h3>
      <Button className={styles.projectButton}>{t('projects.see')}</Button>
    </div>
  );
};

export default ProjectsCardSm;
