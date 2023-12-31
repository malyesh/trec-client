import { Link } from 'react-router-dom';
import './Landmark.scss';

export default function Landmark({ landmark }) {
  const countryId = landmark.country_id;
  const cityId = landmark.city_id;
  const landmarkId = landmark.id;

  return (
    <Link
      to={`/${countryId}/${cityId}/${landmarkId}`}
      state={{ name: landmark.label }}
      className='card'
    >
      <h3 className='card__title'>{landmark.label}</h3>
      <p className='card__info'>
        {landmark.city_name}, {landmark.country_name}
      </p>
    </Link>
  );
}
