import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { UIProvider } from '@/context/UIContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileMenu from '@/components/layout/MobileMenu';
import SearchOverlay from '@/components/layout/SearchOverlay';
import CartDrawer from '@/components/cart/CartDrawer';
import ToastContainer from '@/components/ui/Toast';
import PageTransition from '@/components/effects/PageTransition';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('@/components/effects/ParticleField'), { ssr: false });
const GlitterTrail = dynamic(() => import('@/components/effects/GlitterTrail'), { ssr: false });

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
});

export const metadata: Metadata = {
  title: 'VELOUR NOIR — Defiantly Beautiful. Unapologetically You.',
  description: 'Dark luxury makeup. Haute couture beauty. Shop the Gilded Nirvana Collection.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-black text-platinum overflow-x-hidden">
        <UIProvider>
          <CartProvider>
            <WishlistProvider>
              <ParticleField />
              <GlitterTrail />
              <div className="relative z-10 min-h-screen flex flex-col">
                <AnnouncementBar />
                <Navbar />
                <MobileMenu />
                <SearchOverlay />
                <CartDrawer />
                <ToastContainer />
                <PageTransition>
                  <main className="flex-1">{children}</main>
                </PageTransition>
                <Footer />
              </div>
            </WishlistProvider>
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
