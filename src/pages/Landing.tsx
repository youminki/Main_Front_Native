// src/pages/Landing.tsx
import React, { useEffect } from 'react';

import styled from 'styled-components';
import Header from '../components/Landing/Header';
import LandingPage1 from '../components/Landing/LandingPage1';
import LandingPage2 from '../components/Landing/LandingPage2';
import LandingPage3 from '../components/Landing/LandingPage3';
import LandingPage4 from '../components/Landing/LandingPage4';
import LandingPage5 from '../components/Landing/LandingPage5';
import LandingPage6 from '../components/Landing/LandingPage6';
import Footer from '../components/Landing/Footer';

const Landing: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('landing');
    return () => {
      document.body.classList.remove('landing');
    };
  }, []);
  return (
    <LandingContainer>
      <Header />
      <ContentWrapper>
        <LandingPageWrapper variant='odd'>
          <LandingPage1 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='even'>
          <LandingPage2 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='odd'>
          <LandingPage3 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='even'>
          <LandingPage4 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='odd'>
          <LandingPage5 />
        </LandingPageWrapper>
        <LandingPageWrapper variant='even'>
          <LandingPage6 />
        </LandingPageWrapper>
      </ContentWrapper>
      <Footer />
    </LandingContainer>
  );
};

export default Landing;

type WrapperVariant = 'odd' | 'even';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  overflow-x: hidden;

  margin-top: 50px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingPageWrapper = styled.div<{ variant: WrapperVariant }>`
  width: 100%;
  position: relative;
  margin-bottom: -40px;
  z-index: ${({ variant }) => (variant === 'even' ? 3 : 1)};

  &:last-child {
    margin-bottom: 0;
  }
`;
