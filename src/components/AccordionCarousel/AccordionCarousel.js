import styles from './AccordionCarousel.module.scss';
import Carousel from '../Carousel/Carousel';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCode, faGears, faGraduationCap} from '@fortawesome/free-solid-svg-icons';




const AccordionCarousel = () => {

  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div className={styles.accordion}>
        <div className={styles.accordionSection} onClick={() => setIsActive(!isActive)} >
          <div className={styles.accordionTitle}>
            <h3>EDUCATION</h3>
            <p>{isActive ? '-' : '+'}</p>
          </div>
          <FontAwesomeIcon className={styles.accordionIcon} icon={faGraduationCap} />
        </div>
        <div className={styles.accordionDescription}>
          <p>
            {isActive ? ' ' : ` Education is an essential element of success in the IT industry.
            it not only provides the necessary technical skills, but also develops creativity,
            logical thinking and the ability to solve problems.`}
          </p>
        </div>
        {isActive && <div  className={styles.carouselItem}>
          <Carousel />
        </div>}
      </div>
      <div className={styles.accordion}>
        <div className={styles.accordionSection} onClick={() => setIsActive(!isActive)} >
          <div className={styles.accordionTitle}>
            <h3>SOFT SKILLS</h3>
            <p>{isActive ? '-' : '+'}</p>
          </div>
          <FontAwesomeIcon className={styles.accordionIcon} icon={faGears} />
        </div>
        <div className={styles.accordionDescription}>
          <p>
            {isActive ? ' ' : ` Soft skills are a fundamental component of success in any professional field.
             They not only enhance effective communication and interpersonal relationships but also foster adaptability,
             leadership, and emotional intelligence.`}
          </p> 
        </div>
        {isActive && <div className="accordion-content">
          <p>Lorem</p>
        </div>}
      </div>
      <div className={styles.accordion}>
        <div className={styles.accordionSection} onClick={() => setIsActive(!isActive)} >
          <div className={styles.accordionTitle}>
            <h3>Hard Skills</h3>
            <p>{isActive ? '-' : '+'}</p>
          </div>
          <FontAwesomeIcon className={styles.accordionIcon} icon={faCode} />
        </div>
        <div className={styles.accordionDescription}>
          <p>
            {isActive ? ' ' : ` Hard skills, play a pivotal role in achieving excellence in specific technical domains.
             They encompass the knowledge, expertise, and proficiency required to solve complex problems,
             and contribute effectively within one's chosen industry.`}
          </p>
        </div>
        {isActive && <div className="accordion-content">
          <p>Lorem</p>
        </div>}
      </div>
    </div>
  );
}

export default AccordionCarousel;
