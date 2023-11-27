import Input from '../Input/Input';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

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
      values.caption !== '' &&
      !disabled
    ) {
      setDisabled(false);
    }
  }, [selectedLandmark, values, disabled]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDisabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newPost = {
      caption: values.caption,
      landmark_id: selectedLandmark.id,
      rating: values.rating,
      picture: file,
    };

    try {
      await axios.post(`${apiBody}/posts/create`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
      <div className='post__form--container'>
        <section className='post__form--section'>
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
        </section>

        <section className='post__form--section'>
          <div className='post__input'>
            <Input
              label='Caption'
              name='caption'
              type='text'
              placeholder='What did you think?'
              value={values.caption}
              onChange={handleInputChange}
            />
          </div>

          <div className='post__input--bottom'>
            <div className='post__input post__input--rating'>
              <Input
                label='Rating'
                name='rating'
                type='number'
                placeholder='x / 5'
                min='0'
                max='5'
                value={values.rating}
                onChange={handleInputChange}
              />
            </div>

            {!file ? (
              <label className='post__label post__input--upload'>
                upload photo
                <input type='file' name='image' onChange={handleFileChange} />
              </label>
            ) : (
              <label className='post__label post__input--upload uploaded'>
                photo uploaded
                <input type='file' name='image' />
              </label>
            )}
          </div>
        </section>
      </div>

      <div className='post__button--container'>
        <button
          className={`post__button ${disabled ? 'disabled' : ''}`}
          type='submit'
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
