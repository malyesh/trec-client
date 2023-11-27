import React from 'react';
import Popup from 'reactjs-popup';
import './PostModal.scss';
import Post from '../Post/Post';

export default function PostModal({ post }) {
  const apiBody = process.env.REACT_APP_API_URL;

  return (
    <Popup
      trigger={
        <img
          src={`${apiBody}/${post.picture}`}
          alt='landmark'
          className='modal__trigger'
        />
      }
      modal
      nested
    >
      {(close) => (
        <div className='modal'>
          <button className='modal__close' onClick={close}>
            &times;
          </button>
          <div className='modal__content'>
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
          </div>
        </div>
      )}
    </Popup>
  );
}
