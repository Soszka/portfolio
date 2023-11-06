import React, { useEffect} from 'react';
import HomePage from './components/HomePage/HomePage'
import Footer from './components/Footer/Footer';
import ProjectsForm from './components/ProjectsForm/ProjectsForm';
import Skills from './components/Skills/Skills';
import Navigation from './components/Navigation/Navigation';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {

  useEffect(() => {AOS.init({
    duration: 1500,
    once: true
  }); }, []);

  return (
    <main>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsForm />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;


