import { createRecoil, stepRecoil } from './magneticMotion';
import { chapterAt, flightPhase } from './portalData';

test.each([.02, .04])('cursor throws icons then recovers their orbit at %s second intervals', dt => {
  const body = createRecoil();
  let largest = 0;
  for (let time = 0; time <= 6; time += dt) {
    stepRecoil(body, { active: time === 0, x: 300, y: 200 }, 300, 200, 30, 720, time, dt);
    largest = Math.max(largest, Math.hypot(body.x, body.y));
  }
  expect(largest).toBeGreaterThan(60);
  expect(Math.hypot(body.x, body.y)).toBeLessThan(.2);
});

test('all five chapters are reachable and another scroll begins departing after the description appears', () => {
  expect([.18, .35, .52, .69, .89].map(chapterAt)).toEqual([1, 2, 3, 4, 5]);
  const ready = flightPhase(.174, 1);
  const nextScroll = flightPhase(.195, 1);
  expect(ready.description).toBeGreaterThan(.95);
  expect(nextScroll.departure).toBeGreaterThan(.04);
  expect(nextScroll.scale).toBeGreaterThan(ready.scale);
  expect(flightPhase(1, 5).description).toBe(1);
});
