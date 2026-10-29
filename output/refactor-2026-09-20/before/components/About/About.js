import styles from './About.module.scss';
import Title from '../Title/Title';
import Animation from '../Animation/Animation';
import ShimmerText from '../ShimmerText/ShimmerText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDesktop, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import useMotionVisibility from '../../hooks/useMotionVisibility';
import { useTranslation } from 'react-i18next';
const stats = [['programming', faCode], ['frontend', faDesktop], ['backend', faDatabase]];
const About = () => {
  const motionRef = useRef(null);
  useMotionVisibility(motionRef);
  const { t } = useTranslation();
  return <section className={styles.about} ref={motionRef}>
    <span className={styles.backgroundGrid} aria-hidden="true" />
    <Title>{t('about.title')}</Title>
    <div className={styles.content}>
      <div className={styles.descriptionCard}>
        <div className={styles.paragraphs}>
          <p>{t('about.intro')} <ShimmerText accent>Angular</ShimmerText> {t('about.and')} <ShimmerText accent>Spring</ShimmerText>.</p>
          <p>{t('about.approach')}</p>
        </div>
        <div className={styles.stats}>{stats.map(([key, icon]) => <div className={styles.stat} key={key}>
          <FontAwesomeIcon icon={icon} aria-hidden="true" />
          <div><h3>{t(`about.stats.${key}.title`)}</h3><p>{t(`about.stats.${key}.detail`)}</p></div>
        </div>)}</div>
      </div>
      <Animation />
    </div>
  </section>;
};
export default About;
