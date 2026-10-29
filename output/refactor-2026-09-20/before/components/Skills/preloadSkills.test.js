import { loadSkills } from './preloadSkills';
import portalTexture from './portalTexture';
jest.mock('./Skills', () => ({ __esModule: true, default: () => null }));
jest.mock('./portalTexture', () => jest.fn());

test('route preparation shares one load and decodes backgrounds before resolving', async () => {
  const original = global.Image;
  const decode = jest.fn(() => Promise.resolve());
  global.Image = class { decode = decode; };
  try {
    const first = loadSkills();
    expect(loadSkills()).toBe(first);
    const module = await first;
    expect(module.default).toBeDefined();
    expect(decode).toHaveBeenCalledTimes(3);
    expect(portalTexture).toHaveBeenCalledTimes(1);
    await loadSkills();
    expect(decode).toHaveBeenCalledTimes(3);
  } finally { global.Image = original; }
});
