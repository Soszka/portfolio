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
      <span className={styles.date}>{date}</span>
      <span className={styles.label} aria-hidden="true">{title}</span>
      <span id={descriptionId} className={styles.description} aria-hidden={!expanded}>
        {t(`journey.items.${item.key}.description`)}
      </span>
      <span className={styles.glare} data-tilt-glare aria-hidden="true" />
      <svg className={styles.frame} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className={styles.frameOutline} vectorEffect="non-scaling-stroke"
          d="M50 3H450L500 53L550 3H950L997 50V950L950 997H50L3 950V50Z" />
      </svg>
      <svg className={`${styles.frame} ${styles.frameAccentsRest}`} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className={styles.frameAccents} vectorEffect="non-scaling-stroke"
          d="M3 65V50L50 3H70 M930 3H950L997 50V65 M997 935V950L950 997H930 M70 997H50L3 950V935 M480 33L500 53L520 33 M465 997H535" />
      </svg>
      <svg className={`${styles.frame} ${styles.frameAccentsExpanded}`} viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className={styles.frameAccents} vectorEffect="non-scaling-stroke"
          d="M3 105V50L50 3H115 M885 3H950L997 50V105 M997 895V950L950 997H885 M115 997H50L3 950V895 M470 23L500 53L530 23 M445 997H555" />
      </svg>
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
