import Dropdown from '../../components/Dropdown/Dropdown';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.scss';

export default function HomePage() {
  const [allCountries, setAllCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState({
    value: '',
    label: '',
  });
  const [allCities, setAllCities] = useState();
  const [selectedCity, setSelectedCity] = useState(null);

  const navigate = useNavigate();
  // const history = useHistory();

  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getAllCountries = async () => {
      const response = await axios.get(`${apiBody}/countries`);
      // setAllCountries(response.data);
      setAllCountries(
        response.data.map((obj) => ({
          value: obj,
          label: obj,
          // cities: obj.cities,
        }))
      );
    };

    getAllCountries();
  }, [apiBody]);

  useEffect(() => {
    try {
      const getAllCities = async () => {
        const response = await axios.get(
          `${apiBody}/countries/${selectedCountry['value']}`
        );
        console.log(response.data);
        setAllCities(
          response.data.map((obj) => ({
            value: obj,
            label: obj,
          }))
        );
      };
      if (selectedCountry['value'] !== '') getAllCities();
      console.log(selectedCountry);
    } catch (error) {
      console.log(error);
    }
  }, [selectedCountry, apiBody]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`/${selectedCountry['value']}/${selectedCity['value']}`);
  };

  if (!allCountries) return <h1>Loading...</h1>;
  return (
    <div>
      <div className='header'>
        <h1>TravelRec</h1>
      </div>

      <form className='form' onSubmit={handleSubmit}>
        <div>
          <Dropdown
            options={allCountries}
            setSelectedElement={setSelectedCountry}
            value={selectedCountry}
            name='country'
            id='country'
            type='country'
          />
        </div>

        <div className={` ${allCities ? 'show' : 'hide'}`}>
          {allCities && (
            <Dropdown
              options={allCities}
              setSelectedElement={setSelectedCity}
              value={selectedCity}
              name='city'
              id='city'
              type='city'
            />
          )}
        </div>

        <button className='form__button' type='submit'>
          lets goo
        </button>
      </form>
    </div>
  );
}
