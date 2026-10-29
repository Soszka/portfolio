import { StrictMode } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import '@testing-library/jest-dom';

jest.mock('aos', () => ({ init: jest.fn() }));
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: key => key }) }));
jest.mock('./components/Skills/preloadSkills', () => {
  const { Link } = require('react-router-dom');
  return { scheduleSkillsWarmup: jest.fn(),
    loadSkills: () => Promise.resolve({ default: () => <div data-testid="retained-skills"><Link to="/">Return home</Link></div> }) };
});
jest.mock('./components/HomePage/HomePage', () => {
  const { Link } = require('react-router-dom');
  return ({ active }) => <div data-testid="retained-home" data-active={String(active)}><Link to="/skills">Enter skills</Link></div>;
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
