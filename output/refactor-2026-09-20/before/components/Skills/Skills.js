import { startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import portrait from '../../assets/HomePhotos/heroPortraitExact.webp';
import LanguageButton from '../Navigation/LanguageButton';
import cursorStyles from '../Splash/MagneticCursor.module.scss';
import { technologyIcons, TechnologyGlyph } from '../Splash/technologyIcons';
import { chapters, copy } from './portalData';
import usePortalFlight from './usePortalFlight';
import styles from './Skills.module.scss';

export default function Skills({ active = true }) {
  const root = useRef(null);
  const exit = useRef(null);
  const pointer = useRef({ x: 0, y: 0, active: false, dirty: false });
  const { state } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const language = (i18n.resolvedLanguage || i18n.language || 'pl').startsWith('en') ? 'en' : 'pl';
  const text = copy[language];
  const [chapter, setChapter] = useState(0);
  const [calm, setCalm] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const finishExit = useCallback((handoff = {}) => startTransition(() => navigate('/', { state: { portalReturn: true, ...handoff } })), [navigate]);
  useLayoutEffect(() => {
    if (active) return;
    exit.current = null;
    pointer.current.active = false;
    root.current.dataset.returning = 'false';
    root.current.dataset.pointerActive = 'false';
    root.current.dataset.motionPaused = 'true';
    setChapter(0);
  }, [active]);
  usePortalFlight(root, state?.portalOrigin, calm || !active, setChapter, setCalm, exit, finishExit, pointer);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setCalm(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!active) return undefined;
    const previous = document.title;
    document.title = text.skills + ' — Bartłomiej Socha';
    return () => { document.title = previous; };
  }, [text.skills, active]);
  const returnHome = event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (calm) { finishExit(); return; }
    if (!exit.current) exit.current = { elapsed: 0 };
  };
  const heading = (title, intro) => {
    const Tag = intro ? 'h1' : 'h2';
    return <Tag className={styles.title + (title.length > 15 ? ' ' + styles.longTitle : '')}><span>{title}</span><span className={styles.shine} aria-hidden="true">{title}</span><span className={styles.halo} aria-hidden="true">{title}</span></Tag>;
  };
  const content = index => <>
    {heading(index === 0 ? text.skills : language === 'en' ? chapters[index - 1].enTitle || chapters[index - 1].title : chapters[index - 1].title, index === 0)}
    <p className={styles.lead} data-flight-description>{index === 0 ? text.introText : text[chapters[index - 1].id]}</p>
  </>;
  const icon = (item, key, group, slot) => <div key={key} data-flight-icon data-group={group} data-slot={slot}
    className={styles.technology} style={{ '--icon-color': item.color }}><TechnologyGlyph icon={item} /></div>;
  const movePointer = event => {
    if (calm || (event.pointerType && event.pointerType !== 'mouse')) return;
    Object.assign(pointer.current, { x: event.clientX, y: event.clientY, active: true, dirty: true });
    root.current.dataset.pointerActive = 'true';
  };
  const leavePointer = () => {
    pointer.current.active = false;
    root.current.dataset.pointerActive = 'false';
  };
  return <div ref={root} className={styles.journey + ' ' + cursorStyles.field + (calm ? ' ' + styles.calm : '')}
    onPointerMove={movePointer} onPointerLeave={leavePointer}>
    <a href="#portal-content" className={styles.skip}>{text.skip}</a>
    <header className={styles.header}>
      <Link className={styles.logo} to="/" onClick={returnHome}>bartlomiejsocha.pl</Link>
      <div className={styles.controls}><LanguageButton /></div>
    </header>
    {!calm && <>
      <span className={cursorStyles.cursor + ' ' + cursorStyles.fixed} data-field-cursor aria-hidden="true"><i /><i /></span>
      <div className={styles.scene} data-flight-scene aria-hidden="true">
        <div className={styles.homeBackdrop} />
        <div className={styles.nebula} /><div className={styles.core} />
        <canvas className={styles.canvas} />
        <div className={styles.icons}>
          {technologyIcons.map((item, slot) => icon(item, 'home-' + item.name, 0, slot))}
          {chapters.flatMap((group, index) => group.icons.map((item, slot) => icon(item, index + item.name, index + 1, slot)))}
        </div>
        <img className={styles.entryPortrait} data-entry-portrait src={portrait} alt="" />
        <div className={styles.vignette} /><div className={styles.flash} />
      </div>
      <div className={styles.viewport}>
        <article id="portal-content" tabIndex="-1" className={styles.card} data-flight-card>{content(chapter)}</article>
      </div>
    </>}
    {calm && <div className={styles.staticContent} id="portal-content">
      <section>{content(0)}</section>
      {chapters.map((item, index) => <section key={item.id} style={{ '--accent': item.color, '--accent-rgb': item.rgb }}>
        {content(index + 1)}
        <div className={styles.staticIcons}>{item.icons.map(item => <div key={item.name}><TechnologyGlyph icon={item} /><span>{item.name}</span></div>)}</div>
      </section>)}
    </div>}
  </div>;
}
