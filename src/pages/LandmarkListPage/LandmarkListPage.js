import { useParams } from 'react-router-dom';
import './LandmarkListPage.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>{`${city}, ${country}`}</h1>
    </div>
  );
}
