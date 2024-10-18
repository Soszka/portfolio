import styles from './ProjectsList.module.scss';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectsList = ({ filteredProjects, setSelectedProject }) => {
  return (
    <div className={styles.projectsList}>
      {filteredProjects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          setSelectedProject={setSelectedProject}
        />
      ))}
    </div>
  );
};

export default ProjectsList;
