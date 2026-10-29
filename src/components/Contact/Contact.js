import { useRef } from 'react';
import styles from './Contact.module.scss';
import Title from '../Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import useMotionVisibility from '../../hooks/useMotionVisibility';
const channels = [
  { key: 'linkedin', name: 'LinkedIn', icon: faLinkedin, href: 'https://www.linkedin.com/in/bart%C5%82omiej-socha-95ba1b29a' },
  { key: 'github', name: 'GitHub', icon: faGithub, href: 'https://github.com/Soszka' },
];
const Contact = () => {
  const motionRef = useRef(null);
  useMotionVisibility(motionRef);
  const { t } = useTranslation();
  return <section className={styles.contact} id="contact" ref={motionRef}>
    <Title>{t('contact.title')}</Title>
    <div className={styles.cards}>{channels.map(channel => <a
      key={channel.key} className={`${styles.card} ${styles[channel.key]}`}
      href={channel.href} target="_blank" rel="noopener noreferrer">
      <span className={styles.icon}><FontAwesomeIcon icon={channel.icon} aria-hidden="true" /></span>
      <h3>{channel.name}</h3>
      <p>{t(`contact.items.${channel.key}.description`)}</p>
      <span className={styles.action}><span>{t(`contact.items.${channel.key}.action`)}</span><FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></span>
    </a>)}</div>
  </section>;
};
export default Contact;
