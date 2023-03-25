export type CompType = 'info' | 'success' | 'warning' | 'error';

export interface Offer {
  id: string;
  title: string;
  date?: Date;
  description: string;
  price: string;
  offerType: OfferType;
  images: string[];
  daysOfTheWeek: string[];
}

export interface CartItem {
  offer: Offer;
  quantity: number;
}

export type OfferType = 'drink' | 'fruit' | 'food' | 'salad' | 'today';
export type CartType = 'cart' | 'favorites' | 'wishlist' | 'orders';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ToastContent {
  content: string;
  title?: string;
  time?: string;
  type?: CompType;
  durationMs?: number;
}
export interface ToastMessage extends ToastContent {
  id: string;
}
