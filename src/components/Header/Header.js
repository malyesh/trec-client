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
  const [isPost, setIsPost] = useState(false);
  const [isFeed, setIsFeed] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
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
      setIsPost(false);
      setIsFav(false);
      setIsProfile(false);
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
      setIsPost(false);
      setIsFav(false);
      setIsProfile(false);
    } else if (pathname === '/post') {
      setIsFeed(false);
      setIsSignup(false);
      setIsLogin(false);
      setIsSearch(false);
      setIsPost(true);
      setIsFav(false);
      setIsProfile(false);
    } else if (pathname === '/favorites') {
      setIsFeed(false);
      setIsSignup(false);
      setIsLogin(false);
      setIsSearch(false);
      setIsPost(false);
      setIsFav(true);
      setIsProfile(false);
    } else if (pathname === '/profile') {
      setIsFeed(false);
      setIsSignup(false);
      setIsLogin(false);
      setIsSearch(false);
      setIsPost(false);
      setIsFav(false);
      setIsProfile(true);
    } else {
      setIsFeed(false);
      setIsSignup(false);
      setIsLogin(false);
      setIsSearch(false);
      setIsPost(false);
      setIsFav(false);
      setIsProfile(false);
    }
  }, [pathname]);

  return (
    <div className={`header ${isSearch ? 'header__search' : 'header__other'}`}>
      <div className='header__text'>
        <section className='header__section'>
          <h1
            className={`header__logo ${
              !isSearch ? 'header__logo--orange' : ''
            }`}
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
          <>
            <div
              className={`header__section header__section--logo header__section--mobile `}
            >
              <img
                className={`header__icon header__icon--plane ${
                  isFeed ? 'header__icon--active' : ''
                } ${!isSearch ? 'header__icon--other' : ''}`}
                src={planeIcon}
                alt='plane'
                onClick={() => {
                  navigate('/feed');
                }}
              />
              <img
                className={`header__icon header__icon--camera ${
                  isPost ? 'header__icon--active' : ''
                } ${!isSearch ? 'header__icon--other' : ''}`}
                src={cameraIcon}
                alt='camera'
                onClick={() => {
                  navigate('/post');
                }}
              />
              <img
                className={`header__icon header__icon--heart ${
                  isFav ? 'header__icon--active' : ''
                } ${!isSearch ? 'header__icon--other' : ''}`}
                src={heartIcon}
                alt='heart'
                onClick={() => {
                  navigate('/favorites');
                }}
              />
              <img
                className={`header__icon header__icon--profile ${
                  isProfile ? 'header__icon--active' : ''
                } ${!isSearch ? 'header__icon--other' : ''}`}
                src={userIcon}
                alt='profile'
                onClick={() => {
                  navigate('/profile');
                }}
              />
            </div>
            <div
              className={`header__section header__section--logo header__section--tablet `}
            >
              <button
                className={`header__button ${
                  isFeed ? 'header__button--active' : ''
                } ${!isSearch ? '' : 'header__button--other'}`}
                type='click'
                onClick={() => {
                  navigate('/feed');
                }}
              >
                feed
              </button>
              <button
                className={`header__button  ${
                  isPost ? 'header__button--active' : ''
                } ${!isSearch ? '' : 'header__button--other'}`}
                type='click'
                onClick={() => {
                  navigate('/post');
                }}
              >
                post
              </button>
              <button
                className={`header__button  ${
                  isFav ? 'header__button--active' : ''
                } ${!isSearch ? '' : 'header__button--other'}`}
                type='click'
                onClick={() => {
                  navigate('/favorites');
                }}
              >
                favorites
              </button>
              <button
                className={`header__button  ${
                  isProfile ? 'header__button--active' : ''
                } ${!isSearch ? '' : 'header__button--other'}`}
                type='click'
                onClick={() => {
                  navigate('/profile');
                }}
              >
                profile
              </button>
            </div>
          </>
        )}
        {!token && (
          <div className='header__section header__section--logo'>
            <button
              className={`header__button header__button--signup ${
                isSignup ? 'header__button--active' : ''
              } ${!isSearch ? '' : 'header__button--other'}`}
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
              } ${!isSearch ? '' : 'header__button--other'}`}
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
    </div>
  );
}
