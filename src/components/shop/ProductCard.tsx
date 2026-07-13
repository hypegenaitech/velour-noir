'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { triggerCartBurst } from '@/components/effects/CartBurstEffect';
import Badge from '@/components/ui/Badge';
import { Star } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const { dispatch } = useCart();
  const { addToast } = useUI();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) triggerCartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    dispatch({ type: 'ADD_ITEM', payload: { product } });
    dispatch({ type: 'OPEN_CART' });
    addToast(`${product.name} added to bag`);
  };

  return (
    <div
      className="group relative bg-black"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/shop/${product.slug}`}>
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-deep">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn('object-cover transition-opacity duration-400', hovered && product.images[1] ? 'opacity-0' : 'opacity-100')}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={product.name}
              fill
              className={cn('object-cover absolute inset-0 transition-opacity duration-400', hovered ? 'opacity-100' : 'opacity-0')}
            />
          )}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant={product.badge === 'LIMITED' ? 'rose' : 'gold'}>{product.badge}</Badge>
            </div>
          )}

          {/* Canvas for particle effect */}
          <canvas
            className="absolute inset-0 pointer-events-none z-20"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <p className="font-jost text-[12px] uppercase tracking-[0.05em] text-platinum line-clamp-1">{product.name}</p>
          <p className="font-cormorant italic text-[12px] text-muted mt-0.5">{product.subcategory}</p>
          <div className="flex items-center justify-between mt-2">
            <div>
              {product.originalPrice && (
                <span className="font-jost text-[11px] text-muted line-through mr-2">${product.originalPrice}</span>
              )}
              <span className="font-jost text-[14px] text-gold">${product.price}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={10} fill="#C8A96E" className="text-gold" />
              <span className="font-jost text-[10px] text-muted">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to bag */}
      <div className={cn('overflow-hidden transition-all duration-300', 'max-h-14 lg:max-h-0', hovered && 'lg:max-h-14')}>
        <button
          ref={btnRef}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full h-10 bg-gold text-black font-jost text-[11px] uppercase tracking-[0.15em] hover:bg-gold-light transition-colors disabled:bg-muted disabled:cursor-not-allowed"
        >
          {product.inStock ? 'ADD TO BAG' : 'SOLD OUT'}
        </button>
      </div>
    </div>
  );
}
