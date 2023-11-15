import './LandmarkFeedPage.scss';
import { useParams } from 'react-router-dom';

export default function LandmarkFeedPage() {
  const { landmark } = useParams();

  return (
    <div>
      <div className='header'>
        <h1>{landmark}</h1>
      </div>
    </div>
  );
}
