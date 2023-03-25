import { configureStore } from '@reduxjs/toolkit';
import cartSlicer from './redux/cart.slicer';
import notifications from './redux/notifications.slicer';
import userSlicer from './redux/user.slicer';

const store = configureStore({
  reducer: {
    user: userSlicer,
    cart: cartSlicer,
    notifications,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
