import styles from './Navigation.module.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';


const Navigation = () => {
  const location = useLocation();

  return (
    <nav className={location.pathname === '/projects' || location.pathname === '/skills' ? styles.activeProjects : ''}>
        <div className={styles.home}>
        <Link to="/">bartlomiejsocha.pl</Link>
        </div>
        <div className={styles.list}>
          <NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} to="/skills">SKILLS</NavLink>
          <NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined} to="/projects">PROJECTS</NavLink>
          <a href="https://github.com/Soszka" rel="noreferrer" target="_blank">GITHUB</a>
          <a className={styles.resume} href="https://github.com/Soszka">RESUME</a>
        </div>
      </nav>
  );
}

export default Navigation;
