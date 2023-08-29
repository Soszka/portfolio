import styles from './Navigation.module.scss';

const Navigation = () => {
  return (
      <nav>
        <div className={styles.home}>
          <a href="https://github.com/Soszka">bartlomiejsocha.pl</a>
        </div>
        <div className={styles.list}>
          <a href="https://github.com/Soszka">SKILLS</a>
          <a href="https://github.com/Soszka">PROJECTS</a>
          <a href="https://github.com/Soszka">GITHUB</a>
          <a className={styles.resume} href="https://github.com/Soszka">RESUME</a>
        </div>
      </nav>
  );
}

export default Navigation