import { StrictMode } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';

jest.mock('aos', () => ({ init: jest.fn() }));
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }));
jest.mock('./components/Skills/preloadSkills', () => {
  const { Link } = require('react-router-dom');
  return { scheduleSkillsWarmup: jest.fn(),
    loadSkills: () => Promise.resolve({ default: () => <div data-testid="retained-skills"><Link to="/">Return home</Link><Link to="/#contact">Contact home</Link></div> }) };
});

const LocationProbe = () => <output>{useLocation().pathname}</output>;

test.each(['/projects', '/projects/legacy'])('disabled route %s returns to the visible home page', async path => {
  const scroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const { unmount } = render(<MemoryRouter initialEntries={[path]}><App /><LocationProbe /></MemoryRouter>);
  await screen.findByText('/', { selector: 'output' });
  const home = screen.getByTestId('retained-home');
  expect(home).toHaveAttribute('data-active', 'true');
  expect(home.parentElement).not.toHaveAttribute('aria-hidden');
  expect(screen.queryByText('projects.title')).not.toBeInTheDocument();
  unmount();
  scroll.mockRestore();
});
jest.mock('./components/HomePage/HomePage', () => {
  const { Link } = require('react-router-dom');
  return ({ active }) => <div data-testid="retained-home" data-active={String(active)}><Link to="/skills">Enter skills</Link><section id="contact">Contact section</section></div>;
});

test.each([false, true])('contact navigation scrolls after returning home (reduced motion: %s)', async reduced => {
  const initialMedia = window.matchMedia;
  window.matchMedia = jest.fn(() => ({ matches: reduced }));
  const scroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const { unmount } = render(<MemoryRouter initialEntries={['/skills']}><App /></MemoryRouter>);
  const link = await screen.findByRole('link', { name: 'Contact home' });
  const target = document.getElementById('contact');
  target.scrollIntoView = jest.fn();
  fireEvent.click(link);
  expect(screen.getByTestId('retained-home')).toHaveAttribute('data-active', 'true');
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  unmount();
  scroll.mockRestore();
  window.matchMedia = initialMedia;
});

test('contact waits for the collapsing mobile navigation before measuring its destination', async () => {
  const initialMedia = window.matchMedia;
  window.matchMedia = jest.fn(() => ({ matches: false }));
  const scroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const callbacks = [];
  const raf = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { callbacks.push(callback); return callbacks.length; });
  const cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  const { unmount } = render(<MemoryRouter initialEntries={['/skills']}><App /></MemoryRouter>);
  const link = await screen.findByRole('link', { name: 'Contact home' });
  const navigation = document.createElement('nav');
  document.body.appendChild(navigation);
  const heights = [300, 180, 100, 80, 80, 80, 80];
  navigation.getBoundingClientRect = jest.fn(() => ({ height: heights.shift() ?? 80 }));
  const target = document.getElementById('contact');
  target.scrollIntoView = jest.fn();
  fireEvent.click(link);
  for (let frame = 0; frame < 6; frame++) {
    act(() => callbacks.shift()(frame * 16));
    expect(target.scrollIntoView).not.toHaveBeenCalled();
  }
  act(() => callbacks.shift()(96));
  expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
  unmount(); navigation.remove();
  raf.mockRestore(); cancel.mockRestore(); scroll.mockRestore(); window.matchMedia = initialMedia;
});

test('return prepares and reveals the same home DOM without replacing it at route commit', async () => {
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const { unmount } = render(<StrictMode><MemoryRouter><App /></MemoryRouter></StrictMode>);
  const original = screen.getByTestId('retained-home');
  fireEvent.click(screen.getByRole('link', { name: 'Enter skills' }));
  await screen.findByRole('link', { name: 'Return home' });
  const originalSkills = screen.getByTestId('retained-skills');
  expect(screen.getByTestId('retained-home')).toBe(original);
  expect(original.dataset.active).toBe('false');
  expect(original.parentElement).toHaveAttribute('aria-hidden', 'true');
  act(() => window.dispatchEvent(new CustomEvent('portfolio:prepare-home', {
    detail: { orbitClock: 2, orbitTime: 100 },
  })));
  expect(original.dataset.active).toBe('true');
  expect(original.parentElement).toHaveAttribute('data-ready', 'true');
  fireEvent.click(screen.getByRole('link', { name: 'Return home' }));
  expect(screen.getByTestId('retained-home')).toBe(original);
  expect(original.dataset.active).toBe('true');
  expect(original.parentElement).not.toHaveAttribute('aria-hidden');
  expect(screen.getByTestId('retained-skills')).toBe(originalSkills);
  fireEvent.click(screen.getByRole('link', { name: 'Enter skills' }));
  await screen.findByRole('link', { name: 'Return home' });
  expect(screen.getByTestId('retained-skills')).toBe(originalSkills);
  unmount();
  jest.restoreAllMocks();
});
