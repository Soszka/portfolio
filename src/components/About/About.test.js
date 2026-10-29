import { act, cleanup, render } from '@testing-library/react';
import About from './About';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }));
jest.mock('../Animation/Animation', () => () => <div>portrait animation</div>);
jest.mock('../../hooks/useMotionVisibility', () => () => {});

let observer;
let preference;

beforeEach(() => {
  preference = new EventTarget();
  preference.matches = false;
  window.matchMedia = jest.fn(() => preference);
  window.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; observer = this; }
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
  observer = undefined;
});

afterEach(cleanup);

test('about elements reveal independently once and reduced motion reveals the remaining content', () => {
  const { container, unmount } = render(<About />);
  const card = container.querySelector('[data-reveal-part="card"]');
  const portrait = container.querySelector('[data-reveal-part="portrait"]');
  expect(observer.observe).toHaveBeenCalledTimes(6);
  expect(card.dataset.revealed).toBe('false');
  expect(portrait.dataset.revealed).toBe('false');
  act(() => observer.callback([{ target: card, isIntersecting: true, intersectionRatio: .3 }]));
  expect(card.dataset.revealed).toBe('true');
  expect(portrait.dataset.revealed).toBe('false');
  expect(observer.unobserve).toHaveBeenCalledWith(card);
  act(() => observer.callback([{ target: card, isIntersecting: false }]));
  expect(card.dataset.revealed).toBe('true');
  act(() => {
    preference.matches = true;
    preference.dispatchEvent(new Event('change'));
  });
  expect([...container.querySelectorAll('[data-reveal-part]')].every(el => el.dataset.revealed === 'true')).toBe(true);
  expect(observer.disconnect).toHaveBeenCalled();
  unmount();
});

test('reduced motion makes all about content immediately visible', () => {
  preference.matches = true;
  const { container } = render(<About />);
  expect([...container.querySelectorAll('[data-reveal-part]')].every(el => el.dataset.revealed === 'true')).toBe(true);
  expect(observer).toBeUndefined();
});
