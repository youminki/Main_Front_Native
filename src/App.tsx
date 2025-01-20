import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindId from './pages/FindId.tsx';
import FindPassword from './pages/FindPassword.tsx';
import Home from './pages/Home.tsx';
import HomeDetail from './pages/HomeDetail.tsx';
import Analysis from './pages/Analysis.tsx';
import BottomNav from './components/Home/BottomNav';
import Header from './components/Home/HomeDetail/Header.tsx';
const App: React.FC = () => (
  <Router>
    <AppContainer>
      <Header />
      <ContentContainer>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/item/:id" element={<HomeDetail />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findPassword" element={<FindPassword />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </ContentContainer>
      <BottomNav />
    </AppContainer>
  </Router>
);

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
`;
