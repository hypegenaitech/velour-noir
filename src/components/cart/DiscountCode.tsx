'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Check } from 'lucide-react';

export default function DiscountCode() {
  const { state, dispatch } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const apply = () => {
    if (code.toUpperCase() === 'VELOUR20') {
      dispatch({ type: 'APPLY_DISCOUNT', payload: { code } });
      setError('');
    } else {
      setError('Invalid code');
    }
  };

  if (state.discountCode) {
    return (
      <div className="flex items-center gap-2 text-gold">
        <Check size={14} />
        <span className="font-jost text-[11px] uppercase tracking-wider">20% DISCOUNT APPLIED</span>
      </div>
    );
  }

  return (
    <div>
      <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-gold mb-2">PROMO CODE</p>
      <div className="flex gap-0">
        <input
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(''); }}
          placeholder="ENTER CODE"
          aria-label="Promo code"
          className="flex-1 bg-black border border-gold/30 px-3 h-10 font-jost text-[12px] text-platinum placeholder-muted/50 focus:outline-none focus:border-gold transition-colors uppercase tracking-widest"
        />
        <button
          onClick={apply}
          className="px-4 h-10 bg-gold/10 border border-gold/30 border-l-0 font-jost text-[11px] uppercase tracking-wider text-gold hover:bg-gold/20 transition-colors"
        >
          APPLY
        </button>
      </div>
      {error && <p className="font-jost text-[11px] text-rose mt-1">{error}</p>}
    </div>
  );
}
