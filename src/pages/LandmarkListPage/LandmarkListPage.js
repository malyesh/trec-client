import Dropdown from '../../components/Dropdown/Dropdown';
import Landmark from '../../components/Landmark/Landmark';
import Title from '../../components/Title/Title';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './LandmarkListPage.scss';
import Input from '../../components/Input/Input';
import sadIcon from '../../assets/icons/sad-face-in-rounded-square-svgrepo-com.svg';

export default function LandmarkListPage() {
  const [landmarkList, setLandmarkList] = useState(null);
  const [selectedLandmark, setSelectedLandmark] = useState();
  // const [search, setSearch] = useState('');

  const [allLandmarks, setAllLandmarks] = useState();
  const { query } = useParams();
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();
  const apiBody = process.env.REACT_APP_API_URL;

  // console.log(state.landmarks);
  useEffect(() => {
    setAllLandmarks(
      state.landmarks.map((obj) => ({
        value: obj.landmark_name,
        label: obj.landmark_name,
        city_id: obj.city_id,
        country_id: obj.country_id,
        country_name: obj.country_name,
        city_name: obj.city_name,
        id: obj.id,
      }))
    );
  }, [state]);

  // useEffect(() => {
  //   const getLandmarkList = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${apiBody}/landmarks/${countryId}/${cityId}`
  //       );
  //       setLandmarkList(response.data);
  //       setAllLandmarks(
  //         response.data.map((obj) => ({
  //           value: obj.landmark_name,
  //           label: obj.landmark_name,
  //           id: obj.id,
  //         }))
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getLandmarkList();
  // }, [apiBody, countryId, cityId]);

  useEffect(() => {
    if (selectedLandmark) {
      navigate(
        `/${selectedLandmark.country_id}/${selectedLandmark.city_id}/${selectedLandmark.id}`,
        {
          state: { name: selectedLandmark.label },
        }
      );
    }
  }, [selectedLandmark]);

  if (!allLandmarks) return <h1>Loading...</h1>;
  // console.log(allLandmarks);

  return (
    <div className='list'>
      <Title title={`Landmark results for "${query}"`} />

      <main className='list__body'>
        <Dropdown
          options={allLandmarks}
          setSelectedElement={setSelectedLandmark}
          value={selectedLandmark}
          name='landmark'
          id='landmark'
          type='landmark'
        />

        <section className='list__container'>
          {allLandmarks.length > 0 ? (
            allLandmarks.map((landmark, i) => {
              return (
                <Landmark
                  key={i}
                  // id={landmark.id}
                  // name={landmark.landmark_name}
                  // country={landmark.country_name}
                  // city={landmark.city_name}
                  landmark={landmark}
                />
              );
            })
          ) : (
            <div className='list__empty'>
              <h2 className='list__empty--title'>
                No landmarks for your search yet, please be patient with us!
              </h2>
              <img className='list__empty--icon' src={sadIcon} alt='sad face' />
              {/* <form className='list__form'>
                  <Input
                    label=''
                    name='search'
                    type='text'
                    value={search}
                    onChange={handleInputChange}
                    placeholder='Search...'
                  />
                </form> */}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
