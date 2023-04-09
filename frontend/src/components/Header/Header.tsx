import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';
import './Header.scss';
import { clearUser } from '../../redux/user.slicer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export interface HeaderProps {}

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const signOut = (): void => {
    dispatch(clearUser());
  };
  const [isDroppedDown, hideDropdown] = useState(false);
  const location = useLocation();
  const shouldRenderDropdown = !['/sign-in', '/sign-up'].includes(
    location.pathname
  );
  const Dropdown = (): JSX.Element => {
    return user ? (
      <div className='dropdown' style={{ margin: 'auto', flex: 1 }}>
        <details
          open={isDroppedDown}
          onMouseEnter={() => hideDropdown(true)}
          onMouseLeave={() => hideDropdown(false)}
        >
          <summary>{user.firstName}</summary>
          <ul style={{ padding: 0, margin: 0, width: '100%' }}>
            <li>
              <Link to={ROUTES.MY_CART}>My Cart</Link>
            </li>
            <li>
              <Link to={ROUTES.MY_FAVORITES}>My favorites</Link>
            </li>
            <li>
              <Link to={ROUTES.MY_ORDERS}>My orders</Link>
            </li>
            <li
              role='button'
              onClick={signOut}
              style={{ textAlign: 'center', color: '#8babf1' }}
            >
              Sign-out
            </li>
          </ul>
        </details>
      </div>
    ) : (
      <li style={{ margin: 'auto' }}>
        <Link to={ROUTES.SIGN_IN}>Sign in</Link>
      </li>
    );
  };

  return (
    <header>
      <div
        className='logo'
        style={{
          margin: 'auto',
          width: '8vw',
          background: 'black',
        }}
      >
        <img
          alt=''
          style={{
            height: '100%',
            width: '100%',
            background: 'pink',
            objectFit: 'contain',
          }}
        />
      </div>
      <nav style={{ display: 'flex' }}>
        <menu
          style={{
            display: 'flex',
            justifyContent: 'center',
            listStyleType: 'none',
            flex: 2,
          }}
        >
          <li>
            <Link to={ROUTES.HOME}>Nos Offres</Link>
          </li>
        </menu>
        {shouldRenderDropdown ? <Dropdown /> : null}
      </nav>
    </header>
  );
};

export default Header;
