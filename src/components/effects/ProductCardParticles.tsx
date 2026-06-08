'use client';
import { useRef, useCallback } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  opacity: number;
  size: number;
  born: number;
}

const COLORS = ['#C8A96E', '#E8D5A3'];
const LIFE = 800;

export default function ProductCardParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const running = useRef(false);

  const startBurst = useCallback((ex: number, ey: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = ex - rect.left;
    const cy = ey - rect.top;

    const now = performance.now();
    const burst: Particle[] = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 3;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 1,
        size: Math.random() * 3 + 1,
        born: now,
      };
    });
    particles.current = burst;

    if (!running.current) {
      running.current = true;
      const ctx = canvas.getContext('2d')!;
      const loop = () => {
        const t = performance.now();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.current = particles.current.filter((p) => t - p.born < LIFE);
        if (particles.current.length === 0) { running.current = false; return; }
        for (const p of particles.current) {
          const age = (t - p.born) / LIFE;
          p.x += p.vx; p.y += p.vy; p.vy += 0.15;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 1 - age;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        frameRef.current = requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }, []);

  return { canvasRef, startBurst };
}
