import React, { useState, useEffect, useContext } from 'react';
import './Home.scss';
import { Link, useLocation } from 'react-router-dom';
import apiService from '../../api.service';
import ListView from '../../components/ListView';
import Spinner from '../../components/Spinner';
import { Offer } from '../../types';
import { ROUTES } from '../../constants';
import notification from '../../contexts/notification';

const Home = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { error } = useContext(notification);
  const location = useLocation();
  const offerType = location.pathname.split('/').pop();
  const query = { offerType, title };
  const fetchOffers = (e?: React.FormEvent) => {
    e?.preventDefault();

    setIsLoading(true);

    const url = `offers?${new URLSearchParams(
      query as Record<string, string>
    ).toString()}`;

    apiService
      .get(url)
      .then(({ data }) => {
        setItems(data.offers);
      })
      .catch(e => {
        error(e.message, 'Failed to get offers');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchOffers();
  }, [offerType, title]);

  return (
    <div className='home'>
      <hr />
      <form onSubmit={fetchOffers}>
        <div className='searchbox'>
          <input
            value={title}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder='Search by title'
          />
          <span className='search-icon'> &#128269; </span>
        </div>
      </form>
      <div>{isLoading ? <Spinner /> : <ListView items={items} />}</div>
      <div className='actions'>
        <Link to={ROUTES.NEW_OFFER}>Create new offer</Link>
        <Link to={ROUTES.MY_CART}>Checkout my orders</Link>
      </div>
    </div>
  );
};

export default Home;
