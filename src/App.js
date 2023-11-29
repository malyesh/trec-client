import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostPage from '../src/pages/PostPage/PostPage';
import LandmarkListPage from '../src/pages/LandmarkListPage/LandmarkListPage';
import LandmarkFeedPage from '../src/pages/LandmarkFeedPage/LandmarkFeedPage';
import './App.css';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FeedPage from './pages/FeedPage/FeedPage';
import Header from './components/Header/Header';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/post' element={<PostPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/:countryId/:cityId' element={<LandmarkListPage />} />
          <Route
            path='/:countryId/:cityId/:landmarkId'
            element={<LandmarkFeedPage />}
          />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
