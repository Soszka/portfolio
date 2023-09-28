import React from 'react';
import Splash from './components/Splash/Splash';
import Container from './components/Container/Container'
import About from './components/About/About';
import Journey from './components/Journey/Journey';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <main>
      <Splash />
      <Container>
        <About />
        <Journey />
        <Contact />
        <Footer />
      </Container>
    </main>
  );
};

export default App;