import './NewSearchPage.scss';
import Input from '../../components/Input/Input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowIcon from '../../assets/icons/noun-chevron-713008.svg';
import axios from 'axios';
import LandmarkList from '../../components/LandmarkList/LandmarkList';

export default function NewSearchPage() {
  const [search, setSearch] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [allLandmarks, setAllLandmarks] = useState();

  const navigate = useNavigate();
  const apiBody = process.env.REACT_APP_API_URL;

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(search);
    try {
      const landmarks = await axios.get(`${apiBody}/landmarks/${search}`);
      setAllLandmarks(landmarks.data);
      navigate(`/${search}`, {
        state: {
          landmarks: landmarks.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // setTimeout(() => {
  //   // return <h1>Loading...</h1>;
  // }, 2000);

  return (
    <>
      <div className='search'>
        <form className='search__form' onSubmit={handleSubmit}>
          <h1 className='search__title'>Where do you want to go?</h1>
          <div className='search__form--input'>
            <Input
              label=''
              name='search'
              type='text'
              value={search}
              onChange={handleInputChange}
              placeholder='Search...'
            />
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
