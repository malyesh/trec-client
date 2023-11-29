import './LandmarkList.scss';
import Landmark from '../Landmark/Landmark';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandmarkList({ landmarks }) {
  const [selectedLandmark, setSelectedLandmark] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedLandmark) {
      navigate(
        `/${selectedLandmark.country_id}/${selectedLandmark.city_id}/${selectedLandmark.id}`,
        {
          state: { name: selectedLandmark.landmark_name },
        }
      );
    }
  }, []);

  return (
    <div>
      {landmarks &&
        landmarks.map((landmark, i) => {
          return (
            <Landmark
              key={i}
              id={landmark.id}
              name={landmark.landmark_name}
              country={landmark.country_id}
              city={landmark.city_id}
            />
          );
        })}
    </div>
  );
}
