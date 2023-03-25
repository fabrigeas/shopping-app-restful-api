import React, { useContext, useState } from 'react';
import { SERVER_URL } from '../../constants';
import { Offer, CartItem } from '../../types';
import Button from '../Button';
import { Link } from 'react-router-dom';
import './OfferCard.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addItemToCart,
  removeFromCart,
  updateItemInCart,
} from '../../redux/cart.slicer';
import notification from '../../contexts/notification';

export interface CardProps {
  data: Offer | CartItem;
}

const OfferCard = (props: CardProps): JSX.Element => {
  const { success, info } = useContext(notification);
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
  const card = React.useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(
    isOffer ? 0 : (data as CartItem).quantity
  );
  const subTotal = isOffer ? 0 : quantity * parseInt(offer.price);
  const mainImage = `${SERVER_URL}offers/${offer.id}/${offer.images[0]}`;
  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value);

    if (quantity > -1) {
      setQuantity(quantity);
    }
  };
  const dispatch = useAppDispatch();

  const updateQuantityInCart = (quantity: number) => {
    setQuantity(quantity);

    if (quantity === 0) {
      dispatch(removeFromCart(offer));
      info(`${offer.title} has been removed from your cart`, 'Cart update');
    } else if (quantity === 1) {
      dispatch(addItemToCart({ offer, quantity }));
      success(`${offer.title} has been added in to your basket`, 'update');
    } else {
      dispatch(updateItemInCart({ offer, quantity }));
    }
  };

  const user = useAppSelector(state => state.user.value);
  const isAdmin =
    user && user
      ? ['mawelle', 'jenny'].includes(user.email.split('@')[0])
      : false;
  return (
    <div
      data-testid='offer-card'
      className={className}
      onClick={e => (e.target as HTMLDivElement).classList.toggle('highlight')}
      ref={card}
      onMouseLeave={() => card.current?.classList.remove('highlight')}
    >
      <div className='image'>
        <img src={mainImage} alt={offer.title} />
      </div>
      <div className='content'>
        <Link to={`/offer/${offer.id}/view`}>
          <h2 className='title'>{offer.title}</h2>
        </Link>
        {isOffer && <p className='description'>{offer.description}</p>}
        <div className='offer'>
          <span className='price'> {offer.price}FCFA </span>
          <div className='order'>
            {quantity && (
              <>
                <Button
                  outlined
                  buttonType='success'
                  onClick={() => updateQuantityInCart(quantity - 1)}
                >
                  -
                </Button>
                <input
                  value={quantity}
                  type='number'
                  onChange={updateQuantity}
                />
              </>
            )}
            <Button
              outlined
              buttonType='success'
              onClick={() => updateQuantityInCart(quantity + 1)}
            >
              +
            </Button>
          </div>
          {!isOffer && subTotal && (
            <Button
              className='sub-total'
              buttonType='success'
              onClick={e => e.preventDefault()}
            >
              Pay only this {subTotal}
            </Button>
          )}
          {isAdmin && (
            <Link
              to={`/offer/${offer.id}/edit`}
              className='link-to-edit-offer Button info outlined'
            >
              Edit offer
            </Link>
          )}
        </div>
      </div>
      <div className='tags'>
        <span>{offer.offerType}</span>
        {daysOfTheWeek.map((day, i) => (
          <span key={i} className={`${day == 'today' ? 'active' : ''}`}>
            {day.substring(0, 3)}
          </span>
        ))}
      </div>
      <button
        className='close'
        onClick={() => card.current?.classList.remove('highlight')}
      >
        X
      </button>
    </div>
  );
};

export default OfferCard;
