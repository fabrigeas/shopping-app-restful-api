import { configureStore } from '@reduxjs/toolkit';
import cart from './redux/cart.slicer';
import notifications from './redux/notifications.slicer';
import user from './redux/user.slicer';

export const store = configureStore({
  reducer: {
    user,
    cart,
    notifications,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
