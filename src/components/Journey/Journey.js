import styles from './Journey.module.scss';
import Title from '../Title/Title';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';

const Journey = () => {
  const journeyItems = useSelector((state) => state.journeyItems);
  const { t } = useTranslation();

  const isLargeScreen = useMediaQuery('(min-width:968px)');

  return (
    <div className={styles.journey}>
      <Title>{t('journey.title')}</Title>
      <div className={styles.journeyItems}>
        {journeyItems.map((journeyItem) => (
          <div
            key={journeyItem.id}
            className={styles.journeyItem}
            data-aos="zoom-in"
            data-aos-delay={isLargeScreen ? journeyItem.aosDelay : '0'}
          >
            <div className={styles.journeyItemCard}>
              <div
                className={clsx(
                  styles.journeyItemCardFront,
                  styles[journeyItem.image]
                )}
              >
                <h5 className={styles.journeyItemTitle}>
                  {t(`journey.items.${journeyItem.key}.title`)}
                </h5>
              </div>
              <div className={styles.journeyItemCardBack}>
                <div className={styles.journeyItemCardBackContainer}>
                  <p className={styles.journeyItemCardBackContainer}>
                    {t(`journey.items.${journeyItem.key}.description`)}
                  </p>
                  <Button
                    component={journeyItem.isExternal ? 'a' : Link}
                    href={
                      journeyItem.isExternal
                        ? journeyItem.buttonHref
                        : undefined
                    }
                    to={
                      journeyItem.isExternal
                        ? undefined
                        : journeyItem.buttonHref
                    }
                    target={journeyItem.isExternal ? '_blank' : undefined}
                    className={styles.journeyItemCardBackBtn}
                  >
                    {t(`journey.button.${journeyItem.buttonKey}`)}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
