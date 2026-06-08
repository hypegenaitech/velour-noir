'use client';
import Image from 'next/image';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';

interface Props { item: CartItemType; }

export default function CartItem({ item }: Props) {
  const { dispatch } = useCart();
  const { product, quantity, selectedShade, selectedSize } = item;

  const key = { productId: product.id, shade: selectedShade?.name, size: selectedSize };

  return (
    <div className="flex gap-4 py-5 border-b border-gold/10">
      <div className="w-20 h-24 flex-shrink-0 bg-black overflow-hidden">
        <Image src={product.images[0]} alt={product.name} width={80} height={96} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="min-w-0 pr-2">
            <p className="font-jost text-[12px] uppercase tracking-wider text-platinum truncate">{product.name}</p>
            {selectedShade && (
              <p className="font-cormorant italic text-[12px] text-muted mt-0.5">{selectedShade.name}</p>
            )}
            {selectedSize && (
              <p className="font-jost text-[11px] text-muted mt-0.5">{selectedSize}</p>
            )}
          </div>
          <button
            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: key })}
            aria-label="Remove item"
            className="text-muted hover:text-gold transition-colors flex-shrink-0"
          >
            <X size={14} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-gold/30 h-8">
            <button
              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { ...key, quantity: quantity - 1 } })}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
            >
              <Minus size={10} />
            </button>
            <span className="w-8 text-center font-jost text-[12px] text-platinum">{quantity}</span>
            <button
              onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { ...key, quantity: quantity + 1 } })}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
            >
              <Plus size={10} />
            </button>
          </div>
          <span className="font-jost text-[14px] text-gold">{formatPrice(product.price * quantity)}</span>
        </div>
      </div>
    </div>
  );
}
