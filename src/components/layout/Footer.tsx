import Link from 'next/link';

const SHOP = ['New Arrivals', 'Face', 'Eyes', 'Lips', 'Cheek', 'Skincare', 'Kits', 'Bestsellers', 'Gift Cards'];
const HELP: { label: string; href: string }[] = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping & Delivery', href: '/shipping' },
  { label: 'Returns & Exchanges', href: '/returns' },
  { label: 'Track My Order', href: '/account' },
  { label: 'Store Locator', href: '/contact' },
];
const ABOUT: { label: string; href: string }[] = [
  { label: 'Our Story', href: '/about' },
  { label: 'Careers', href: '/contact' },
  { label: 'Press', href: '/contact' },
  { label: 'Partners', href: '/contact' },
  { label: 'Sustainability', href: '/about' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];
const SOCIALS = ['IG', 'TK', 'YT', 'PT'];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gold/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <p className="font-cormorant text-[20px] tracking-[0.4em] text-white uppercase mb-3">VELOUR NOIR</p>
            <p className="font-cormorant italic text-muted text-sm mb-6">"Defiantly Beautiful. Unapologetically You."</p>
            <div className="flex items-center gap-4">
              {SOCIALS.map((s) => (
                <button key={s} className="font-jost text-[11px] uppercase tracking-wider text-muted hover:text-gold transition-colors border border-muted/20 w-8 h-8 flex items-center justify-center hover:border-gold">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold mb-5">SHOP</p>
            <ul className="space-y-2">
              {SHOP.map((item) => (
                <li key={item}>
                  <Link href={`/shop?q=${item.toLowerCase()}`} className="font-jost text-[12px] text-muted hover:text-platinum transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold mb-5">HELP</p>
            <ul className="space-y-2">
              {HELP.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="font-jost text-[12px] text-muted hover:text-platinum transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-jost text-[11px] uppercase tracking-[0.2em] text-gold mb-5">ABOUT</p>
            <ul className="space-y-2">
              {ABOUT.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="font-jost text-[12px] text-muted hover:text-platinum transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-muted">© 2025 VELOUR NOIR. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-3 text-muted">
            {['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY', 'G PAY'].map((p) => (
              <span key={p} className="font-jost text-[9px] uppercase tracking-wider border border-muted/30 px-2 py-1">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
