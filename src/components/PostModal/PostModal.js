import React from 'react';
import Popup from 'reactjs-popup';
import './PostModal.scss';
import Post from '../Post/Post';
import axios from 'axios';
import { useState } from 'react';

export default function PostModal({
  post,
  setHasDeleted,
  hasDeleted,
  setLike,
  like,
  isPost,
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const apiBody = process.env.REACT_APP_API_URL;

  const handleDelete = async () => {
    console.log(`delete ${post.id}`);
    try {
      const response = await axios.delete(`${apiBody}/posts/${post.id}`);
      console.log(response.data);
      setHasDeleted(!hasDeleted);
    } catch (e) {
      console.log(e);
    }

    closeModal();
  };

  return (
    <div>
      <img
        src={`${apiBody}/${post.picture}`}
        alt='landmark'
        className='modal__trigger'
        onClick={() => setOpen((o) => !o)}
      />
      <Popup open={open} closeOnDocumentClick onClose={closeModal} nested>
        <div className='modal'>
          <button className='modal__close' onClick={closeModal}>
            &times;
          </button>
          <div className='modal__content'>
            <Post
              name={`${post.first_name} ${post.last_name}`}
              id={post.id}
              landmark={post.landmark_name}
              caption={post.caption}
              rating={post.rating}
              picture={post.picture}
              date={post.created_at}
              profile={post.profile}
              setLike={setLike}
              like={like}
              closeModal={closeModal}
            />
          </div>
          {isPost && (
            <button onClick={handleDelete} className='modal__content--delete'>
              delete post
            </button>
          )}

          {/* <Popup
            open={open}
            position='top center'
            arrow={false}
            closeOnDocumentClick
            nested
          >
            <div className='modal__content--confirm'>
              are you sure you would like to delete this post?
              <div>
                <button onClick={handleDelete}>yes</button>
                <button>no</button>
              </div>
            </div>
          </Popup> */}
        </div>
      </Popup>
    </div>
  );
}
