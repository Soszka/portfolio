import styles from './Journey.module.scss';
import Title from '../Title/Title';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import useMotionVisibility from '../../hooks/useMotionVisibility';
import useCardTilt from '../../hooks/useCardTilt';
import useScrollReveal from '../../hooks/useScrollReveal';
import studies from '../../assets/HomePhotos/journey-studies-v8.webp';
import courses from '../../assets/HomePhotos/journey-courses-v8.webp';
import internship from '../../assets/HomePhotos/journey-internship-v8.webp';
import work from '../../assets/HomePhotos/journey-work-v8.webp';

const items = [
  { key: 'studies', image: studies },
  { key: 'courses', image: courses },
  { key: 'internship', image: internship },
  { key: 'work', image: work },
];

const JourneyCard = ({ item }) => {
  const { t } = useTranslation();
  const tilt = useCardTilt();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const expanded = !dismissed && (hovered || focused);
  const descriptionId = `journey-${item.key}-description`;
  const title = t(`journey.items.${item.key}.title`);
  const date = t(`journey.items.${item.key}.date`);

  useEffect(() => {
    if (!expanded) return undefined;
    const dismiss = event => {
      if (event.key === 'Escape') { setDismissed(true); setFocused(false); }
    };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [expanded]);

  return <article className={styles.journeyItem} data-expanded={expanded}
    onPointerMove={tilt.onPointerMove}
    onPointerCancel={tilt.onPointerLeave}
    onPointerEnter={event => {
      if (event.pointerType === 'mouse') { setHovered(true); setDismissed(false); }
    }}
    onPointerLeave={event => { tilt.onPointerLeave(event); setHovered(false); }}
  >
    <span className={styles.journeyNode} aria-hidden="true" />
    <div role="group" tabIndex={0} className={styles.card} data-tilt-card
      aria-label={`${title}, ${date}`}
      aria-describedby={expanded ? descriptionId : undefined}
      onFocus={event => {
        if (event.currentTarget.matches(':focus-visible')) { setFocused(true); setDismissed(false); }
      }}
      onBlur={() => { setFocused(false); setDismissed(false); }}
    >
      <img className={styles.image} data-tilt-image src={item.image} alt="" loading="lazy" decoding="async" />
      <span className={styles.shade} aria-hidden="true" />
      <span className={styles.descriptionShade} aria-hidden="true" />
      <span className={styles.date}><span className={styles.dateText}>{date}</span></span>
      <span className={styles.label} aria-hidden="true">{title}</span>
      <span id={descriptionId} className={styles.description} aria-hidden={!expanded}>
        {t(`journey.items.${item.key}.description`)}
      </span>
      <span className={styles.glare} data-tilt-glare aria-hidden="true" />
      <span className={styles.borderGlow} aria-hidden="true" />
    </div>
  </article>;
};

const Journey = () => {
  const motionRef = useRef(null);
  const revealRefs = useRef([]);
  const revealStates = useScrollReveal(revealRefs, 5);
  useMotionVisibility(motionRef);
  const { t } = useTranslation();
  return <section className={styles.journey} ref={motionRef}>
    <div className={styles.titleReveal} ref={element => { revealRefs.current[0] = element; }}
      data-revealed={revealStates[0].visible} style={{ '--reveal-delay': `${revealStates[0].delay}ms` }}>
      <Title>{t('journey.title')}</Title>
    </div>
    <div className={styles.journeyItems} data-revealed={revealStates.slice(1).some(state => state.visible)}>
      {items.map((item, index) => <div className={styles.journeyReveal} key={item.key}
        ref={element => { revealRefs.current[index + 1] = element; }} data-revealed={revealStates[index + 1].visible}
        style={{ '--reveal-delay': `${revealStates[index + 1].delay}ms`, '--reveal-angle': `${index % 2 ? 3 : -3}deg` }}>
        <JourneyCard item={item} />
      </div>)}
    </div>
  </section>;
};
export default Journey;
