import styles from './About.module.scss';
import Title from '../Title/Title';
import Animation from '../Animation/Animation';
import ShimmerText from '../ShimmerText/ShimmerText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDesktop, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import useMotionVisibility from '../../hooks/useMotionVisibility';
import useScrollReveal from '../../hooks/useScrollReveal';
import { useTranslation } from 'react-i18next';
const stats = [['programming', faCode], ['frontend', faDesktop], ['backend', faDatabase]];
const About = () => {
  const motionRef = useRef(null);
  const revealRefs = useRef([]);
  const revealStates = useScrollReveal(revealRefs, 6);
  useMotionVisibility(motionRef);
  const { t } = useTranslation();

  return <section className={styles.about} ref={motionRef}>
    <div className={styles.titleReveal} ref={element => { revealRefs.current[0] = element; }}
      data-reveal-part="title" data-revealed={revealStates[0].visible} style={{ '--reveal-delay': `${revealStates[0].delay}ms` }}>
      <Title>{t('about.title')}</Title>
    </div>
    <div className={styles.content}>
      <div className={styles.descriptionCard} ref={element => { revealRefs.current[1] = element; }}
        data-reveal-part="card" data-revealed={revealStates[1].visible} style={{ '--reveal-delay': `${revealStates[1].delay}ms` }}>
        <div className={styles.paragraphs}>
          <p>{t('about.intro')} <ShimmerText accent>{t('about.angular')}</ShimmerText> {t('about.and')} <ShimmerText accent>{t('about.spring')}</ShimmerText>.</p>
          <p>{t('about.approach')}</p>
        </div>
        <div className={styles.stats}>{stats.map(([key, icon], index) => <div className={styles.statReveal} key={key}
          ref={element => { revealRefs.current[index + 3] = element; }} data-reveal-part={`stat-${key}`}
          data-revealed={revealStates[index + 3].visible} style={{ '--reveal-delay': `${revealStates[index + 3].delay}ms` }}>
          <div className={styles.stat}>
            <FontAwesomeIcon icon={icon} aria-hidden="true" />
            <div><h3>{t(`about.stats.${key}.title`)}</h3><p>{t(`about.stats.${key}.detail`)}</p></div>
          </div></div>)}</div>
        <span className={styles.cardOrbit} aria-hidden="true" />
      </div>
      <div className={styles.portraitReveal} ref={element => { revealRefs.current[2] = element; }}
        data-reveal-part="portrait" data-revealed={revealStates[2].visible} style={{ '--reveal-delay': `${revealStates[2].delay}ms` }}>
        <Animation />
      </div>
    </div>
  </section>;
};
export default About;
