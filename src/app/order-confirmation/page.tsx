'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { btnGold, btnOutline } from '@/components/ui/Button';

export default function OrderConfirmationPage() {
  useEffect(() => {
    import('@/components/effects/CartBurstEffect').then(({ triggerCartBurst }) => {
      triggerCartBurst(window.innerWidth / 2, window.innerHeight / 2);
      setTimeout(() => triggerCartBurst(window.innerWidth * 0.3, window.innerHeight * 0.5), 300);
      setTimeout(() => triggerCartBurst(window.innerWidth * 0.7, window.innerHeight * 0.4), 600);
    });
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-[100px] px-8">
      <div className="max-w-2xl w-full text-center">
        <div className="flex justify-center mb-8">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="#C8A96E" strokeWidth="2" opacity="0.3" />
            <path
              d="M24 40L35 51L56 30"
              stroke="#C8A96E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 40, strokeDashoffset: 0, animation: 'dashDraw 0.6s 0.3s ease both' }}
            />
            <style>{`@keyframes dashDraw { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }`}</style>
          </svg>
        </div>

        <h1 className="font-cormorant text-[64px] text-white uppercase tracking-[0.05em] font-light leading-tight mb-4">
          ORDER<br />CONFIRMED
        </h1>
        <p className="font-cormorant italic text-[32px] text-gold mb-8">Thank you for your order.</p>

        <div className="border border-gold/20 p-8 mb-10 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="font-jost text-[11px] uppercase tracking-wider text-muted">ORDER NUMBER</span>
            <span className="font-jost text-[13px] text-platinum">ORDER #VN-2024-8847</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-jost text-[11px] uppercase tracking-wider text-muted">ESTIMATED ARRIVAL</span>
            <span className="font-jost text-[13px] text-platinum">Dec 15–18, 2025</span>
          </div>
        </div>

        <p className="font-cormorant italic text-muted mb-10">A confirmation has been sent to your email address.</p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/shop" className={btnGold}>CONTINUE SHOPPING</Link>
          <Link href="#" className={btnOutline}>TRACK MY ORDER</Link>
        </div>

        <div className="mt-12">
          <p className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Share your obsession</p>
          <div className="flex justify-center gap-4">
            {['INSTAGRAM', 'TIKTOK', 'PINTEREST'].map((s) => (
              <button key={s} className="font-jost text-[11px] uppercase tracking-wider text-muted hover:text-gold transition-colors">{s}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
