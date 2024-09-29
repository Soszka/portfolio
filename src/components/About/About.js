import styles from './About.module.scss';
import Title from '../Title/Title';
import Animation from '../Animation/Animation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.about}>
      <Title>{t('about.title')}</Title>
      <div className={styles.content}>
        <div className={styles.description} data-aos="slide-right">
          <p>{t('about.description')}</p>
        </div>
        <Animation />
      </div>
    </div>
  );
};

export default About;
