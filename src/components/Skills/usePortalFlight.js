import { useLayoutEffect } from 'react';
import { chapters, chapterAt, clamp, smooth, flightPhase, ranges } from './portalData';
import { technologyIcons } from '../Splash/technologyIcons';
import portalTexture from './portalTexture';
import { createRecoil, stepRecoil } from './magneticMotion';

// One renderer owns the camera, stars and transforms. Scroll never updates React.
export default function usePortalFlight(rootRef, origin, calm, setChapter, setCalm, exitRef, finishExit, pointerRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (calm || !root) return undefined;
    const canvas = root.querySelector('canvas');
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      setCalm(true);
      return undefined;
    }
    const scene = root.querySelector('[data-flight-scene]');
    const iconNodes = [...root.querySelectorAll('[data-flight-icon]')];
    const portrait = root.querySelector('[data-entry-portrait]');
    const cursor = root.querySelector('[data-field-cursor]');
    const recoil = iconNodes.map(createRecoil);
    const metadata = iconNodes.map(node => ({ group: Number(node.dataset.group), slot: Number(node.dataset.slot), size: 1 }));
    const rim = portalTexture();
    const card = root.querySelector('[data-flight-card]');
    const modest = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    const stars = Array.from({ length: modest ? 95 : 160 }, (_, i) => ({
      x: Math.cos(i * 2.39996) * (.16 + ((i * 37) % 97) / 60),
      y: Math.sin(i * 2.39996) * (.16 + ((i * 37) % 97) / 60),
      z: (i * 157) % 2400,
      size: i % 7 === 0 ? 2.1 : .9,
    }));
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 48;
    const glow = sprite.getContext('2d');
    if (glow) {
      const gradient = glow.createRadialGradient(24, 24, 0, 24, 24, 24);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(.08, '#d0f5ff');
      gradient.addColorStop(.24, 'rgba(54,174,255,.8)');
      gradient.addColorStop(1, 'rgba(0,100,255,0)');
      glow.fillStyle = gradient;
      glow.fillRect(0, 0, 48, 48);
    }
    let width = 1, height = 1, unit = 1, travel = 1;
    let frame = null, previous = 0, elapsed = 0, progress = 0, target = 0, active = -1;
    let disposed = false;
    const readScroll = () => { target = clamp(window.scrollY / travel); };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      unit = Math.min(width, height);
      travel = Math.max(1, root.offsetHeight - height);
      const dpr = Math.min(window.devicePixelRatio || 1, modest ? 1 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      iconNodes.forEach((node, index) => {
        const size = clamp(unit * (node.dataset.group === '0' ? .075 : .11), 32, 120);
        metadata[index].size = size;
        node.style.width = node.style.height = size + 'px';
      });
      readScroll();
    };
    const render = time => {
      frame = null;
      if (disposed || document.hidden) return;
      const interval = modest || width < 768 ? 1000 / 30 : 1000 / 60;
      if (previous && time - previous < interval - 1) {
        frame = requestAnimationFrame(render);
        return;
      }
      const dt = previous ? Math.min((time - previous) / 1000, .1) : 0;
      previous = time;
      elapsed += dt;
      const exit = exitRef.current;
      if (exit) {
        if (exit.orbitClock === undefined) {
          exit.orbitClock = (elapsed - dt) * .10;
          root.dataset.returning = 'true';
          window.dispatchEvent(new CustomEvent('portfolio:prepare-home', { detail: {
            orbitClock: exit.orbitClock, orbitTime: time - dt * 1000,
          } }));
        }
        exit.elapsed += dt;
      }
      const pointer = pointerRef.current;
      if (pointer.dirty && cursor) {
        cursor.style.transform = 'translate3d(' + pointer.x + 'px,' + pointer.y + 'px,0)';
        pointer.dirty = false;
      }
      const leaving = exit ? clamp(exit.elapsed / 1.5) : 0;
      const departure = smooth(leaving);
      // Reveal the already animated home scene before changing the route.
      scene.style.opacity = String(exit ? 1 - smooth((leaving - .78) / .22) : 1);
      const entry = clamp(elapsed / 1.65);
      const easedEntry = 1 - Math.pow(1 - entry, 3);
      const oldProgress = progress;
      if (!exit) progress += (target - progress) * (1 - Math.exp(-9 * dt));
      const velocity = Math.abs(progress - oldProgress) / Math.max(dt, .016);
      const camera = progress * 3300 - (1 - easedEntry) * 470;
      const homeX = origin?.x ?? (width > 768 ? .285 : .5);
      const homeY = origin?.y ?? .50;
      const centerBlend = exit ? smooth((leaving - .25) / .65) : 1 - easedEntry;
      const cx = width * (.5 + (homeX - .5) * centerBlend);
      const cy = height * (.49 + (homeY - .49) * centerBlend);
      const nextActive = chapterAt(progress);
      if (nextActive !== active) {
        active = nextActive;
        setChapter(active);
        const palette = chapters[Math.max(0, Math.min(chapters.length - 1, active - 1))];
        root.style.setProperty('--accent', palette.color);
        root.style.setProperty('--accent-rgb', palette.rgb);
      }
      root.dataset.motionPaused = 'false';
      const presence = easedEntry * (1 - smooth((leaving - .55) / .45));
      scene.style.setProperty('--portal-presence', String(presence));
      scene.style.setProperty('--home-height', (height * (origin?.heroHeight || 1)) + 'px');
      canvas.style.opacity = String(exit ? 1 - smooth((leaving - .65) / .35) : 1);
      scene.style.setProperty('--entry-light', String(Math.sin(entry * Math.PI) * .6 + Math.min(.3, velocity * .6)));
      ctx.clearRect(0, 0, width, height);
      const rgb = chapters[Math.max(0, Math.min(chapters.length - 1, active - 1))].rgb;
      for (let i = 0; i < 13; i++) {
        const z = ((i * 205 - camera) % 2665 + 2665) % 2665;
        const radius = unit * .57 * 760 / (z + 180);
        const alpha = clamp(z / 200) * clamp((2665 - z) / 500);
        if (radius > Math.hypot(width, height) || radius < 5) continue;
        ctx.lineWidth = .7;
        ctx.strokeStyle = 'rgba(' + rgb + ',' + alpha * .16 + ')';
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(' + rgb + ',' + alpha * .46 + ')';
        ctx.beginPath();
        ctx.arc(cx, cy, radius, i * 1.73, i * 1.73 + .48);
        ctx.stroke();
      }
      const streak = Math.min(.32, velocity * .45 + Math.sin(entry * Math.PI) * .12);
      for (const star of stars) {
        const z = ((star.z - camera) % 2400 + 2400) % 2400;
        const perspective = 620 / (z + 120);
        const x = cx + star.x * unit * perspective;
        const y = cy + star.y * unit * perspective;
        if (x < -30 || x > width + 30 || y < -30 || y > height + 30) continue;
        ctx.globalAlpha = clamp(z / 110) * (.55 + .25 * Math.sin(elapsed * .8 + star.z));
        const size = Math.min(22, (star.size * perspective + 1) * 4);
        if (glow) ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
        if (streak > .005) {
          ctx.strokeStyle = 'rgba(155,224,255,.48)';
          ctx.lineWidth = Math.min(2, perspective);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + (x - cx) * streak, y + (y - cy) * streak);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      const portalRadius = unit * (.35 - departure * .04);
      const rimSize = portalRadius * 768 / 284;
      ctx.drawImage(rim, cx - rimSize / 2, cy - rimSize / 2, rimSize, rimSize);
      const phases = ranges.map((_, index) => flightPhase(progress, index));
      iconNodes.forEach((node, i) => {
        const { group, slot, size } = metadata[i];
        if (group !== active && !(exit && group === 0)) {
          if (node.style.visibility !== 'hidden') { node.style.visibility = 'hidden'; node.style.opacity = '0'; }
          recoil[i].x = recoil[i].y = recoil[i].vx = recoil[i].vy = 0;
          return;
        }
        const phase = phases[group];
        const count = group === 0 ? technologyIcons.length : chapters[group - 1].icons.length;
        const lane = group === 0 ? slot % 3 : slot % 2;
        let angle = group === 0 ? Math.floor(slot / 3) / 9 * Math.PI * 2 + lane * .23 :
          slot / count * Math.PI * 2 + group * .18;
        const land = smooth((leaving - .5) / .5);
        angle += (group === 0 && exit ? exit.orbitClock + exit.elapsed * .14 : elapsed * (group === 0 ? .10 : .13)) - Math.PI / 2;
        let scale, alpha, spread;
        if (group === 0) {
          const sink = smooth((phase.local - .08 - (slot % 5) * .025) / .76);
          scale = 1 - sink * .985;
          spread = scale;
          alpha = 1 - smooth((sink - .85) / .15);
          if (exit) {
            const emerge = smooth((leaving - .12 - (slot % 4) * .025) / .48);
            scale = spread = .035 + emerge * .965;
            alpha = emerge;
          }
        } else {
          const arrive = smooth((phase.local - (slot % 4) * .018) / .26);
          const burst = group === chapters.length ? 0 : smooth((phase.local - .34 - (slot % 3) * .018) / .62);
          scale = .025 + arrive * .975 + burst * (2.7 + (slot % 3) * .65);
          spread = .015 + arrive * .985 + burst * (3.5 + (slot % 4));
          angle += (1 - arrive) * (slot % 2 ? .55 : -.55) + burst * Math.sin(slot * 1.7) * .6;
          alpha = smooth(phase.local / .08) * (1 - burst);
          if (progress < ranges[group][0]) alpha = 0;
          if (exit) { spread *= 1 - departure; scale *= 1 - departure; alpha *= 1 - smooth(leaving / .3); }
        }
        const orbitX = width * (group === 0 ? (width < 700 ? .43 + lane * .006 : .275 + lane * .067) : width < 700 ? .42 : .35 + lane * .035);
        const orbitY = height * (group === 0 ? .24 + lane * .062 : .32 + lane * .012);
        const float = Math.sin(elapsed * .8 + i * 1.4) * 6;
        let x = cx + Math.cos(angle) * (orbitX + float) * spread;
        let y = cy + Math.sin(angle) * (orbitY + float) * spread;
        if (group === 0 && origin?.icons?.[slot] && !exit) {
          const from = origin.icons[slot];
          x = from.x * width * (1 - easedEntry) + x * easedEntry;
          y = from.y * height * (1 - easedEntry) + y * easedEntry;
          scale *= (from.size * unit / size) * (1 - easedEntry) + easedEntry;
        }
        if (group === 0 && exit) {
          // Morph the orbit geometry at its current clockwise phase, then hand off that clock.
          const homeWidth = width * (origin?.width ?? (width > 768 ? .57 : 1));
          const homeHeight = height * (origin?.height ?? .78);
          const homePhase = angle;
          const rx = .24 + lane * .095, ry = .205 + lane * .098;
          const clock = (exit.orbitClock + exit.elapsed * .14) / .14;
          const breathe = 1 + Math.sin(clock * .65 + lane) * .008;
          const hx = width * homeX + homeWidth * (Math.cos(homePhase) * rx * Math.cos(-.12) - Math.sin(homePhase) * ry * Math.sin(-.12)) * breathe;
          const hy = height * homeY + homeHeight * (-.01 + (Math.cos(homePhase) * rx * Math.sin(-.12) + Math.sin(homePhase) * ry * Math.cos(-.12)) * breathe);
          x += (hx - x) * land; y += (hy - y) * land;
          const homeSize = technologyIcons[slot].size * Math.max(.54, Math.min(homeWidth / 720, homeHeight / 620) * 1.08) * [.82,.96,1.12][lane];
          scale *= 1 + (homeSize / size - 1) * land;
          alpha *= 1 - (lane === 0 ? .14 : 0) * land;
        }
        const body = recoil[i];
        const radius = Math.max(12, Math.min(90, size * scale / 2));
        stepRecoil(body, exit || alpha < .2 ? { active: false } : pointer, x, y, radius, unit, elapsed, dt);
        x += body.x * (1 - departure); y += body.y * (1 - departure);
        let rotation = Math.sin(elapsed * .5 + i) * 7 + (group ? phase.departure * Math.sin(slot) * 65 : 0)
          + Math.max(-18, Math.min(18, body.vx / radius));
        if (exit && group === 0) {
          const clock = (exit.orbitClock + exit.elapsed * .14) / .14;
          const homeRotation = (slot % 3 - 1) * 5 + Math.sin(clock * .6 + slot * 1.731 + .4) * 3;
          rotation += (homeRotation - rotation) * land;
        }
        node.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%) scale(' + scale + ') rotate(' + rotation + 'deg)';
        node.style.opacity = String(alpha);
        node.style.visibility = alpha < .005 ? 'hidden' : 'visible';
        const speed = group ? Math.max(1 - phase.arrival, phase.departure) : Math.sqrt(phase.departure);
        if (alpha > .02 && speed > .015 && !exit) {
          const strength = Math.min(1, .15 + speed);
          const tail = .12 + speed * .45;
          // Fine, antialiased trails stay thin even as an icon flies past the camera.
          for (let layer = 0; layer < 2; layer++) {
            ctx.strokeStyle = layer ? 'rgba(185,232,255,' + alpha * strength * .42 + ')' :
              'rgba(' + chapters[Math.max(0, group - 1)].rgb + ',' + alpha * strength * .12 + ')';
            ctx.lineWidth = layer ? .85 : 2.5;
            ctx.beginPath(); ctx.moveTo(x, y);
            ctx.lineTo(x + (cx - x) * tail, y + (cy - y) * tail); ctx.stroke();
          }
        }
      });
      if (portrait) {
        const land = smooth((leaving - .5) / .5);
        const homeWidth = width * (origin?.width ?? (width > 768 ? .57 : 1));
        const homeHeight = height * (origin?.height ?? .78);
        portrait.style.left = (cx + homeWidth * .02 * land) + 'px';
        portrait.style.top = (cy - homeHeight * .03 * land) + 'px';
        portrait.style.height = homeHeight * (width <= 900 ? .76 : .77) + 'px';
        portrait.style.opacity = String(exit ? smooth((leaving - .50) / .45) : origin ? clamp(1 - entry * 3) : 0);
        portrait.style.transform = 'translate(-50%, -50%) scale(' + (exit ? .75 + departure * .25 : 1 - entry * .2) + ')';
      }
      if (card) {
        const pose = flightPhase(progress, active);
        card.style.opacity = String(pose.opacity * easedEntry * (1 - smooth(leaving / .3)));
        card.style.transform = 'scale(' + pose.scale * (1 - departure * .95) + ')';
        const description = card.querySelector('[data-flight-description]');
        if (description) description.style.opacity = String(pose.description);
      }
      if (leaving >= 1 && !exit.completed) {
        exit.completed = true;
        finishExit({ orbitClock: exit.orbitClock + exit.elapsed * .14, orbitTime: time });
      }
      // Keep the outgoing scene alive while React prepares the destination.
      if (disposed) return;
      frame = requestAnimationFrame(render);
    };
    const visibility = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previous = 0;
      root.dataset.motionPaused = String(document.hidden);
      if (document.hidden) { pointerRef.current.active = false; root.dataset.pointerActive = 'false'; }
      if (!document.hidden) frame = requestAnimationFrame(render);
    };
    resize();
    progress = target = 0;
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibility);
    // Present the captured home positions before the first visible portal frame.
    render(performance.now());
    visibility();
    return () => {
      disposed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [rootRef, origin, calm, setChapter, setCalm, exitRef, finishExit, pointerRef]);
}
