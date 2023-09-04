import styles from './About.module.scss';
import Title from '../Title/Title';

const About = () => {
  return (
    <div className={styles.about}>
      <Title>About Me</Title>
      <div className={styles.description}>
      </div>
    </div>
  );
}

export default About;