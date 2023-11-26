import './ProfilePage.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import profileIcon from '../../assets/icons/profile.svg';
import axios from 'axios';
import Post from '../../components/Post/Post';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [allPosts, setAllPosts] = useState();
  const [isImage, setIsImage] = useState(false);

  const apiBody = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const login = async () => {
      console.log(token);
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
  }, [apiBody, token, isLoading]);

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
    console.log('here');
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

      <div>
        {allPosts.map((post) => {
          return (
            <Post
              name={`${post.first_name} ${post.last_name}`}
              key={post.id}
              id={post.id}
              landmark={post.landmark_name}
              caption={post.caption}
              rating={post.rating}
              picture={post.picture}
              date={post.created_at}
              profile={post.profile}
            />
          );
        })}
      </div>
    </>
  );
}
