import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Skills from './Skills';
import { StrictMode } from 'react';
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: { language: 'pl', changeLanguage: jest.fn() } }),
}));

let frames, preference, context, previousHeight, previousScroll;
beforeEach(() => {
  frames = new Map();
  let id = 0;
  preference = new EventTarget();
  preference.matches = false;
  previousHeight = window.innerHeight;
  previousScroll = window.scrollY;
  window.innerHeight = 1000;
  window.scrollY = 0;
  window.matchMedia = jest.fn(() => preference);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    frames.set(++id, callback);
    return id;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(key => frames.delete(key));
  jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(6200);
  jest.spyOn(window, 'scrollTo').mockImplementation(options => {
    window.scrollY = options.top;
    window.dispatchEvent(new Event('scroll'));
  });
  context = {
    createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
    setTransform: jest.fn(), clearRect: jest.fn(), drawImage: jest.fn(),
    fillRect: jest.fn(), beginPath: jest.fn(), arc: jest.fn(), stroke: jest.fn(),
    moveTo: jest.fn(), lineTo: jest.fn(),
  };
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
});
afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  window.innerHeight = previousHeight;
  window.scrollY = previousScroll;
});

const tick = time => act(() => {
  const callbacks = [...frames.values()];
  frames.clear();
  callbacks.forEach(callback => callback(time));
});
const advance = start => {
  for (let time = start; time < start + 2000; time += 40) tick(time);
};
const Home = () => <h1 data-clock={useLocation().state?.orbitClock}>Home</h1>;
const mount = () => render(<StrictMode><MemoryRouter initialEntries={['/skills']}>
  <Routes><Route path="/skills" element={<Skills />} /><Route path="/" element={<Home />} /></Routes>
</MemoryRouter></StrictMode>);

test('prewarmed skills sleep while inactive and reuse their canvas on every entry', () => {
  const initialTitle = document.title;
  const view = active => <MemoryRouter><Skills active={active} /></MemoryRouter>;
  const { container, rerender, unmount } = render(view(false));
  const canvas = container.querySelector('canvas');
  expect(frames.size).toBe(0);
  expect(document.title).toBe(initialTitle);
  rerender(view(true));
  expect(container.querySelector('canvas')).toBe(canvas);
  expect(frames.size).toBe(1);
  advance(20);
  rerender(view(false));
  expect(frames.size).toBe(0);
  expect(document.title).toBe(initialTitle);
  rerender(view(true));
  expect(container.querySelector('canvas')).toBe(canvas);
  expect(container.querySelector('[data-flight-scene]').style.opacity).toBe('1');
  expect(frames.size).toBe(1);
  unmount();
  expect(frames.size).toBe(0);
});

