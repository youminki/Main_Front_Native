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
import Home from './pages/Home';
import HomeDetail from './pages/HomeDetail';
import Analysis from './pages/Analysis';
import Melpik from './pages/Melpik';
import CreateMelpik from './pages/Melpik/CreateMelpik';

import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const location = useLocation();

  // 헤더가 제외될 경로 패턴
  const noHeaderPaths = ['/', '/login', '/signup', '/findid', '/findPassword'];

  // BottomNav가 제외될 경로 패턴
  const noBottomNavPaths = [
    '/',
    '/login',
    '/signup',
    '/findid',
    '/findPassword',
    '/item/:id',
  ];

  // 현재 경로가 noHeaderPaths와 일치하는지 확인
  const excludeHeader = noHeaderPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  // 현재 경로가 noBottomNavPaths와 일치하는지 확인
  const excludeBottomNav = noBottomNavPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  return (
    <AppContainer>
      {!excludeHeader && <Header />}
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
          <Route path='/melpik' element={<Melpik />} />
          <Route path='/create-melpik' element={<CreateMelpik />} />
        </Routes>
      </ContentContainer>
      {!excludeBottomNav && <BottomNav />}
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
