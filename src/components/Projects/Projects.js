import styles from './Projects.module.scss';
import ProjectsForm from './ProjectsForm/ProjectsForm';
import ProjectsDescription from './ProjectsDescription/ProjectsDescription';
import ProjectsCardSm from './ProjectCardSm/ProjectCardSm';
import Title from '../../components/Title/Title';
import Container from '../../components/Container/Container';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../Footer/Footer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Fade from '@mui/material/Fade';
import initialState from '../../redux/initialState';

const tabSx = {
  fontSize: '20px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  const projects = initialState.projects;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={styles.projects}>
      <div>
        <Navigation />
        <Container>
          <Title>{t('projects.title')}</Title>
          <div className={styles.projectsLg}>
            <div className={styles.leftColumn} data-aos="fade-right">
              <ProjectsForm setSelectedProject={setSelectedProject} />
            </div>
            <div className={styles.rightColumn} data-aos="fade-left">
              <ProjectsDescription selectedProject={selectedProject} />
            </div>
          </div>
          <div className={styles.projectsSm}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="inherit"
              slotProps={{ indicator: { sx: { backgroundColor: 'rgb(0, 120, 201)' } } }}
              aria-label="Projects Tabs"
              data-aos="flip-up"
            >
              <Tab
                label="Angular"
                sx={tabSx}
              />
              <Tab
                label="React"
                sx={tabSx}
              />
            </Tabs>

            <div>
              <Fade in={tabValue === 0} timeout={1000} unmountOnExit>
                <div>
                  {tabValue === 0 && (
                    <div className={styles.projectsSmCards}>
                      {projects
                        .filter((project) => project.code === 'angular')
                        .map((project) => (
                          <ProjectsCardSm key={project.id} project={project} />
                        ))}
                    </div>
                  )}
                </div>
              </Fade>
              <Fade in={tabValue === 1} timeout={1000} unmountOnExit>
                <div>
                  {tabValue === 1 && (
                    <div className={styles.projectsSmCards}>
                      {projects
                        .filter((project) => project.code === 'react')
                        .map((project) => (
                          <ProjectsCardSm key={project.id} project={project} />
                        ))}
                    </div>
                  )}
                </div>
              </Fade>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
