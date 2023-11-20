import './Post.scss';
import goldstar from '../../assets/icons/goldstar.svg';
import greystar from '../../assets/icons/greystar.svg';

export default function Post({ name, landmark, caption, rating, picture }) {
  const apiBody = process.env.REACT_APP_API_URL;

  const renderStars = () => {
    let starArray = [];
    for (let i = 1; i <= rating; i++) {
      starArray.push(
        <img className='post__stars--item' src={goldstar} alt='goldstar' />
      );
    }
    for (let i = rating; i < 5; i++) {
      starArray.push(
        <img className='post__stars--item' src={greystar} alt='goldstar' />
      );
    }
    return starArray.map((star) => star);
  };

  return (
    <div className='post'>
      <img className='post__picture' src={`${apiBody}/${picture}`} alt='post' />
      <div className='post__footer'>
        <p className='post__landmark'>{landmark}</p>
        <div className='post__stars'> {renderStars()}</div>
      </div>
      <div className='post__title'>
        <p className='post__caption'>
          <span className='post__name'>{name}</span> - {caption}
        </p>
      </div>
    </div>
  );
}
