import React, { useState } from 'react';
import styles from './Contact.module.scss';
import Title from '../Title/Title';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Contact = () => {
  const contactItems = useSelector((state) => state.contactItems);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleButtonClick = (e, item) => {
    if (item.key !== 'linkedin') {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
            onClick={(e) => handleButtonClick(e, item)}
          >
            {t(`contact.items.${item.key}.name`)}
          </Button>
        ))}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={t('contact.snackbarMessage')}
        ContentProps={{
          style: {
            backgroundColor: 'lightgrey',
            color: 'black',
            fontWeight: '500',
          },
        }}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default Contact;
