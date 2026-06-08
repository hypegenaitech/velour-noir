'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { btnGold, btnOutline } from '@/components/ui/Button';
import gsap from 'gsap';

const LINE1 = 'GILDED';
const LINE2 = 'NIRVANA';



export default function Hero() {
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars1 = line1Ref.current?.querySelectorAll<HTMLElement>('.char');
    const chars2 = line2Ref.current?.querySelectorAll<HTMLElement>('.char');

    gsap.set([eyebrowRef.current, subRef.current, ctaRef.current, scrollRef.current], {
      opacity: 0, y: 30,
    });
    if (chars1?.length) {
      gsap.set(chars1, { opacity: 0, y: '100%', rotateX: -80, transformOrigin: '50% 100%' });
    }
    if (chars2?.length) {
      gsap.set(chars2, { opacity: 0, y: '100%', rotateX: -80, transformOrigin: '50% 100%' });
    }

    const tl = gsap.timeline({ delay: 1.65 }); // start as particle burst peaks

    // Eyebrow fades in first
    tl.to(eyebrowRef.current, {
      opacity: 1, y: 0,
      duration: 0.6, ease: 'power3.out',
    });

    // "GILDED" — chars flip up from below with stagger
    if (chars1?.length) {
      tl.to(chars1, {
        opacity: 1, y: '0%', rotateX: 0,
        duration: 0.7, stagger: 0.05, ease: 'power4.out',
      }, '-=0.15');
    }

    // "NIRVANA" — follows right behind, tighter overlap
    if (chars2?.length) {
      tl.to(chars2, {
        opacity: 1, y: '0%', rotateX: 0,
        duration: 0.7, stagger: 0.04, ease: 'power4.out',
      }, '-=0.5');
    }

    tl.to(subRef.current,    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.1');
    tl.to(ctaRef.current,    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');
    tl.to(scrollRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=80"
          alt="Hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.22) 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-2xl">
          <span ref={eyebrowRef} className="block font-jost text-[11px] uppercase tracking-[0.35em] text-gold mb-8">
            NEW COLLECTION
          </span>

          <h1
            className="font-cormorant font-light leading-none tracking-[0.04em] text-white uppercase mb-8"
            style={{ fontSize: 'clamp(48px, 12vw, 140px)', perspective: '800px' }}
          >
            {/* Line 1 — overflow-hidden clips the y-translate animation */}
            <span className="block overflow-hidden whitespace-nowrap" style={{ perspective: '600px' }}>
              <span ref={line1Ref} aria-label={LINE1}>
                {LINE1.split('').map((ch, i) => (
                  <span key={i} className="char" style={{ display: 'inline-block' }} aria-hidden="true">
                    {ch}
                  </span>
                ))}
              </span>
            </span>

            {/* Line 2 */}
            <span className="block overflow-hidden whitespace-nowrap" style={{ perspective: '600px' }}>
              <span ref={line2Ref} aria-label={LINE2}>
                {LINE2.split('').map((ch, i) => (
                  <span key={i} className="char" style={{ display: 'inline-block' }} aria-hidden="true">
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <p ref={subRef} className="font-cormorant italic text-gold text-[22px] mb-12 leading-snug">
            The art of transformation. The power of pigment.
          </p>

          <div ref={ctaRef} className="flex items-center gap-5 flex-wrap">
            <Link href="/shop" className={btnGold}>SHOP NOW</Link>
            <Link href="/shop?category=new" className={btnOutline}>EXPLORE COLLECTION</Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gold/40 animate-pulse" />
        <span className="font-jost text-[9px] uppercase tracking-[0.3em] text-gold/60">SCROLL</span>
      </div>
    </section>
  );
}
