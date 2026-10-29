import { useNavigate } from 'react-router-dom';
import { startTransition, useEffect, useRef } from 'react';
import { loadSkills } from './preloadSkills';

export default function usePortalNavigation() {
  const navigate = useNavigate();
  const alive = useRef(true);
  const pending = useRef(false);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  return async event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    try { await loadSkills(); } catch { pending.current = false; return; }
    if (!alive.current) return;
    pending.current = false;
    const field = document.querySelector('[data-chaos-field]');
    const rect = field?.getBoundingClientRect();
    startTransition(() => navigate('/skills', { state: { portalOrigin: rect ? {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
      size: Math.min(rect.width, rect.height) / Math.min(window.innerWidth, window.innerHeight),
      width: rect.width / window.innerWidth,
      height: rect.height / window.innerHeight,
      heroHeight: field.closest('section').getBoundingClientRect().height / window.innerHeight,
      icons: [...field.querySelectorAll('[data-magnetic-icon]')].map(node => {
        const icon = node.getBoundingClientRect();
        return { x: (icon.left + icon.width / 2) / window.innerWidth,
          y: (icon.top + icon.height / 2) / window.innerHeight,
          size: parseFloat(node.style.width) / Math.min(window.innerWidth, window.innerHeight) };
      }),
    } : null } }));
  };
}
