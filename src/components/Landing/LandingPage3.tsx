import React from 'react';
import styled from 'styled-components';
import SampleJacket from '../../assets/Landing/SampleJacket.svg';

const LandingPage3: React.FC = () => {
  return (
    <Container>
      <TopSection>
        <MatchingTitle>Matching Marketing System</MatchingTitle>
        <MainTitle>
          당신의 스타일을
          <br />
          알아서 매칭해드립니다
        </MainTitle>
      </TopSection>

      <MiddleSection>
        <ImageWrapper>
          <StyledImage src={SampleJacket} alt='Sample Jacket' />

          {/* 작은 흰색 박스와 텍스트들 - absolute로 배치 */}
          <SmallBox style={{ top: '200px', right: '110px' }}>
            <SmallBoxText>당신은 스포티한 스타일입니다</SmallBoxText>
          </SmallBox>

          <SmallBox style={{ top: '250px', right: '135px' }}>
            <SmallBoxText>활동적인 옷을 좋아하네요</SmallBoxText>
          </SmallBox>

          <SmallBox style={{ bottom: '50px', left: '120px' }}>
            <SmallBoxText>블랙&화이트 컬러가 많아요</SmallBoxText>
          </SmallBox>
        </ImageWrapper>
      </MiddleSection>

      <BottomComment>
        멜픽은 이용자와 브랜드를 매칭하는
        <br />
        AI 기반의 서비스 입니다
      </BottomComment>
    </Container>
  );
};

export default LandingPage3;

/* ====================== Styled Components ====================== */

/** 전체 컨테이너 (400×700), 배경색 #FBE5E1 */
const Container = styled.div`
  width: 400px;
  height: 700px;
  margin: 0 auto;
  background: #fbe5e1;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const TopSection = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px; /* 상단 여백 */
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
  margin: 0 0 20px;
`;

const MiddleSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

/** 이미지와 작은 박스들을 감싸는 래퍼 */
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
  display: inline-flex; /* inline-flex로 텍스트 길이에 맞춰 박스가 늘어남 */
  align-items: center;
  justify-content: center;
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 */
  background: #ffffff;
  border-radius: 10px;
  padding: 5px 10px; /* 텍스트와 박스 테두리 간 여백 */
`;

const SmallBoxText = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 23px;
  color: #040404;
`;

const BottomComment = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #040404;

  margin-top: auto; /* 남은 공간을 위로 밀어, 하단 배치 */
  margin-bottom: 30px; /* 하단 여백 */
`;
