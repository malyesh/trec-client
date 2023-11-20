import './Post.scss';

export default function Post({ name, landmark, caption, rating, picture }) {
  return (
    <div>
      <img src={picture} alt='post' />
      <p>{caption}</p>
      <p>{rating}</p>
      <p>{landmark}</p>
      <p>{name}</p>
    </div>
  );
}
