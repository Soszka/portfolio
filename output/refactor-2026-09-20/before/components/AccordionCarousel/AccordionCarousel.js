import styles from './AccordionCarousel.module.scss';
import Carousel from '../Carousel/Carousel';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const AccordionCarousel = ({ skill }) => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.accordion} data-aos="zoom-out">
        <div
          className={styles.accordionSection}
          onClick={() => setIsActive(!isActive)}
        >
          <div className={styles.accordionTitle}>
            <h3>{t(skill.nameKey)}</h3>
            <p>
              {isActive ? (
                <FontAwesomeIcon icon={faCircleChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faCircleChevronDown} />
              )}
            </p>
          </div>
          <FontAwesomeIcon className={styles.accordionIcon} icon={skill.icon} />
        </div>
        <div>
          <p
            style={{ display: isActive ? 'none' : 'block' }}
            className={styles.accordionDescription}
          >
            {t(skill.descriptionKey)}
          </p>
        </div>
        {isActive && <Carousel carouselSlides={skill.slides} />}
      </div>
    </div>
  );
};

export default AccordionCarousel;
