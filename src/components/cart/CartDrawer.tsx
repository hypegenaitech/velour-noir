'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';
import DiscountCode from './DiscountCode';
import { btnGold } from '@/components/ui/Button';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const { state, dispatch, subtotal, discount, shipping, total, itemCount } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-[9000]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-deep border-l border-gold/30 z-[9001] flex flex-col"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20">
              <div className="flex items-center gap-3">
                <h2 className="font-cormorant text-[22px] uppercase tracking-[0.1em] text-white">MY BAG</h2>
                {itemCount > 0 && (
                  <span className="bg-gold text-black font-jost text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{itemCount}</span>
                )}
              </div>
              <button onClick={() => dispatch({ type: 'CLOSE_CART' })} aria-label="Close cart" className="text-muted hover:text-gold transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {state.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag size={48} className="text-muted/30" />
                  <h3 className="font-cormorant text-[28px] text-white">YOUR BAG IS EMPTY</h3>
                  <p className="font-cormorant italic text-muted">Begin your ritual.</p>
                  <Link href="/shop" onClick={() => dispatch({ type: 'CLOSE_CART' })} className={btnGold + ' px-8 h-12 text-[11px]'}>
                    SHOP NOW
                  </Link>
                </div>
              ) : (
                <div>
                  {state.items.map((item, i) => <CartItem key={i} item={item} />)}
                </div>
              )}
            </div>

            {state.items.length > 0 && (
              <div className="px-6 py-6 border-t border-gold/20 space-y-4">
                <DiscountCode />
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between font-jost text-[12px] text-muted">
                    <span>SUBTOTAL</span><span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-jost text-[12px] text-gold">
                      <span>DISCOUNT</span><span>−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-jost text-[12px] text-muted">
                    <span>SHIPPING</span>
                    <span className={shipping === 0 ? 'text-gold' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-gold/20 pt-3 flex justify-between items-baseline">
                    <span className="font-cormorant text-[22px] text-white uppercase tracking-wider">TOTAL</span>
                    <span className="font-cormorant text-[24px] text-white">{formatPrice(total)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  className="w-full h-14 bg-gold text-black font-jost text-[13px] uppercase tracking-[0.2em] hover:bg-gold-light transition-colors flex items-center justify-center"
                >
                  PROCEED TO CHECKOUT
                </Link>
                <button
                  onClick={() => dispatch({ type: 'CLOSE_CART' })}
                  className="w-full text-center font-jost text-[11px] uppercase tracking-wider text-muted hover:text-platinum transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
