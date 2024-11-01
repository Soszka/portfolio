import React, { useEffect } from 'react';
import HomePage from './components/HomePage/HomePage';
import Skills from './components/Skills/Skills';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './i18n';
import Projects from './components/Projects/Projects';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </main>
  );
};

export default App;
