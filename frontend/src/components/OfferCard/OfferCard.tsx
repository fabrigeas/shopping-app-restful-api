import React, { useState } from 'react';
import { IMAGE_BASE_URL } from '../../constants';
import { Offer, CartItem } from '../../types';
import { Button } from '@fabrigeas/react-components';
import { Link } from 'react-router-dom';
import './OfferCard.scss';
import { useAppDispatch } from '../../redux/hooks';
import {
  addItemToCart,
  removeFromCart,
  updateItemInCart,
} from '../../redux/cart.slicer';

export interface CardProps {
  data: Offer | CartItem;
}

const OfferCard = (props: CardProps): JSX.Element => {
  const data = props.data;
  const isOffer = !('offer' in data);
  const offer: Offer = isOffer ? data : data.offer;
  const offerType = offer.offerType;
  const sortDaysOfTheWeek = () => {
    const result: string[] = [];
    [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ].forEach(day => {
      if (offer.daysOfTheWeek.includes(day)) {
        result.push(day);
      }
    });
    return result;
  };
  const daysOfTheWeek = sortDaysOfTheWeek();
  const className = `offer-card card ${
    isOffer ? 'offer' : 'cartItem'
  } ${offerType}`;
  const [quantity, setQuantity] = useState(
    isOffer ? 0 : (data as CartItem).quantity
  );
  const subTotal = isOffer ? 0 : quantity * parseInt(offer.price);
  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value);

    if (quantity > -1) {
      setQuantity(quantity);
    }
  };
  const dispatch = useAppDispatch();
  const today = new Date().toString().substr(0, 3);
  const updateQuantityInCart = (quantity: number) => {
    setQuantity(quantity);

    if (quantity === 0) {
      dispatch(removeFromCart(offer));
    } else if (quantity === 1) {
      dispatch(addItemToCart({ offer, quantity }));
    } else {
      dispatch(updateItemInCart({ offer, quantity }));
    }
  };
  const CartContent = () => (
    <>
      <div className='order' style={{ justifyContent: 'end', width: '100%' }}>
        {quantity ? (
          <>
            <Button
              outlined
              buttonType='success'
              onClick={() => updateQuantityInCart(quantity - 1)}
            >
              -
            </Button>
            <input value={quantity} type='number' onChange={updateQuantity} />
          </>
        ) : null}
        <Button
          outlined
          buttonType='success'
          onClick={() => updateQuantityInCart(quantity + 1)}
        >
          +
        </Button>
      </div>
      <Button
        className='sub-total'
        buttonType='success'
        onClick={e => e.preventDefault()}
      >
        Pay only &rsquo;{offer.title}&rsquo;
        <strong>&nbsp;&nbsp;{subTotal}FCFA</strong>
      </Button>
    </>
  );

  return (
    <div
      data-testid='offer-card'
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        minHeight: '15rem',
        borderRadius: '0.25rem',
        margin: '1rem 0',
        boxShadow: ' 0.25rem 0.25rem #f1f1f7',
      }}
    >
      <Link
        to={`/offer/${offer.id}/view`}
        title='Click to view offer detail'
        style={{ flex: 2 }}
      >
        <div
          className='image'
          style={{ height: '32vh', flex: 2, position: 'relative' }}
        >
          <img
            src={`${IMAGE_BASE_URL}${offer.images[0]}`}
            alt={offer.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </Link>
      <div
        className='content'
        style={{
          flex: 2,
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 0.5rem 0.5rem',
        }}
      >
        <p
          style={{
            margin: '0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Link
            to={`/offer/${offer.id}/view`}
            title='Click to view offer detail'
            style={{
              fontSize: 'x-large',
              textDecoration: 'none',
              color: '#6c757d',
            }}
          >
            <strong className='title'>{offer.title}</strong>
          </Link>
          <br />
          {isOffer && (
            <label
              className='description'
              style={{
                marginLeft: 0,
                whiteSpace: 'nowrap',
                padding: '0 0.25rem',
              }}
            >
              {offer.description}
            </label>
          )}
        </p>
        <div className='offer'>
          <span
            className='price'
            style={{
              marginTop: 'auto',
              marginLeft: 'auto',
              fontSize: 'x-large',
            }}
          >
            {offer.price}FCFA
          </span>
          {!isOffer && <CartContent />}
        </div>
      </div>
      <div className='tags'>
        {daysOfTheWeek.map((day, i) => (
          <span
            key={i}
            className={`day ${day.substring(0, 3) === today ? 'active' : ''}`}
          >
            {day.substring(0, 3)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OfferCard;