test('intro contains every home icon, sinks, then chapters emerge and exit animates back home', () => {
  const { container } = mount();
  advance(20);
  expect(screen.getByRole('heading', { name: 'Umiejętności' })).toBeInTheDocument();
  const allIcons = [...container.querySelectorAll('[data-group="0"]')];
  expect(allIcons).toHaveLength(27);
  expect(allIcons.every(node => Number(node.style.opacity) > .95)).toBe(true);
  expect(screen.queryByText('Spokojny widok')).toBeNull();
  expect(screen.queryByRole('group')).toBeNull();
  expect(container.querySelectorAll('h3, ul')).toHaveLength(0);
  const card = container.querySelector('[data-flight-card]');
  const scale = node => Number(node.style.transform.match(/scale\(([^)]+)/)[1]);
  const move = (p, time) => {
    act(() => window.scrollTo({ top: 5200 * p }));
    advance(time);
  };
  move(.078, 2020);
  expect(scale(card)).toBeLessThan(.5);
  expect(Number(container.querySelector('[data-flight-description]').style.opacity)).toBe(0);
  expect(scale(allIcons[0])).toBeLessThan(.5);
  move(.125, 4020);
  const arriving = scale(container.querySelector('[data-group="1"]'));
  expect(screen.getByRole('heading', { name: 'Frontend' })).toBeInTheDocument();
  move(.18, 6020);
  expect(scale(container.querySelector('[data-group="1"]'))).toBeGreaterThan(arriving * 5);
  expect(Number(container.querySelector('[data-flight-description]').style.opacity)).toBeGreaterThan(.95);
  const orbitalPosition = container.querySelector('[data-group="1"]').style.transform;
  advance(8020);
  expect(container.querySelector('[data-group="1"]').style.transform).not.toBe(orbitalPosition);
  move(.28, 10020);
  expect(Number(container.querySelector('[data-group="1"]').style.opacity)).toBeLessThan(.3);
  move(.35, 12020);
  expect(screen.getByRole('heading', { name: 'Backend' })).toBeInTheDocument();
  move(.52, 14020);
  expect(screen.getByRole('heading', { name: 'DevOps' })).toBeInTheDocument();
  move(.69, 16020);
  expect(screen.getByRole('heading', { name: 'Narzędzia' })).toBeInTheDocument();
  move(.89, 18020);
  expect(screen.getByRole('heading', { name: 'Umiejętności miękkie' })).toBeInTheDocument();
  move(0, 20020);
  expect(screen.getByRole('heading', { name: 'Umiejętności' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'bartlomiejsocha.pl' }));
  expect(screen.queryByRole('heading', { name: 'Home' })).toBeNull();
  advance(22020);
  expect(Number(screen.getByRole('heading', { name: 'Home' }).dataset.clock)).toBeGreaterThan(0);
  expect(frames.size).toBe(0);
});

test('renderer sleeps in a hidden tab and releases its frame on unmount', () => {
  const { unmount } = mount();
  advance(20);
  expect(frames.size).toBe(1);
  const gradients = context.createRadialGradient.mock.calls.length;
  const hidden = jest.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(frames.size).toBe(0);
  const draws = context.clearRect.mock.calls.length;
  tick(2500);
  expect(context.clearRect).toHaveBeenCalledTimes(draws);
  hidden.mockReturnValue(false);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  tick(3000);
  expect(frames.size).toBe(1);
  expect(context.createRadialGradient).toHaveBeenCalledTimes(gradients);
  unmount();
  expect(frames.size).toBe(0);
});

test('system reduced motion exposes every chapter without adding visible controls', () => {
  preference.matches = true;
  const { container } = mount();
  expect(container.querySelector('canvas')).toBeNull();
  expect(screen.getByRole('heading', { name: /^Frontend/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /^Backend/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /^DevOps/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Narzędzia' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Umiejętności miękkie' })).toBeInTheDocument();
  expect(frames.size).toBe(0);
  act(() => { preference.matches = false; preference.dispatchEvent(new Event('change')); });
  advance(20);
  expect(frames.size).toBe(1);
  act(() => { preference.matches = true; preference.dispatchEvent(new Event('change')); });
  expect(frames.size).toBe(0);
  expect(container.querySelector('canvas')).toBeNull();
});

test('unavailable canvas falls back to readable skills', () => {
  HTMLCanvasElement.prototype.getContext.mockReturnValue(null);
  mount();
  expect(screen.getByRole('heading', { name: /^Backend/ })).toBeInTheDocument();
  expect(frames.size).toBe(0);
});

test('the magnetic cursor tracks the pointer across the skills page and clears on exit', () => {
  const { container } = mount();
  advance(20);
  const root = container.querySelector('[data-flight-scene]').parentElement;
  fireEvent(root, new MouseEvent('pointermove', { bubbles: true, clientX: 270, clientY: 120 }));
  tick(2060);
  expect(root.dataset.pointerActive).toBe('true');
  expect(container.querySelector('[data-field-cursor]').style.transform).toBe('translate3d(270px,120px,0)');
  fireEvent.pointerLeave(root);
  expect(root.dataset.pointerActive).toBe('false');
  expect(frames.size).toBe(1);
});
