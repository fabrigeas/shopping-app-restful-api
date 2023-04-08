import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import store from '../store';

export interface MockstoreProps {
  name: string;
  initialState: null | any;
  children: JSX.Element;
  useStore?: boolean;
}
const MockStoreProvider = ({
  useStore,
  initialState,
  name,
  children,
}: MockstoreProps) => (
  <Provider
    store={
      useStore
        ? store
        : configureStore({
            reducer: {
              [name]: createSlice({
                name,
                initialState,
                reducers: {},
              }).reducer,
            },
          })
    }
  >
    {children}
  </Provider>
);

export default MockStoreProvider;
