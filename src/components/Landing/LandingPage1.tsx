// src/components/Landing/LandingPage1.tsx
import React from 'react';
import styled from 'styled-components';
import LandingBackground from '../../assets/Landing/LandingBackground.png';

const LandingPage1: React.FC = () => {
  const handleRegisterClick = () => {
    window.location.href = 'https://me1pik.com/login';
  };

  return (
    <Container>
      <BackgroundImage src={LandingBackground} alt='Landing Background' />
      <MainContent>
        <Title>멜픽과 함께</Title>
        <BoldText>빌리고, 사고, 판매하세요</BoldText>
        <Subtitle>내 취향에 맞는 브랜드 매칭 시스템</Subtitle>
        <RegisterButton onClick={handleRegisterClick}>
          사전등록하기
        </RegisterButton>
      </MainContent>
    </Container>
  );
};

export default LandingPage1;

const Container = styled.div`
  width: 100%;

  height: 820px;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const MainContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  margin-top: 300px;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 25px;
  color: #000000;
  margin: 0;
`;

const BoldText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800; /* extra bold */
  font-size: 25px;
  line-height: 50px;
  color: #000000;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 17px;

  color: #000000;
  margin: 0;
`;

const RegisterButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 20px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }

  margin-top: 23px;
`;
