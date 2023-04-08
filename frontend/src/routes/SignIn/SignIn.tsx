import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@fabrigeas/react-components';
import './SignIn.scss';
import apiService from '../../api.service';
import { setUser } from '../../redux/user.slicer';
import { useAppDispatch } from '../../redux/hooks';
import notification from '../../contexts/notification';
import { Link } from 'react-router-dom';

const SignIn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { success, error } = useContext(notification);
  const navigate = useNavigate();
  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    apiService
      .signIn(email, password)
      .then(user => {
        dispatch(setUser(user));
        success(`${user.email} signed in in successfully`);
        navigate('/');
      })
      .catch(e => {
        error(e?.response?.data ?? e?.message ?? e, 'Sign in error');
      });
  };

  return (
    <div className='sign-in' data-testid='sign-in'>
      <div
        className='logo'
        style={{
          height: '5rem',
          width: '5rem',
          background: 'brown',
          padding: '1rem',
          borderRadius: '5rem',
          margin: '1rem',
        }}
      >
        LOGO
      </div>
      <form onSubmit={signIn}>
        <Input
          label='Email:'
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='email'
          autoComplete='email'
          required
        />
        <Input
          label='Password:'
          value={password}
          isValid={password.length > 5}
          invalidFeedback='Password must be atleast 5 characters'
          onChange={e => setPassword(e.target.value)}
          type='password'
          autoComplete='current-password'
          placeholder='Your password'
          required
        />
        <Button outlined type='submit' style={{ width: '100%' }}>
          sign in
        </Button>
      </form>
      <Link
        className='sign-up'
        to='/sign-up'
        style={{ width: '100%', textAlign: 'end', marginTop: '1rem' }}
      >
        I have no account
      </Link>
    </div>
  );
};

export default SignIn;
