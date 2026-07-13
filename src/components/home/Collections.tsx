import Image from 'next/image';
import Link from 'next/link';

const COLLECTIONS = [
  { title: 'THE EYES', href: '/shop?category=eyes', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80' },
  { title: 'THE LIPS', href: '/shop?category=lips', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80' },
  { title: 'THE FACE', href: '/shop?category=face', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80' },
];

export default function Collections() {
  return (
    <section className="bg-black py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-cormorant text-[48px] text-white uppercase tracking-[0.1em] font-light">COLLECTIONS</h2>
          <div className="w-10 h-px bg-gold mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLLECTIONS.map((col) => (
            <Link key={col.title} href={col.href} className="group relative overflow-hidden h-[380px] md:h-[500px] block">
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 60%)' }}
              />
              <div className="absolute bottom-8 left-8 z-10">
                <p className="font-cormorant text-[32px] text-white uppercase tracking-[0.05em] leading-tight mb-2">{col.title}</p>
                <span className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold">SHOP NOW →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
