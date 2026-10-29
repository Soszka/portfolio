import styles from './Journey.module.scss';
import Title from '../Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBookOpen, faBriefcase, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import useMotionVisibility from '../../hooks/useMotionVisibility';
import useCardTilt from '../../hooks/useCardTilt';
import studies from '../../assets/HomePhotos/journey-studies-v2.webp';
import courses from '../../assets/HomePhotos/journey-courses-v2.webp';
import internship from '../../assets/HomePhotos/journey-internship-v2.webp';
import work from '../../assets/HomePhotos/journey-work-v2.webp';
const items = [
  { key: 'studies', image: studies, icon: faGraduationCap },
  { key: 'courses', image: courses, icon: faBookOpen },
  { key: 'internship', image: internship, icon: faBriefcase },
  { key: 'work', image: work, icon: faDesktop },
];
const JourneyCard = ({ item }) => {
  const { t } = useTranslation();
  const tilt = useCardTilt();
  return <article className={styles.journeyItem} {...tilt}>
    <span className={styles.journeyNode} aria-hidden="true" />
    <div className={styles.card}>
      <img className={styles.image} src={item.image} alt="" loading="lazy" decoding="async" />
      <span className={styles.shade} aria-hidden="true" />
      <span className={styles.date}>{t(`journey.items.${item.key}.date`)}</span>
      <div className={styles.info}>
        <h3><span className={styles.icon}><FontAwesomeIcon icon={item.icon} aria-hidden="true" /></span>{t(`journey.items.${item.key}.title`)}</h3>
        <p>{t(`journey.items.${item.key}.description`)}</p>
      </div>
      <span className={styles.glare} aria-hidden="true" />
    </div>
  </article>;
};
const Journey = () => {
  const motionRef = useRef(null);
  useMotionVisibility(motionRef);
  const { t } = useTranslation();
  return <section className={styles.journey} ref={motionRef}>
    <Title>{t('journey.title')}</Title>
    <div className={styles.journeyItems}>{items.map(item => <JourneyCard key={item.key} item={item} />)}</div>
  </section>;
};
export default Journey;
