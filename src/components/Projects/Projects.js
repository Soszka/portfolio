import styles from './Projects.module.scss';
import ProjectsForm from './ProjectsForm/ProjectsForm';
import ProjectsDescription from './ProjectsDescription/ProjectsDescription';
import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useTranslation();

  return (
    <div>
      <Navigation />
      <Container>
        <Title>{t('projects.title')}</Title>
        <div className={styles.projects}>
          <div className={styles.leftColumn} data-aos="fade-right">
            <ProjectsForm setSelectedProject={setSelectedProject} />
          </div>
          <div className={styles.rightColumn} data-aos="fade-left">
            <ProjectsDescription selectedProject={selectedProject} />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Projects;
