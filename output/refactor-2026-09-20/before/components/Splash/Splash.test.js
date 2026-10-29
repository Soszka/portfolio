import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Splash from './Splash';
import Animation from '../Animation/Animation';

jest.mock('../Achivments/Achivments', () => () => null);
jest.mock('../Navigation/Navigation', () => () => <nav data-menu-open="false" />);
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key) => key }) }));

let frames;
let frameNumber;
let intersections;
let preference;

beforeEach(() => {
  frames = new Map();
  frameNumber = 0;
  intersections = [];
  preference = new EventTarget();
  preference.matches = false;
  window.matchMedia = jest.fn((query) => query === '(pointer: fine)'
    ? { matches: true } : preference);
  window.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; intersections.push(this); }
    observe = jest.fn();
    disconnect = jest.fn();
  };
  window.ResizeObserver = class {
    observe = jest.fn();
    disconnect = jest.fn();
  };
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frameNumber += 1;
    frames.set(frameNumber, callback);
    return frameNumber;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => frames.delete(id));
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(720);
  jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(620);
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const tick = (time) => act(() => {
  const pending = [...frames.values()];
  frames.clear();
  pending.forEach((callback) => callback(time));
});

test('a retained home stops while covered and keeps its running orbit when the return completes', () => {
  const view = (active, orbitClock) => <MemoryRouter><Splash active={active} orbitHandoff={{ orbitClock }} /></MemoryRouter>;
  const { rerender, unmount } = render(view(true, 0));
  const icon = screen.getByTitle('Sass');
  tick(20);
  rerender(view(false, 0));
  expect(frames.size).toBe(0);
  const paused = icon.style.transform;
  tick(80);
  expect(icon.style.transform).toBe(paused);
  rerender(view(true, 2));
  expect(screen.getByTitle('Sass')).toBe(icon);
  expect(icon.style.transform).not.toBe(paused);
  tick(100);
  tick(140);
  const running = icon.style.transform;
  // Finishing navigation must not reseed or restart the already running field.
  rerender(view(true, 3));
  expect(icon.style.transform).toBe(running);
  expect(frames.size).toBe(1);
  unmount();
  expect(frames.size).toBe(0);
});

test('icons move, stop completely outside the viewport and resume with a single loop', () => {
  const { unmount } = render(<MemoryRouter><Splash /></MemoryRouter>);
  const icon = screen.getByTitle('Sass');
  tick(20);
  const first = icon.style.transform;
  tick(60);
  expect(icon.style.transform).not.toBe(first);
  expect(frames.size).toBe(1);

  act(() => intersections[0].callback([{ isIntersecting: false }]));
  expect(frames.size).toBe(0);
  const paused = icon.style.transform;
  tick(120);
  expect(icon.style.transform).toBe(paused);

  act(() => {
    intersections[0].callback([{ isIntersecting: true }]);
    intersections[0].callback([{ isIntersecting: true }]);
  });
  expect(frames.size).toBe(1);
  tick(160);
  tick(200);
  expect(icon.style.transform).not.toBe(paused);
  unmount();
  expect(frames.size).toBe(0);
  expect(intersections[0].disconnect).toHaveBeenCalled();
});

test('ordered orbits keep moving through the centre without bunching up', () => {
  const { container } = render(<MemoryRouter><Splash /></MemoryRouter>);
  const icons = [...container.querySelectorAll('[data-magnetic-icon]')];
  const centralPasses = new Set();
  const angle = icon => {
    const [x, y] = icon.style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/).slice(1).map(Number);
    const radius = parseFloat(icon.style.width) / 2;
    if (Math.abs(x + radius - 360) < 120 && Math.abs(y + radius - 304) < 125) {
      centralPasses.add(icon.title);
    }
    return Math.atan2(y + radius - 620 * .49, x + radius - 360);
  };
  tick(20);
  let previous = icons.map(angle);
  const travelled = icons.map(() => 0);
  let minimumClearance = Infinity;
  for (let time = 60; time <= 30020; time += 40) {
    tick(time);
    icons.forEach((icon, index) => {
      const next = angle(icon);
      const delta = next - previous[index];
      travelled[index] += Math.atan2(Math.sin(delta), Math.cos(delta));
      previous[index] = next;
    });
    const circles = icons.map(icon => {
      const [x, y] = icon.style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/).slice(1).map(Number);
      const radius = parseFloat(icon.style.width) / 2;
      return { x: x + radius, y: y + radius, radius };
    });
    for (let a = 0; a < circles.length; a++) {
      for (let b = a + 1; b < circles.length; b++) {
        minimumClearance = Math.min(minimumClearance,
          Math.hypot(circles[a].x - circles[b].x, circles[a].y - circles[b].y) /
          (circles[a].radius + circles[b].radius));
      }
    }
  }
  expect(travelled.filter(radians => radians > 2).length).toBeGreaterThan(18);
  expect(centralPasses.size).toBeGreaterThan(4);
  expect(minimumClearance).toBeGreaterThan(1);
  expect(frames.size).toBe(1);
});

