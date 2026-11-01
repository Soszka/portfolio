import { act, cleanup, render, screen } from '@testing-library/react';
import Adventages from './Adventages';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }));
jest.mock('../../hooks/useMotionVisibility', () => () => {});

let observer;
let preference;

beforeEach(() => {
  preference = new EventTarget();
  preference.matches = false;
  window.matchMedia = jest.fn(() => preference);
  observer = undefined;
  window.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; observer = this; }
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
});

afterEach(cleanup);

test('offscreen expertise cards wait for their own entrance and motion preference changes reveal the rest', () => {
  const { container } = render(<Adventages />);
  const frontend = screen.getByRole('article', { name: 'expertise.items.frontend.title' }).parentElement;
  const architecture = screen.getByRole('article', { name: 'expertise.items.architecture.title' }).parentElement;
  expect(frontend.dataset.revealed).toBe('false');
  expect(architecture.dataset.revealed).toBe('false');
  act(() => observer.callback([{ target: frontend, isIntersecting: true, intersectionRatio: .3 }]));
  expect(frontend.dataset.revealed).toBe('true');
  expect(architecture.dataset.revealed).toBe('false');
  act(() => observer.callback([{ target: frontend, isIntersecting: false }]));
  expect(frontend.dataset.revealed).toBe('true');
  act(() => { preference.matches = true; preference.dispatchEvent(new Event('change')); });
  expect([...container.querySelectorAll('[data-revealed]')].every(el => el.dataset.revealed === 'true')).toBe(true);
  expect(observer.disconnect).toHaveBeenCalled();
});

test('reduced motion displays every expertise card immediately', () => {
  preference.matches = true;
  const { container } = render(<Adventages />);
  expect(screen.getAllByRole('article')).toHaveLength(6);
  expect([...container.querySelectorAll('[data-revealed]')].every(el => el.dataset.revealed === 'true')).toBe(true);
  expect(observer).toBeUndefined();
});
