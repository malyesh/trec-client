import Input from '../Input/Input';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './PostForm.scss';

const initialValues = {
  caption: '',
  landmark: '',
  country: '',
  city: '',
  rating: '',
  // user_id: '',
  // picture: '',
};

export default function PostForm({ id }) {
  const [values, setValues] = useState(initialValues);
  const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState({
    value: '',
    label: '',
    id: '',
  });
  const [cities, setCities] = useState();
  const [selectedCity, setSelectedCity] = useState({
    value: '',
    label: '',
    id: '',
  });
  const [landmarks, setLandmarks] = useState();
  const [selectedLandmark, setSelectedLandmark] = useState({
    value: '',
    label: '',
    id: '',
  });
  const [disabled, setDisabled] = useState(true);

  // const [landmarkId, setLandmarkId] = useState(id);
  const apiBody = process.env.REACT_APP_API_URL;

  const token = sessionStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    const getAllCountries = async () => {
      const response = await axios.get(`${apiBody}/countries`);
      setCountries(
        response.data.map((obj) => ({
          value: obj.country_name,
          label: obj.country_name,
          id: obj.id,
        }))
      );
    };
    getAllCountries();
  }, [apiBody]);

  useEffect(() => {
    try {
      const getAllCities = async () => {
        const response = await axios.get(
          `${apiBody}/countries/${selectedCountry.id}`
        );
        setCities(
          response.data.map((obj) => ({
            value: obj.city_name,
            label: obj.city_name,
            id: obj.id,
          }))
        );
      };
      if (selectedCountry.id !== '') getAllCities();
      console.log(selectedCountry);
    } catch (error) {
      console.log(error);
    }
  }, [selectedCountry, apiBody]);

  useEffect(() => {
    try {
      const getAllLandmarks = async () => {
        const response = await axios.get(
          `${apiBody}/landmarks/${selectedCountry.id}/${selectedCity.id}`
        );
        setLandmarks(
          response.data.map((obj) => ({
            value: obj.landmark_name,
            label: obj.landmark_name,
            id: obj.id,
          }))
        );
      };
      if (selectedCountry.id !== '' && selectedCity !== '') getAllLandmarks();
      console.log(selectedCountry);
    } catch (error) {
      console.log(error);
    }
  }, [selectedCountry, selectedCity, apiBody]);

  useEffect(() => {
    if (
      selectedLandmark !== '' &&
      values.rating !== '' &&
      values.caption !== ''
    )
      setDisabled(false);
  }, [selectedLandmark, values]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newPost = {
      caption: values.caption,
      landmark_id: selectedLandmark.id,
      user_id: id,
      rating: values.rating,
      // picture
    };

    console.log(newPost);

    try {
      const response = await axios.post(`${apiBody}/posts/create`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dropdown
        options={countries}
        setSelectedElement={setSelectedCountry}
        value={selectedCountry}
        name='country'
        id='country'
        type='country'
      />
      <Dropdown
        options={cities}
        setSelectedElement={setSelectedCity}
        value={selectedCity}
        name='city'
        id='city'
        type='city'
      />
      <Dropdown
        options={landmarks}
        setSelectedElement={setSelectedLandmark}
        value={selectedLandmark}
        name='landmark'
        id='landmark'
        type='landmark'
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

      <button
        className={`post__button ${disabled ? 'disabled' : ''}`}
        type='submit'
      >
        Post!
      </button>
    </form>
  );
}
