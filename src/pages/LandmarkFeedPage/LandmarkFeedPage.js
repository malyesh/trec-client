import './LandmarkFeedPage.scss';
import Post from '../../components/Post/Post';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LandmarkFeedPage() {
  const [posts, setPosts] = useState();
  const { countryId, cityId, landmarkId } = useParams();

  const location = useLocation();
  const { name } = location.state;

  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    try {
      const getPosts = async () => {
        const allPosts = await axios.get(`${apiBody}/landmarks/${landmarkId}`);
        console.log(allPosts.data);
        setPosts(allPosts.data);
      };
      getPosts();
    } catch (e) {
      console.log(e);
    }
  }, [apiBody, landmarkId]);

  if (!posts) return <h1>Loading...</h1>;
  // console.log(posts);

  return (
    <div>
      <div className='header'>
        <h1>{name}</h1>
      </div>

      <div>
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <Post
                name={`${post.first_name} ${post.last_name}`}
                key={post.id}
                landmark={post.landmark_name}
                caption={post.caption}
                rating={post.rating}
                picture={post.picture}
              />
            );
          })
        ) : (
          <h2>No posts here yet, be the first one to trec!</h2>
        )}
      </div>
    </div>
  );
}
