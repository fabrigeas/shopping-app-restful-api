import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types';

interface UserState {
  value: User | null;
}

const user = sessionStorage.getItem('user');

const initialState: UserState = {
  value: user ? JSON.parse(user) : null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
    clearUser: state => {
      state.value = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
