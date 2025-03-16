// src/components/Landing/LandingPage1.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LandingBackground from '../../assets/Landing/LandingBackground.svg';
import BoxBackgroundImg from '../../assets/Landing/BoxBackgroundImg.png';
import SelectIcon from '../../assets/Landing/SelectIcon.svg';
import HeartIcon from '../../assets/Landing/HeartIcon.svg';
import HeartClickIcon from '../../assets/Landing/Heart_Click.png';

const LandingPage1: React.FC = () => {
  const navigate = useNavigate();
  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);

  const handleHeartClick = (): void => {
    setIsHeartClicked((prev) => !prev);
  };

  return (
    <Container>
      <BackgroundImage src={LandingBackground} alt="Landing Background" />

      <MainContent>
        <Title>
          오직 나만의! 나를 위한! <br />
          <HighlightText>패션 브랜드 대여 플랫폼</HighlightText>
        </Title>
        <Box>
          <BoxImage src={BoxBackgroundImg} alt="Box Background" />
          <ButtonContainer>
            <StartButton onClick={() => navigate('/LandingDetail')}>
              지금 시작하기
            </StartButton>
            <IconContainer>
              <StyledIcon src={SelectIcon} alt="Select Icon" />
              <HeartIconWrapper onClick={handleHeartClick}>
                <StyledIcon src={HeartIcon} alt="Heart Icon" />
                {isHeartClicked && (
                  <OverlayIcon src={HeartClickIcon} alt="Heart Click Icon" />
                )}
              </HeartIconWrapper>
            </IconContainer>
          </ButtonContainer>
        </Box>
        <Subtitle>아직도 체험단, 기자단하시나요?</Subtitle>
        <Description>
          melpik과 함께 수익과 팔로워 <br />
          모두 GET하는 인플루언서로 성장하세요
        </Description>
      </MainContent>
    </Container>
  );
};

export default LandingPage1;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
  padding-top: 80px;
  background-color: transparent;
  min-height: 857px;
  max-width: 600px;
  margin: 0 auto;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: blur(2px);
`;

const MainContent = styled.div`
  text-align: center;
  max-width: 50rem;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 25px;
  line-height: 50px;
  color: #000000;
  margin-top: 28px;
`;

const HighlightText = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 30px;
  line-height: 50px;
  color: #000000;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 405px;
  border-radius: 30px;
  margin-top: 16px;
`;

const BoxImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  z-index: -1;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 18px;
  width: 100%;
  gap: 20px;
`;

const StartButton = styled.button`
  width: 175px;
  height: 45px;
  background-color: #f6ae24;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d9981f;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeartIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 8px;
  cursor: pointer;
`;

const StyledIcon = styled.img`
  width: 27px;
  height: 24px;
`;

const OverlayIcon = styled.img`
  position: absolute;
  width: 61px;
  height: 75px;
  pointer-events: none;
  top: -82px;
  right: -15px;
`;

const Subtitle = styled.h2`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
  margin-top: 25px;
`;

const Description = styled.p`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  color: #000000;
  margin-top: 11px;
`;
