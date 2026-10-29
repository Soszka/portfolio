export const createRecoil = () => ({ x: 0, y: 0, vx: 0, vy: 0, next: 0 });
export function stepRecoil(body, pointer, x, y, radius, unit, time, dt) {
  if (pointer.active && time >= body.next) {
    const dx = x + body.x - pointer.x, dy = y + body.y - pointer.y;
    const distance = Math.hypot(dx, dy);
    const reach = radius + unit * .12;
    if (distance < reach) {
      const nx = distance > .01 ? dx / distance : 1;
      const ny = distance > .01 ? dy / distance : 0;
      const kick = radius * (14 + 14 * (1 - distance / reach));
      const impulse = Math.max(0, kick - body.vx * nx - body.vy * ny);
      body.vx += nx * impulse; body.vy += ny * impulse;
      body.next = time + .28;
    }
  }
  const steps = Math.max(1, Math.ceil(dt / .012));
  const step = dt / steps;
  for (let i = 0; i < steps; i++) {
    body.vx += (-14 * body.x - 4.8 * body.vx) * step;
    body.vy += (-14 * body.y - 4.8 * body.vy) * step;
    body.x += body.vx * step; body.y += body.vy * step;
  }
}
