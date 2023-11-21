import Dropdown from '../../components/Dropdown/Dropdown';
import Post from '../../components/Post/Post';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchPage.scss';

export default function SearchPage() {
  const [allCountries, setAllCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState({
    value: '',
    label: '',
    id: '',
  });
  const [allCities, setAllCities] = useState();
  const [selectedCity, setSelectedCity] = useState({
    value: '',
    label: '',
    id: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [posts, setPosts] = useState();

  const navigate = useNavigate();

  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getAllCountries = async () => {
      const response = await axios.get(`${apiBody}/countries`);
      setAllCountries(
        response.data.map((obj) => ({
          value: obj.country_name,
          label: obj.country_name,
          id: obj.id,
        }))
      );
    };
    const getAllPosts = async () => {
      const response = await axios.get(`${apiBody}/posts`);
      setPosts(response.data);
    };
    getAllPosts();
    getAllCountries();
  }, [apiBody]);

  useEffect(() => {
    try {
      const getAllCities = async () => {
        const response = await axios.get(
          `${apiBody}/countries/${selectedCountry.id}`
        );
        setAllCities(
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
    if (selectedCity.id !== '' && selectedCountry.id !== '') {
      setDisabled(false);
    }
  }, [selectedCity, selectedCountry]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`/${selectedCountry.id}/${selectedCity.id}`, {
      state: {
        city: selectedCity,
        country: selectedCountry,
      },
    });
  };

  if (!allCountries || !posts) return <h1>Loading...</h1>;
  return (
    <div>
      <div className='search'>
        <h2 className='search__title'>Where do you want to go?</h2>

        <form className='search__form' onSubmit={handleSubmit}>
          <div className='search__dropdown'>
            <label className='search__label' htmlFor='country'>
              Country
            </label>
            <Dropdown
              options={allCountries}
              setSelectedElement={setSelectedCountry}
              value={selectedCountry}
              name='country'
              id='country'
              type='country'
            />
          </div>

          <div className={`search__dropdown ${allCities ? 'show' : 'hide'}`}>
            {allCities && (
              <>
                <label className='search__label' htmlFor='city'>
                  City
                </label>
                <Dropdown
                  options={allCities}
                  setSelectedElement={setSelectedCity}
                  value={selectedCity}
                  name='city'
                  id='city'
                  type='city'
                />
              </>
            )}
          </div>

          <button
            className={`search__button ${disabled ? 'disabled' : ''}`}
            type='submit'
            disabled={disabled}
          >
            lets goo
          </button>
        </form>
      </div>

      <section className='posts-container'>
        <h2 className='posts-container__title'>
          See where other people visited!
        </h2>
        {posts.map((post) => {
          return (
            <Post
              name={`${post.first_name} ${post.last_name}`}
              key={post.id}
              landmark={post.landmark_name}
              caption={post.caption}
              rating={post.rating}
              picture={post.picture}
            />
          );
        })}
      </section>
    </div>
  );
}
