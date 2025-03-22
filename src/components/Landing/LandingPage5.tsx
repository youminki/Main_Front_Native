import React from 'react';
import styled from 'styled-components';

// 아이콘/이미지 (실제 경로/파일명에 맞게 import)
import CheckButtonIcon from '../../assets/Landing/CheckButton.svg';
import HeaderButtonIcon from '../../assets/Landing/HeaderButton.svg';
import SampleImage from '../../assets/Landing/SampleImage.svg';
import ShareButtonIcon from '../../assets/Landing/ShareButton.svg';

const LandingPage5: React.FC = () => {
  return (
    <Container>
      <TopTexts>
        <SmallTitle>오직 나만의, 나를 위한 상품</SmallTitle>
        <BigTitle>
          나만의 스타일을
          <br />
          손쉽게 브랜딩 해보세요
        </BigTitle>
      </TopTexts>

      <CardWrapper>
        <CardBox>
          {/* 이미지 영역 */}
          <CardImage src={SampleImage} alt='Sample' />

          {/* 하단 아이콘 영역 */}
          <IconBar>
            <IconGroup>
              <ShareButton src={ShareButtonIcon} alt='Share Button' />
              <HeaderButton src={HeaderButtonIcon} alt='Header Button' />
            </IconGroup>
          </IconBar>
        </CardBox>
      </CardWrapper>

      <BulletList>
        <BulletItem>
          <CheckIcon src={CheckButtonIcon} alt='Check' />
          <BulletText>누구라도 판매를 시작할 수 있어요</BulletText>
        </BulletItem>
        <BulletItem>
          <CheckIcon src={CheckButtonIcon} alt='Check' />
          <BulletText>프리미엄 브랜드의 셀러가 되어보세요</BulletText>
        </BulletItem>
        <BulletItem>
          <CheckIcon src={CheckButtonIcon} alt='Check' />
          <BulletText>나만의 스타일로 판매 채널을 꾸며보세요</BulletText>
        </BulletItem>
        <BulletItem>
          <CheckIcon src={CheckButtonIcon} alt='Check' />
          <BulletText>판매 스케줄을 간편하게 관리해 보세요</BulletText>
        </BulletItem>
        <BulletItem>
          <CheckIcon src={CheckButtonIcon} alt='Check' />
          <BulletText>매출과 수익을 언제든 확인하세요</BulletText>
        </BulletItem>
      </BulletList>
    </Container>
  );
};

export default LandingPage5;

/* ====================== Styled Components ====================== */

const Container = styled.div`
  width: 400px;
  height: 700px;
  margin: 0 auto;
  background: #fffbf5;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopTexts = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const SmallTitle = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 40px;
  color: #000;
  margin-bottom: 8px;
`;

const BigTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 23px;
  line-height: 30px;
  color: #000;
  margin: 0;
`;

/**
 * CardWrapper:
 * - 가운데 정렬, 카드 하나를 세로로 배치
 */
const CardWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: 42px;
`;

/**
 * CardBox:
 *  - 인스타그램 카드처럼 상단에는 이미지, 하단에는 아이콘이 오는 형태
 */
const CardBox = styled.div`
  width: 320px;
  /* 세로 길이는 컨텐츠에 따라 유동적으로 결정 */
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.17);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  position: relative;
`;

/**
 * CardImage:
 *  - 카드 폭 전체를 사용해 이미지 표시
 *  - 세로 비율은 이미지 자체 비율에 맞게 표시
 */
const CardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-top: 30px;
`;

/**
 * IconBar:
 *  - 이미지 아래쪽(카드 하단)에 아이콘들이 놓일 영역
 *  - 인스타그램 하단의 좋아요/공유 아이콘 부분과 유사
 */
const IconBar = styled.div`
  width: 100%;
  padding: 10px 16px;
  box-sizing: border-box;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

/**
 * IconGroup:
 *  - 아이콘들이 가로로 나란히 배치되는 컨테이너
 */
const IconGroup = styled.div`
  display: flex;
  gap: 10px;
`;

/** 공유 버튼 아이콘 */
const ShareButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

/** 하트(좋아요) 버튼 아이콘 */
const HeaderButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 80%;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const CheckIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

const BulletText = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #000;
`;
