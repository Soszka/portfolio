import { useRef } from 'react';
import styles from './Contact.module.scss';
import Title from '../Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import useMotionVisibility from '../../hooks/useMotionVisibility';
import useScrollReveal from '../../hooks/useScrollReveal';
const channels = [
  { key: 'linkedin', name: 'LinkedIn', icon: faLinkedinIn, href: 'https://www.linkedin.com/in/bart%C5%82omiej-socha-95ba1b29a' },
  { key: 'github', name: 'GitHub', icon: faGithub, href: 'https://github.com/Soszka' },
];
const Contact = () => {
  const motionRef = useRef(null);
  const revealRefs = useRef([]);
  const reveals = useScrollReveal(revealRefs, 3);
  useMotionVisibility(motionRef);
  const { t } = useTranslation();
  return <section className={styles.contact} id="contact" ref={motionRef}>
    <div className={styles.titleReveal} ref={el => { revealRefs.current[0] = el; }}
      data-revealed={reveals[0].visible} style={{ '--reveal-delay': `${reveals[0].delay}ms` }}>
      <Title>{t('contact.title')}</Title>
    </div>
    <div className={styles.cards}>
      {channels.map((channel, index) => <div key={channel.key}
        className={`${styles.cardReveal} ${styles[channel.key]}`} ref={el => { revealRefs.current[index + 1] = el; }}
        data-revealed={reveals[index + 1].visible} style={{ '--reveal-delay': `${reveals[index + 1].delay}ms` }}>
        <a className={styles.card} href={channel.href} target="_blank" rel="noopener noreferrer">
          <h3>{channel.name}</h3>
          <p>{t(`contact.items.${channel.key}.description`)}</p>
          <span className={styles.visual} aria-hidden="true">
            <span className={styles.icon}><FontAwesomeIcon icon={channel.icon} /></span>
          </span>
        </a></div>)}
    </div>
  </section>;
};
export default Contact;
