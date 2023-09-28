import styles from './Contact.module.scss';
import Title from '../Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faDiscord, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Contact = () => {
  return (
    <div>
      <Title>Contact Me</Title>
      <div className={styles.contact}>
        <div className={styles.contactForm}>
          <h4>Fill in the<span> Form</span></h4>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" autoComplete="off" name="first-name" placeholder="John" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" autoComplete="off" name="email" placeholder="your@email.com" className={styles.input} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Hello!" className={styles.textarea} />
          </div>
          <a href="#linkedin.com" className={`${styles.button} ${styles.sendButton}`}>SEND MESSAGE</a>
        </div>
        <div className={styles.contactOptions}>
          <h4>Other Contact<span> Options</span></h4>
          <a href="#linkedin.com" className={`${styles.button} ${styles.contactButton}`}>
            <FontAwesomeIcon icon={faLinkedin} className={styles.icon} /> LinkedIn
          </a>
          <a href="#discord.com" className={`${styles.button} ${styles.contactButton}`}>
            <FontAwesomeIcon icon={faDiscord} className={styles.icon} /> Discord
          </a>
          <a href="mailto:bsocha1998@gmail.com" className={`${styles.button} ${styles.contactButton}`}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> bsocha1998@gmail.com
          </a>
          <div className={styles.contactIcons}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
            <FontAwesomeIcon icon={faGithub} className={styles.contactIcon} />
            <FontAwesomeIcon icon={faInstagram} className={styles.contactIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;