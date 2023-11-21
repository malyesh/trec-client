import Input from '../Input/Input';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { useNavigate, useLocation } from 'react-router-dom';
import './PostForm.scss';

const initialValues = {
  caption: '',
  landmark: '',
  country: '',
  city: '',
  rating: '',
};

export default function PostForm({ id }) {
  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState();
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
  const apiBody = process.env.REACT_APP_API_URL;

  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      rating: values.rating,
      picture: file,
    };

    console.log(newPost);

    try {
      const response = await axios.post(`${apiBody}/posts/create`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate(
        `/${selectedCountry.id}/${selectedCity.id}/${selectedLandmark.id}`,
        {
          state: { name: selectedLandmark.value },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className='post__form'
      onSubmit={handleSubmit}
      encType='multipart/form-data'
    >
      <label className='post__label' htmlFor='country'>
        Country
      </label>
      <Dropdown
        options={countries}
        setSelectedElement={setSelectedCountry}
        value={selectedCountry}
        name='country'
        id='country'
        type='country'
      />
      <label className='post__label' htmlFor='city'>
        City
      </label>
      <Dropdown
        options={cities}
        setSelectedElement={setSelectedCity}
        value={selectedCity}
        name='city'
        id='city'
        type='city'
      />
      <label className='post__label' htmlFor='landmark'>
        Landmark
      </label>
      <Dropdown
        options={landmarks}
        setSelectedElement={setSelectedLandmark}
        value={selectedLandmark}
        name='landmark'
        id='landmark'
        type='landmark'
      />

      <Input
        label='Caption'
        name='caption'
        type='text'
        placeholder='What did you think?'
        value={values.caption}
        onChange={handleInputChange}
      />

      <div className='post__input--bottom'>
        <div className='post__input--rating'>
          <Input
            label='Rating'
            name='rating'
            type='number'
            placeholder='x / 5'
            min='1'
            max='5'
            value={values.rating}
            onChange={handleInputChange}
          />
        </div>

        <label className='post__label post__input--upload'>
          Upload photo!
          <input type='file' name='image' onChange={handleFileChange} />
        </label>
      </div>

      <button
        className={`post__button ${disabled ? 'disabled' : ''}`}
        type='submit'
      >
        Create Post
      </button>
    </form>
  );
}
