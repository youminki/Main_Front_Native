// LandingPage3.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

// SVG 이미지를 실제 경로에 맞게 import하세요.
import Ion1Src from '../../assets/Landing/LandingPage3_ion1.svg';
import Ion2Src from '../../assets/Landing/LandingPage3_ion2.svg';
import SampleJacket from '../../assets/Landing/SampleJacket.jpg';

const LandingPage3: React.FC = () => {
  return (
    <Container>
      <TopSection>
        <BulletIcon>/</BulletIcon>
        <MatchingTitle>AI Matching System </MatchingTitle>
        <MainTitle>
          당신의 스타일을
          <br />
          알아서 매칭해드립니다
        </MainTitle>
      </TopSection>

      <MiddleSection>
        <ImageWrapper>
          {/* 아이온(ion) SVG 이미지 */}
          <Ion1 src={Ion1Src} alt='아이온1' />
          <Ion2 src={Ion2Src} alt='아이온2' />
          <StyledImage src={SampleJacket} alt='Sample Jacket' />

          {/* 텍스트 박스들을 감싸는 컨테이너 */}
          <SmallBoxesContainer>
            <SmallBox style={{ top: '200px', right: '110px' }}>
              <SmallBoxText1>당신은 스포티한 스타일입니다</SmallBoxText1>
            </SmallBox>
            <SmallBox style={{ top: '245px', right: '135px' }}>
              <SmallBoxText2>활동적인 옷을 좋아하네요</SmallBoxText2>
            </SmallBox>
            <SmallBox style={{ bottom: '50px', left: '120px' }}>
              <SmallBoxText3>블랙&화이트 컬러가 많아요</SmallBoxText3>
            </SmallBox>
          </SmallBoxesContainer>
        </ImageWrapper>
      </MiddleSection>

      <BottomComment>
        멜픽은 이용자와 브랜드 제품을
        <br />
        분석하는 AI 기반 매칭 서비스 입니다.
      </BottomComment>
    </Container>
  );
};

export default LandingPage3;

/* ====================== Styled Components ====================== */

/** 전체 컨테이너 (400×700), 배경색 #FBE5E1 */
const Container = styled.div`
  width: 400px;
  height: 760px;
  margin: 0 auto;
  background: #fbe5e1;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const BulletIcon = styled.div`
  font-size: 35px;
  margin-bottom: 10px;
  color: #fff;
  transform: rotate(10deg);
`;

const TopSection = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
`;

const MatchingTitle = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
  color: #f5ab35;
  margin-bottom: 10px;
`;

const MainTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #000000;
`;

const MiddleSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

/** 이미지와 텍스트 박스들을 감싸는 래퍼 */
const ImageWrapper = styled.div`
  position: relative;
  width: 228px;
  height: 400px;
  background: #ececec;
  border: 5px solid #ffffff;
  border-radius: 20px;
`;

/** 실제 옷 이미지 */
const StyledImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

/**
 * 작은 흰색 박스 (absolute 위치)
 * - 텍스트 길이에 맞춰 자동 크기
 * - 한 줄 표시를 위해 white-space: nowrap
 */
const SmallBox = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background: #ffffff;
  border-radius: 10px;
  padding: 5px 10px;
`;

/** 하단 코멘트 */
const BottomComment = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #040404;
  margin-top: auto;
  margin-bottom: 43px;
`;

/* ====================== Ion(아이온) 이미지 애니메이션 ====================== */
const fadeInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Ion1 = styled.img`
  position: absolute;
  top: 30px;
  left: -50px;
  width: 47px;
  height: 36px;
  animation: ${fadeInLeft} 0.8s ease-out forwards;
`;

const Ion2 = styled.img`
  position: absolute;
  bottom: 230px;
  right: -35px;
  width: 47px;
  height: 36px;
  z-index: 1;
  animation: ${fadeInRight} 0.8s ease-out 0.2s forwards;
`;

/* 전체 애니메이션 주기: 8초 */
const cycleDuration = '8s';

/* ---------- 커서 깜빡임 애니메이션 ---------- */
const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: #040404; }
`;

/* ---------- 텍스트1 애니메이션 (0~25% typing, 그 후 계속 표시) ---------- */
const text1Anim = keyframes`
  0% { width: 0; }
  25% { width: 100%; }
  100% { width: 100%; }
`;

/* ---------- 텍스트2 애니메이션 (0~25% hidden, 25~50% typing, 그 후 계속 표시) ---------- */
const text2Anim = keyframes`
  0%, 25% { width: 0; }
  50% { width: 100%; }
  100% { width: 100%; }
`;

/* ---------- 텍스트3 애니메이션 (0~50% hidden, 50~75% typing, 그 후 계속 표시) ---------- */
const text3Anim = keyframes`
  0%, 50% { width: 0; }
  75% { width: 100%; }
  100% { width: 100%; }
`;

/* ---------- 각 텍스트 styled component (타이핑 효과에 steps 함수 적용) ---------- */
const SmallBoxText1 = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 23px;
  color: #040404;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #040404;
  animation:
    ${text1Anim} ${cycleDuration} steps(30, end) infinite,
    ${blinkCaret} 0.75s step-end infinite;
`;

const SmallBoxText2 = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 23px;
  color: #040404;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #040404;
  animation:
    ${text2Anim} ${cycleDuration} steps(30, end) infinite,
    ${blinkCaret} 0.75s step-end infinite;
`;

const SmallBoxText3 = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 23px;
  color: #040404;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #040404;
  animation:
    ${text3Anim} ${cycleDuration} steps(30, end) infinite,
    ${blinkCaret} 0.75s step-end infinite;
`;

/* ---------- 텍스트 박스들을 감싸는 컨테이너 ---------- */
const SmallBoxesContainer = styled.div`
  position: absolute;
  inset: 0;
`;
