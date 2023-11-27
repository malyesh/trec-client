import Dropdown from '../../components/Dropdown/Dropdown';
import Landmark from '../../components/Landmark/Landmark';
import Title from '../../components/Title/Title';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './LandmarkListPage.scss';

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
      <Title title={`${state.city.label}, ${state.country.label}`} />

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
        </section>
      </main>
    </div>
  );
}
