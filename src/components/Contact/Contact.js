import styles from './Contact.module.scss';
import Title from '../Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faDiscord, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Contact = () => {
  return (
    <div>
      <Title>Contact Me</Title>
      <div className={styles.contact} id="contact">
        <div className={styles.contactForm}  data-aos="slide-right">
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
        <div className={styles.contactOptions} data-aos="slide-left">
          <h4>Other Contact<span> Options</span></h4>
          <a href="https://www.linkedin.com/in/bart%C5%82omiej-socha-95ba1b29a/" rel="noreferrer" target="_blank" className={`${styles.button} ${styles.contactButton}`}>
            <FontAwesomeIcon icon={faLinkedin} className={styles.icon} /> LinkedIn
          </a>
          <a href="https://discord.gg/ZPP728gUqz" rel="noreferrer" target="_blank" className={`${styles.button} ${styles.contactButton}`}>
            <FontAwesomeIcon icon={faDiscord} className={styles.icon} /> Discord
          </a>
          <a href="mailto:bsocha1998@gmail.com" className={`${styles.button} ${styles.contactButton}`}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> bsocha1998@gmail.com
          </a>
          <div className={styles.contactIcons}>
            <a href="mailto:bsocha1998@gmail.com"><FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} /></a>
            <a href="https://github.com/Soszka" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faGithub} className={styles.contactIcon} /></a>
            <a href="https://www.instagram.com/sochaczewek/" rel="noreferrer" target="_blank"> <FontAwesomeIcon icon={faInstagram} className={styles.contactIcon} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;