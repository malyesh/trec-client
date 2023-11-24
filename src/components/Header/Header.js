import userIcon from '../../assets/icons/profile.svg';
import heartIcon from '../../assets/icons/heart-line-icon.svg';
import cameraIcon from '../../assets/icons/camera-svgrepo-com.svg';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import planeIcon from '../../assets/icons/airplane-outline-svgrepo-com.svg';
import './Header.scss';

export default function Header() {
  const [isSearch, setIsSearch] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isFeed, setIsFeed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  let token = '';
  if (sessionStorage.getItem('token')) {
    token = sessionStorage.getItem('token');
  }

  useEffect(() => {
    if (pathname === '/' || pathname === '/search') {
      setIsSearch(true);
      setIsLogin(false);
      setIsSignup(false);
      setIsFeed(false);
      console.log(pathname);
    } else if (pathname === '/login') {
      setIsLogin(true);
      setIsSearch(false);
      setIsSignup(false);
      setIsFeed(false);
    } else if (pathname === '/signup') {
      setIsSignup(true);
      setIsLogin(false);
      setIsSearch(false);
      setIsFeed(false);
    } else if (pathname === '/feed') {
      setIsFeed(true);
      setIsSignup(false);
      setIsLogin(false);
      setIsSearch(false);
    } else {
      setIsFeed(false);
      setIsSignup(false);
      setIsLogin(false);
      setIsSearch(false);
    }
  }, [pathname]);

  return (
    <div className={`header ${isSearch ? 'header__search' : 'header__other'}`}>
      <section className='header__section'>
        <h1
          className={`header__logo ${!isSearch ? 'header__logo--orange' : ''}`}
          onClick={() => {
            navigate('/search');
          }}
        >
          Travel
          <span
            className={`header__logo normal ${
              !isSearch ? 'header__logo--orange' : ''
            }`}
          >
            Rec
          </span>
        </h1>
      </section>

      {token && (
        <div className='header__section header__section--logo'>
          <img
            className={`header__icon header__icon--plane ${
              isFeed ? 'header__icon--active' : ''
            }`}
            src={planeIcon}
            alt='plane'
            onClick={() => {
              navigate('/feed');
            }}
          />
          <img
            className={`header__icon header__icon--camera ${
              isFeed ? 'header__icon--active' : ''
            }`}
            src={cameraIcon}
            alt='camera'
            onClick={() => {
              navigate('/post');
            }}
          />
          <img
            className={`header__icon header__icon--heart ${
              isFeed ? 'header__icon--active' : ''
            }`}
            src={heartIcon}
            alt='heart'
          />
          <img
            className={`header__icon header__icon--profile ${
              isFeed ? 'header__icon--active' : ''
            }`}
            src={userIcon}
            alt='profile'
            onClick={() => {
              navigate('/profile');
            }}
          />
        </div>
      )}
      {!token && (
        <div className='header__section header__section--logo'>
          <button
            className={`header__button header__button--signup ${
              isSignup ? 'header__button--active' : ''
            }`}
            type='click'
            onClick={() => {
              navigate('/signup');
            }}
          >
            sign up
          </button>
          <button
            className={`header__button header__button--login ${
              isLogin ? 'header__button--active' : ''
            }`}
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
