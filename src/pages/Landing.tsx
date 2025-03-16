import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 430px;
  margin: 0 auto; /* 화면 가운데 정렬 (필요시) */
  background: #ffffff;
  /* height: 5500px; 원본 명세에 있었지만, 자연스러운 흐름을 위해 고정 높이는 제거 */
`;

/* ===============================
   1) 첫 번째 영역 (배경 이미지 + 문구)
   =============================== */
const SectionOne = styled.section`
  /* 영역을 블록으로 배치 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* 높이는 원본 스펙(784px) 정도, 필요시 조정 가능 */
  height: 784px;
  background: #d9d9d9;
  position: relative; /* 필요하다면 자식 요소 배치용 */
  overflow: hidden; /* 배경 이미지가 넘칠 경우 숨김 처리 */
`;

const BgImage = styled.div`
  /* 배경 이미지를 깔기 위한 래퍼 */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1077.46px;
  height: 1616px;
  background: url('7X5A9136.jpg') no-repeat center/cover;
  /* 원본 명세에서 left: -324px; top: -241px; 로 되어 있었으나,
     일반 흐름에서는 가운데 정렬을 위해 transform 사용 */
`;

const Title = styled.h1`
  margin-top: 100px; /* 임의로 띄운 값 (원본 top: 501px) */
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 25px;
  line-height: 50px;
  color: #000;
`;

const Subtitle = styled.h2`
  margin-top: 20px; /* 임의 여백 */
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  color: #000;
`;

const PreRegisterButton = styled.button`
  margin-top: 40px;
  width: 120px;
  height: 40px;
  background: #ffffff;
  border-radius: 20px;
  border: none;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 15px;
  color: #000;
  cursor: pointer;
`;

/* ===============================
   2) 두 번째 영역 (FCF6E6 배경)
   =============================== */
const SectionTwo = styled.section`
  margin-top: 20px; /* 섹션 간격 */
  background: #fcf6e6;
  border-radius: 20px;
  padding: 40px 20px; /* 내부 여백 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 옷걸이 박스(예시) */
const Hanger = styled.div`
  width: 45px;
  height: 45px; /* 실제 옷걸이 이미지가 없으므로 임의 */
  background: #040000;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const PickText = styled.div`
  max-width: 233px;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 40px;
  color: #000;
`;

const BrandText = styled.div`
  margin-top: 30px;
  max-width: 287px;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  color: #000;
`;

/* ===============================
   3) 세 번째 영역 (Matching Marketing System)
   =============================== */
const SectionThree = styled.section`
  margin-top: 40px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MatchingTitle = styled.h2`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 20px;
  line-height: 40px;
  color: #f5ab35;
  margin-bottom: 20px;
  text-align: center;
`;

const MatchingSubText = styled.div`
  max-width: 244px;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 40px;
  color: #000;
`;

const MatchingAiText = styled.div`
  margin-top: 40px;
  max-width: 332px;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  color: #000;
`;

const MatchingAiText2 = styled.div`
  margin-top: 20px;
  max-width: 255px;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  color: #000;
`;

/* ===============================
   4) 네 번째 영역 (F5F5F5 배경, 7X5A9526.jpg)
   =============================== */
const SectionFour = styled.section`
  margin-top: 40px;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 원본: height: 1100px; */
`;

const BgImage2 = styled.div`
  margin-top: 20px;
  width: 2204px;
  height: 2047px;
  background: url('7X5A9526.jpg') no-repeat center/cover;
  /* 실제로는 너무 큰 이미지이므로, 프로젝트에 맞게 조정 */
`;

const Title4 = styled.h3`
  margin-top: 30px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #000000;
`;

const SubText4 = styled.div`
  margin-top: 20px;
  max-width: 238px;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  color: #000000;
`;

/* ===============================
   5) 다섯 번째 영역 (판매 관련 안내)
   =============================== */
const SectionFive = styled.section`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SellTitle = styled.h3`
  margin-top: 20px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #000000;
`;

const SellDesc = styled.div`
  margin-top: 20px;
  max-width: 243px;
  text-align: center;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 30px;
  color: #000000;
`;

const Image12 = styled.div`
  margin-top: 30px;
  width: 260px;
  height: 550px;
  background: url('image.png') no-repeat center/cover;
  border-radius: 10px;
