import styles from './Splash.module.scss';
import Achivments from '../Achivments/Achivments';

const Splash = () => {
  return (
    <div className={styles.splash}>
      <div className={styles.content}>
        <div className={styles.image} data-aos="fade-right">
          <img alt="#" src="https://i.postimg.cc/9XtBBKrL/splash-photo.png"></img>
        </div>
        <div className={styles.description} data-aos="fade-left">
          <p><span>Hello World</span> ! My name is </p>
          <p>Bartłomiej Socha</p>
          <p>Front end Developer</p>
          <p>I have knowledge about the tools and technologies used in the development of web applications, focusing especially on the front-end area.
             My skills include designing interfaces and developing applications in React and Angular environments.
             Thanks to the acquired knowledge and skills, I am able to create attractive, interactive interfaces tailored to the unique needs of users.</p>
          <a href="#github.com" className={styles.button}>CONTACT ME</a>
        </div>
      </div>
      <Achivments />
    </div>
  );
}

export default Splash

