'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, X, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { products } from '@/data/products';

export default function WishlistPage() {
  const { wishlist, toggle } = useWishlist();
  const { dispatch } = useCart();
  const { addToast } = useUI();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const wishlisted = mounted
    ? products.filter((p) => wishlist.includes(p.id))
    : [];

  const handleAddToCart = (product: (typeof products)[0]) => {
    dispatch({ type: 'ADD_ITEM', payload: { product } });
    dispatch({ type: 'OPEN_CART' });
    addToast(`${product.name} added to bag`);
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Heart size={20} className="text-gold" />
            <h1 className="font-cormorant text-[clamp(40px,8vw,72px)] text-white uppercase tracking-[0.05em] font-light leading-none">
              MY WISHLIST
            </h1>
          </div>
          {mounted && (
            <p className="font-jost text-[12px] uppercase tracking-[0.2em] text-gold mt-2">
              {wishlisted.length} {wishlisted.length === 1 ? 'ITEM' : 'ITEMS'}
            </p>
          )}
          <div className="w-10 h-px bg-gold mx-auto mt-6" />
        </div>

        {mounted && wishlisted.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {wishlisted.map((product) => (
                <div key={product.id} className="group relative">
                  <Link href={`/shop/${product.slug}`}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-deep mb-4">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Remove from wishlist */}
                      <button
                        onClick={(e) => { e.preventDefault(); toggle(product.id); addToast(`${product.name} removed from wishlist`); }}
                        aria-label="Remove from wishlist"
                        className="absolute top-3 right-3 w-8 h-8 bg-black/60 flex items-center justify-center text-gold hover:bg-black transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="font-jost text-[11px] uppercase tracking-wider text-platinum line-clamp-1">{product.name}</p>
                    <p className="font-cormorant italic text-[12px] text-muted mt-0.5">{product.subcategory}</p>
                    <p className="font-jost text-[14px] text-gold mt-1">{formatPrice(product.price)}</p>
                  </Link>

                  {/* Add to bag */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="mt-3 w-full h-10 bg-gold/10 border border-gold/40 text-gold font-jost text-[11px] uppercase tracking-[0.15em] hover:bg-gold hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={13} />
                    {product.inStock ? 'ADD TO BAG' : 'SOLD OUT'}
                  </button>
                </div>
              ))}
            </div>

            {/* Move all to cart */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-gold/20 pt-10">
              <button
                onClick={() => {
                  wishlisted.filter((p) => p.inStock).forEach((p) => {
                    dispatch({ type: 'ADD_ITEM', payload: { product: p } });
                  });
                  dispatch({ type: 'OPEN_CART' });
                  addToast(`${wishlisted.filter((p) => p.inStock).length} items added to bag`);
                }}
                className="font-jost text-[11px] uppercase tracking-[0.2em] bg-gold text-black px-10 py-4 hover:bg-gold-light transition-colors"
              >
                ADD ALL TO BAG
              </button>
              <Link
                href="/shop"
                className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold border border-gold/50 px-10 py-4 hover:bg-gold/10 transition-colors"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </>
        ) : (
          /* Empty state â€” shown before mount and when wishlist is empty */
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <Heart size={48} className="text-gold/30" />
            <h2 className="font-cormorant text-[32px] text-white uppercase tracking-[0.05em] font-light">
              Your Wishlist is Empty
            </h2>
            <p className="font-jost text-[13px] text-muted max-w-xs leading-relaxed">
              Save the products you love by tapping the heart icon on any product.
            </p>
            <Link
              href="/shop"
              className="mt-4 font-jost text-[11px] uppercase tracking-[0.2em] bg-gold text-black px-10 py-4 hover:bg-gold-light transition-colors"
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
