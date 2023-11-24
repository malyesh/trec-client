import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './LandmarkListPage.scss';
import Dropdown from '../../components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Landmark from '../../components/Landmark/Landmark';
import arrowIcon from '../../assets/icons/noun-chevron-713008.svg';

export default function LandmarkListPage() {
  const [landmarkList, setLandmarkList] = useState(null);
  const [selectedLandmark, setSelectedLandmark] = useState();
  const [allLandmarks, setAllLandmarks] = useState();
  const { countryId, cityId } = useParams();
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();
  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getLandmarkList = async () => {
      try {
        const response = await axios.get(
          `${apiBody}/landmarks/${countryId}/${cityId}`
        );
        setLandmarkList(response.data);
        setAllLandmarks(
          response.data.map((obj) => ({
            value: obj.landmark_name,
            label: obj.landmark_name,
            id: obj.id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    getLandmarkList();
  }, [apiBody, countryId, cityId]);

  useEffect(() => {
    if (selectedLandmark) {
      navigate(`/${countryId}/${cityId}/${selectedLandmark.id}`, {
        state: { name: selectedLandmark.value },
      });
    }
  });

  if (!landmarkList) return <h1>Loading...</h1>;

  return (
    <div className='list'>
      <h2 className='list__title'>
        <img
          src={arrowIcon}
          alt='arrow'
          className='list__title--back'
          onClick={() => {
            navigate(-1);
          }}
        />
        {`${state.city.label}, ${state.country.label}`}
      </h2>

      <main className='list__body'>
        <Dropdown
          options={allLandmarks}
          setSelectedElement={setSelectedLandmark}
          value={selectedLandmark}
          name='landmark'
          id='landmark'
          type='landmark'
        />

        {landmarkList.map((landmark) => {
          return (
            <Landmark
              key={landmark.id}
              id={landmark.id}
              name={landmark.landmark_name}
              country={state.country}
              city={state.city}
            />
          );
        })}
      </main>
    </div>
  );
}
