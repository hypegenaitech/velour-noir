'use client';
import Link from 'next/link';
import { X, ChevronDown, Heart, User } from 'lucide-react';
import { useState } from 'react';
import { useUI } from '@/context/UIContext';
import { AnimatePresence, motion } from 'framer-motion';

const ITEMS = [
  { label: 'NEW', href: '/shop?category=new', subs: ['New Arrivals', 'Trending'] },
  { label: 'FACE', href: '/shop?category=face', subs: ['Foundation', 'Concealer', 'Primer'] },
  { label: 'EYES', href: '/shop?category=eyes', subs: ['Palettes', 'Liner', 'Mascara'] },
  { label: 'LIPS', href: '/shop?category=lips', subs: ['Lipstick', 'Gloss', 'Liner'] },
  { label: 'CHEEK', href: '/shop?category=cheek', subs: ['Blush', 'Highlighter'] },
  { label: 'SKINCARE', href: '/shop?category=skincare', subs: ['Moisturizer', 'Mask'] },
  { label: 'KITS', href: '/shop?category=kits', subs: ['Gift Sets', 'Eye Kits'] },
  { label: 'NEWS', href: '/news', subs: [] },
];

export default function MobileMenu() {
  const { mobileMenuOpen, closeMobileMenu } = useUI();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />
          <motion.div
            className="fixed left-0 top-0 bottom-0 w-4/5 max-w-sm bg-black border-r border-gold/20 z-50 flex flex-col overflow-y-auto"
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
              <span className="font-cormorant text-[18px] tracking-[0.3em] text-white uppercase">VELOUR NOIR</span>
              <button onClick={closeMobileMenu} aria-label="Close menu" className="text-platinum hover:text-gold transition-colors">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 px-6 py-6 space-y-1">
              {ITEMS.map((item) => (
                <div key={item.label}>
                  <button
                    className="w-full flex items-center justify-between py-3 font-jost text-[13px] uppercase tracking-[0.15em] text-platinum hover:text-gold transition-colors"
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                  >
                    {item.label}
                    {item.subs.length > 0 && (
                      <ChevronDown size={14} className={`transition-transform ${open === item.label ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  <AnimatePresence>
                    {open === item.label && item.subs.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4"
                      >
                        {item.subs.map((sub) => (
                          <Link
                            key={sub}
                            href={`/shop?sub=${sub.toLowerCase()}`}
                            onClick={closeMobileMenu}
                            className="block py-2 font-jost text-[11px] uppercase tracking-widest text-muted hover:text-gold transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            <div className="flex sm:hidden items-center gap-6 px-6 py-5 border-t border-gold/20">
              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 font-jost text-[12px] uppercase tracking-[0.15em] text-platinum hover:text-gold transition-colors"
              >
                <Heart size={16} /> Wishlist
              </Link>
              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 font-jost text-[12px] uppercase tracking-[0.15em] text-platinum hover:text-gold transition-colors"
              >
                <User size={16} /> Account
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
