import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import './SignupPage.scss';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
};

export default function SignupPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  const apiBody = process.env.REACT_APP_API_URL;

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      if (event.target.password.value === event.target.confirm_password.value) {
        let userInput = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
        };

        const response = await axios.post(`${apiBody}/user/signup`, userInput);

        console.log(response.data);

        setSuccess(true);

        setError('');

        event.target.reset();

        window.scrollTo(0, 0);

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        console.log('passwords dont match!');
      }
    } catch (error) {}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div>
      <div className='header'>
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={handleSignup}>
        {success && (
          <div className='signup__message signup__message--success'>
            Sign up successful!
          </div>
        )}

        <Input
          label='First Name'
          name='first_name'
          type='text'
          value={values.first_name}
          onChange={handleInputChange}
          placeholder='Enter first name here'
        />
        <Input
          label='Last Name'
          name='last_name'
          type='text'
          value={values.last_name}
          onChange={handleInputChange}
          placeholder='Enter last name here'
        />
        <Input
          label='Email'
          name='email'
          type='text'
          value={values.email}
          onChange={handleInputChange}
          placeholder='Enter email here'
        />
        <Input
          label='Password'
          name='password'
          type='password'
          value={values.password}
          onChange={handleInputChange}
          placeholder='Enter password here'
        />
        <Input
          label='Confirm Password'
          name='confirm_password'
          type='password'
          value={values.confirm_password}
          onChange={handleInputChange}
          placeholder='Enter password confirmation here'
        />
        <button type='submit'>Sign up!</button>
      </form>

      <p>
        Already have an account? <Link to='/login'>Log in</Link>
      </p>
    </div>
  );
}
