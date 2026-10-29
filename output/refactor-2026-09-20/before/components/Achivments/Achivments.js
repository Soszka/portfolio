import styles from './Achivments.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFileCircleCheck, faGear, faBriefcase, faChartSimple, faGraduationCap, faLaptop, faShareNodes, faScrewdriverWrench, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useMotionVisibility from '../../hooks/useMotionVisibility';
const icons = [faGraduationCap, faShareNodes, faLaptop, faScrewdriverWrench, faBriefcase, faCalendarDays];
const backdropIcons = [faGraduationCap, faCode, faFileCircleCheck, faGear, faBriefcase, faChartSimple];
const Achivments = () => {
  const { t } = useTranslation();
  const achivments = useSelector(state => state.achivments);
  const sectionRef = useRef(null);
  useMotionVisibility(sectionRef);
  return <section className={styles.achivments} ref={sectionRef} aria-label={t('achivements.label')}>
    <div className={styles.container}>
      {achivments.map((item, index) => <article className={styles.achivment} key={item.id}>
        <FontAwesomeIcon className={styles.backdropIcon} icon={backdropIcons[index]} aria-hidden="true" />
        <div className={styles.achivmentHeader}>
          <span className={styles.iconWrap}><FontAwesomeIcon icon={icons[index]} aria-hidden="true" /></span>
          <h3>{t(item.titleKey)}</h3>
        </div>
        <p>{t(item.descriptionKey)}</p>
        <span className={styles.lightTrace} aria-hidden="true" />
      </article>)}
    </div>
    <p className={styles.caption}>{t('achivements.caption')}</p>
  </section>;
};
export default Achivments;
