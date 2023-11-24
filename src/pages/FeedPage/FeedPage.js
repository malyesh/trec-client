import Post from '../../components/Post/Post';
import axios from 'axios';
import { useState, useEffect } from 'react';
import arrowIcon from '../../assets/icons/noun-chevron-713008.svg';
import './FeedPage.scss';
import { useNavigate } from 'react-router-dom';

export default function FeedPage() {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await axios.get(`${apiBody}/posts`);
      setPosts(response.data);
      console.log(response.data);
    };
    getAllPosts();
  }, [apiBody]);

  if (!posts) return <h1>Loading...</h1>;

  return (
    <div className='feed'>
      <h2 className='feed__title'>
        <img
          src={arrowIcon}
          alt='arrow'
          className='feed__title--back'
          onClick={() => {
            navigate(-1);
          }}
        />
        Popular posts
      </h2>
      {posts.map((post) => {
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
  );
}
