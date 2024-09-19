import styles from './Navigation.module.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Button, IconButton } from '@material-ui/core';
import PolishFlag from '../../assets/HomePhotos/polishFlagPhoto.png';
import EnglishFlag from '../../assets/HomePhotos/englishFlagPhoto.png';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '13px',
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const Navigation = () => {
  const location = useLocation();
  const [menuClosed, setMenuClosed] = useState(true);
  const [currentFlag, setCurrentFlag] = useState('pl');
  const [isHovered, setIsHovered] = useState(false);

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

  const toggleFlag = () => {
    setCurrentFlag((prevFlag) => (prevFlag === 'pl' ? 'en' : 'pl'));
  };

  const navItems = [
    {
      name: 'HOME',
      to: '/',
      isNavLink: true,
    },
    {
      name: 'SKILLS',
      to: '/skills',
      isNavLink: true,
    },
    {
      name: 'PROJECTS',
      to: '/projects',
      isNavLink: true,
    },
    {
      name: 'GITHUB',
      href: 'https://github.com/Soszka',
      isNavLink: false,
      external: true,
    },
    {
      name: 'RESUME',
      isButton: true,
    },
  ];

  return (
    <nav
      className={clsx(
        menuClosed ? styles.closed : styles.open,
        (location.pathname === '/projects' ||
          location.pathname === '/skills') &&
          styles.activeProjects
      )}
    >
      <div className={styles.home}>
        <Link to="/">bartlomiejsocha.pl</Link>
      </div>
      <div className={styles.menu} onClick={() => setMenuClosed(!menuClosed)}>
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
      </div>
      <ul className={menuClosed ? styles.closed : ''}>
        <li className={styles.flagIconButton}>
          <HtmlTooltip
            title={
              currentFlag === 'pl' ? 'Switch to English' : 'Przełącz na polski'
            }
          >
            <IconButton
              aria-label="toggle language"
              onClick={toggleFlag}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundColor: isHovered
                  ? 'rgba(250, 250, 250, 0.288'
                  : 'transparent',
                marginRight: '10px',
              }}
            >
              {currentFlag === 'pl' ? (
                <img
                  src={PolishFlag}
                  alt="Polish Flag"
                  className={styles.flagIcon}
                />
              ) : (
                <img
                  src={EnglishFlag}
                  alt="English Flag"
                  className={styles.flagIcon}
                />
              )}
            </IconButton>
          </HtmlTooltip>
        </li>
        {navItems.map((item, index) => {
          if (item.isButton) {
            return (
              <li key={index}>
                <HtmlTooltip title="Download resume">
                  <Button
                    className={styles.resume}
                    href="/CV_BartlomiejSocha.pdf"
                    download
                  >
                    {item.name}
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
                >
                  {item.name}
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
                  {item.name}
                </a>
              </li>
            );
          }
        })}
      </ul>
      <div className={styles.flagIconContainer}>
        <IconButton aria-label="toggle language" onClick={toggleFlag}>
          {currentFlag === 'pl' ? (
            <img
              src={PolishFlag}
              alt="Polish Flag"
              className={styles.flagIconSm}
            />
          ) : (
            <img
              src={EnglishFlag}
              alt="English Flag"
              className={styles.flagIconSm}
            />
          )}
        </IconButton>
      </div>
    </nav>
  );
};

export default Navigation;
