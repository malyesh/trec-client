import Dropdown from '../../components/Dropdown/Dropdown';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.scss';

export default function HomePage() {
  const [allCountries, setAllCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allCities, setAllCities] = useState();
  const [selectedCity, setSelectedCity] = useState(null);

  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getAllCountries = async () => {
      const response = await axios.get(`${apiBody}/countries`);
      // setAllCountries(response.data);
      setAllCountries(
        response.data.map((obj) => ({
          value: obj['country'],
          label: obj['country'],
          cities: obj.cities,
        }))
      );
    };

    getAllCountries();
  }, [apiBody]);

  useEffect(() => {
    // if (selectedCountry['value'].length > 4) {
    if (selectedCountry) {
      setAllCities(
        selectedCountry['cities'].map((city) => ({
          value: city,
          label: city,
        }))
      );
    }

    // try {
    //   const getAllCities = async () => {
    //     const response = await axios.get(
    //       `${apiBody}/countries/${selectedCountry['value']}`
    //     );
    //     setAllCities(response.data);
    //   };
    //   getAllCities();
    // } catch (error) {
    //   console.log(error);
    // }
    // }
  }, [selectedCountry, apiBody]);

  if (!allCountries && !allCities) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Youre on the homepage</h1>
      <Dropdown
        options={allCountries}
        setSelectedElement={setSelectedCountry}
        value={selectedCountry}
        name='country'
        id='country'
        type='country'
      />

      <Dropdown
        options={allCities}
        setSelectedElement={setSelectedCity}
        value={selectedCity}
        name='city'
        id='city'
        type='city'
      />
    </div>
  );
}
