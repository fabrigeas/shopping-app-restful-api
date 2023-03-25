import React, { useState } from 'react';
import { Offer } from '../../types';
import OfferCard from '../OfferCard/OfferCard';
import './ListView.scss';

export interface ListViewProps {
  items: Offer[];
}

const ListView = ({ items }: ListViewProps): JSX.Element => {
  const pageSize = 3;
  const numberOfPages = Math.ceil(items.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const data = items.slice(start, end);
  const shouldRenderPeviousButton = currentPage > pageSize;
  const shouldRenderNextButton = currentPage + pageSize < numberOfPages;
  const pages = [...Array(numberOfPages)].map((_, i) => i + 1);

  return (
    <>
      <div className='list-view' data-testid='list-view'>
        {data.map(offer => (
          <OfferCard data={offer} key={offer.id} />
        ))}
      </div>

      {numberOfPages > 1 && (
        <nav className='pagination'>
          <ul>
            {shouldRenderPeviousButton && (
              <li className='previous-page'>
                <button
                  className='previous-page'
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  &#10094;
                </button>
              </li>
            )}
            {pages.map(i => (
              <li key={i}>
                <button
                  className={`${currentPage === i ? 'active' : ''} page-${i}`}
                  onClick={() => setCurrentPage(i)}
                >
                  {i}
                </button>
              </li>
            ))}
            {shouldRenderNextButton && (
              <li>
                <button
                  className='next-page'
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  &#10095;
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default ListView;
