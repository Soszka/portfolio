import Splash from '../Splash/Splash';
import About from '../About/About';
import Journey from '../Journey/Journey';
import Contact from '../Contact/Contact';
import Adventages from '../Adventages/Adventages';
import Footer from '../Footer/Footer';
import { memo } from 'react';
import styles from './HomePage.module.scss';

const RemainingSections = memo(() => <>
  <div className={styles.galaxySections}>
    <About /><Journey /><Adventages /><Contact /><Footer />
  </div>
</>);

const Home = ({ active = true, orbitHandoff }) => {
  return (
    <div className={styles.home}>
      <Splash active={active} orbitHandoff={orbitHandoff} />
      <RemainingSections />
    </div>
  );
};

export default Home;
