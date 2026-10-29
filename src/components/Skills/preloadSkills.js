import galaxy from '../../assets/HomePhotos/galaxy.webp';
import galaxyMobile from '../../assets/HomePhotos/galaxy-mobile.webp';
import portrait from '../../assets/HomePhotos/heroPortraitExact.webp';
import portalTexture from './portalTexture';

let pending;
const decode = src => {
  const image = new Image();
  image.src = src;
  return image.decode ? image.decode().catch(() => {}) : Promise.resolve();
};
export function loadSkills() {
  if (!pending) {
    pending = Promise.all([
      import('./Skills'),
      decode(galaxy),
      decode(galaxyMobile),
      decode(portrait),
    ]).then(([module]) => {
      portalTexture();
      return module;
    }).catch(error => { pending = undefined; throw error; });
  }
  return pending;
}
export const warmSkills = () => { loadSkills().catch(() => {}); };

export function scheduleSkillsWarmup(onReady) {
  let cancelled = false;
  const warm = () => loadSkills().then(() => { if (!cancelled) onReady?.(); }).catch(() => {});
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(warm, { timeout: 1800 });
    return () => { cancelled = true; window.cancelIdleCallback(id); };
  }
  const id = window.setTimeout(warm, 1200);
  return () => { cancelled = true; window.clearTimeout(id); };
}
