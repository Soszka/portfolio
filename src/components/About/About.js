import styles from './About.module.scss';
import { Link } from 'react-router-dom';
import Title from '../Title/Title';
import Animation from '../Animation/Animation';
import { useEffect } from 'react';

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className={styles.about}>
      <Title>About Me</Title>
      <div className={styles.content}>
        <div className={styles.description} data-aos="zoom-in">
          <p>I graduated from two different faculties, earning the title of Energy Engineer and Project Manager. My interest in programming and front-end technologies appeared in this period,
             when I created my first website during my studies at the Faculty of Computer Science. In addition, I participated in an intensive programming bootcamp, which further strengthened my programming skills.
             Over the next months, I explored this knowledge by implementing many online courses and creating my own concepts, which you can find in the - projects tab.
             Thanks to this, I got to know a variety of front-end technologies and gained the skills needed to create modern user interfaces.
             In my private life, I put great emphasis on self-development and skilful time management.
            I believe that efficiently managed time and consistency is the key to continuous self-development.
          </p>
          <div className={styles.buttonsContainer}>
            <a href="https://github.com/Soszka" rel="noreferrer" target="_blank"className={styles.button}>GITHUB</a>
            <a href="https://www.linkedin.com/in/bart%C5%82omiej-socha-95ba1b29a/" rel="noreferrer" target="_blank" className={styles.button}>LINKEDIN</a>
          </div> 
        </div>
        <Animation />
      </div>
    </div>
  );
}

export default About;