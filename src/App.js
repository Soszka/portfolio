import React, { lazy, Suspense, startTransition, useEffect, useLayoutEffect, useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
import { loadSkills, scheduleSkillsWarmup } from './components/Skills/preloadSkills';

const Skills = lazy(loadSkills);
// Projects is intentionally disabled; keep its implementation for future use.
// const Projects = lazy(() => import('./components/Projects/Projects'));

const App = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const home = location.pathname === '/';
  const skills = location.pathname === '/skills';
  const [skillsReady, setSkillsReady] = useState(skills);
  const [preparedHome, setPreparedHome] = useState(null);
  useEffect(() => scheduleSkillsWarmup(() => startTransition(() => setSkillsReady(true))), []);
  useEffect(() => { if (skills) setSkillsReady(true); }, [skills]);
  useEffect(() => {
    const prepare = event => setPreparedHome(event.detail);
    window.addEventListener('portfolio:prepare-home', prepare);
    return () => window.removeEventListener('portfolio:prepare-home', prepare);
  }, []);
  useLayoutEffect(() => {
    if (!home) setPreparedHome(null);
  }, [home]);

  useEffect(() => {
    AOS.init({
      duration: 650,
      once: true,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!home || location.hash !== '#contact') return;
    const scroll = () => document.getElementById('contact')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start',
    });
    const navigation = document.querySelector('nav');
    if (!navigation || window.innerWidth > 1200) { scroll(); return; }
    // Closing the mobile menu changes the hero height. Measure the anchor only
    // after that layout settles, rather than scrolling toward a moving target.
    let frame;
    let previousHeight = -1;
    let stableFrames = 0;
    const deadline = performance.now() + 600;
    const settle = now => {
      const height = navigation.getBoundingClientRect().height;
      stableFrames = height === previousHeight ? stableFrames + 1 : 0;
      previousHeight = height;
      if (stableFrames >= 3 || now >= deadline) scroll();
      else frame = requestAnimationFrame(settle);
    };
    frame = requestAnimationFrame(settle);
    return () => cancelAnimationFrame(frame);
  }, [home, location.hash, location.key]);

  return (
    <main>
      <div className="home-shell" data-covered={!home || undefined}
        data-ready={Boolean(preparedHome) || undefined} data-motion-paused={!home && !preparedHome ? 'true' : undefined}
        aria-hidden={!home || undefined} inert={!home}>
        <HomePage active={home || Boolean(preparedHome)} orbitHandoff={preparedHome || location.state} />
      </div>
      {(skillsReady || skills) && <div className="skills-shell" hidden={!skills}
        aria-hidden={!skills || undefined} inert={!skills} data-motion-paused={!skills ? 'true' : undefined}>
        <Suspense fallback={skills ? <div className="page-loading" role="status">{t('app.loading')}</div> : null}>
          <Skills active={skills} />
        </Suspense>
      </div>}
      <Suspense fallback={<div className="page-loading" role="status">{t('app.loading')}</div>}>
        <Routes>
          <Route path="/" element={null} />
          {/* <Route path="/projects" element={<Projects />} /> */}
          <Route path="/skills" element={null} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
