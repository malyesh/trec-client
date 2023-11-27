import Input from '../../components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginPage.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const apiBody = process.env.REACT_APP_API_URL;

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${apiBody}/user/login`, {
        email: email,
        password: password,
      });

      let token = response.data.token;

      sessionStorage.setItem('token', token);
      setIsLoginError(false);
      setErrorMessage('');

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setIsLoginError(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (email !== '' && password !== '') setDisabled(false);
  }, [email, password]);

  return (
    <div className='login'>
      <h2 className='login__title'>Log in</h2>

      {isLoginError && <label className='error'>{errorMessage}</label>}
      <form onSubmit={handleLogin} className='login__form'>
        <div className='login__form--input'>
          <Input
            label='Email'
            name='email'
            type='text'
            value={email}
            onChange={handleChangeEmail}
            placeholder='Enter email here'
          />
        </div>
        <div className='login__form--input'>
          <Input
            label='Password'
            name='password'
            type='password'
            value={password}
            onChange={handleChangePassword}
            placeholder='Enter password here'
          />
        </div>
        <div className='login__button--container'>
          <button
            type='submit'
            className={`login__button ${disabled ? 'disabled' : ''}`}
          >
            log in!
          </button>
        </div>
      </form>

      <p className='login__signup'>
        Need an account?{' '}
        <Link className='login__signup--link' to='/signup'>
          sign up
        </Link>
      </p>
    </div>
  );
}
