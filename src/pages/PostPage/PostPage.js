import PostForm from '../../components/PostForm/PostForm';
import Title from '../../components/Title/Title';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostPage.scss';

export default function PostPage() {
  const [user, setUser] = useState(null);

  const [failedAuth, setFailedAuth] = useState(false);
  const navigate = useNavigate();

  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setFailedAuth(true);
    } else {
      const getUserInfo = async () => {
        try {
          const res = await axios.get(`${apiBody}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data);
        } catch (error) {
          setFailedAuth(true);
        }
      };

      getUserInfo();
    }
  }, [apiBody]);

  const renderMessage = () => {
    if (failedAuth)
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    return (
      <div className='post-page__error'>
        <h3 className='post-page__error--title'>
          Please log in or create an account to make a post!
        </h3>
        <p>you will be redirected to the login page now</p>
      </div>
    );
  };

  return (
    <div className='post-page'>
      {!failedAuth && user ? (
        <>
          <Title title='Been somewhere cool?' />
          <div className='post-page__body'>
            <PostForm id={user.id} />
          </div>
        </>
      ) : (
        <>{renderMessage()}</>
      )}
    </div>
  );
}
