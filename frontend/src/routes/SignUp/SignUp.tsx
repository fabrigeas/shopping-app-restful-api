import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import apiService from '../../api.service';
import { setUser } from '../../redux/user.slicer';
import { useAppDispatch } from '../../redux/hooks';
import notification from '../../contexts/notification';
import { Link } from 'react-router-dom';
import { User } from '../../types';

export const testId = 'sign-up';

// @ts-expect-error Property 'id' is missing in type ...
const userData: User = {
  email: '',
  firstName: 'Jenny',
  lastName: 'Mekoudjou',
  password: '',
};

const SignIn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [user, updateUser] = useState<User>(userData);
  const [confirmation, setConfirmation] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { success, error } = useContext(notification);
  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    apiService
      .signUp(user)
      .then(user => {
        dispatch(setUser(user));
        success(`${user.email} Account succesfully created`);
        useNavigate()('/');
      })
      .catch(e => {
        error(e.message, 'Sign in error');
      });
  };

  useEffect(() => {
    if (confirmation && user.password) {
      console.log(user.password !== confirmation);
      setDisabled(user.password !== confirmation);
    }
  }, [user.password, confirmation]);

  return (
    <div className='sign-in' data-testid={testId}>
      <div className='logo'>LOGO</div>
      <h3>Create an account</h3>
      <form onSubmit={signUp}>
        <div className='form-control'>
          <label>First name:</label>
          <input
            value={user.firstName}
            onChange={e =>
              updateUser({
                ...user,
                firstName: e.target.value,
              })
            }
            type='text'
            placeholder='Your First name'
            required
          />
        </div>
        <div className='form-control'>
          <label>Last name:</label>
          <input
            value={user.lastName}
            onChange={e =>
              updateUser({
                ...user,
                lastName: e.target.value,
              })
            }
            type='text'
            placeholder='Your Last name'
            required
          />
        </div>
        <div className='form-control'>
          <label>Email:</label>
          <input
            value={user.email}
            onChange={e =>
              updateUser({
                ...user,
                email: e.target.value,
              })
            }
            type='email'
            autoComplete='email'
            placeholder='Your Email address'
            required
          />
        </div>
        <div className='form-control'>
          <label>Passowrd:</label>
          <input
            value={user.password}
            onChange={e =>
              updateUser({
                ...user,
                password: e.target.value,
              })
            }
            type='password'
            autoComplete='current-password'
            placeholder='Your password'
            required
          />
        </div>
        <div className='form-control'>
          <label>Passowrd confirmation:</label>
          <input
            value={confirmation}
            onChange={e => setConfirmation(e.target.value)}
            type='password'
            autoComplete='current-password'
            placeholder='Your password'
            required
          />
        </div>
        <div className='form-control submit'>
          <Button outlined type='submit' disabled={disabled}>
            Create my account
          </Button>
        </div>
        <div className='actions'>
          <Link className='sign-up' to='/sign-in'>
            sign me in instead
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
