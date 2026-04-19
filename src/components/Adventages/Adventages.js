import styles from './Adventages.module.scss';
import Title from '../Title/Title';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { useMediaQuery } from '@material-ui/core';

const Adventages = () => {
  const adventages = useSelector((state) => state.adventages);
  const { t } = useTranslation();

  const isLargeScreen = useMediaQuery('(min-width:968px)');

  return (
    <div>
      <Title>{t('adventages.title')}</Title>
      <div className={styles.adventages}>
        {adventages.map((adventage, index) => (
          <div
            className={styles.adventage}
            key={adventage.id}
            style={{ '--card-index': index }}
            data-aos="fade-left"
            data-aos-delay={isLargeScreen ? adventage.aosDelay : '0'}
          >
            <div className={styles.adventageImageWrap}>
              <img
                alt="adventage"
                src={adventage.image}
                className={styles.adventageImage}
              />
            </div>
            <div className={styles.adventageContent}>
              <h3 className={styles.adventageContentTitle}>
                {t(`adventages.items.${adventage.key}.title`)}
              </h3>
              <p className={styles.adventageContentDescription}>
                {t(`adventages.items.${adventage.key}.description`)}
              </p>
              <Button
                className={styles.adventageContentLink}
                href="https://github.com/Soszka"
                target="_blank"
                rel="noreferrer"
              >
                {t('adventages.button.github')}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adventages;
