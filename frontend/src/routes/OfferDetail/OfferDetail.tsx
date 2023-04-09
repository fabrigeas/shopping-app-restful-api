import React, { useContext, useState } from 'react';
import './OfferDetail.scss';
import { Link, useLoaderData } from 'react-router-dom';
import { Offer } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItemToCart } from '../../redux/cart.slicer';
import { Button } from '@fabrigeas/react-components';
import notification from '../../contexts/notification';
import { ROUTES, IMAGE_BASE_URL } from '../../constants';

const OfferDetail = () => {
  const offer = useLoaderData() as Offer;
  const { images } = offer;
  const { length } = images;
  const [slideIndex, setSlideIndex] = useState(0);
  const paginationText = `${slideIndex + 1}/${length} `;
  const user = useAppSelector(state => state.user);
  const isAdmin = user
    ? ['mamdjotresia99', 'mawelle', 'mkjenny15', 'fabrigeas'].includes(
        user.email.split('@')[0]
      )
    : false;
  const isItemInBasket = useAppSelector(
    state => state.cart.cart[offer.id] != null
  );
  const { success } = useContext(notification);
  const dispatch = useAppDispatch();
  const addToCart = () => {
    dispatch(addItemToCart({ offer, quantity: 1 }));
    success(`'${offer.title}' added to your cart`, 'Success');
  };

  return (
    <div className='offer-detail'>
      <div className='slideshow-container'>
        {images.map((img, i) => (
          <div
            key={i}
            className={`slide fade ${i === slideIndex ? 'active' : 'hidden'}`}
          >
            <div className='numbertext'>{paginationText}</div>
            <div
              style={{
                height: '70vh',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img src={`${IMAGE_BASE_URL}${img}`} alt='' />
            </div>
          </div>
        ))}
        {slideIndex > 0 && (
          <a className='prev' onClick={() => setSlideIndex(slideIndex - 1)}>
            ❮
          </a>
        )}
        {slideIndex < length - 1 && (
          <a className='next' onClick={() => setSlideIndex(slideIndex + 1)}>
            ❯
          </a>
        )}
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === slideIndex ? 'active' : 'inactive'}`}
            onClick={() => setSlideIndex(i)}
          ></span>
        ))}
      </div>
      <hr />
      <div className='content'>
        <p>
          <strong style={{ fontSize: 'larger' }}>{offer.title}</strong>
          <br />
          {offer.description}
        </p>
        <p>
          <strong>Price</strong>
          <br />
          {offer.price} FCFA
        </p>
        <p>
          <strong> Available on:</strong>
          <br />
          <label style={{ display: 'flex' }}>
            {offer.daysOfTheWeek.map(day => (
              <span key={day}>{day}, </span>
            ))}
          </label>
        </p>
        {isItemInBasket ? (
          <Link
            className='Button outlined success'
            to={ROUTES.MY_CART}
            style={{
              display: 'block',
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            View Item in your basket
          </Link>
        ) : (
          <Button
            outlined
            style={{ width: '100%', marginBottom: '1rem' }}
            buttonType='success'
            onClick={addToCart}
          >
            Add {offer.title} to cart
          </Button>
        )}
        {isAdmin && (
          <Link
            style={{
              display: 'block',
              marginBottom: '1rem',
            }}
            to={`/offer/${offer.id}/edit`}
            className='link-to-edit-offer Button info outlined'
          >
            Edit offer
          </Link>
        )}
      </div>
    </div>
  );
};

export default OfferDetail;
