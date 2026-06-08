'use client';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartState, CartAction, CartItem, Product, Shade } from '@/types';

const DISCOUNT_CODES: Record<string, number> = { VELOUR20: 20 };

function cartKey(productId: string, shade?: string, size?: string) {
  return `${productId}::${shade ?? ''}::${size ?? ''}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, shade, size } = action.payload;
      const key = cartKey(product.id, shade?.name, size);
      const existing = state.items.find(
        (i) => cartKey(i.product.id, i.selectedShade?.name, i.selectedSize) === key
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            cartKey(i.product.id, i.selectedShade?.name, i.selectedSize) === key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity: 1, selectedShade: shade, selectedSize: size }],
      };
    }
    case 'REMOVE_ITEM': {
      const key = cartKey(action.payload.productId, action.payload.shade, action.payload.size);
      return {
        ...state,
        items: state.items.filter(
          (i) => cartKey(i.product.id, i.selectedShade?.name, i.selectedSize) !== key
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      const key = cartKey(action.payload.productId, action.payload.shade, action.payload.size);
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => cartKey(i.product.id, i.selectedShade?.name, i.selectedSize) !== key
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          cartKey(i.product.id, i.selectedShade?.name, i.selectedSize) === key
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case 'APPLY_DISCOUNT': {
      const percent = DISCOUNT_CODES[action.payload.code.toUpperCase()] ?? 0;
      return { ...state, discountCode: percent ? action.payload.code.toUpperCase() : state.discountCode, discountPercent: percent || state.discountPercent };
    }
    case 'CLEAR_CART':
      return { ...state, items: [], discountCode: null, discountPercent: 0 };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = { items: [], discountCode: null, discountPercent: 0, isOpen: false };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    if (typeof window === 'undefined') return init;
    try {
      const saved = localStorage.getItem('velour-cart');
      return saved ? { ...init, ...JSON.parse(saved), isOpen: false } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem('velour-cart', JSON.stringify({ items: state.items, discountCode: state.discountCode, discountPercent: state.discountPercent }));
  }, [state.items, state.discountCode, state.discountPercent]);

  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const discount = (subtotal * state.discountPercent) / 100;
  const shipping = subtotal - discount >= 100 ? 0 : 8.99;
  const total = subtotal - discount + shipping;
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, subtotal, discount, shipping, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
