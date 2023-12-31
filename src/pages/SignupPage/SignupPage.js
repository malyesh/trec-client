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
  const [unsucess, setUnsuccess] = useState(false);
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
    if (disabled) {
      setUnsuccess(true);
    } else {
      try {
        if (
          event.target.password.value === event.target.confirm_password.value
        ) {
          let userInput = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            picture: file,
          };

          await axios.post(`${apiBody}/user/signup`, userInput, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setSuccess(true);
          setError('');
          event.target.reset();
          window.scrollTo(0, 0);

          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setError('Passwords need to match!');
        }
      } catch (error) {
        console.log(error);
      }
    }
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
      setUnsuccess(true);
    }
  }, [values]);

  return (
    <div className='signup'>
      <h2 className='signup__title'>Sign Up</h2>

      <form
        onSubmit={handleSignup}
        encType='multipart/form-data'
        className='form'
      >
        {success && (
          <div className='signup__message signup__message--success'>
            Sign up successful!
          </div>
        )}
        {unsucess && (
          <div className='signup__message signup__message--unsuccess'>
            fill out all fields please!
          </div>
        )}
        <div className='signup__form'>
          <div className='signup__form--section'>
            <div className='signup__form--input'>
              <Input
                label='First Name'
                name='first_name'
                type='text'
                value={values.first_name}
                onChange={handleInputChange}
                placeholder='Enter first name here'
              />
            </div>
            <div className='signup__form--input'>
              <Input
                label='Last Name'
                name='last_name'
                type='text'
                value={values.last_name}
                onChange={handleInputChange}
                placeholder='Enter last name here'
              />
            </div>
            <div className='signup__form--input'>
              <Input
                label='Email'
                name='email'
                type='text'
                value={values.email}
                onChange={handleInputChange}
                placeholder='Enter email here'
              />
            </div>
          </div>
          <div className='signup__form--section'>
            <div className='signup__form--input'>
              <Input
                label='Password'
                name='password'
                type='password'
                value={values.password}
                onChange={handleInputChange}
                placeholder='Enter password here'
              />
              {error && (
                <p className='signup__message signup__message--error'>
                  {error}
                </p>
              )}
            </div>
            <div className='signup__form--input'>
              <Input
                label='Confirm Password'
                name='confirm_password'
                type='password'
                value={values.confirm_password}
                onChange={handleInputChange}
                placeholder='Enter password confirmation here'
              />
              {error && (
                <p className='signup__message signup__message--error'>
                  {error}
                </p>
              )}
            </div>
            {!file ? (
              <label className='signup__label signup__input--upload'>
                upload photo
                <input type='file' name='image' onChange={handleFileChange} />
              </label>
            ) : (
              <label className='signup__label signup__input--upload uploaded'>
                photo uploaded
                <input type='file' name='image' onChange={handleFileChange} />
              </label>
            )}
          </div>
        </div>

        <div className='signup__button--container'>
          <button
            type='submit'
            className={`signup__button ${disabled ? 'disabled' : ''}`}
          >
            sign up!
          </button>
        </div>
      </form>

      <p className='signup__login'>
        Already have an account?{' '}
        <Link className='signup__login--link' to='/login'>
          log in
        </Link>
      </p>
    </div>
  );
}
