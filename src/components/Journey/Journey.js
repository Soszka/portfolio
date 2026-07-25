import styles from './Journey.module.scss';
import Title from '../Title/Title';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import { useState } from 'react';

const Journey = () => {
  const journeyItems = useSelector((state) => state.journeyItems);
  const { t } = useTranslation();
  const [flippedId, setFlippedId] = useState(null);

  const isLargeScreen = useMediaQuery('(min-width:968px)');

  const handleCardToggle = (event, id) => {
    if (
      event.pointerType === 'mouse' ||
      event.target.closest('a, button')
    ) {
      return;
    }

    const isClosing = flippedId === id;
    setFlippedId((currentId) => (currentId === id ? null : id));

    if (isClosing) {
      event.currentTarget.blur();
    }
  };

  return (
    <section className={styles.journey}>
      <Title>{t('journey.title')}</Title>
      <div className={styles.journeyItems}>
        {journeyItems.map((journeyItem, index) => {
          const translatedTitle = t(
            `journey.items.${journeyItem.key}.title`
          );

          return (
            <article
              key={journeyItem.id}
              className={clsx(styles.journeyItem, {
                [styles.isFlipped]: flippedId === journeyItem.id,
              })}
              data-aos="zoom-in"
              data-aos-delay={isLargeScreen ? journeyItem.aosDelay : '0'}
              style={{ '--journey-delay': `${index * 0.65}s` }}
              tabIndex="0"
              aria-label={translatedTitle}
              onPointerUp={(event) =>
                handleCardToggle(event, journeyItem.id)
              }
            >
              <span className={styles.journeyNode} aria-hidden="true" />
              <div className={styles.journeyItemCard}>
                <div
                  className={clsx(
                    styles.journeyItemCardFront,
                    styles[journeyItem.image]
                  )}
                >
                  <div className={styles.journeyItemTitleWrap}>
                    <span
                      className={styles.journeyItemAccent}
                      aria-hidden="true"
                    />
                    <h3 className={styles.journeyItemTitle}>
                      {translatedTitle}
                    </h3>
                  </div>
                </div>
                <div className={styles.journeyItemCardBack}>
                  <div className={styles.journeyItemCardBackContainer}>
                    <h3 className={styles.journeyItemCardBackTitle}>
                      {translatedTitle}
                    </h3>
                    <span
                      className={styles.journeyItemCardBackAccent}
                      aria-hidden="true"
                    />
                    <p className={styles.journeyItemCardBackContent}>
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
                      rel={journeyItem.isExternal ? 'noreferrer' : undefined}
                      className={styles.journeyItemCardBackBtn}
                    >
                      {t(`journey.button.${journeyItem.buttonKey}`)}
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Journey;
