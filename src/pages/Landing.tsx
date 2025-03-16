// src/pages/Landing.tsx
import React from 'react';
import styled from 'styled-components';
import LandingPage1 from '../components/Landing/LandingPage1';
import LandingPage2 from '../components/Landing/LandingPage2';
import LandingPage3 from '../components/Landing/LandingPage3';
import LandingPage4 from '../components/Landing/LandingPage4';
import LandingPage5 from '../components/Landing/LandingPage5';

const Landing: React.FC = () => {
  return (
    <LandingContainer>
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
    </LandingContainer>
  );
};

export default Landing;

type WrapperVariant = 'odd' | 'even';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 900px;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
`;

const LandingPageWrapper = styled.div<{ variant: WrapperVariant }>`
  width: 100%;
  position: relative;
  margin-bottom: -20px;
  z-index: ${({ variant }) => (variant === 'even' ? 3 : 1)};
`;
