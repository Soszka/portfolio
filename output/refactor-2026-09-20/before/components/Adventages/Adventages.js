import styles from './Adventages.module.scss';
import Title from '../Title/Title';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import useMotionVisibility from '../../hooks/useMotionVisibility';
import interfaces from '../../assets/HomePhotos/expertise-interfaces.webp';
import frontend from '../../assets/HomePhotos/expertise-frontend.webp';
import backend from '../../assets/HomePhotos/expertise-backend.webp';
import testing from '../../assets/HomePhotos/expertise-testing.webp';
import delivery from '../../assets/HomePhotos/expertise-delivery.webp';
import architecture from '../../assets/HomePhotos/expertise-architecture.webp';
const cards = [{ key: 'interfaces', image: interfaces }, { key: 'frontend', image: frontend }, { key: 'backend', image: backend }, { key: 'testing', image: testing }, { key: 'delivery', image: delivery }, { key: 'architecture', image: architecture }];
const Adventages = () => {
  const motionRef = useRef(null);
  useMotionVisibility(motionRef);
  const { t } = useTranslation();
  return <section className={styles.section} ref={motionRef}>
    <Title accentWords={[1, 3]}>{t('expertise.title')}</Title>
    <p className={styles.subtitle}>{t('expertise.subtitle')}</p>
    <div className={styles.cards}>
      {cards.map(card => <article className={`${styles.card} ${styles[card.key] || ''}`} key={card.key}>
        <img alt="" loading="lazy" decoding="async" src={card.image} className={styles.image} />
        <div className={styles.content}>
          <h3>{t(`expertise.items.${card.key}.title`)}</h3>
          <p>{t(`expertise.items.${card.key}.description`)}</p>
        </div>
        <span className={styles.accent} aria-hidden="true" />
      </article>)}
    </div>
    <p className={styles.caption}>{t('expertise.caption')}</p>
  </section>;
};
export default Adventages;
