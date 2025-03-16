// src/components/Landing/LandingPage2.tsx
import React from 'react';
import styled from 'styled-components';
import HangerIcon from '../../assets/Landing/hangerIcon.svg';
import page2Icon from '../../assets/Landing/page2Icon.svg';

const LandingPage2: React.FC = () => {
  return (
    <Container>
      <Hanger src={HangerIcon} alt='Hanger Icon' />
      {/* 상단 텍스트 영역 */}
      <TopTextWrapper>
        <ServiceIntro>멜픽 서비스를 소개합니다</ServiceIntro>
        <MainTitle>
          대여와 구매, 판매까지 모두
          <br />
          멜픽에서 한 번에!
        </MainTitle>
      </TopTextWrapper>
      <Image src={page2Icon} alt='Landing Background' />
      {/* 하단 텍스트 영역 */}
      <BottomComment>
        {/* 줄바꿈 적용: "다양한 브랜드를 빌리고, 구매하고," + "나의 소셜미디어에서..." */}
        다양한 브랜드를 빌리고, 구매하고,
        <br />
        나의 소셜미디어에서 판매까지 해보세요
      </BottomComment>
    </Container>
  );
};

export default LandingPage2;

/* ---------- 전체 컨테이너 ---------- */
const Container = styled.div`
  position: relative;

  min-height: 1000px; /* 세로 공간 확보 */
  margin: 0 auto;
  background: #fcf6e6;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px; /* 상단/좌우 여백 */
`;

/* ---------- 상단 텍스트 ---------- */
const TopTextWrapper = styled.div`
  position: relative;
  z-index: 1; /* 노란 배경 위로 나오도록 */
  text-align: center;
  margin-bottom: 40px;
`;

const ServiceIntro = styled.h2`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #000000;
  margin: 0 0 10px;
`;

const MainTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
  margin: 0;
`;

/* ---------- 하단 문구 ---------- */
const BottomComment = styled.div`
  position: relative;

  z-index: 1; /* 노란 배경 위로 나오도록 */
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 28px;
  text-align: center;
  color: #000000;
`;

const Image = styled.img`
  position: relative;

  width: 256px;
  height: 100%;
  object-fit: cover;
  z-index: 1111;

  margin-bottom: 52px;
`;

const Hanger = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  margin-top: 80px;
`;
