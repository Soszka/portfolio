import styles from './About.module.scss';
import Title from '../Title/Title';

const About = () => {
  return (
    <div className={styles.about}>
      <Title>About Me</Title>
      <div className={styles.content}>
        <div className={styles.description}>
          <p>I graduated from two different faculties, earning the title of Energy Engineer and Project Manager. My interest in programming and front-end technologies appeared in this period,
             when I created my first website during my studies at the Faculty of Computer Science. In addition, I participated in an intensive programming bootcamp, which further strengthened my programming skills.
             Over the next months, I explored this knowledge by implementing many online courses and creating my own concepts, which you can find in the - projects tab.
             Thanks to this, I got to know a variety of front-end technologies and gained the skills needed to create modern user interfaces.
             In my private life, I put great emphasis on self-development and skilful time management.
            I believe that efficiently managed time and consistency is the key to continuous self-development.
          </p>
          <div className={styles.buttonsContainer}>
            <a href="#github.com" className={styles.button}>GITHUB</a>
            <a href="#github.com" className={styles.button}>LINKEDIN</a>
          </div> 
        </div>
        <div className={styles.achivments}>
          <div className={styles.achivment}>
            <h1>2</h1>
            <p>Completed fields of study where passion for front end development was born</p>
          </div>
          <div className={styles.achivment}>
            <h1>12</h1>
            <p>Number of my projects, ranging from small websites to more extensive applications.</p>
          </div>
          <div className={styles.achivment}>
            <h1>7</h1>
            <p>Finished online courses that deepened my knowledge more and more</p>
          </div>
          <div className={styles.achivment}>
            <h1>19</h1>
            <p>The number of technologies and tools that I have met and implemented in projects</p>
          </div>
          <div className={styles.achivment}>
            <h1>1</h1>
            <p>A completed bootcamp that helped me grow more into web development</p>
          </div>
          <div className={styles.achivment}>
            <h1>10</h1>
            <p>It's been years since I first encountered code and web development</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;