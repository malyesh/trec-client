import userIcon from '../../assets/icons//icons8-user-48.png';
import heartIcon from '../../assets/icons/heart-3068.svg';
import cameraIcon from '../../assets/icons/camera-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  const navigate = useNavigate();
  let token = '';
  if (sessionStorage.getItem('token')) {
    token = sessionStorage.getItem('token');
  }

  return (
    <div className='header'>
      <section className='header__section'>
        <h1
          className='header__logo'
          onClick={() => {
            navigate('/search');
          }}
        >
          TravelRec
        </h1>
      </section>

      {token && (
        <div className='header__section header__section--logo'>
          <img
            className='header__icon header__icon--camera'
            src={cameraIcon}
            alt='camera'
            onClick={() => {
              navigate('/post');
            }}
          />
          <img
            className='header__icon header__icon--heart'
            src={heartIcon}
            alt='heart'
          />
          <img
            className='header__icon header__icon--profile'
            src={userIcon}
            alt='profile'
            onClick={() => {
              navigate('/profile');
            }}
          />
        </div>
      )}
      {!token && (
        <div>
          <button
            className='signup-button'
            type='click'
            onClick={() => {
              navigate('/signup');
            }}
          >
            sign up
          </button>
          <button
            className='login-button'
            type='click'
            onClick={() => {
              navigate('/login');
            }}
          >
            login
          </button>
        </div>
      )}
    </div>
  );
}
