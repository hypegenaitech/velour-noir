'use client';
import { useUI } from '@/context/UIContext';
import { useEffect, useRef, useState } from 'react';
import { X, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';

const POPULAR = ['Mothership', 'MatteTrance', 'Foundation', 'Mascara', 'Highlighter'];

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (searchOpen) { setTimeout(() => inputRef.current?.focus(), 100); setQuery(''); }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeSearch]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[9000] flex flex-col items-center pt-24 sm:pt-32 px-4 pb-8 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)' }}
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <button onClick={closeSearch} aria-label="Close search" className="absolute top-8 right-8 text-muted hover:text-gold transition-colors">
            <X size={24} />
          </button>

          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-4 border-b border-gold pb-2">
              <Search size={20} className="text-gold flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH PRODUCTS, COLLECTIONS..."
                aria-label="Search products"
                className="flex-1 bg-transparent font-cormorant text-[28px] text-white placeholder-muted/50 focus:outline-none"
              />
            </div>

            {results.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((p) => (
                  <Link key={p.id} href={`/shop/${p.slug}`} onClick={closeSearch} className="flex gap-4 group">
                    <div className="w-16 h-20 bg-deep flex-shrink-0 overflow-hidden">
                      <Image src={p.images[0]} alt={p.name} width={64} height={80} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="font-jost text-[11px] uppercase tracking-wider text-platinum group-hover:text-gold transition-colors">{p.name}</p>
                      <p className="font-jost text-[12px] text-gold mt-1">${p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-10">
                <p className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold mb-4">POPULAR SEARCHES</p>
                <div className="flex flex-wrap gap-3">
                  {POPULAR.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="font-jost text-[12px] text-muted border border-muted/30 px-4 py-2 hover:border-gold hover:text-gold transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
