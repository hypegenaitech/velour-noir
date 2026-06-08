import Image from 'next/image';
import Link from 'next/link';

export default function EditorialStory() {
  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
            alt="The Founder"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <span className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold block mb-4">THE FOUNDER</span>
          <h2 className="font-cormorant text-[56px] text-white uppercase tracking-[0.05em] font-light leading-tight mb-8">
            THE MOTHER<br />OF MAKEUP
          </h2>
          <p className="font-jost text-[14px] text-muted leading-relaxed mb-4">
            VELOUR NOIR was born from a single brushstroke on a darkened runway. What began as a vision — makeup as armor, beauty as rebellion — became a movement that redefined what luxury cosmetics could be.
          </p>
          <p className="font-jost text-[14px] text-muted leading-relaxed mb-8">
            Every formula, every shade, every limited edition collection is built on a foundation of artistic obsession and scientific precision. We don't follow trends. We create them — one editorial moment at a time.
          </p>
          <Link href="/about" className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold underline hover:text-gold-light transition-colors">
            READ THE STORY
          </Link>
        </div>
      </div>
    </section>
  );
}
