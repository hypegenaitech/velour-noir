'use client';
interface BurstParticle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  opacity: number;
  size: number;
}

const COLORS = ['#C8A96E', '#E8D5A3', '#FFFFFF', '#8B1A4A'];

export function triggerCartBurst(originX: number, originY: number) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;width:100%;height:100%';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  const particles: BurstParticle[] = Array.from({ length: 60 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 10 + 5;
    return {
      x: originX, y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 1,
      size: Math.random() * 5 + 3,
    };
  });

  const start = performance.now();
  const DURATION = 1000;

  const loop = (now: number) => {
    const elapsed = now - start;
    if (elapsed > DURATION) { canvas.remove(); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.vx *= 0.97;
      p.opacity = 1 - elapsed / DURATION;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
