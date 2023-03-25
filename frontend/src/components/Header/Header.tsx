import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import './Header.scss';
import { clearUser } from '../../redux/user.slicer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export interface HeaderProps {}

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.value);
  // const today = '?daysOfTheWeek=' + new Date().toString().substring(0, 3);
  const signOut = (): void => {
    dispatch(clearUser());
  };
  const dropdown = React.useRef<HTMLDetailsElement>(null);

  return (
    <header>
      <span className='menu-button'>show Menu</span>
      <nav>
        <div className='logo'></div>
        <menu>
          {/* <li>
            <Link to={today}>Menu du jour</Link>
          </li> */}
          <li>
            <Link to={ROUTES.HOME}>Nos Menus</Link>
          </li>
          <li>
            <Link to={ROUTES.SALAD}>Cruditees</Link>
          </li>
          <li>
            <Link to={ROUTES.DRINK}>Boissons</Link>
          </li>
        </menu>
        {user ? (
          <>
            <div className='dropdown'>
              <details
                ref={dropdown}
                onMouseEnter={e =>
                  ((e.target as HTMLDetailsElement).open = true)
                }
                onMouseLeave={e =>
                  ((e.target as HTMLDetailsElement).open = false)
                }
              >
                <summary>{user.email}</summary>
                <ul>
                  <li>
                    <Link to={ROUTES.MY_CART}>My Cart</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.MY_FAVORITES}>My favorites</Link>
                  </li>
                  <li>
                    <Link to={ROUTES.MY_ORDERS}>My orders</Link>
                  </li>
                  <li role='button' onClick={signOut}>
                    Sign-out
                  </li>
                </ul>
              </details>
            </div>
          </>
        ) : (
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign in</Link>
          </li>
        )}
      </nav>
    </header>
  );
};

export default Header;
