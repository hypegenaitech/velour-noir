import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const IMAGES = [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
  'https://images.unsplash.com/photo-1583241475880-083f84372725?w=400&q=80',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80',
];

export default function InstagramGrid() {
  return (
    <section className="bg-black py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-cormorant text-[48px] text-white uppercase tracking-[0.1em] font-light">#VELOIRNOIR</h2>
          <div className="w-10 h-px bg-gold mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {IMAGES.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group cursor-pointer">
              <Image src={src} alt={`Instagram ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <ExternalLink size={24} className="text-white mx-auto mb-2" />
                  <p className="font-jost text-[11px] text-white uppercase tracking-wider">@veloirnoir</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
