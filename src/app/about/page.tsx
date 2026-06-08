import Image from 'next/image';
import Link from 'next/link';

const STATS = [
  { value: '1M+', label: 'CUSTOMERS' },
  { value: '40+', label: 'SHADE RANGES' },
  { value: '200+', label: 'RUNWAY SHOWS' },
  { value: '50+', label: 'AWARDS' },
];

const SECTIONS = [
  {
    title: 'THE ORIGIN',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=80',
    text: "VELOUR NOIR was born from a single moment backstage at a Paris runway show. A brushstroke of pigment so intense, so alive, that it demanded a brand built entirely around that electricity. We did not set out to disrupt the beauty industry. We set out to ignite it.\n\nFounded in 2024, every product in our line is a direct answer to a need we saw go unmet — for makeup that performs at the level of its price, that pushes the boundaries of what pigment can do, and that treats the act of getting ready as the art form it truly is.",
    reverse: false,
  },
  {
    title: 'THE PHILOSOPHY',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    text: "Beauty should have no prerequisites. No skin tone requirements. No age limit. No size chart. VELOUR NOIR was built for every person who has ever looked at a makeup counter and not seen themselves — and decided to create their own standard.\n\nEvery formula is 100% vegan, cruelty-free, and developed with a commitment to inclusivity in both shade range and formulation. We test on all skin types. We develop for all complexions. We design for all identities.",
    reverse: true,
  },
  {
    title: 'THE ARTISTRY',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&q=80',
    text: "The runway is in our DNA. Our formulas are developed alongside professional makeup artists who work at the highest levels of editorial and couture. Every product is field-tested under the harshest conditions — stage lighting, camera flash, 14-hour wear.\n\nWhat works at Fashion Week works everywhere. That is the VELOUR NOIR standard: luxury that does not compromise on performance, ever.",
    reverse: false,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=80"
          alt="About Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10">
          <h1 className="font-cormorant font-light text-white uppercase leading-none" style={{ fontSize: 'clamp(64px,10vw,120px)', letterSpacing: '0.05em' }}>
            THE STORY
          </h1>
          <p className="font-cormorant italic text-gold text-[22px] mt-4">Born from a brushstroke. Built for the bold.</p>
        </div>
      </section>

      {/* Sections */}
      {SECTIONS.map((sec) => (
        <section key={sec.title} className="max-w-7xl mx-auto px-8 py-28">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${sec.reverse ? 'md:grid-flow-dense' : ''}`}>
            <div className={`relative aspect-[4/5] overflow-hidden ${sec.reverse ? 'md:col-start-2' : ''}`}>
              <Image src={sec.image} alt={sec.title} fill className="object-cover" />
            </div>
            <div className={sec.reverse ? 'md:col-start-1 md:row-start-1' : ''}>
              <h2 className="font-cormorant text-[56px] text-white uppercase tracking-[0.05em] font-light leading-tight mb-8">{sec.title}</h2>
              <p className="font-jost text-[14px] text-muted leading-relaxed whitespace-pre-line">{sec.text}</p>
            </div>
          </div>
        </section>
      ))}

      {/* Stats */}
      <section className="border-t border-gold/20 border-b border-gold/20 py-16">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-cormorant text-[64px] text-gold font-light leading-none">{s.value}</p>
              <p className="font-jost text-[11px] uppercase tracking-[0.2em] text-muted mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="font-cormorant text-[56px] text-white uppercase tracking-[0.05em] font-light mb-6">EXPLORE THE COLLECTION</h2>
        <Link href="/shop" className="inline-block bg-gold text-black font-jost text-[13px] uppercase tracking-[0.2em] px-12 py-4 hover:bg-gold-light transition-colors">
          SHOP NOW
        </Link>
      </section>
    </div>
  );
}
