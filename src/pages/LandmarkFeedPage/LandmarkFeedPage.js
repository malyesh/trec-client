import './LandmarkFeedPage.scss';
import Post from '../../components/Post/Post';
import Title from '../../components/Title/Title';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import planeIcon from '../../assets/icons/airplane-outline-svgrepo-com.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LandmarkFeedPage() {
  const [posts, setPosts] = useState();
  const { landmarkId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state;

  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    try {
      const getPosts = async () => {
        const allPosts = await axios.get(`${apiBody}/landmarks/${landmarkId}`);
        setPosts(allPosts.data);
      };
      getPosts();
    } catch (e) {
      console.log(e);
    }
  }, [apiBody, landmarkId]);

  if (!posts) return <h1>Loading...</h1>;

  return (
    <div className='feed'>
      <Title title={`${name}`} />

      <div className='feed__body'>
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <div className='feed__body--item' key={post.id}>
                <Post
                  name={`${post.first_name} ${post.last_name}`}
                  id={post.id}
                  landmark={post.landmark_name}
                  caption={post.caption}
                  rating={post.rating}
                  picture={post.picture}
                  date={post.created_at}
                  profile={post.profile}
                />
              </div>
            );
          })
        ) : (
          <div className='feed__container'>
            <div className='feed__empty'>
              <h3 className='feed__empty--title'>
                No posts yet, be a trailblazer and create some for yourself!
              </h3>
              <img src={planeIcon} alt='plane' className='feed__empty--icon' />
            </div>
            <div className='feed__empty--button-container'>
              <button
                className='feed__empty--button'
                onClick={() => {
                  navigate('/post');
                }}
              >
                create a post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
