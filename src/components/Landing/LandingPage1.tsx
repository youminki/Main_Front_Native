import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LandingBackground from '../../assets/Landing/LandingBackground.svg';

const LandingPage1: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/login');
  };

  return (
    <Container>
      <BackgroundImage />
      <Overlay />

      <MainContent>
        <BigTitle>
          이젠 <BrandSpan>브랜드 옷</BrandSpan>을
          <br />
          사고, 팔고, 빌리는
        </BigTitle>
        <SubTitle>멜픽에서 새롭게 경험하세요</SubTitle>

        <RegisterButton onClick={handleRegisterClick}>
          사전등록하기
        </RegisterButton>
      </MainContent>
    </Container>
  );
};

export default LandingPage1;

/* ====================== Styled Components ====================== */

const Container = styled.div`
  width: 400px;
  height: 600px;
  margin: 70px auto;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-sizing: border-box;

  /* flex 레이아웃: 내부를 하단 배치 */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 세로 하단 정렬 */
  align-items: center;
  padding-bottom: 30px; /* 하단 여백 */
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background: url(${LandingBackground}) no-repeat center/cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  /* 가로 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 큰 제목 */
const BigTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  margin: 0 0 10px 0; /* 아래쪽 약간 여백 */
`;

/* "브랜드 옷" 강조 스팬 */
const BrandSpan = styled.span`
  color: #f6ac36;
`;

/* 작은 문구 */
const SubTitle = styled.h2`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  margin: 0 0 50px 0;
`;

const RegisterButton = styled.button`
  width: 320px;
  height: 56px;
  background: rgba(34, 34, 34, 0.9);
  border: none;
  border-radius: 6px;
  cursor: pointer;

  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 17px;
  line-height: 19px;
  color: #ffffff;

  transition: transform 0.1s;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;
