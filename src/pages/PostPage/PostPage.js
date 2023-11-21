import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/PostForm/PostForm';
import axios from 'axios';
import './PostPage.scss';

export default function PostPage() {
  const [user, setUser] = useState(null);

  const [failedAuth, setFailedAuth] = useState(false);
  const navigate = useNavigate();

  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log(token);

    if (!token) return setFailedAuth(true);

    const getUserInfo = async () => {
      try {
        const res = await axios.get(`${apiBody}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setUser(res.data);
      } catch (error) {
        setFailedAuth(true);
      }
    };

    getUserInfo();
  }, [apiBody]);

  if (!user) return <h1>Loading...</h1>;

  return (
    <div>
      {/* <div className='header'> */}
      <h1>Hey {user.first_name}! Have a Rec? </h1>
      {/* </div> */}

      <PostForm id={user.id} />
    </div>
  );
}
