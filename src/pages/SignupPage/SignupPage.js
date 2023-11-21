import axios from 'axios';
import { useState, useEffect } from 'react';
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
  const [file, setFile] = useState();
  const [values, setValues] = useState(initialValues);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const apiBody = process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      if (event.target.password.value === event.target.confirm_password.value) {
        let userInput = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          picture: file,
        };
        console.log(userInput);

        const response = await axios.post(`${apiBody}/user/signup`, userInput, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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

  useEffect(() => {
    if (
      values.first_name !== '' &&
      values.last_name !== '' &&
      values.email !== '' &&
      values.password !== '' &&
      values.confirm_password !== ''
    ) {
      setDisabled(false);
    }
  }, [values]);

  return (
    <div className='signup'>
      <h2 className='signup__title'>Sign Up</h2>

      <form
        onSubmit={handleSignup}
        encType='multipart/form-data'
        className='signup__form'
      >
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

        <label className='signup__label signup__input--upload'>
          Upload photo!
          <input type='file' name='image' onChange={handleFileChange} />
        </label>

        <button
          type='submit'
          className={`signup__button ${disabled ? 'disabled' : ''}`}
        >
          sign up!
        </button>
      </form>

      <p className='signup__login'>
        Already have an account?{' '}
        <Link className='signup__login--link' to='/login'>
          Log in
        </Link>
      </p>
    </div>
  );
}
