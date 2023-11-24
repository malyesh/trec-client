import { useNavigate } from 'react-router-dom';
import arrowIcon from '../../assets/icons/noun-chevron-713008.svg';
import './Title.scss';

export default function Title({ title }) {
  const navigate = useNavigate();
  return (
    <h2 className='title'>
      <img
        src={arrowIcon}
        alt='arrow'
        className='title--back'
        onClick={() => {
          navigate(-1);
        }}
      />
      {title}
    </h2>
  );
}
