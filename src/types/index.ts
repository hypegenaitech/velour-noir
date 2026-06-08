export interface Shade {
  name: string;
  hex: string;
  available: boolean;
}

export interface Ingredient {
  name: string;
  benefit: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'eyes' | 'lips' | 'face' | 'cheek' | 'skincare' | 'kits';
  subcategory: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  badge?: 'NEW' | 'BESTSELLER' | 'LIMITED' | 'SOLD OUT';
  shortDescription: string;
  description: string;
  tagline: string;
  images: string[];
  shades: Shade[];
  sizes?: string[];
  ingredients: Ingredient[];
  howToUse: string[];
  rating: number;
  reviewCount: number;
  skinType: string[];
  concerns: string[];
  isNew: boolean;
  isBestseller: boolean;
  isLimited: boolean;
  finish?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: Shade;
  selectedSize?: string;
}

export interface CartState {
  items: CartItem[];
  discountCode: string | null;
  discountPercent: number;
  isOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; shade?: Shade; size?: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; shade?: string; size?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; shade?: string; size?: string; quantity: number } }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  skinType: string;
  verified: boolean;
  concerns: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
}
