import React, { useState, useEffect, useContext } from 'react';
import './Home.scss';
import { Link, useLocation } from 'react-router-dom';
import apiService from '../../api.service';
import ListView from '../../components/ListView';
import { Spinner } from '@fabrigeas/react-components';
import { Offer } from '../../types';
import { ROUTES } from '../../constants';
import notification from '../../contexts/notification';
import { useAppSelector } from '../../redux/hooks';

const Home = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { error } = useContext(notification);
  const location = useLocation();
  const offerType = location.pathname.split('/').pop();
  const query = { offerType, title };
  const cartItemsCount = useAppSelector(({ cart }) =>
    Object.values(cart.cart).reduce(
      (total, { quantity }) => (total += quantity),
      0
    )
  );
  const user = useAppSelector(({ user }) => user);
  const isAdmin = user
    ? ['mamdjotresia99', 'mawelle', 'mkjenny', 'fabrigeas'].includes(
        user.email.split('@')[0]
      )
    : false;
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
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  };
  const debounce = useDebounce(title, 500);

  useEffect(() => {
    fetchOffers();
  }, [offerType, debounce]);

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
        {isAdmin ? <Link to={ROUTES.NEW_OFFER}>Create new offer</Link> : null}
        {cartItemsCount ? (
          <Link to={ROUTES.MY_CART}>
            Checkout&nbsp;
            {`${cartItemsCount} ${cartItemsCount > 1 ? 'items' : 'item'}`}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
