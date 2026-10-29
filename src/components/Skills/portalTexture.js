// Rasterise the turbulent rim once; the flight only composites this small texture.
let cachedTexture;
export default function portalTexture() {
  if (cachedTexture) return cachedTexture;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 768;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  const glow = ctx.createRadialGradient(384, 384, 205, 384, 384, 350);
  glow.addColorStop(0, 'rgba(0,50,200,0)');
  glow.addColorStop(.35, 'rgba(0,80,255,.05)');
  glow.addColorStop(.61, 'rgba(0,120,255,.38)');
  glow.addColorStop(.74, 'rgba(28,160,255,.22)');
  glow.addColorStop(1, 'rgba(0,50,200,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 768, 768);
  for (let strand = 0; strand < 100; strand++) {
    const phase = strand * 2.39996;
    const radius = 279 + Math.sin(strand * 1.7) * 19;
    ctx.strokeStyle = strand % 5 === 0 ? 'rgba(100,213,255,.46)' : 'rgba(0,101,255,.25)';
    ctx.lineWidth = strand % 3 === 0 ? 1.7 : .7;
    ctx.beginPath();
    for (let step = 0; step <= 90; step++) {
      const angle = phase + step / 90 * (1.1 + (strand % 5) * .19);
      const r = radius + Math.sin(angle * 13 + strand) * 7 + Math.sin(angle * 31 - strand) * 3;
      const x = 384 + Math.cos(angle) * r;
      const y = 384 + Math.sin(angle) * r;
      if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  cachedTexture = canvas;
  return cachedTexture;
}
