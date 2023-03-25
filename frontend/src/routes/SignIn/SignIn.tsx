import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
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
        error(e.message, 'Sign in error');
      });
  };

  return (
    <div className='sign-in' data-testid='sign-in'>
      <div className='logo'>LOGO</div>
      <form onSubmit={signIn}>
        <div className='form-control'>
          <label>Email:</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email'
            autoComplete='email'
            placeholder='Your Email address'
            required
          />
        </div>
        <div className='form-control'>
          <label>Passowrd:</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            autoComplete='current-password'
            placeholder='Your password'
            required
          />
        </div>
        <div className='form-control submit'>
          <Button outlined type='submit'>
            sign in
          </Button>
        </div>
        <div className='actions'>
          <Link className='sign-up' to='/sign-up'>
            I have no account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
