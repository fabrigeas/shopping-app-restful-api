import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Offer } from '../types';

const name = 'cart';

interface CartState {
  cart: Record<string, CartItem>;
  favorites: Record<string, CartItem>;
  orders: Record<string, CartItem>;
  wishlist: Record<string, CartItem>;
}

const cart = sessionStorage.getItem(name);
const initialState: CartState = cart
  ? JSON.parse(cart)
  : {
      cart: {},
      favorites: {},
      orders: {},
      wishlist: {},
    };

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    addItemToCart(state, { payload }: PayloadAction<CartItem>) {
      state.cart[payload.offer.id] = payload;

      sessionStorage.setItem(name, JSON.stringify(state));
    },
    updateItemInCart(state, { payload }: PayloadAction<CartItem>) {
      const { offer, quantity } = payload;

      state.cart[offer.id] = {
        quantity,
        offer,
      };

      sessionStorage.setItem(name, JSON.stringify(state));
    },
    removeFromCart(state, { payload }: PayloadAction<Offer>) {
      delete state.cart[payload.id];
      sessionStorage.setItem(name, JSON.stringify(state));
    },
  },
});

export const { addItemToCart, updateItemInCart, removeFromCart } =
  userSlice.actions;

export default userSlice.reducer;
