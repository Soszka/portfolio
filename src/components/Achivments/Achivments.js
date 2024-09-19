import styles from './Achivments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const Achivments = () => {
  const achivments = useSelector((state) => state.achivments);

  return (
    <div className={styles.achivments}>
      {achivments.map((achivment) => (
        <div className={styles.achivment} key={achivment.id} data-aos="zoom-in">
          <FontAwesomeIcon
            className={styles.achivmentIcon}
            icon={achivment.icon}
          />
          <h3>{achivment.title}</h3>
          <p>{achivment.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Achivments;
