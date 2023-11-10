import styles from './Journey.module.scss';
import Title from '../Title/Title';
import { useSelector } from 'react-redux';

const Journey = () => {

  const journeyItems = useSelector(state => state.journeyItems);

  return (
    <div className={styles.journey}>
      <Title>My Journey</Title>
      <div className={styles.journeyItems}>
        {journeyItems.map((journeyItem) => (
          <div className={styles.journeyItem} key={journeyItem.id} data-aos="slide-up" data-aos-delay={journeyItem.aosDelay}>
            <img src ={journeyItem.image} alt={journeyItem.title}/>
            <h2>{journeyItem.title}</h2>
            <p>{journeyItem.description}</p>
            <a href="https://github.com/Soszka" rel="noreferrer" target="_blank">SEE GITHUB</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Journey;