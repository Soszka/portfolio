import styles from './Adventages.module.scss';
import Title from '../Title/Title';
import { useSelector } from 'react-redux';

const Adventages = () => {

  const adventages = useSelector(state => state.adventages);

  return (
    <div>
      <Title>Why Me</Title>
      <div className={styles.adventages}>
        {adventages.map((adventage) => (
          <div className={styles.adventage} key={adventage.id} data-aos="zoom-in" data-aos-delay={adventage.aosDelay}>
            <img alt="adventage" src={adventage.image}></img>
            <div className={styles.adventageContent}>
              <h3>{adventage.title}</h3>
              <p>{adventage.description}</p>
              <a href="https://github.com/Soszka" rel="noreferrer" target="_blank">see github</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adventages;