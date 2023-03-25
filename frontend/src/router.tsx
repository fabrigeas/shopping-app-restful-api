import React from 'react';
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  LoaderFunction,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import apiService from './api.service';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import EditOffer from './routes/EditCard/EditOffer';
import MyCart from './routes/MyCart';
import OfferDetail from './routes/OfferDetail';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import { Offer } from './types';

// @ts-expect-error   Property 'id' is missing
const newOffer: Offer = {
  daysOfTheWeek: [],
  description: '',
  images: [],
  offerType: 'food',
  price: '100',
  title: `offer ${new Date().toString()}`,
  date: new Date(),
};

const getOffer = async ({ params }: LoaderFunctionArgs) => {
  return params.id
    ? (await apiService.getOfferById(params.id as string)).data.offer
    : newOffer;
};
const Home = React.lazy(() => import('./routes/Home'));
const routeObject = (
  path: string,
  element: JSX.Element,
  loader?: LoaderFunction
): RouteObject => ({
  path,
  loader,
  element: (
    <ErrorBoundary>
      <Header />
      {element}
    </ErrorBoundary>
  ),
  errorElement: <div>Error</div>,
});
const router = createBrowserRouter([
  routeObject('/offers/:offerType', <Home />),
  routeObject('/sign-in', <SignIn />),
  routeObject('/sign-up', <SignUp />),
  routeObject('/offer/new', <EditOffer />, getOffer),
  routeObject('/offer/:id/edit', <EditOffer />, getOffer),
  routeObject('/offer/:id/view', <OfferDetail />, getOffer),
  routeObject('/my/:cart', <MyCart />),
  routeObject('/*', <Home />),
]);
const Router = (): JSX.Element => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
};

export default Router;
