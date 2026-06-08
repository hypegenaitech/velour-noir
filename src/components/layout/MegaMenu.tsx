'use client';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

const SUBS: Record<string, string[]> = {
  FACE: ['Foundation', 'Concealer', 'Primer', 'Setting Powder', 'Bronzer'],
  EYES: ['Eyeshadow Palette', 'Eyeliner', 'Mascara', 'Liquid Eyeshadow', 'Brow'],
  LIPS: ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Liquid Lipstick', 'Lip Kit'],
  CHEEK: ['Blush', 'Highlighter', 'Bronzer', 'Contour'],
  SKINCARE: ['Moisturizer', 'Mask', 'Serum', 'Cleanser'],
  KITS: ['Eye Kits', 'Lip Kits', 'Face Kits', 'Gift Sets'],
  NEW: ['New Arrivals', 'Trending Now', 'Limited Edition', 'Best Sellers'],
  NEWS: ['Latest Articles', 'Tutorials', 'Behind the Scenes', 'Campaigns'],
};

interface Props { category: string; onClose: () => void; }

export default function MegaMenu({ category, onClose }: Props) {
  const subs = SUBS[category] ?? [];
  const catLower = category.toLowerCase();
  const featured = products
    .filter((p) => p.category === catLower || (category === 'NEW' && p.isNew))
    .slice(0, 2);

  return (
    <div
      className="absolute top-full left-0 right-0 bg-black border-t border-gold/50 shadow-2xl animate-mega-drop"
      style={{ zIndex: 200 }}
    >
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-3 gap-12">
        {/* Subcategories */}
        <div className="col-span-1">
          <p className="font-jost text-[10px] uppercase tracking-[0.2em] text-gold mb-5">Browse {category}</p>
          <ul className="space-y-3">
            {subs.map((sub) => (
              <li key={sub}>
                <Link
                  href={`/shop?sub=${sub.toLowerCase()}`}
                  onClick={onClose}
                  className="font-jost text-[12px] uppercase tracking-[0.1em] text-platinum/80 hover:text-gold transition-colors duration-200"
                >
                  {sub}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured products */}
        <div className="col-span-2 grid grid-cols-2 gap-6">
          {featured.length > 0 ? featured.map((product) => (
            <Link key={product.id} href={`/shop/${product.slug}`} onClick={onClose} className="group">
              <div className="aspect-[4/3] bg-deep overflow-hidden mb-3">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={300}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="font-jost text-[11px] uppercase tracking-widest text-platinum group-hover:text-gold transition-colors">{product.name}</p>
              <p className="font-jost text-[12px] text-gold mt-1">${product.price}</p>
            </Link>
          )) : (
            <div className="col-span-2 flex items-center justify-center">
              <p className="font-cormorant italic text-muted text-lg">Explore the Collection</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
