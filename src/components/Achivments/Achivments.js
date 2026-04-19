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
        {achivments.map((achivment, index) => (
          <article
            className={styles.achivment}
            key={achivment.id}
            data-aos="fade-up"
            data-aos-delay={index * 120}
            data-aos-duration="900"
          >
            <div className={styles.achivmentHeader}>
              <div className={styles.iconWrap}>
                <FontAwesomeIcon
                  className={styles.achivmentIcon}
                  icon={achivment.icon}
                />
              </div>
            </div>
            <h3>{t(achivment.titleKey)}</h3>
            <p>{t(achivment.descriptionKey)}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Achivments;
