import React from 'react';
import './MyCart.scss';
import { useLocation } from 'react-router-dom';
import { Button } from '@fabrigeas/react-components';
import OfferCard from '../../components/OfferCard/OfferCard';
import { CartType } from '../../types';
import { useAppSelector } from '../../redux/hooks';

const MyCart = (): JSX.Element => {
  const cartType = useLocation().pathname.split('/').pop() as CartType;
  const cartItems = useAppSelector(state => state.cart[cartType]);
  const items = cartItems ? Object.values(cartItems) : [];
  const total = items.reduce(
    (total, { offer, quantity }) => (total += parseInt(offer.price) * quantity),
    0
  );
  const quantity = items.reduce(
    (total, { quantity }) => (total += quantity),
    0
  );

  return (
    <div className='my-cart cart-view' data-testid='my-cart'>
      <h2>
        Items in you {cartType} ({quantity})
      </h2>
      <hr />
      <section className='cart-container'>
        {items.map(cartItem => (
          <OfferCard key={cartItem.offer.id} data={cartItem} />
        ))}
      </section>
      {total ? (
        <Button
          v-if='showPaymentButton'
          button-type='success'
          className='action'
        >
          Pay total: {total} FCFA
        </Button>
      ) : null}
    </div>
  );
};

export default MyCart;
