import { type OfferType } from './types';

export const OFFER_TYPES: OfferType[] = ['drink', 'food', 'fruit', 'salad'];

export const ROUTES = {
  HOME: '/offers/food',
  FOOD: '/offers/food',
  DRINK: '/offers/drink',
  SALAD: '/offers/salad',
  MY_CART: '/my/cart',
  MY_FAVORITES: '/my/favorites',
  MY_WISHLIST: '/my/wishlist',
  MY_ORDERS: '/my/orders',
  NEW_OFFER: '/offer/new',
  SIGN_IN: '/sign-in',
};

export const SERVER_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:61155/' : '/';
export const API_BASE_URL = `${SERVER_URL}api`;
export const AUTH_BASE_URL = `${SERVER_URL}/auth`;
export const API_ROUTES = {
  SIGN_IN: `${AUTH_BASE_URL}/sign-in`,
  SIGN_UP: `${AUTH_BASE_URL}/sign-up`,
  SIGN_OUT: `${AUTH_BASE_URL}/sign-out`,
  OFFERS: `${API_BASE_URL}/offers`,
};
