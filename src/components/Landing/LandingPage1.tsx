// src/components/Landing/LandingPage1.tsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LandingBackground from '../../assets/Landing/LandingBackground.jpg';
import LeftLabel from '../../assets/Landing/LeftLabel.svg';

const LandingPage1: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <Wrapper>
      {/* LeftLabelImage는 기존 절대 배치 유지 */}
      <LeftLabelImage src={LeftLabel} alt='Left Label' />

      <Container>
        <ContentBox>
          <BigTitle>
            이젠 <BrandSpan>브랜드 옷</BrandSpan>을
            <br />
            사고, 팔고, 빌리는
          </BigTitle>
          <SubTitle>멜픽에서 새롭게 경험하세요</SubTitle>
          <RegisterButton onClick={handleRegisterClick}>
            사전등록하기
          </RegisterButton>
        </ContentBox>
      </Container>
    </Wrapper>
  );
};

export default LandingPage1;

/* ====================== Styled Components ====================== */

const Wrapper = styled.div`
  position: relative;

  height: 500px;
  margin: 40px auto;
  overflow: visible;
`;

const LeftLabelImage = styled.img`
  position: absolute;
  top: -35px;
  left: -35px;
  z-index: 2;
  width: auto;
  height: auto;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  background: url(${LandingBackground}) no-repeat center/cover;

  /* 변경된 flex 설정: 내부 콘텐츠를 하단 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const ContentBox = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const BigTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 30px;
  line-height: 33px;
  text-align: center;
  color: #ffffff;
  margin: 0 0 20px 0;
`;

const BrandSpan = styled.span`
  color: #f6ac36;
`;

const SubTitle = styled.h2`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
  margin: 0 0 47px 0;
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
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
  transition: transform 0.1s;

  margin-bottom: 60px;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;
