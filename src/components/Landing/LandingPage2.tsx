import React from 'react';
import styled from 'styled-components';

const LandingPage2: React.FC = () => {
  return (
    <Container>
      {/* 상단 텍스트 */}
      <TopText>
        <Intro>멜픽 서비스를 소개합니다</Intro>
        <MainTitle>
          구매와 판매, 대여<BlackSpan>까지</BlackSpan> <br />
          <BlackSpan>모두 멜픽에서 한 번에!</BlackSpan>
        </MainTitle>
      </TopText>

      {/* 기능 박스들 */}
      <FeatureBox>
        <FeatureHeading>대여</FeatureHeading>
        <FeatureSubText>AI를 활용한 분석/추천</FeatureSubText>
      </FeatureBox>
      <FeatureBox>
        <FeatureHeading>구매</FeatureHeading>
        <FeatureSubText>브랜드를 다양하게 즐긴다</FeatureSubText>
      </FeatureBox>
      <FeatureBox>
        <FeatureHeading>판매</FeatureHeading>
        <FeatureSubText>SNS의 개인 브랜딩화</FeatureSubText>
      </FeatureBox>

      {/* 하단 안내 문구 */}
      <BottomComment>
        다양한 브랜드를 빌리고, 구매하고,
        <br />
        나의 소셜미디어에서 판매까지 해보세요
      </BottomComment>
    </Container>
  );
};

export default LandingPage2;

/* ====================== Styled Components ====================== */

/** 400×700 박스 (absolute 대신 display로 배치) */
const Container = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 700px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
`;

/** 상단 텍스트 래퍼 */
const TopText = styled.div`
  text-align: center;
  margin-bottom: 52px;
`;

/** "멜픽 서비스를 소개합니다" */
const Intro = styled.h2`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 40px;
  color: #000000;
  margin: 0 0 10px;
`;

/** "구매와 판매, 대여까지" + "모두 멜픽에서 한 번에!(검정색)" */
const MainTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #fc7f61; /* "구매와 판매, 대여까지"는 주황색 */
  margin: 0;
`;

/** "모두 멜픽에서 한 번에!"만 검정색 */
const BlackSpan = styled.span`
  color: #000000;
`;

/** 각 기능 박스 (대여/구매/판매) */
const FeatureBox = styled.div`
  box-sizing: border-box;
  width: 320px;
  height: 100px;
  background: #fffbf5;
  border: 0.5px solid #dddddd;
  border-radius: 20px;

  /* 가로(row) 정렬 */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding: 0 44px;
  margin-bottom: 20px;
`;

/** "대여/구매/판매" */
const FeatureHeading = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
  margin-right: 20px; /* 옆으로 간격 */
`;

/** 서브텍스트 ("AI를 활용한 분석/추천" 등) */
const FeatureSubText = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
`;

/** 하단 안내 문구 */
const BottomComment = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #000000;
  margin-top: auto; /* 남는 공간을 위로 밀어 -> 하단 배치 */
`;
