import arrowIcon from '../../assets/icons/noun-chevron-713008.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Post from '../../components/Post/Post';
import axios from 'axios';
import './FavoritesPage.scss';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

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
      <h2 className='favorites__title'>
        <img
          src={arrowIcon}
          alt='arrow'
          className='favorites__title--back'
          onClick={() => {
            navigate(-1);
          }}
        />
        Your favorites
      </h2>
      {favorites.length === 0 ? (
        <h2>You haven't favorited anything yet!</h2>
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
  );
}
