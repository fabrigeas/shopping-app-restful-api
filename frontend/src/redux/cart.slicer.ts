import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Offer } from '../types';

const name = 'cart';

interface CartState {
  value: {
    cart: Record<string, CartItem>;
    favorites: Record<string, CartItem>;
    orders: Record<string, CartItem>;
    wishlist: Record<string, CartItem>;
  };
}

const cart = sessionStorage.getItem(name);
const initialState: CartState = {
  value: cart
    ? JSON.parse(cart)
    : {
        cart: {},
        favorites: {},
        orders: {},
        wishlist: {},
      },
};

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    addItemToCart(state, { payload }: PayloadAction<CartItem>) {
      state.value.cart[payload.offer.id] = payload;

      sessionStorage.setItem(name, JSON.stringify(state.value));
    },
    updateItemInCart(state, { payload }: PayloadAction<CartItem>) {
      const { offer, quantity } = payload;

      state.value.cart[offer.id] = {
        quantity,
        offer,
      };

      sessionStorage.setItem(name, JSON.stringify(state.value));
    },
    removeFromCart(state, { payload }: PayloadAction<Offer>) {
      delete state.value.cart[payload.id];
      sessionStorage.setItem(name, JSON.stringify(state.value));
    },
  },
});

export const { addItemToCart, updateItemInCart, removeFromCart } =
  userSlice.actions;

export default userSlice.reducer;
