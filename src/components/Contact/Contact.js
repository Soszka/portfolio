import React, { useEffect, useRef, useState } from 'react';
import styles from './Contact.module.scss';
import Title from '../Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const getContactMeta = (key, isPolish, isAvailable) => {
  const secondaryChannel = isPolish ? 'Kana\u0142 dodatkowy' : 'Secondary channel';
  const comingSoon = isPolish ? 'Wkr\u00f3tce' : 'Coming soon';

  const copy = {
    instagram: {
      note: secondaryChannel,
      availableAction: isPolish ? 'Otw\u00f3rz profil' : 'Open profile',
      unavailableAction: comingSoon,
    },
    linkedin: {
      note: isPolish ? 'Najszybsza forma kontaktu' : 'Fastest way to reach me',
      availableAction: isPolish ? 'Otw\u00f3rz profil' : 'Open profile',
      unavailableAction: isPolish ? 'Niedost\u0119pne' : 'Unavailable',
    },
    facebook: {
      note: secondaryChannel,
      availableAction: isPolish ? 'Otw\u00f3rz profil' : 'Open profile',
      unavailableAction: comingSoon,
    },
    email: {
      note: secondaryChannel,
      availableAction: isPolish
        ? 'Wy\u015blij wiadomo\u015b\u0107'
        : 'Send message',
      unavailableAction: comingSoon,
    },
  };

  const itemCopy = copy[key];

  return {
    status: isAvailable
      ? isPolish
        ? 'Aktywne'
        : 'Active'
      : isPolish
        ? 'Niedost\u0119pne'
        : 'Unavailable',
    note: itemCopy.note,
    action: isAvailable ? itemCopy.availableAction : itemCopy.unavailableAction,
  };
};

const Contact = () => {
  const contactItems = useSelector((state) => state.contactItems);
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [animatedItemId, setAnimatedItemId] = useState(null);
  const isPolish = i18n.language.startsWith('pl');
  const animationTimeoutRef = useRef(null);

  const triggerIconAnimation = (itemId) => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    setAnimatedItemId(itemId);
    animationTimeoutRef.current = setTimeout(() => {
      setAnimatedItemId(null);
    }, 700);
  };

  const handleButtonClick = (e, item) => {
    triggerIconAnimation(item.id);

    if (!item.link) {
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

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.contact} id="contact">
      <Title>{t('contact.title')}</Title>
      <div className={styles.contactTypes}>
        {contactItems.map((item, index) => {
          const meta = getContactMeta(item.key, isPolish, Boolean(item.link));
          const Component = item.link ? 'a' : 'button';
          let componentProps = { type: 'button' };

          if (item.link) {
            componentProps = {
              href: item.link,
              target: '_blank',
              rel: 'noopener noreferrer',
            };
          }

          return (
            <div
              key={item.id}
              className={styles.contactTypeCard}
              data-available={item.link ? 'true' : 'false'}
              data-aos="zoom-in"
              data-aos-delay={item.aosDelay}
              style={{ '--contact-index': index }}
            >
              <Component
                {...componentProps}
                className={styles.contactTypesButton}
                onClick={(e) => handleButtonClick(e, item)}
              >
                <span
                  className={styles.contactTypesButtonGlow}
                  aria-hidden="true"
                />
                <span className={styles.contactTypesTopRow}>
                  <span className={styles.contactTypesIconWrap}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`${styles.contactTypesIcon} ${
                        animatedItemId === item.id
                          ? styles.contactTypesIconAnimated
                          : ''
                      }`}
                    />
                  </span>
                  <span className={styles.contactTypesStatus}>
                    {meta.status}
                  </span>
                </span>
                <span className={styles.contactTypesContent}>
                  <span className={styles.contactTypesLabel}>
                    {t(`contact.items.${item.key}.name`)}
                  </span>
                  <span className={styles.contactTypesNote}>{meta.note}</span>
                </span>
              </Component>
            </div>
          );
        })}
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
            background:
              'linear-gradient(135deg, rgba(8, 18, 33, 0.96), rgba(0, 44, 85, 0.94))',
            color: '#f5fbff',
            fontWeight: '500',
            border: '1px solid rgba(111, 201, 255, 0.32)',
            boxShadow: '0 18px 38px rgba(0, 0, 0, 0.35)',
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
