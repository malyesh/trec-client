import Input from '../Input/Input';
import axios from 'axios';
import { useState } from 'react';
import './PostForm.scss';

const initialValues = {
  caption: '',
  landmark_name: '',
  country: '',
  city: '',
  rating: '',
  // user_id: '',
  // picture: '',
};

export default function PostForm({ id }) {
  const [values, setValues] = useState(initialValues);
  const [landmarkId, setLandmarkId] = useState(id);
  const apiBody = process.env.REACT_APP_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const getLandmarkId = async () => {
    try {
      const landmark = await axios.get(
        `${apiBody}/${values.country}/${values.city}/${values.landmark_name}`
      );
      console.log(landmark.data);
      setLandmarkId(landmark.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    getLandmarkId();

    let newPost = {
      caption: values.caption,
      landmark_id: landmarkId,
      user_id: id,
      rating: values.rating,
      // picture
    };

    try {
      const response = await axios.post(`${apiBody}/posts/create`, newPost);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label='Country'
        name='country'
        type='text'
        placeholder='What country did you go to?'
        value={values.country}
        onChange={handleInputChange}
      />
      <Input
        label='City'
        name='city'
        type='text'
        placeholder='What city were you in?'
        value={values.city}
        onChange={handleInputChange}
      />
      <Input
        label='Landmark'
        name='landmark_name'
        type='text'
        placeholder='Where did you go?!'
        value={values.landmark_name}
        onChange={handleInputChange}
      />
      <Input
        label='Rating'
        name='rating'
        type='number'
        placeholder='Rate it!'
        min='1'
        max='5'
        value={values.rating}
        onChange={handleInputChange}
      />
      <Input
        label='Caption'
        name='caption'
        type='text'
        placeholder='Overrated or underrated?'
        value={values.caption}
        onChange={handleInputChange}
      />
      {/* <Input
        label='Image'
        name='picture'
        type='file'
        placeholder=''
        value={values.picture}
        onChange={handleInputChange}
      /> */}

      <button type='submit'>Post!</button>
    </form>
  );
}