`;

/* ===============================
   6) 여섯 번째 영역 (하단부, #F5AB35 배경)
   =============================== */
const SectionSix = styled.section`
  margin-top: 40px;
  background: #f5ab35;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionSixTitle = styled.div`
  margin-top: 10px;
  width: 200px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 25px;
  text-align: center;
  color: #ffffff;
  opacity: 0.9;
`;

const SectionSixText = styled.div`
  margin-top: 10px;
  width: 333px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 25px;
  text-align: center;
  color: #ffffff;
  opacity: 0.9;
`;

const StartButton = styled.button`
  margin-top: 20px;
  width: 250px;
  height: 40px;
  background: #ffffff;
  border-radius: 100px;
  border: none;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 15px;
  text-align: center;
  color: #000000;
  cursor: pointer;
`;

/* ===============================
   하단/Footer
   =============================== */
const Footer = styled.footer`
  margin-top: 40px;
  width: 100%;
  background: #ffffff;
  border-top: 0.5px solid #d9d9d9;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
`;

const FooterInfo = styled.div`
  font-family: 'Noto Sans';
  font-weight: 700;
  font-size: 10px;
  line-height: 18px;
  color: #000000;
  margin: 4px 0;
`;

const Landing: React.FC = () => {
  return (
    <Container>
      {/* 1) 첫 번째 영역 */}
      <SectionOne>
        <BgImage />
        <Title>멜픽과 함께 빌리고, 사고, 판매하세요</Title>
        <Subtitle>내 취향에 맞는 브랜드 매칭 시스템</Subtitle>
        <PreRegisterButton>사전등록하기</PreRegisterButton>
      </SectionOne>

      {/* 2) 두 번째 영역 */}
      <SectionTwo>
        <Hanger />
        <PickText>매일매일 새로운 옷장 옷 잘입는 언니들의 PICK!</PickText>
        <BrandText>
          다양한 브랜드를 빌리고, 구매하고, 나의 소셜미디어에서 판매까지
          해보세요
        </BrandText>
      </SectionTwo>

      {/* 3) 세 번째 영역 */}
      <SectionThree>
        <MatchingTitle>Matching Marketing System</MatchingTitle>
        <MatchingSubText>
          매일매일 새로운 옷장 옷 잘입는 언니들의 PICK!
        </MatchingSubText>
        <MatchingAiText>
          똑똑한 AI가 당신도 몰랐던, 당신만의 스타일을 알아서 매칭해드립니다
        </MatchingAiText>
        <MatchingAiText2>
          멜픽는 이용자와 브랜드를 매칭하는 AI 기반의 서비스 입니다
        </MatchingAiText2>
      </SectionThree>

      {/* 4) 네 번째 영역 */}
      <SectionFour>
        <Title4>오직 나만의, 나를 위한 상품</Title4>
        <SubText4>
          이제 일일히 찾지 마세요 브랜드는 멜픽이 PICK! 해줄게요
        </SubText4>
        {/* 예시로만 배경 div 추가 */}
        <BgImage2 />
      </SectionFour>

      {/* 5) 다섯 번째 영역 */}
      <SectionFive>
        <SellTitle>멜픽앱으로 편하게 관리하세요!</SellTitle>
        <SellDesc>
          판매에 관련된 모든 진행사항을 앱에서 편리하게 관리할 수 있어요
        </SellDesc>
        <Image12 />
      </SectionFive>

      {/* 6) 여섯 번째 영역 */}
      <SectionSix>
        <SectionSixTitle>
          매일매일 새로운 옷장 옷 잘입는 언니들의 PICK!
        </SectionSixTitle>
        <SectionSixText>
          매일매일 새로운 옷장 옷 잘입는 언니들의 PICK!
        </SectionSixText>
        <StartButton>melpik 시작하기</StartButton>
      </SectionSix>

      {/* 하단 Footer */}
      <Footer>
        <FooterInfo>
          상호 멜픽(melpik) 소재지 서울시 금천구 디지털로9길 41, 1008호
          (삼성IT해링턴타워)
        </FooterInfo>
        <FooterInfo>대표 황유민 | 개인정보책임자 장용호</FooterInfo>
      </Footer>
    </Container>
  );
};

export default Landing;
