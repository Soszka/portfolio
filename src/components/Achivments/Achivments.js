import styles from './Achivments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopFile, faScrewdriverWrench, faChalkboard, faCalendarDays, faDiagramProject, faGraduationCap} from '@fortawesome/free-solid-svg-icons';



const Achivments = () => {
  return (
    <div className={styles.achivments}>
      <div className={styles.achivment}>
        <FontAwesomeIcon className={styles.achivmentIcon} icon={faGraduationCap} />
        <h3>Two</h3>
        <p>Completed fields of study where passion for front end development was born</p>
      </div>
      <div className={styles.achivment}>
        <FontAwesomeIcon className={styles.achivmentIcon} icon={faDiagramProject} />
        <h3>Twelve</h3>
        <p>Realized projects, ranging from small websites to more extensive applications.</p>
      </div>
      <div className={styles.achivment}>
        <FontAwesomeIcon className={styles.achivmentIcon} icon={faLaptopFile} />
        <h3>Seven</h3>
        <p>Finished online courses that deepened my knowledge more and more</p>
      </div>
      <div className={styles.achivment}>
        <FontAwesomeIcon className={styles.achivmentIcon} icon={faScrewdriverWrench} />
        <h3>Nineteen</h3>
        <p>Learned technologies and tools that I have met and implemented in projects</p>
      </div>
      <div className={styles.achivment}>
       <FontAwesomeIcon className={styles.achivmentIcon} icon={faChalkboard} />
        <h3>One</h3>
        <p>Completed bootcamp that helped me grow more into web development</p>
      </div>
      <div className={styles.achivment}>
        <FontAwesomeIcon className={styles.achivmentIcon} icon={faCalendarDays} />
        <h3>Ten</h3>
        <p>Years since I first encountered code and web development</p>
      </div>
    </div>
  );
}

export default Achivments