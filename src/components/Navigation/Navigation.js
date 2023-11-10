import styles from './Navigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect} from 'react';
import clsx from 'clsx';


const Navigation = () => {
  const location = useLocation();
  const [menuClosed, setMenuClosed] = useState(true);

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
  
  return (
    <nav className={clsx(
      menuClosed ? styles.closed : styles.open,
      (location.pathname === '/projects' || location.pathname === '/skills') && styles.activeProjects
    )}>      
      <div className={styles.home}>
        <Link to="/">bartlomiejsocha.pl</Link>
        <Link to="/"><FontAwesomeIcon icon={faHouse} /></Link>
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
      <ul className={menuClosed ? styles.closed : ""}>
        <li><NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} to="/skills">SKILLS</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} to="/projects">PROJECTS</NavLink></li>
        <li><a href="https://github.com/Soszka" rel="noreferrer" target="_blank">GITHUB</a></li>
        <li><a className={styles.resume} href="https://github.com/Soszka">RESUME</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;