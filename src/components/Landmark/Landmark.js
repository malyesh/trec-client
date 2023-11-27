import { Link } from 'react-router-dom';
import './Landmark.scss';

export default function Landmark({ id, country, city, name }) {
  const countryId = country.id;
  const cityId = city.id;
  const landmarkId = id;
  return (
    <Link
      to={`/${countryId}/${cityId}/${landmarkId}`}
      state={{ name: name }}
      className='card'
    >
      <h3 className='card__title'>{name}</h3>
      <p className='card__info'>
        {city.label}, {country.label}
      </p>
    </Link>
  );
}
