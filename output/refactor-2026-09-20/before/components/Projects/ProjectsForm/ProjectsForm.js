import styles from './ProjectsForm.module.scss';
import { useState } from 'react';
import ProjectsList from '../ProjectsList/ProjectsList';
import initialState from '../../../redux/initialState';

const ProjectsForm = ({ setSelectedProject }) => {
  const [selectedCode, setSelectedCode] = useState('all');
  const codes = ['all', 'angular', 'react'];

  const projects = initialState.projects;

  const handleCodeChange = (event) => {
    setSelectedCode(event.target.value);
  };

  const filterProjects = (projects, code) => {
    return projects.filter((project) => {
      return code === 'all' || project.code === code;
    });
  };
  const filteredProjects = filterProjects(projects, selectedCode);

  return (
    <div>
      <div className={styles.projectsForm}>
        <div className={styles.code}>
          {codes.map((code) => (
            <label key={code}>
              <input
                type="radio"
                name="code"
                onChange={handleCodeChange}
                value={code}
                checked={selectedCode === code}
              />
              {code.charAt(0).toUpperCase() + code.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.scrollContainer}>
        <ProjectsList
          filteredProjects={filteredProjects}
          setSelectedProject={setSelectedProject}
        />
      </div>
    </div>
  );
};

export default ProjectsForm;
