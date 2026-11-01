import LanguageButton from './LanguageButton';
import styles from './Navigation.module.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import usePortalNavigation from '../Skills/usePortalNavigation';
import { warmSkills } from '../Skills/preloadSkills';

const HtmlTooltip = props => <Tooltip {...props} slotProps={{
  tooltip: { sx: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '13px',
    border: '1px solid #dadde9',
  } },
}} />;

const Navigation = ({ cinematic = false }) => {
  const enterPortal = usePortalNavigation();
  const location = useLocation();
  const [menuClosed, setMenuClosed] = useState(true);
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'pl')
    .slice(0, 2)
    .toLowerCase();

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth <= 1200) {
        setMenuClosed(true);
      } else {
        setMenuClosed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('portfolio:navigation-toggle', {
        detail: { open: !menuClosed },
      })
    );
  }, [menuClosed]);

  useEffect(
    () => () => {
      window.dispatchEvent(
        new CustomEvent('portfolio:navigation-toggle', {
          detail: { open: false },
        })
      );
    },
    []
  );

  const navItems = [
    {
      translationKey: 'navigation.link.home',
      to: '/',
      isNavLink: true,
    },
    {
      translationKey: 'navigation.link.skills',
      to: '/skills',
      isNavLink: true,
    },
    {
      translationKey: 'navigation.link.contact',
      to: '/#contact',
      isSectionLink: true,
    },
    {
      translationKey: 'navigation.link.github',
      href: 'https://github.com/Soszka',
      isNavLink: false,
      external: true,
    },
    {
      translationKey: 'navigation.link.resume',
      isButton: true,
    },
  ];

  return (
    <nav
      data-menu-open={!menuClosed}
      className={clsx(
        menuClosed ? styles.closed : styles.open,
        location.pathname === '/skills' &&
          styles.activeProjects
      )}
    >
      <div className={styles.home}>
        <Link to="/">bartlomiejsocha.pl</Link>
      </div>
      <button
        type="button"
        className={styles.menu}
        aria-label="Menu"
        aria-expanded={!menuClosed}
        onClick={() => setMenuClosed(!menuClosed)}
      >
        {menuClosed ? (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        ) : (
          <div className={styles.closeIcon}>
            <span></span>
            <span></span>
          </div>
        )}
      </button>
      <ul className={clsx(styles.links, menuClosed && styles.closed)}>
        {navItems.map((item, index) => {
          if (item.isSectionLink) {
            return <li key={index}><Link to={item.to} onClick={() => {
              if (window.innerWidth <= 1200) setMenuClosed(true);
            }}>{t(item.translationKey)}</Link></li>;
          } else if (item.isButton) {
            return (
              <li key={index}>
                <HtmlTooltip title={t('navigation.download.resume')}>
                  <Button
                    className={styles.resume}
                    href={`/CV_BartlomiejSocha_${currentLang.toUpperCase()}.pdf`}
                    download
                  >
                    {t(item.translationKey)}
                  </Button>
                </HtmlTooltip>
              </li>
            );
          } else if (item.isNavLink) {
            return (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.linkActive : undefined
                  }
                  to={item.to}
                  onClick={item.to === '/skills' ? enterPortal : undefined}
                  onPointerEnter={item.to === '/skills' ? warmSkills : undefined}
                  onFocus={item.to === '/skills' ? warmSkills : undefined}
                >
                  {t(item.translationKey)}
                </NavLink>
              </li>
            );
          } else {
            return (
              <li key={index}>
                <a
                  href={item.href}
                  rel="noreferrer"
                  target={item.external ? '_blank' : '_self'}
                >
                  {t(item.translationKey)}
                </a>
              </li>
            );
          }
        })}
        {cinematic ? <li className={styles.languageText}>
          <button type="button" aria-pressed={currentLang === 'pl'} onClick={() => i18n.changeLanguage('pl')}>PL</button>
          <span aria-hidden="true">/</span>
          <button type="button" aria-pressed={currentLang === 'en'} onClick={() => i18n.changeLanguage('en')}>EN</button>
        </li> : <li className={styles.flagIconButton}>
          <LanguageButton />
        </li>}
      </ul>
      <div className={styles.flagIconContainer}>
        <LanguageButton />
      </div>
    </nav>
  );
};

export default Navigation;
