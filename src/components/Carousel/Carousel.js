import styles from './Carousel.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ carouselSlides }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselSlides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === carouselSlides.length -1
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.leftArrow} onClick={goToPrevious}><FontAwesomeIcon icon={faChevronLeft} /></div>
      <div className={styles.rightArrow} onClick={goToNext}><FontAwesomeIcon icon={faChevronRight} /></div>
      <div className={styles.carouselSlides}>
        <img alt={carouselSlides[currentIndex].title} src={carouselSlides[currentIndex].url}></img>
        <h2>{carouselSlides[currentIndex].title}</h2>
      </div>
    </div>
  );
}

export default Carousel;