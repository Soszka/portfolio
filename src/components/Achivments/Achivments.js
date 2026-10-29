import styles from './Achivments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLaptop, faShareNodes, faScrewdriverWrench, faBriefcase, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useMotionVisibility from '../../hooks/useMotionVisibility';
import useOpticalMetricAlignment from '../../hooks/useOpticalMetricAlignment';
import useScrollReveal from '../../hooks/useScrollReveal';
const icons = [faGraduationCap, faShareNodes, faLaptop, faScrewdriverWrench, faBriefcase, faCalendarDays];
const metrics = [
  { value: 2, labelKey: 'studies' },
  { value: 12, labelKey: 'projects' },
  { value: 7, labelKey: 'courses' },
  { value: 19, labelKey: 'technologies' },
  { value: 11, labelKey: 'internship' },
  { value: 2, suffix: '+', labelKey: 'experience' },
];
const countDuration = 2200;

const Achivments = () => {
  const { t } = useTranslation();
  const achivments = useSelector(state => state.achivments);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const countStarts = useRef(metrics.map(() => null));
  const internshipMetricRef = useRef(null);
  const revealStates = useScrollReveal(cardRefs, metrics.length);
  const revealed = revealStates.some(state => state.visible);
  const [counts, setCounts] = useState(() => {
    const reduceMotion = typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    return metrics.map(({ value }) => reduceMotion ? value : 0);
  });
  useOpticalMetricAlignment(internshipMetricRef, counts[4], t('achivements.internship.statLabel'));
  useMotionVisibility(sectionRef);

  useEffect(() => {
    if (!revealed) return undefined;
    const now = performance.now();
    revealStates.forEach((state, index) => {
      if (state.visible && countStarts.current[index] === null) countStarts.current[index] = now + state.delay;
    });
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const finalCounts = metrics.map(({ value }) => value);
    let frame = null;
    let completed = false;
    const finish = () => {
      completed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      setCounts(finalCounts);
    };
    const onPreferenceChange = () => { if (preference.matches) finish(); };
    preference?.addEventListener('change', onPreferenceChange);
    if (preference?.matches) {
      finish();
    } else {
      const update = now => {
        let pending = false;
        const next = metrics.map(({ value }, index) => {
          const start = countStarts.current[index];
          if (start === null) return 0;
          const progress = Math.min(1, Math.max(0, (now - start) / countDuration));
          if (progress < 1) pending = true;
          return Math.floor(value * progress);
        });
        setCounts(current => next.some((count, index) => count !== current[index]) ? next : current);
        if (pending && !completed) frame = requestAnimationFrame(update);
        else frame = null;
      };
      frame = requestAnimationFrame(update);
    }
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      preference?.removeEventListener('change', onPreferenceChange);
    };
  }, [revealed, revealStates]);

  return <section className={styles.achivments} ref={sectionRef} data-revealed={revealed} aria-label={t('achivements.label')}>
    <div className={styles.container}>
      {achivments.map((item, index) => <div className={styles.achievementSlot} key={item.id}
        ref={element => { cardRefs.current[index] = element; }} data-revealed={revealStates[index].visible}
        style={{ '--reveal-delay': `${revealStates[index].delay}ms` }}>
        <article className={styles.achivment}>
          <div className={styles.achivmentHeader}>
            <span className={styles.iconWrap}><FontAwesomeIcon icon={icons[index]} aria-hidden="true" /></span>
            <h3>{t(item.titleKey)}</h3>
          </div>
          <p>{t(item.descriptionKey)}</p>
          <div className={styles.metric} role="img" data-metric={metrics[index].labelKey}
            ref={index === 4 ? internshipMetricRef : undefined}
            aria-label={`${metrics[index].value}${metrics[index].suffix || ''} ${t(`achivements.${metrics[index].labelKey}.statLabel`)}`}>
            <span className={styles.metricNumber} aria-hidden="true">{counts[index]}{metrics[index].suffix || ''}</span>
            <span className={styles.metricLabel} aria-hidden="true">{t(`achivements.${metrics[index].labelKey}.statLabel`)}</span>
          </div>
          <span className={styles.lightTrace} aria-hidden="true" />
          <span className={styles.borderOrbit} aria-hidden="true" />
          <span className={styles.hoverFlash} aria-hidden="true" />
        </article></div>)}
    </div>
  </section>;
};
export default Achivments;
