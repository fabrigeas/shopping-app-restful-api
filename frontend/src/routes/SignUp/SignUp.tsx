import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@fabrigeas/react-components';
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
  firstName: '',
  lastName: '',
  password: '',
};

const SignIn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [user, updateUser] = useState<User>(userData);
  const [confirmation, setConfirmation] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { success, error } = useContext(notification);
  const navigate = useNavigate();
  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    apiService
      .signUp(user)
      .then(user => {
        dispatch(setUser(user));
        success(`${user.email} Account succesfully created`);
        navigate('/');
      })
      .catch(e => {
        error(e.message, 'Sign in error');
      });
  };
  const isValid = (key: string): boolean => key.length > 1;

  useEffect(() => {
    if (confirmation && user.password) {
      setDisabled(user.password !== confirmation);
    }
  }, [user.password, confirmation]);

  return (
    <div className='sign-in' data-testid={testId}>
      <div className='logo'>LOGO</div>
      <h3>Create an account</h3>
      <form onSubmit={signUp}>
        <Input
          label='First name:'
          value={user.firstName}
          isValid={isValid(user.firstName)}
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
        <Input
          label='Last name:'
          value={user.lastName}
          isValid={isValid(user.lastName)}
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
        <Input
          label='Email:'
          value={user.email}
          isValid={/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(
            user.email
          )}
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
        <Input
          label='Password:'
          value={user.password}
          isValid={user.password.length > 5}
          invalidFeedback='Password must be  atleast 5 characters'
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
        <Input
          label='Confirm password:'
          value={confirmation}
          isValid={confirmation.length > 5 && confirmation === user.password}
          invalidFeedback='Confirmation must match passowrd'
          onChange={e => setConfirmation(e.target.value)}
          type='password'
          autoComplete='current-password'
          placeholder='Your password'
          required
        />
        <Button outlined type='submit' disabled={disabled}>
          Create my account
        </Button>
      </form>
      <Link
        className='sign-up'
        to='/sign-in'
        style={{ width: '100%', marginTop: '1rem', textAlign: 'right' }}
      >
        I already have an account
      </Link>
    </div>
  );
};

export default SignIn;
