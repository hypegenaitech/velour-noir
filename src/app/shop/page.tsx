'use client';
import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import FilterSidebar from '@/components/shop/FilterSidebar';
import ProductGrid from '@/components/shop/ProductGrid';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? '';
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState('Featured');

  const toggleFilter = (key: string, val: string) => {
    setActiveFilters((prev) => {
      const current = prev[key] ?? [];
      return {
        ...prev,
        [key]: current.includes(val) ? current.filter((v) => v !== val) : [...current, val],
      };
    });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category || (category === 'new' && p.isNew));
    const cats = activeFilters['CATEGORY'];
    if (cats?.length) list = list.filter((p) => cats.map((c) => c.toLowerCase()).includes(p.category));
    const finishes = activeFilters['FINISH'];
    if (finishes?.length) list = list.filter((p) => p.finish && finishes.includes(p.finish));
    if (activeFilters['RATING']?.includes('4+')) list = list.filter((p) => p.rating >= 4);
    if (sortBy === 'Price: Low–High') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High–Low') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'Bestselling') list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    if (sortBy === 'New Arrivals') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return list;
  }, [category, activeFilters, sortBy]);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="w-full h-[300px] flex flex-col items-center justify-center border-b border-gold/20" style={{ paddingTop: '100px' }}>
        <h1 className="font-cormorant text-[clamp(48px,10vw,80px)] text-white uppercase tracking-[0.05em] font-light leading-none">SHOP ALL</h1>
        <p className="font-jost text-[12px] uppercase tracking-[0.2em] text-gold mt-3">{filtered.length} PRODUCTS</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <FilterSidebar active={activeFilters} onChange={toggleFilter} />

        <div className="flex-1">
          {/* Sort */}
          <div className="flex items-center justify-between mb-8">
            <p className="font-jost text-[12px] text-muted uppercase tracking-wider">
              SHOWING {filtered.length} OF {products.length}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black border border-gold/40 text-gold font-jost text-[12px] uppercase tracking-wider px-4 h-10 focus:outline-none focus:border-gold"
            >
              {['Featured', 'Bestselling', 'New Arrivals', 'Price: Low–High', 'Price: High–Low'].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <ProductGrid products={filtered} />

          {filtered.length > 0 && (
            <div className="flex justify-center mt-16">
              <button className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold border border-gold/50 px-12 py-4 hover:bg-gold hover:text-black transition-colors">
                LOAD MORE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