test.each([20, 40])('cursor kicks icons clearly and they recover their moving slots (%i ms frames)', (interval) => {
  const position = icon => icon.style.transform
    .match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/).slice(1).map(Number);
  const baseline = render(<MemoryRouter><Splash /></MemoryRouter>);
  tick(20);
  const initial = position(screen.getByTitle('Sass'));
  const radius = parseFloat(screen.getByTitle('Sass').style.width) / 2;
  const samples = [];
  for (let time = 20 + interval; time <= 6020; time += interval) {
    tick(time);
    samples.push(position(screen.getByTitle('Sass')));
  }
  baseline.unmount();

  const { container } = render(<MemoryRouter><Splash /></MemoryRouter>);
  tick(20);
  const field = container.querySelector('[data-chaos-field]');
  fireEvent(field, new MouseEvent('pointermove', {
    bubbles: true, clientX: initial[0] + radius - 8, clientY: initial[1] + radius,
  }));
  let maximumDisplacement = 0;
  let finalDisplacement = Infinity;
  let sample = 0;
  for (let time = 20 + interval; time <= 6020; time += interval) {
    tick(time);
    if (sample === 0) fireEvent.pointerLeave(field);
    const current = position(screen.getByTitle('Sass'));
    finalDisplacement = Math.hypot(current[0] - samples[sample][0], current[1] - samples[sample][1]);
    maximumDisplacement = Math.max(maximumDisplacement, finalDisplacement);
    sample++;
  }
  expect(maximumDisplacement).toBeGreaterThan(radius * 2);
  expect(finalDisplacement).toBeLessThan(1);
  expect(frames.size).toBe(1);
});

test('icons keep their proportion when the magnetic field doubles on a large monitor', () => {
  render(<MemoryRouter><Splash /></MemoryRouter>);
  const icon = screen.getByTitle('Sass');
  const laptopSize = parseFloat(icon.style.width);
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(1440);
  jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(1240);
  fireEvent(window, new Event('resize'));
  expect(parseFloat(icon.style.width)).toBeCloseTo(laptopSize * 2);
  expect(frames.size).toBe(1);
});

test('the field cursor shares the icon frame and clears on pointer exit', () => {
  const { container } = render(<MemoryRouter><Splash /></MemoryRouter>);
  const field = container.querySelector('[data-chaos-field]');
  const cursor = container.querySelector('[data-field-cursor]');
  fireEvent(field, new MouseEvent('pointermove', { bubbles: true, clientX: 120, clientY: 90 }));
  expect(field.dataset.pointerActive).toBe('true');
  tick(20);
  expect(cursor.style.transform).toBe('translate3d(120px, 90px, 0)');
  expect(frames.size).toBe(1);
  fireEvent.pointerLeave(field);
  expect(field.dataset.pointerActive).toBe('false');
  expect(frames.size).toBe(1);
});

test('a changed reduced-motion preference stops continuous rendering and can resume it', () => {
  render(<MemoryRouter><Splash /></MemoryRouter>);
  tick(20);
  act(() => {
    preference.matches = true;
    preference.dispatchEvent(new Event('change'));
  });
  tick(40);
  expect(frames.size).toBe(0);
  act(() => {
    preference.matches = false;
    preference.dispatchEvent(new Event('change'));
  });
  expect(frames.size).toBe(1);
});

test('about animation caches its beams and does no drawing outside the viewport or hidden tab', () => {
  const context = {
    clearRect: jest.fn(), save: jest.fn(), restore: jest.fn(), scale: jest.fn(),
    drawImage: jest.fn(), fillRect: jest.fn(),
    createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  };
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  const { unmount } = render(<Animation />);
  expect(frames.size).toBe(0);
  expect(context.createLinearGradient).not.toHaveBeenCalled();

  act(() => intersections[0].callback([{ isIntersecting: true }]));
  tick(20);
  const gradients = context.createLinearGradient.mock.calls.length;
  expect(gradients).toBeGreaterThan(0);
  expect(screen.getByTestId('about-animation').width).toBe(720);
  const firstDraws = context.drawImage.mock.calls.length;
  tick(35);
  expect(context.drawImage).toHaveBeenCalledTimes(firstDraws);
  tick(60);
  expect(context.drawImage.mock.calls.length).toBeGreaterThan(firstDraws);
  expect(context.createLinearGradient).toHaveBeenCalledTimes(gradients);

  act(() => intersections[0].callback([{ isIntersecting: false }]));
  const pausedDraws = context.drawImage.mock.calls.length;
  tick(100);
  expect(frames.size).toBe(0);
  expect(context.drawImage).toHaveBeenCalledTimes(pausedDraws);
  act(() => intersections[0].callback([{ isIntersecting: true }]));
  tick(140);
  expect(frames.size).toBe(1);

  const hidden = jest.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(frames.size).toBe(0);
  hidden.mockReturnValue(false);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(frames.size).toBe(1);

  act(() => {
    preference.matches = true;
    preference.dispatchEvent(new Event('change'));
  });
  tick(180);
  expect(frames.size).toBe(0);
  act(() => {
    preference.matches = false;
    preference.dispatchEvent(new Event('change'));
  });
  expect(frames.size).toBe(1);
  unmount();
  expect(frames.size).toBe(0);
  expect(intersections[0].disconnect).toHaveBeenCalled();
});
