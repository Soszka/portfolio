import styles from './Adventages.module.scss';
import Title from '../Title/Title';

const Adventages = () => {
  return (
    <div>
      <Title>Why Me</Title>
      <div className={styles.adventages}>
        <div className={styles.adventage} data-aos="zoom-in">
          <img alt="adventage" src="https://i.postimg.cc/sDQH0Cbq/Zrzut-ekranu-2023-09-28-211542.png"></img>
          <div className={styles.adventageContent}>
            <h3>Responsivness</h3>
            <p>Pages that adapt perfectly to different devices and screen sizes</p>
            <a href="https://github.com/Soszka">sEE gITHUB</a>
          </div>
        </div>
        <div className={styles.adventage} data-aos="zoom-in" data-aos-delay="250">
          <img alt="adventage" src="https://i.postimg.cc/R03KVN0S/pexels-negative-space-160107.jpg"></img>
          <div className={styles.adventageContent}>
            <h3>UX/UI</h3>
            <p>Design with an emphasis on the user, ensuring intuitive and aesthetic user interfaces</p>
            <a href="https://github.com/Soszka">sEE gITHUB</a>
          </div>
        </div>
        <div className={styles.adventage} data-aos="zoom-in" data-aos-delay="500">
          <img alt="adventage" src="https://i.postimg.cc/6qxKk8Qq/React-Redux2.png"></img>
          <div className={styles.adventageContent}>
            <h3>Libraries</h3>
            <p>Effective use of popular libraries for optimized project work</p>
            <a href="https://github.com/Soszka">sEE gITHUB</a>
          </div>
        </div>
        <div className={styles.adventage} data-aos="zoom-in">
          <img alt="adventage" src="https://i.postimg.cc/85DrTzcK/Angular-Ng-Rx2.png"></img>
          <div className={styles.adventageContent}>
            <h3>Frameworks</h3>
            <p>Ability to create dynamic applications using advanced frameworks</p>
            <a href="https://github.com/Soszka">sEE gITHUB</a>
          </div>
        </div>
        <div className={styles.adventage} data-aos="zoom-in" data-aos-delay="250">
          <img alt="adventage" src="https://i.postimg.cc/sgmwZQy5/Computer-programmer-jpeg.jpg"></img>
          <div className={styles.adventageContent}>
            <h3>Optimization</h3>
            <p>Page optimization for better performance and loading speed</p>
            <a href="https://github.com/Soszka">sEE gITHUB</a>
          </div>
        </div>
        <div className={styles.adventage} data-aos="zoom-in" data-aos-delay="500">
          <img alt="adventage" src="https://i.postimg.cc/8zXLShNX/pexels-kevin-ku-577585.jpg"></img>
          <div className={styles.adventageContent}>
            <h3>Creativity</h3>
            <p>A creative approach to solving problems and designing unique solutions</p>
            <a href="https://github.com/Soszka">sEE gITHUB</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adventages;