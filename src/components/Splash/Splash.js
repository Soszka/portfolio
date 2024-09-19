import styles from './Splash.module.scss';
import Achivments from '../Achivments/Achivments';
import splashPhoto from '../../assets/HomePhotos/splashPhoto2.png';
import Navigation from '../Navigation/Navigation';
import Button from '@material-ui/core/Button';

const Splash = () => {
  return (
    <div className={styles.splash}>
      <Navigation />
      <div className={styles.content} data-aos="zoom-in">
        <div className={styles.image}>
          <img alt="#" src={splashPhoto}></img>
        </div>
        <div className={styles.description}>
          <p><span>Hello World</span> ! My name is </p>
          <p>Bartłomiej Socha</p>
          <p>Front end Developer</p>
          <p>I have knowledge about the tools and technologies used in the development of web applications, focusing especially on the front-end area.
             My skills include designing interfaces and developing applications in React and Angular environments.
             Thanks to the acquired knowledge and skills, I am able to create attractive, interactive interfaces tailored to the unique needs of users.</p>
          <Button href="#contact" className={styles.button}>CONTACT ME</Button>
        </div>
      </div>
      <Achivments />
    </div>
  );
}

export default Splash

