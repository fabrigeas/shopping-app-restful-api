import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

const user = sessionStorage.getItem('user');
const initialState: User | null = user ? JSON.parse(user) : null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    clearUser: () => {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
