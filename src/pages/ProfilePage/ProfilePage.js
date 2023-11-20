import './ProfilePage.scss';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Post from '../../components/Post/Post';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [allPosts, setAllPosts] = useState();

  const apiBody = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
    // Remember to include the token in Authorization header

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
  }, [apiBody, token, isLoading]);

  // const handleLogout = () => {
  //   setIsLoading(true);
  //   sessionStorage.removeItem('token');
  //   // navigate()
  // };

  // if (isLoading) return <h1>Log in or create an account to see this info!</h1>;
  if (isLoading || !allPosts) return <h1>Loading...</h1>;

  // return isLoading ? (
  //   <>
  //     <h1>Log in or create an account to see this info!</h1>
  //     <Link to={'/signup'}>Sign up here!</Link>
  //   </>
  // ) : (
  return (
    <>
      <div className='header'>
        <h1>{userInfo.first_name}'s profile page</h1>
      </div>

      {/* <div>
        <button type='click' onClick={handleLogout}>
          log out?
        </button>
      </div> */}

      <div>
        {allPosts.map((post) => {
          return (
            <Post
              key={post.id}
              name={`${post.first_name} ${post.last_name}`}
              landmark={post.landmark_name}
              caption={post.caption}
              rating={post.rating}
              picture={post.picture}
            />
          );
        })}
      </div>
    </>
  );
}
