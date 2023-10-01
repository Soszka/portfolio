import Title from '../Title/Title';
import ProjectsForm from '../ProjectsForm/ProjectsForm';
import ProjectsList from '../ProjectsList/ProjectsList';

const Projects = () => {
  return (
    <div>
      <Title>My Projects</Title>
      <ProjectsForm />
      <ProjectsList />
    </div>
  );
}

export default Projects;