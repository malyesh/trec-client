import { Link } from 'react-router-dom';
import './Landmark.scss';

export default function Landmark({ name, country, city }) {
  return (
    <Link to={`/${country}/${city}/${name}`} className='card'>
      <h3 className='card__title'>{name}</h3>
      <p className='card__info'>
        {city}, {country}
      </p>
    </Link>
  );
}
