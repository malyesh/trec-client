import './Post.scss';
import goldstar from '../../assets/icons/goldstar.svg';
import greystar from '../../assets/icons/greystar.svg';
import heartIcon from '../../assets/icons/heart-line-icon.svg';
import solidIcon from '../../assets/icons/heart-line-icon-solid.svg';
import profileIcon from '../../assets/icons/profile.svg';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Post({
  id,
  name,
  landmark,
  caption,
  rating,
  picture,
  profile,
  setLike,
  like,
  closeModal,
}) {
  const [liked, setLiked] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const apiBody = process.env.REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const isLiked = async () => {
      try {
        const response = await axios.get(`${apiBody}/favorites/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.length !== 0) {
          setLiked(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      isLiked();
    }
  }, [apiBody, id, token]);

  const renderStars = () => {
    let starArray = [];
    for (let i = 1; i <= rating; i++) {
      starArray.push(
        <img
          className='post__stars--item'
          src={goldstar}
          alt='goldstar'
          key={Math.floor(Math.random() * 1000)}
        />
      );
    }
    for (let i = rating; i < 5; i++) {
      starArray.push(
        <img
          className='post__stars--item'
          src={greystar}
          alt='goldstar'
          key={Math.floor(Math.random() * 1000)}
        />
      );
    }
    return starArray.map((star) => star);
  };

  useEffect(() => {
    const checkImage = () => {
      if (profile === '') {
        setIsImage(false);
      } else {
        setIsImage(true);
      }
    };
    checkImage();
  }, [profile]);

  const handleLike = async () => {
    if (token) {
      if (!liked) {
        try {
          const favPost = {
            post_id: id,
          };
          await axios.post(`${apiBody}/favorites`, favPost, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLiked(true);
        } catch (error) {
          console.log(error);
        }
      } else if (liked) {
        try {
          console.log(token);
          await axios.delete(`${apiBody}/favorites/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLiked(false);
          setLike(!like);
          closeModal();
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  return (
    <div className='post'>
      <div className='post__profile'>
        {isImage && (
          <img
            className='post__profile--image'
            src={`${apiBody}/${profile}`}
            alt='profile'
          />
        )}
        {!isImage && (
          <img
            className='post__profile--image post__profile--default'
            src={profileIcon}
            alt='profile'
          />
        )}

        <p className='post__profile--name'>{name}</p>
      </div>
      <img className='post__picture' src={`${apiBody}/${picture}`} alt='post' />
      <div className='post__footer'>
        <div className='post__footer--section'>
          <p className='post__landmark'>{landmark}</p>
          <div className='post__stars'> {renderStars()}</div>
          <img
            className='post__like'
            src={`${liked ? solidIcon : heartIcon}`}
            alt='heart'
            onClick={handleLike}
          />
          <p className={`post__like--error ${isVisible ? '' : 'hide'} `}>
            please log in to like this post!
          </p>
        </div>
        <p className='post__caption'>{caption}</p>
      </div>
    </div>
  );
}
