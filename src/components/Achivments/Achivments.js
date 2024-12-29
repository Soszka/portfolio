import styles from './Achivments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Achivments = () => {
  const { t } = useTranslation();
  const achivments = useSelector((state) => state.achivments);

  return (
    <div className={styles.achivments}>
      <div className={styles.container}>
        {achivments.map((achivment) => (
          <div
            className={styles.achivment}
            key={achivment.id}
            data-aos="zoom-in"
          >
            <FontAwesomeIcon
              className={styles.achivmentIcon}
              icon={achivment.icon}
            />
            <h3>{t(achivment.titleKey)}</h3>
            <p>{t(achivment.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achivments;
