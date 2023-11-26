import Title from '../../components/Title/Title';
import { useState, useEffect } from 'react';
import Post from '../../components/Post/Post';
import axios from 'axios';
import './FavoritesPage.scss';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const apiBody = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');

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
  }, [apiBody, token]);

  return (
    <div className='favorites'>
      <Title title='Your favorites' />
      <div className='favorites__container'>
        {favorites.length === 0 ? (
          <h2 className='favorites__empty'>
            You haven't favorited anything yet!
          </h2>
        ) : (
          favorites.map((post) => {
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
          })
        )}
      </div>
    </div>
  );
}
