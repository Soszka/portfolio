import styles from './Adventages.module.scss';
import Title from '../Title/Title';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import useMotionVisibility from '../../hooks/useMotionVisibility';
import useScrollReveal from '../../hooks/useScrollReveal';
import interfaces from '../../assets/HomePhotos/expertise-v4/interfaces.webp';
import frontend from '../../assets/HomePhotos/expertise-v3/frontend.webp';
import backend from '../../assets/HomePhotos/expertise-v4/backend.webp';
import testing from '../../assets/HomePhotos/expertise-v3/testing.webp';
import delivery from '../../assets/HomePhotos/expertise-v3/delivery.webp';
import architecture from '../../assets/HomePhotos/expertise-v4/architecture.webp';
const cards = [
  { key: 'frontend', image: frontend },
  { key: 'interfaces', image: interfaces },
  { key: 'testing', image: testing },
  { key: 'backend', image: backend },
  { key: 'delivery', image: delivery },
  { key: 'architecture', image: architecture },
];
const Adventages = () => {
  const motionRef = useRef(null);
  const revealRefs = useRef([]);
  const revealStates = useScrollReveal(revealRefs, 7);
  useMotionVisibility(motionRef);
  const { t } = useTranslation();
  return <section id="expertise" aria-label={t('expertise.title')} className={styles.section} ref={motionRef}>
    <div className={styles.titleReveal} ref={element => { revealRefs.current[0] = element; }}
      data-revealed={revealStates[0].visible} style={{ '--reveal-delay': `${revealStates[0].delay}ms` }}>
      <Title accentWords={[1, 3]}>{t('expertise.title')}</Title>
    </div>
    <div className={styles.cards}>
      {cards.map((card, index) => <div className={styles.cardReveal} key={card.key}
        ref={element => { revealRefs.current[index + 1] = element; }} data-revealed={revealStates[index + 1].visible}
        style={{ '--reveal-delay': `${revealStates[index + 1].delay}ms` }}>
        <article className={styles.card} aria-labelledby={`expertise-${card.key}`}>
          <div className={styles.media} aria-hidden="true">
            <img alt="" loading="lazy" decoding="async" width="1536" height="768" src={card.image} className={styles.image} />
            <span className={styles.imageGlow} />
          </div>
          <div className={styles.content}>
            <h3 id={`expertise-${card.key}`}>{t(`expertise.items.${card.key}.title`)}</h3>
            <p>{t(`expertise.items.${card.key}.description`)}</p>
          </div>
          <span className={styles.borderGlow} aria-hidden="true" />
        </article></div>)}
    </div>
  </section>;
};
export default Adventages;
