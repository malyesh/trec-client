import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/HomePage/HomePage';
import PostPage from '../src/pages/PostPage/PostPage';
import LandmarkListPage from '../src/pages/LandmarkListPage/LandmarkListPage';
import LandmarkFeedPage from '../src/pages/LandmarkFeedPage/LandmarkFeedPage';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/post' element={<PostPage />} />
          <Route path='/:country/:city' element={<LandmarkListPage />} />
          <Route
            path='/:country/:city/:landmark'
            element={<LandmarkFeedPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
