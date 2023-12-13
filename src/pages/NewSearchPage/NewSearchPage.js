import './NewSearchPage.scss';
import Input from '../../components/Input/Input';
import { useState, useEffect } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import { useNavigate } from 'react-router-dom';
import arrowIcon from '../../assets/icons/noun-chevron-713008.svg';
import axios from 'axios';
import LandmarkList from '../../components/LandmarkList/LandmarkList';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function NewSearchPage() {
  const [search, setSearch] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [allLandmarks, setAllLandmarks] = useState();
  const [selectedResult, setSelectedResult] = useState({
    value: '',
    label: '',
    id: '',
  });
  const [results, setResults] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const apiBody = process.env.REACT_APP_API_URL;

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value);
    // const newFilter = results.filter((value) => {
    //   return value.value.toLowerCase().includes(search.toLowerCase());
    // });
    // if (search === '') {
    //   setFilteredData([]);
    // } else {
    //   setFilteredData(newFilter);
    // }
  };

  useEffect(() => {
    if (selectedResult.label !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedResult]);

  useEffect(() => {
    const getAllCountries = async () => {
      const response = await axios.get(`${apiBody}/countries`);
      setResults([
        // ...results,
        ...response.data.map((obj) => ({
          value: obj.country_name,
          label: obj.country_name,
          id: obj.id,
        })),
      ]);
    };
    const getAllCities = async () => {
      const response = await axios.get(`${apiBody}/cities`);
      setResults((results) => [
        ...results,
        ...response.data.map((obj) => ({
          value: obj.city_name,
          label: obj.city_name,
          id: obj.id,
        })),
      ]);
    };
    const getAllLandmarks = async () => {
      const response = await axios.get(`${apiBody}/landmarks`);
      setResults((results) => [
        ...results,
        ...response.data.map((obj) => ({
          value: obj.landmark_name,
          label: obj.landmark_name,
          id: obj.id,
        })),
      ]);
    };
    getAllCountries();
    getAllCities();
    getAllLandmarks();
    // setResults(results.sort((a, b) => a.label.localeCompare(b.label)));
  }, [apiBody]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const landmarks = await axios.get(
        `${apiBody}/landmarks/${selectedResult.label}`
      );
      setAllLandmarks(landmarks.data);
      navigate(`/${selectedResult.label}`, {
        state: {
          landmarks: landmarks.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const submitResult = async () => {
      try {
        const landmarks = await axios.get(
          `${apiBody}/landmarks/${selectedResult.label}`
        );
        setAllLandmarks(landmarks.data);
        navigate(`/${selectedResult.label}`, {
          state: {
            landmarks: landmarks.data,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedResult) {
      submitResult();
    }
  }, [selectedResult]);

  // useEffect(() => {
  //   submit
  //   if (selectedResult) {
  //     const landmarks = await axios.get(
  //       `${apiBody}/landmarks/${selectedResult.label}`
  //     );
  //     setAllLandmarks(landmarks.data);
  //     navigate(`/${selectedResult.label}`, {
  //       state: {
  //         landmarks: landmarks.data,
  //       },
  //     });
  //   }
  // }, [selectedResult]);

  // setTimeout(() => {
  //   // return <h1>Loading...</h1>;
  // }, 2000);
  // useEffect(() => {
  //   setResults(results.sort((a, b) => a.label.localeCompare(b.label)));
  // }, []);
  if (!results) return <h1>Loading...</h1>;

  return (
    <>
      <div className='search'>
        <form className='search__form' onSubmit={handleSubmit}>
          <h1 className='search__title'>Where do you want to go?</h1>
          <div className='search__form--input'>
            {/* <Input
              label=''
              name='search'
              type='text'
              value={search}
              onChange={handleInputChange}
              placeholder='Search...'
            /> */}
            <Dropdown
              options={results}
              setSelectedElement={setSelectedResult}
              value={selectedResult}
              name='result'
              id='result'
              type='result'
            />
            {/* <SearchBar
              placeholder='Search...'
              search={search}
              data={results}
              handleInputChange={handleInputChange}
              // results={search}
              // setSelectedElement={setSelectedResult}
              // selectedElement={selectedResult}
              filteredData={filteredData}
            /> */}
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

        {/* <LandmarkList landmarks={allLandmarks} /> */}
      </div>
    </>
  );
}
