'use client';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import ImageGallery from '@/components/product/ImageGallery';
import ShadeSelector from '@/components/product/ShadeSelector';
import QuantitySelector from '@/components/product/QuantitySelector';
import AccordionInfo from '@/components/product/AccordionInfo';
import ReviewsSection from '@/components/product/ReviewsSection';
import ProductCard from '@/components/shop/ProductCard';
import Badge from '@/components/ui/Badge';
import { Star, Heart, Leaf, ShieldCheck } from 'lucide-react';
import { useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { triggerCartBurst } from '@/components/effects/CartBurstEffect';
import { Shade } from '@/types';
import Link from 'next/link';
interface Props { params: { slug: string }; }

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const [selectedShade, setSelectedShade] = useState<Shade | null>(product.shades[0] ?? null);
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes?.[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const { dispatch } = useCart();
  const { addToast } = useUI();

  const handleAddToBag = () => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) triggerCartBurst(rect.left + rect.width / 2, rect.top);
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: { product, shade: selectedShade ?? undefined, size: selectedSize ?? undefined } });
    }
    dispatch({ type: 'OPEN_CART' });
    addToast(`${product.name} added to bag`);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2500);
  };

  return (
    <div className="min-h-screen bg-black pt-[100px]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10 font-jost text-[11px] uppercase tracking-wider">
          <Link href="/" className="text-muted hover:text-gold transition-colors">HOME</Link>
          <span className="text-gold">/</span>
          <Link href={`/shop?category=${product.category}`} className="text-muted hover:text-gold transition-colors">{product.category.toUpperCase()}</Link>
          <span className="text-gold">/</span>
          <span className="text-platinum">{product.subcategory.toUpperCase()}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16">
          {/* Gallery */}
          <ImageGallery images={product.images} name={product.name} />

          {/* Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {product.isBestseller && <Badge variant="gold">BESTSELLER</Badge>}
              {product.isLimited && <Badge variant="rose">LIMITED EDITION</Badge>}
              {product.isNew && <Badge variant="gold">NEW</Badge>}
            </div>

            <div>
              <h1 className="font-cormorant font-light text-[48px] text-white uppercase tracking-[0.05em] leading-tight">{product.name}</h1>
              <p className="font-cormorant italic text-gold text-[18px] mt-2">{product.tagline}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill="#C8A96E" className="text-gold" />
                ))}
              </div>
              <span className="font-jost text-[12px] text-gold">{product.rating}</span>
              <span className="font-jost text-[12px] text-muted">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {product.originalPrice && (
                <span className="font-jost text-[16px] text-muted line-through">${product.originalPrice}</span>
              )}
              <span className="font-jost text-[24px] text-gold">${product.price}</span>
            </div>

            {/* Shade selector */}
            {product.shades.length > 1 && (
              <ShadeSelector shades={product.shades} selected={selectedShade} onChange={setSelectedShade} />
            )}

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-muted mb-3">SIZE</p>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 font-jost text-[11px] uppercase tracking-wider transition-colors ${
                        selectedSize === size ? 'bg-gold text-black' : 'border border-gold/50 text-gold hover:bg-gold/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-muted mb-3">QUANTITY</p>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>

            {/* Add to bag */}
            <div className="space-y-3 pt-2">
              <button
                ref={btnRef}
                onClick={handleAddToBag}
                disabled={!product.inStock}
                className="w-full h-14 bg-gold text-black font-jost text-[13px] uppercase tracking-[0.2em] hover:bg-gold-light transition-all duration-200 disabled:bg-muted disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {!product.inStock ? 'SOLD OUT' : addedToBag ? 'ADDED ✓' : 'ADD TO BAG'}
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`w-full h-12 border flex items-center justify-center gap-2 font-jost text-[11px] uppercase tracking-[0.15em] transition-colors ${
                  wishlisted ? 'border-gold bg-gold/10 text-gold' : 'border-gold/50 text-gold hover:bg-gold/10'
                }`}
              >
                <Heart size={14} fill={wishlisted ? '#C8A96E' : 'none'} />
                {wishlisted ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>

            {/* Trust row */}
            <div className="flex items-center justify-around py-5 border-t border-b border-gold/20">
              {[
                { Icon: Leaf, label: 'VEGAN FORMULA' },
                { Icon: Heart, label: 'CRUELTY FREE' },
                { Icon: ShieldCheck, label: 'DERM TESTED' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon size={16} className="text-muted" />
                  <span className="font-jost text-[9px] uppercase tracking-[0.1em] text-muted">{label}</span>
                </div>
              ))}
            </div>

            <p className="text-center font-jost text-[12px] text-gold">FREE SHIPPING ON ORDERS OVER $100</p>

            <AccordionInfo product={product} />
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-32">
            <div className="text-center mb-14">
              <h2 className="font-cormorant text-[40px] text-white uppercase tracking-[0.1em] font-light">COMPLETE THE LOOK</h2>
              <div className="w-10 h-px bg-gold mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        <ReviewsSection product={product} />
      </div>
    </div>
  );
}
