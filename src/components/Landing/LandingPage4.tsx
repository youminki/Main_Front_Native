import React from 'react';
import styled from 'styled-components';
import page4backgournd from '../../assets/Landing/page4backgournd.png';
import LandingCheckIcon from '../../assets/Landing/LandingCheckIcon.svg';

const LandingPage4: React.FC = () => {
  return (
    <Container>
      <BackgroundImage src={page4backgournd} alt='Landing Background' />

      {/* 텍스트 영역 */}
      <ContentWrapper>
        <Title>오직 나만의, 나를 위한 상품</Title>
        <Text>
          이제 일일이 찾지 마세요.
          <br /> 브랜드는 <BoldText>멜픽이 PICK! 해줄게요</BoldText>
        </Text>

        <BulletList>
          <BulletItem>
            <CheckIcon src={LandingCheckIcon} alt='Check Icon' />
            <ItemText>누구라도 판매를 시작할 수 있어요</ItemText>
          </BulletItem>
          <BulletItem>
            <CheckIcon src={LandingCheckIcon} alt='Check Icon' />
            <ItemText>프리미엄 브랜드의 셀러가 되어보세요</ItemText>
          </BulletItem>
          <BulletItem>
            <CheckIcon src={LandingCheckIcon} alt='Check Icon' />
            <ItemText>나만의 스타일로 판매 채널을 꾸며보세요</ItemText>
          </BulletItem>
          <BulletItem>
            <CheckIcon src={LandingCheckIcon} alt='Check Icon' />
            <ItemText>판매 스케줄을 간편하게 관리해 보세요</ItemText>
          </BulletItem>
          <BulletItem>
            <CheckIcon src={LandingCheckIcon} alt='Check Icon' />
            <ItemText>매출과 수익을 언제든 확인하세요</ItemText>
          </BulletItem>
        </BulletList>
      </ContentWrapper>
    </Container>
  );
};

export default LandingPage4;

const Container = styled.div`
  position: relative;
  min-height: 1100px;
  margin: 0 auto;
  background: #fcf6e6;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  border-radius: 20px;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 30px;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 34px;
  color: #000000;
  margin: 0 0 14px;
`;

/* ---------- 체크 아이콘이 포함된 리스트 ---------- */
const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 31px;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

const CheckIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ItemText = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #000000;
`;

const Text = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  text-align: center;
  margin-top: 10px;
  color: #000000;
`;

// BoldText를 인라인 요소인 span으로 변경
const BoldText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 30px;
  text-align: center;
  color: #000000;
`;
