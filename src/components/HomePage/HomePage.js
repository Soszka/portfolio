import Splash from '../Splash/Splash';
import About from '../About/About';
import Journey from '../Journey/Journey';
import Contact from '../Contact/Contact';
import Adventages from '../Adventages/Adventages';
import Container from '../Container/Container';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div>
      <Splash />
      <Container>
        <About />
        <Journey />
        <Adventages />
        <Contact />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
