import { useParams } from 'react-router-dom';
import './LandmarkListPage.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Landmark from '../../components/Landmark/Landmark';

export default function LandmarkListPage() {
  const [landmarkList, setLandmarkList] = useState(null);
  const { country, city } = useParams();

  const apiBody = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getLandmarkList = async () => {
      try {
        const response = await axios.get(
          `${apiBody}/landmarks/${country}/${city}`
        );
        setLandmarkList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLandmarkList();
  }, [apiBody, country, city]);

  if (!landmarkList) return <h1>Loading...</h1>;

  return (
    <div className='list'>
      <h1 className='list__title'>{`${city}, ${country}`}</h1>

      <main className='list__body'>
        {landmarkList.map((landmark) => {
          return (
            <Landmark
              key={landmark.id}
              name={landmark.landmark_name}
              country={landmark.country}
              city={landmark.city}
            />
          );
        })}
      </main>
    </div>
  );
}
