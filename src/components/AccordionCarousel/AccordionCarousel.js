import styles from './AccordionCarousel.module.scss';
import Carousel from '../Carousel/Carousel';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';


const AccordionCarousel = ({ skill }) => {

  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div className={styles.accordion} data-aos="zoom-in">
        <div className={styles.accordionSection}  onClick={() => setIsActive(!isActive)} >
          <div className={styles.accordionTitle}>
            <h3>{skill.name}</h3>
            <p>{isActive ? <FontAwesomeIcon icon={faCircleChevronUp} /> : <FontAwesomeIcon icon={faCircleChevronDown} />}</p>
          </div>
          <FontAwesomeIcon className={styles.accordionIcon} icon={skill.icon} />
        </div>
        <div className={styles.accordionDescription}>
          <p>
            {isActive ? ' ' : skill.description}
          </p>
        </div>
        {isActive && <div  className={styles.carouselItem}>
          <Carousel carouselSlides={skill.slides} />
        </div>}
      </div>
    </div>
  );
}

export default AccordionCarousel;
