'use client';
import { useEffect, useRef } from 'react';

interface TrailParticle {
  x: number; y: number;
  size: number;
  color: string;
  opacity: number;
  born: number;
  life: number;
}

export default function GlitterTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<TrailParticle[]>([]);
  const frameRef = useRef<number>(0);
  const lastSpawn = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    const COLORS = ['#C8A96E', '#E8D5A3', '#FFFFFF', '#C8A96E'];
    const LIFE = 600;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 30) return;
      lastSpawn.current = now;
      particles.current.push({
        x: e.clientX, y: e.clientY,
        size: Math.random() * 3 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.8,
        born: now,
        life: LIFE,
      });
    };
    window.addEventListener('mousemove', onMove);

    const loop = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => now - p.born < p.life);
      for (const p of particles.current) {
        const age = (now - p.born) / p.life;
        const alpha = p.opacity * (1 - age);
        const s = p.size * (1 - age * 0.6);
        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
