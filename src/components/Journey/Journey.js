import styles from './Journey.module.scss';
import Title from '../Title/Title';

const Journey = () => {
  return (
    <div className={styles.journey}>
      <Title>My Journey</Title>
      <div className={styles.journeyItems}>
        <div className={styles.journeyItem} data-aos="slide-up">
          <img src ="https://i.postimg.cc/ZKMbpXCZ/IMG-20220625-133555.jpg" alt="study" />
          <h2>Studies</h2>
          <p>Throughout my academic journey in the IT department, I had to create my first own website.</p>
          <a href="https://github.com/Soszka/SCSS-cityLayout">SEE GITHUB</a>
        </div>
        <div className={styles.journeyItem} data-aos="slide-up" data-aos-delay="250">
          <img src ="https://i.postimg.cc/j50VXL3b/Kodilla-Photo.png" alt="study" />
          <h2>Bootcamp</h2>
          <p>While attending the bootcamp program, I had the opportunity to create complex applications</p>
          <a href="https://github.com/Soszka/SCSS-cityLayout">SEE GITHUB</a>
        </div>
        <div className={styles.journeyItem} data-aos="slide-up" data-aos-delay="500">
          <img src ="https://i.postimg.cc/sgbfkfHn/Udemy-Photo.png" alt="study" />
          <h2>Courses</h2>
          <p>The courses helped me expand my knowledge by learning new technologies and languages</p>
          <a href="https://github.com/Soszka/SCSS-cityLayout">SEE GITHUB</a>
        </div>
        <div className={styles.journeyItem} data-aos="slide-up" data-aos-delay="750">
          <img src ="https://i.postimg.cc/sxHhFdh3/Computer-programmer-jpeg.jpg" alt="study" />
          <h2>Job</h2>
          <p>Currently, I am looking for a job where I want to take my first steps in Front End Development</p>
          <a href="https://github.com/Soszka/SCSS-cityLayout">SEE GITHUB</a>
        </div>
      </div>
    </div>
  )
}

export default Journey;