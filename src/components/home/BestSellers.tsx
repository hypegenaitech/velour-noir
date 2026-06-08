'use client';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';

export default function BestSellers() {
  const products = getFeaturedProducts();

  return (
    <section className="bg-black py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-cormorant text-[48px] text-white uppercase tracking-[0.1em] font-light">BESTSELLERS</h2>
          <div className="w-10 h-px bg-gold mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
