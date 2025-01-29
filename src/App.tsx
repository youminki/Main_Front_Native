import React from 'react';
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  matchPath,
} from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import Home from './pages/Home/Home';
import HomeDetail from './pages/Home/HomeDetail';
import Analysis from './pages/Analysis';

import Brand from './pages/Brand/Brand';
import BrandDetail from './pages/Brand/BrandDetail';

import Melpik from './pages/Melpik/Melpik';
import CreateMelpik from './pages/Melpik/CreateMelpik';

import BottomNav from './components/BottomNav';
import Header1 from './components/Header1';
import Header2 from './components/Header2';
import Header3 from './components/Header3';

const App: React.FC = () => {
  const location = useLocation();

  // BottomNav가 포함될 경로 패턴
  const bottomNavPaths = ['/home', '/melpik', '/brand'];

  // Header1이 포함될 경로 패턴
  const header1Paths = ['/home', '/melpik', '/brand'];

  // Header2가 포함될 경로 패턴
  const header2Paths = ['/create-melpik'];

  // Header3가 포함될 경로 패턴
  const header3Paths = ['/item/:id'];

  // 현재 경로가 BottomNavPaths와 일치하는지 확인
  const includeBottomNav = bottomNavPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  // 현재 경로가 Header1Paths와 일치하는지 확인
  const includeHeader1 = header1Paths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  // 현재 경로가 Header2Paths와 일치하는지 확인
  const includeHeader2 = header2Paths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  // 현재 경로가 Header3Paths와 일치하는지 확인
  const includeHeader3 = header3Paths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  return (
    <AppContainer>
      {includeHeader1 && <Header1 />}
      {includeHeader2 && <Header2 />}
      {includeHeader3 && <Header3 />}
      <ContentContainer>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/item/:id' element={<HomeDetail />} />
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/findid' element={<FindId />} />
          <Route path='/findPassword' element={<FindPassword />} />
          <Route path='/analysis' element={<Analysis />} />

          <Route path='/brand' element={<Brand />} />
          <Route path='/brand/:brandName' element={<BrandDetail />} />

          <Route path='/melpik' element={<Melpik />} />
          <Route path='/create-melpik' element={<CreateMelpik />} />
        </Routes>
      </ContentContainer>
      {includeBottomNav && <BottomNav />}
    </AppContainer>
  );
};

const AppWrapper: React.FC = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default AppWrapper;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 0 1000px 0;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
`;
