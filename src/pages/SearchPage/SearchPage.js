import Dropdown from '../../components/Dropdown/Dropdown';
import arrowIcon from '../../assets/icons/noun-chevron-713008.svg';
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

  if (!allCountries) return <h1>Loading...</h1>;
  return (
    <div>
      <div className='search'>
        <form className='search__form' onSubmit={handleSubmit}>
          <div className='search__dropdown--container'>
            <div className='search__dropdown'>
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
          </div>

          <div className='search__button--container'>
            <button
              className={`search__button ${disabled ? 'disabled' : ''}`}
              type='submit'
              disabled={disabled}
            >
              search
            </button>

            <button
              className='search__button search__button--feed'
              type='click'
              onClick={() => {
                navigate('/feed');
              }}
            >
              popular posts
              <img
                src={arrowIcon}
                alt='arrow'
                className='search__button--icon'
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
