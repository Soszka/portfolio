import styles from './Carousel.module.scss';
import { useState } from 'react';

const Carousel = () => {

  const carouselSlides = [
    {url: 'https://i.postimg.cc/vTN9PCPF/IMG-20220625-133541.jpg', title: 'Power Engineer'},
    {url: 'https://i.postimg.cc/fb5zdgDx/IMG-20220625-133555-1.jpg', title: 'Project Manager'}
  ];

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

  const goToSlide = slideIndex => {
    setCurrentIndex(slideIndex);
  }


  return (
    <div className={styles.carousel}>
      <div className={styles.leftArrow} onClick={goToPrevious}>&lt;</div>
      <div className={styles.rightArrow} onClick={goToNext}>&gt;</div>
      <div className={styles.carouselSlides}>
        <img alt={carouselSlides[currentIndex].title} src={carouselSlides[currentIndex].url}></img>
        <h2>{carouselSlides[currentIndex].title}</h2>
      </div>
      <div className={styles.dotsContainer}>
        {carouselSlides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={slideIndex === currentIndex ? styles.dotActive : styles.dot}
            onClick ={() => goToSlide(slideIndex)}>•
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;