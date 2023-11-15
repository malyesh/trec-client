import Input from '../../components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './LoginPage.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await axios.post(`${apiBody}/users/login`, {
        email: email,
        password: password,
      });
      console.log(response.data);

      let token = response.data.token;

      sessionStorage.setItem('token', token);
      // setIsLoggedIn(true);
      setIsLoginError(false);
      setErrorMessage('');

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      setIsLoginError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <div className='header'>
        <h1>Log in</h1>
      </div>
      {isLoginError && <label className='error'>{errorMessage}</label>}
      <form onSubmit={handleLogin}>
        <Input
          label='Email'
          name='email'
          type='text'
          value={email}
          onChange={handleChangeEmail}
          placeholder='Enter email here'
        />
        <Input
          label='Password'
          name='password'
          type='password'
          value={password}
          onChange={handleChangePassword}
          placeholder='Enter password here'
        />

        <button type='submit'>Log in!</button>
      </form>

      <p>
        Need an account? <Link to='/signup'>Sign up</Link>
      </p>
    </div>
  );
}
