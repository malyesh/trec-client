import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/HomePage/HomePage';
import PostPage from '../src/pages/PostPage/PostPage';
import LandmarkListPage from '../src/pages/LandmarkListPage/LandmarkListPage';
import LandmarkFeedPage from '../src/pages/LandmarkFeedPage/LandmarkFeedPage';
import Footer from './components/Footer/Footer';
import './App.css';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignupPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/post' element={<PostPage />} />
          <Route path='/:country/:city' element={<LandmarkListPage />} />
          <Route
            path='/:country/:city/:landmark'
            element={<LandmarkFeedPage />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
