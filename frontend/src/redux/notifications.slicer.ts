import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastMessage } from '../types';

const initialState: Record<string, ToastMessage> = {};

export const userSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    pushMessage: (state, { payload }: PayloadAction<ToastMessage>) => {
      state[payload.id] = payload;
    },
    popMessage: (state, { payload }: PayloadAction<ToastMessage>) => {
      delete state[payload.id];
    },
  },
});

export const { pushMessage, popMessage } = userSlice.actions;

export default userSlice.reducer;
