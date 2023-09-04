import React from 'react';
import Splash from './components/Splash/Splash';
import Container from './components/Container/Container'
import About from './components/About/About';

const App = () => {
  return (
    <main>
      <Splash />
      <Container>
        <About />
      </Container>
    </main>
  );
};

export default App;