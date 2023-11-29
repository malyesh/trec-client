import './ProfilePage.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import profileIcon from '../../assets/icons/profile.svg';
import axios from 'axios';
import PostModal from '../../components/PostModal/PostModal';
import gridIcon from '../../assets/icons/grid-3x3 thicker.svg';
import heartIcon from '../../assets/icons/heart-line-icon.svg';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [isPost, setIsPost] = useState(true);
  const [allPosts, setAllPosts] = useState();
  const [favorites, setFavorites] = useState([]);
  const [like, setLike] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);

  const apiBody = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const login = async () => {
      const response = await axios.get(`${apiBody}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      setUserInfo(response.data);
    };
    login();
  }, [apiBody, token, isLoading]);

  useEffect(() => {
    const getAllPosts = async () => {
      const posts = await axios.get(`${apiBody}/user/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllPosts(posts.data);
    };
    getAllPosts();
  }, [apiBody, token, isLoading, hasDeleted]);

  useEffect(() => {
    const getFavorites = async () => {
      const posts = await axios.get(`${apiBody}/user/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(posts.data);
    };
    getFavorites();
  }, [apiBody, token, like]);

  useEffect(() => {
    const checkImage = () => {
      if (userInfo.picture === '') {
        setIsImage(false);
      } else {
        setIsImage(true);
      }
    };
    checkImage();
  }, [userInfo.picture]);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      sessionStorage.removeItem('token');
      navigate('/');
    }, 500);
  };

  if (!token) {
    return <Navigate to='/login' />;
  }
  if (isLoading || !allPosts) return <h1>Loading...</h1>;

  return (
    <>
      <div className='profile-header'>
        {isImage && (
          <img
            className='profile-header__image'
            src={`${apiBody}/${userInfo.picture}`}
            alt='profile'
          />
        )}
        {!isImage && (
          <img
            className='profile-header__image profile-header__image--default'
            src={profileIcon}
            alt='profile'
          />
        )}

        <div className='profile-header__bottom'>
          <h1 className='profile-header__name'>
            {userInfo.first_name} {userInfo.last_name}
          </h1>
          <div className='profile__button'>
            <button
              className='profile__button--logout'
              type='click'
              onClick={handleLogout}
            >
              log out?
            </button>
          </div>
        </div>
      </div>

      <div className='profile__toggle'>
        <div className='profile__toggle--container '>
          <div
            className='profile__toggle--item profile__toggle--grid'
            onClick={() => {
              setIsPost(true);
            }}
          >
            <img
              className={`profile__toggle--icon ${
                isPost ? 'profile__toggle--active' : ''
              }`}
              src={gridIcon}
              alt='grid'
            />
            <p
              className={`profile__toggle--text ${
                isPost ? 'profile__toggle--active' : ''
              }`}
            >
              posts
            </p>
          </div>
          <div
            className='profile__toggle--item'
            onClick={() => {
              setIsPost(false);
            }}
          >
            <img
              className={`profile__toggle--icon ${
                !isPost ? 'profile__toggle--active' : ''
              }`}
              src={heartIcon}
              alt='heart'
            />
            <p
              className={`profile__toggle--text ${
                !isPost ? 'profile__toggle--active' : ''
              }`}
            >
              favorites
            </p>
          </div>
        </div>
      </div>

      <section>
        <div className='profile__container'>
          {isPost &&
            allPosts.map((post, i) => {
              return (
                <div className='profile__post' key={i}>
                  <PostModal
                    post={post}
                    setHasDeleted={setHasDeleted}
                    hasDeleted={hasDeleted}
                    setLike={setLike}
                    like={like}
                    isPost={true}
                  />
                </div>
              );
            })}
        </div>

        <div>
          {!isPost && (
            <div className='profile__container'>
              {favorites.length === 0 ? (
                <h2 className='profile__empty'>
                  You haven't favorited anything yet!
                </h2>
              ) : (
                favorites.map((post, i) => {
                  return (
                    <div className='profile__post' key={i}>
                      <PostModal
                        post={post}
                        setHasDeleted={setHasDeleted}
                        hasDeleted={hasDeleted}
                        setLike={setLike}
                        like={like}
                        isPost={false}
                      />
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
