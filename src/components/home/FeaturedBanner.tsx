import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedBanner() {
  return (
    <section className="relative w-full overflow-hidden group" style={{ height: '70vh' }}>
      <Image
        src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1600&q=80"
        alt="Gilded Nirvana Collection"
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 z-10">
        <p className="font-cormorant text-[28px] sm:text-[36px] md:text-[48px] text-white uppercase tracking-[0.05em] leading-tight mb-2">
          THE GILDED NIRVANA<br />COLLECTION
        </p>
        <p className="font-cormorant italic text-gold text-base sm:text-xl mb-6">Discover the new standard of luxury</p>
        <Link href="/shop?category=new" className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold hover:text-gold-light transition-colors">
          SHOP THE COLLECTION →
        </Link>
      </div>
    </section>
  );
}
