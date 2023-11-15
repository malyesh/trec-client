import cameraIcon from '../../assets/icons/camera-svgrepo-com.svg';
import heartIcon from '../../assets/icons/heart-3068.svg';
import userIcon from '../../assets/icons//icons8-user-48.png';
import searchIcon from '../../assets/icons/icons8-search.svg';
import { useNavigate } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handlePostClick = () => {
    navigate('/post');
  };

  return (
    <section className='footer__container'>
      <h1 className='footer__item footer__item--logo' onClick={handleHomeClick}>
        TR
      </h1>
      <img
        className='footer__item footer__item--icon'
        src={searchIcon}
        alt='search'
      />
      <img
        className='footer__item footer__item--icon'
        onClick={handlePostClick}
        src={cameraIcon}
        alt='camera'
      />
      <img
        className='footer__item footer__item--icon footer__item--heart'
        src={heartIcon}
        alt='heart'
      />
      <img
        className='footer__item footer__item--icon'
        src={userIcon}
        alt='ouline of person'
      />
    </section>
  );
}
