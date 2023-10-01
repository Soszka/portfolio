import styles from './ProjectsForm.module.scss';
import { useState, } from 'react';
import ProjectsList from '../ProjectsList/ProjectsList';
import { useSelector } from 'react-redux';

const ProjectsForm = () => {
  const [selectedCode, setSelectedCode] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('');
  const [selectedResponsiveness, setSelectedResponsiveness] = useState('');
  const projects = useSelector(state => state.projects)

  const handleCodeChange = (event) => {
    setSelectedCode(event.target.value);
  };

  const handleDesignChange = (event) => {
    setSelectedDesign(event.target.value);
  };

  const handleResponsivenessChange = (event) => {
    setSelectedResponsiveness(event.target.value);
  };

  const filterProjects = (projects, code, design, responsiveness) => {
    return projects.filter((project) => {
      return (
        (code === '' || project.code === code) &&
        (design === '' || project.created === design) &&
        (responsiveness === '' || project.responsivness === responsiveness)
      );
    });
  };

  const filteredProjects = filterProjects(projects, selectedCode, selectedDesign, selectedResponsiveness);

  console.log(filteredProjects);

  return (
    <div>
      <div className={styles.projectsForm}>
        <div className={styles.code}>
          Code:
          <label><input type="radio" name="code" onChange={handleCodeChange} value="javascript" />JS / TS</label>
          <label><input type="radio" name="code" onChange={handleCodeChange} value="angular" />Angular</label>
          <label><input type="radio" name="code" onChange={handleCodeChange} value="react" />React</label>
        </div>
        <div className={styles.design}>
          Created By:
          <label><input type="radio" name="design" onChange={handleDesignChange} value="bootcamp" />Bootcamp</label>
          <label><input type="radio" name="design" onChange={handleDesignChange} value="course" />Courses</label>
          <label><input type="radio" name="design" onChange={handleDesignChange} value="by-me" />By Me</label>
        </div>
        <div className={styles.responsivness}>
          Responsiveness:
          <label><input type="radio" name="responsiveness" onChange={handleResponsivenessChange} value="yes" />Yes</label>
          <label><input type="radio" name="responsiveness" onChange={handleResponsivenessChange} value="no" />No</label>
        </div>
      </div>
      <ProjectsList filteredProjects={filteredProjects} />
    </div>
  );
}

export default ProjectsForm;

