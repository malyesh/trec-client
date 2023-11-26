import Post from '../../components/Post/Post';
import Title from '../../components/Title/Title';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedPage.scss';

export default function FeedPage() {
  const [posts, setPosts] = useState();

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
      <Title title='Popular posts' />
      <section className='feed__posts'>
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
      </section>
    </div>
  );
}
