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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import initialState from '../../redux/initialState';

const useStyles = makeStyles((theme) => ({
  tabsRoot: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  indicator: {
    backgroundColor: 'rgb(0, 120, 201)',
  },
  tabRoot: {
    fontSize: '20px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
}));

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useTranslation();
  const classes = useStyles();
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
              classes={{ indicator: classes.indicator }}
              aria-label="Projects Tabs"
              data-aos="flip-up"
            >
              <Tab
                label="Angular"
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                }}
              />
              <Tab
                label="React"
                classes={{
                  root: classes.tabRoot,
                  selected: classes.tabSelected,
                }}
              />
            </Tabs>

            <div className={classes.fadeContainer}>
              <Fade in={tabValue === 0} timeout={1000} unmountOnExit>
                <div className={classes.fadeContent}>
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
                <div className={classes.fadeContent}>
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
