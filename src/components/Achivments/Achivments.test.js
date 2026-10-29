import { act, cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Achivments from './Achivments';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }));
jest.mock('../../hooks/useMotionVisibility', () => () => {});
jest.mock('react-redux', () => ({
  useSelector: selector => selector({ achivments: [
    'studies', 'projects', 'courses', 'technologies', 'internship', 'experience',
  ].map((key, index) => ({
    id: index + 1,
    titleKey: `achivements.${key}.title`,
    descriptionKey: `achivements.${key}.description`,
  })) }),
}));

let frames;
let observed;
let preference;

beforeEach(() => {
  frames = new Map();
  observed = null;
  preference = new EventTarget();
  preference.matches = false;
  window.matchMedia = jest.fn(() => preference);
  window.IntersectionObserver = class {
    constructor(callback, options) { observed = { elements: [], callback, options }; }
    observe = jest.fn(element => observed.elements.push(element));
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
  let frameId = 0;
  jest.spyOn(performance, 'now').mockReturnValue(0);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    const id = ++frameId;
    frames.set(id, callback);
    return id;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const advance = time => act(() => {
  performance.now.mockReturnValue(time);
  const callbacks = [...frames.values()];
  frames.clear();
  callbacks.forEach(callback => callback(time));
});

const shownNumbers = () => [...document.querySelectorAll('[class*="metricNumber"]')]
  .map(element => element.textContent);

test('each row reveals and starts counting only when it reaches the viewport', () => {
  const { unmount } = render(<Achivments />);
  const section = screen.getByRole('region', { name: 'achivements.label' });
  expect(section).toHaveAttribute('data-revealed', 'false');
  expect(shownNumbers()).toEqual(['0', '0', '0', '0', '0', '0+']);
  const slots = [...section.querySelectorAll('[class*="achievementSlot"]')];
  expect(observed.elements).toEqual(slots);
  expect(observed.options.threshold).toBe(.24);
  expect(observed.options.rootMargin).toBe(`0px 0px -${Math.round(window.innerHeight * .18)}px 0px`);

  act(() => observed.callback([{ target: slots[0], isIntersecting: true, intersectionRatio: .1, boundingClientRect: { height: 240 } }]));
  expect(section).toHaveAttribute('data-revealed', 'false');
  expect(frames.size).toBe(0);
  act(() => observed.callback(slots.slice(0, 3).map(target => ({ target, isIntersecting: true, intersectionRatio: .3 }))));
  expect(section).toHaveAttribute('data-revealed', 'true');
  expect(slots.map(slot => slot.dataset.revealed)).toEqual(['true', 'true', 'true', 'false', 'false', 'false']);
  advance(1100);
  expect(shownNumbers()).toEqual(['1', '5', '2', '0', '0', '0+']);
  advance(2480);
  expect(shownNumbers()).toEqual(['2', '12', '7', '0', '0', '0+']);
  expect(frames.size).toBe(0);
  act(() => observed.callback(slots.slice(3).map(target => ({ target, isIntersecting: true, intersectionRatio: .3 }))));
  advance(3580);
  expect(shownNumbers()).toEqual(['2', '12', '7', '9', '4', '0+']);
  advance(5000);
  expect(shownNumbers()).toEqual(['2', '12', '7', '19', '11', '2+']);
  expect(frames.size).toBe(0);
  expect(screen.getByRole('img', { name: '19 achivements.technologies.statLabel' })).toBeInTheDocument();
  unmount();
  expect(frames.size).toBe(0);
});

test('reduced motion shows final values without counting frames', () => {
  preference.matches = true;
  render(<Achivments />);
  expect(shownNumbers()).toEqual(['2', '12', '7', '19', '11', '2+']);
  expect(observed).toBeNull();
  expect(frames.size).toBe(0);
  expect(shownNumbers()).toEqual(['2', '12', '7', '19', '11', '2+']);
});

test('switching to reduced motion completes all reveals and stops unfinished counters', () => {
  const { container } = render(<Achivments />);
  act(() => observed.callback([{ target: observed.elements[0], isIntersecting: true, intersectionRatio: .3 }]));
  advance(800);
  act(() => { preference.matches = true; preference.dispatchEvent(new Event('change')); });
  expect(shownNumbers()).toEqual(['2', '12', '7', '19', '11', '2+']);
  expect([...container.querySelectorAll('[class*="achievementSlot"]')].every(el => el.dataset.revealed === 'true')).toBe(true);
  expect(frames.size).toBe(0);
});
