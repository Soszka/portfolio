import styles from './ProjectsForm.module.scss';

const ProjectsForm = () => {
  return (
    <div className={styles.projectsForm}>
      <div className={styles.code}>
        Code:
        <label><input type="radio" name="tool" value="javascript" />JS / TS</label>
        <label><input type="radio" name="tool" value="angular" /> Angular</label>
        <label><input type="radio" name="tool" value="react" /> React</label>
      </div>
      <div className={styles.design}>
        Created By:
        <label><input type="radio" name="design" value="bootcamp" /> Bootcamp</label>
        <label><input type="radio" name="design" value="courses" /> Courses</label>
        <label><input type="radio" name="design" value="by-me" /> By Me</label>
      </div>
      <div className={styles.responsivness}>
        Responsivness: 
        <label><input type="radio" name="responsiveness" value="yes" /> Yes</label>
        <label><input type="radio" name="responsiveness" value="no" /> No</label>
      </div>
    </div>
  );
}

export default ProjectsForm;