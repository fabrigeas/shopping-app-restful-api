import React from 'react';
import './OfferDetail.scss';
import { useLoaderData } from 'react-router-dom';
import { Offer } from '../../types';

const OfferDetail = () => {
  const offer = useLoaderData() as Offer;

  return (
    <div className='offer-detail'>
      <div>
        <img src={offer.images[0]} alt={offer.title} />
      </div>
      <div>{offer.images}</div>
    </div>
  );
};

export default OfferDetail;
