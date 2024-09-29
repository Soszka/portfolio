import React from 'react';
import styles from './Contact.module.scss';
import Title from '../Title/Title';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const contactItems = useSelector((state) => state.contactItems);
  const { t } = useTranslation();

  return (
    <div className={styles.contact} id="contact">
      <Title>{t('contact.title')}</Title>
      <h3 data-aos="zoom-in" className={styles.contactHeader}>
        {t('contact.header1')} <span>{t('contact.header2')}</span>:
      </h3>
      <div className={styles.contactTypes}>
        {contactItems.map((item) => (
          <Button
            key={item.id}
            component="a"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            data-aos="zoom-in"
            data-aos-delay={item.aosDelay}
            startIcon={
              <FontAwesomeIcon
                icon={item.icon}
                className={styles.contactTypesIcon}
              />
            }
            className={styles.contactTypesButton}
          >
            {t(`contact.items.${item.key}.name`)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Contact;
