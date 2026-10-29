import Splash from '../Splash/Splash';
import About from '../About/About';
import Journey from '../Journey/Journey';
import Contact from '../Contact/Contact';
import Adventages from '../Adventages/Adventages';
import Footer from '../Footer/Footer';
import { memo } from 'react';

const RemainingSections = memo(() => <>
  <About /><Journey /><Adventages /><Contact />
  <Footer />
</>);

const Home = ({ active = true, orbitHandoff }) => {
  return (
    <div>
      <Splash active={active} orbitHandoff={orbitHandoff} />
      <RemainingSections />
    </div>
  );
};

export default Home;
