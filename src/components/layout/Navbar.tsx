'use client';
import Link from 'next/link';
import { Search, Heart, User, ShoppingBag, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import MegaMenu from './MegaMenu';


const NAV_ITEMS = [
  { label: 'NEW', href: '/shop?category=new' },
  { label: 'FACE', href: '/shop?category=face' },
  { label: 'EYES', href: '/shop?category=eyes' },
  { label: 'LIPS', href: '/shop?category=lips' },
  { label: 'CHEEK', href: '/shop?category=cheek' },
  { label: 'SKINCARE', href: '/shop?category=skincare' },
  { label: 'KITS', href: '/shop?category=kits' },
  { label: 'NEWS', href: '/news' },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { itemCount, dispatch } = useCart();
  const { count: wishCount } = useWishlist();
  const { openSearch, openMobileMenu } = useUI();

  useEffect(() => { setMounted(true); }, []);

  return (
    <nav
      className="fixed top-9 left-0 right-0 z-40 h-16 flex items-center"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(200,169,110,0.3)' }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Left nav */}
      <div className="hidden lg:flex items-center gap-6 pl-8 flex-1">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="relative" onMouseEnter={() => setActiveMenu(item.label)}>
            <Link
              href={item.href}
              className={`nav-link font-jost text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 ${
                activeMenu === item.label ? 'text-gold' : 'text-platinum hover:text-gold'
              }`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>

      {/* Center logo */}
      <div className="absolute left-1/2 -translate-x-1/2 px-2 max-w-[54%] sm:max-w-none">
        <Link href="/" className="block font-cormorant text-[14px] tracking-[0.1em] sm:text-[18px] sm:tracking-[0.2em] md:text-[20px] md:tracking-[0.4em] text-white uppercase hover:text-platinum transition-colors whitespace-nowrap truncate text-center">
          VELOUR NOIR
        </Link>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-3 sm:gap-5 pr-4 sm:pr-8 flex-1 justify-end">
        <button onClick={openSearch} className="text-platinum hover:text-gold transition-colors" aria-label="Search">
          <Search size={18} />
        </button>
        <Link href="/wishlist" className="relative hidden sm:inline-flex text-platinum hover:text-gold transition-colors" aria-label="Wishlist">
          <Heart size={18} />
          {mounted && wishCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-black text-[9px] font-jost w-4 h-4 rounded-full flex items-center justify-center">
              {wishCount}
            </span>
          )}
        </Link>
        <Link href="/account" className="hidden sm:inline-flex text-platinum hover:text-gold transition-colors" aria-label="Account">
          <User size={18} />
        </Link>
        <button
          onClick={() => dispatch({ type: 'OPEN_CART' })}
          className="relative text-platinum hover:text-gold transition-colors"
          aria-label="Cart"
        >
          <ShoppingBag size={18} />
          {mounted && itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-black text-[9px] font-jost w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
        <button onClick={openMobileMenu} aria-label="Open menu" className="lg:hidden text-platinum hover:text-gold transition-colors ml-1 sm:ml-2">
          <Menu size={20} />
        </button>
      </div>

      {/* Mega menu */}
      {activeMenu && <MegaMenu category={activeMenu} onClose={() => setActiveMenu(null)} />}
    </nav>
  );
}
