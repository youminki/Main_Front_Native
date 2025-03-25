import React from 'react';
import styled from 'styled-components';

const LandingPage2: React.FC = () => {
  return (
    <Container>
      {/* 상단 텍스트 영역 */}
      <TopTextWrapper>
        {/* 아이콘 이미지 (Bullet) */}
        <BulletIcon>/</BulletIcon>

        <IntroLabel>멜픽 서비스를 소개합니다</IntroLabel>
        <MainTitle>
          대여와 구매, 판매
          <span className='blackText'>
            까지 <br /> 모두 멜픽에서 한 번에!
          </span>
        </MainTitle>
        <SubTitle>원하는 브랜드로 다양한 경험을 즐겨보세요</SubTitle>
      </TopTextWrapper>

      {/* 기능(대여/구매/판매) 영역 */}
      <FeaturesWrapper>
        {/* 첫 번째 박스 (대여) */}
        <FeatureBox
          bgColor='#FF8738'
          textColor='#FFFFFF'
          borderRadius='20px 0 0 0'
          style={{ marginLeft: 0 }} // 기본 위치
        >
          <Circle borderColor='#E66008'>
            <CircleText>대여</CircleText>
          </Circle>
          <BoxText>
            당신의 <span className='highlight'>스타일을 AI가 분석</span>하여
            <br />
            취향저격 스타일을 추천해드려요
          </BoxText>
        </FeatureBox>

        {/* 첫 번째 '+' 기호 (절대 위치) */}
        <PlusSign1 style={{ top: '100px' }}>+</PlusSign1>

        {/* 두 번째 박스 (구매) - margin-left: 10px */}
        <FeatureBox
          bgColor='#FFFFFF'
          textColor='#000000'
          borderRadius='0'
          border='1px solid #DDDDDD'
          style={{ marginLeft: '15px' }}
        >
          <Circle borderColor='#EEEEEE'>
            <CircleText>구매</CircleText>
          </Circle>
          <BoxText>
            브랜드를 다양하게 즐긴 후
            <br />
            맘에 드는 제품을 <span className='get-highlight'>Get</span> 해보세요
          </BoxText>
        </FeatureBox>

        {/* 두 번째 '+' 기호 (절대 위치) */}
        <PlusSign2 style={{ top: '220px' }}>+</PlusSign2>

        {/* 세 번째 박스 (판매) */}
        <FeatureBox
          bgColor='#FFD238'
          textColor='#000000'
          borderRadius='0 0 20px 0'
          style={{ marginLeft: 0 }} // 다시 기본 위치
        >
          <Circle borderColor='#F1BB02'>
            <CircleText>판매</CircleText>
          </Circle>
          <BoxText>
            나만의 스타일을 <span className='sns-highlight'>내 SNS 채널</span>에
            <br />
            브랜딩 하고 판매 해보세요
          </BoxText>
        </FeatureBox>
      </FeaturesWrapper>
    </Container>
  );
};

export default LandingPage2;

/* ====================== Styled Components ====================== */

/** 전체 컨테이너 */
const Container = styled.div`
  min-height: 700px; /* 내용이 늘어나면 자동 확장 */
  background: #ffffff;
  border-radius: 10px;
  margin: 0 auto; /* 수평 중앙 정렬 */
  box-sizing: border-box;
  font-family: 'NanumSquare Neo OTF', sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

/** 상단 텍스트 래퍼 */
const TopTextWrapper = styled.div`
  /* 중앙 정렬을 위해 flex 사용 */
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
  margin-bottom: 30px;
`;

const BulletIcon = styled.div`
  font-size: 35px;
  margin-top: 22px;
  margin-bottom: 22px;
  transform: rotate(10deg); /* 왼쪽으로 10도 정도 회전 */
`;

/** "멜픽 서비스를 소개합니다" */
const IntroLabel = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  margin-bottom: 10px;
`;

/** "대여와 구매, 판매까지 모두 멜픽에서 한 번에!" */
const MainTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px; /* 또는 125% */
  text-align: center;
  color: #ff8738;
  margin: 0;
  margin-bottom: 10px;

  .blackText {
    color: #000;
  }
`;

/** "원하는 브랜드로 다양한 경험을 즐겨보세요" */
const SubTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px; /* 또는 214% */
  color: #cccccc;
`;

/** 기능(대여/구매/판매)들을 묶는 래퍼 */
const FeaturesWrapper = styled.div`
  position: relative; /* PlusSign들이 절대 위치로 배치될 부모 */

  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
`;

/** 각 기능 박스 */
const FeatureBox = styled.div<{
  bgColor: string;
  textColor: string;
  borderRadius: string;
  border?: string;
}>`
  height: 120px; /* 고정 높이 */

  background: ${({ bgColor }) => bgColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: ${({ border }) => border || 'none'};
  margin: 0 auto; /* 중앙 정렬 */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  color: ${({ textColor }) => textColor};
`;

/** 대여/구매/판매 동그라미 아이콘 */
const Circle = styled.div<{ borderColor: string }>`
  width: 59px;
  height: 59px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid ${({ borderColor }) => borderColor};

  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

/** 동그라미 안의 "대여/구매/판매" 텍스트 */
const CircleText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
`;

/** 박스 안의 상세 텍스트 */
const BoxText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  /* 강조 텍스트들 */
  .highlight {
    font-weight: 800; /* "스타일을 AI가 분석" 부분 */
  }
  .get-highlight {
    font-weight: 900; /* "Get" 부분 */
    color: #ff8738;
  }
  .sns-highlight {
    font-weight: 800; /* "내 SNS 채널" 부분 */
  }
`;

/** 절대 위치로 중앙 정렬된 '+' 기호 (대여 박스용) */
const PlusSign1 = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-100%);
  width: 30px;
  height: 30px;
  background: #ff8738;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  z-index: 10;
`;

/** 절대 위치로 중앙 정렬된 '+' 기호 (구매 박스용) */
const PlusSign2 = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #ff8738;
  z-index: 10;
`;
