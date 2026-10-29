import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Journey from './Journey';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }));
jest.mock('../../hooks/useMotionVisibility', () => () => {});
jest.mock('../../hooks/useScrollReveal', () => () => Array.from({ length: 5 }, () => ({ visible: true, delay: 0 })));

beforeEach(() => {
  window.matchMedia = jest.fn(() => ({ matches: false }));
});

const pointer = (element, type) => {
  const event = new Event(type, { bubbles: true });
  Object.defineProperty(event, 'pointerType', { value: 'mouse' });
  fireEvent(element, event);
};

test('clicking a hovered journey card keeps its description open without pinning it', () => {
  render(<Journey />);
  const card = screen.getByRole('group', { name: 'journey.items.studies.title, journey.items.studies.date' });
  const description = screen.getByText('journey.items.studies.description');
  const item = card.closest('article');
  expect(description).toHaveAttribute('aria-hidden', 'true');
  pointer(card, 'pointerover');
  expect(description).toHaveAttribute('aria-hidden', 'false');
  fireEvent.click(card);
  fireEvent.click(card);
  expect(description).toHaveAttribute('aria-hidden', 'false');
  pointer(item, 'pointerout');
  expect(description).toHaveAttribute('aria-hidden', 'true');
  fireEvent.click(card);
  expect(description).toHaveAttribute('aria-hidden', 'true');
});

test('keyboard focus reveals the description and Escape dismisses it', () => {
  render(<Journey />);
  const card = screen.getByRole('group', { name: 'journey.items.studies.title, journey.items.studies.date' });
  const description = screen.getByText('journey.items.studies.description');
  const originalMatches = card.matches.bind(card);
  card.matches = selector => selector === ':focus-visible' || originalMatches(selector);
  fireEvent.focus(card);
  expect(description).toHaveAttribute('aria-hidden', 'false');
  fireEvent.click(card);
  expect(description).toHaveAttribute('aria-hidden', 'false');
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(description).toHaveAttribute('aria-hidden', 'true');
  fireEvent.blur(card);
  fireEvent.focus(card);
  expect(description).toHaveAttribute('aria-hidden', 'false');
});

test('a burst of pointer events measures once per frame and leaving cancels pending motion', () => {
  const preference = new EventTarget();
  preference.matches = true;
  window.matchMedia = jest.fn(() => preference);
  let scheduled;
  const request = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    scheduled = callback;
    return 1;
  });
  const cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => { scheduled = null; });
  const flush = () => {
    const callback = scheduled;
    scheduled = null;
    act(() => callback());
  };
  const { container, unmount } = render(<Journey />);
  const item = container.querySelector('article');
  const card = item.querySelector('[data-tilt-card]');
  const bounds = jest.spyOn(item, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 400, height: 400 });
  const move = x => {
    const event = new MouseEvent('pointermove', { bubbles: true, clientX: x, clientY: 100 });
    Object.defineProperty(event, 'pointerType', { value: 'mouse' });
    fireEvent(item, event);
  };
  for (let x = 200; x <= 300; x++) move(x);
  expect(bounds).not.toHaveBeenCalled();
  expect(request).toHaveBeenCalledTimes(1);
  flush();
  expect(bounds).toHaveBeenCalledTimes(1);
  expect(card.style.transform).toBe('rotateX(7.5deg) rotateY(7.5deg)');
  expect(item.style.length).toBe(0);
  move(350);
  pointer(item, 'pointerout');
  expect(scheduled).toBeNull();
  expect(card.style.transform).toBe('');
  move(300);
  flush();
  act(() => {
    preference.matches = false;
    preference.dispatchEvent(new Event('change'));
  });
  expect(card.style.transform).toBe('');
  move(300);
  expect(scheduled).toBeNull();
  unmount();
  request.mockRestore();
  cancel.mockRestore();
});
