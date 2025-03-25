import React from 'react';
import styled, { keyframes } from 'styled-components';

import ZOOCImage from '../../assets/Landing/Zooc.jpg';
import SANDROImage from '../../assets/Landing/Sandro.jpg';
import ITMICHAImage from '../../assets/Landing/ItMichaa.jpg';
import CC_Collect from '../../assets/Landing/CC_Collect.jpg';
import DEW_L from '../../assets/Landing/DEW_L.jpg';
import LIME from '../../assets/Landing/LIME.jpg';
import MAJE from '../../assets/Landing/MAJE.jpg';
import MICHAA from '../../assets/Landing/MICHAA.jpg';
import MOJO_S_PHINE from '../../assets/Landing/MOJO_S_PHINE.jpg';
import HangerIcon from '../../assets/Landing/hangerIcon.svg';

const LandingPage3: React.FC = () => {
  const brands = [
    { img: ZOOCImage, name: 'ZOOC' },
    { img: SANDROImage, name: 'SANDRO' },
    { img: ITMICHAImage, name: 'it MICHA' },
    { img: CC_Collect, name: 'CC Collect' },
    { img: DEW_L, name: 'DEW L' },
    { img: LIME, name: 'LIME' },
    { img: MAJE, name: 'MAJE' },
    { img: MICHAA, name: 'MICHAA' },
    { img: MOJO_S_PHINE, name: 'MOJO.S.PHINE' },
  ];

  return (
    <Container>
      <MainContent>
        <Hanger src={HangerIcon} alt='Hanger Icon' />
        <SmallTitle>당신의 취향에 꼭 맞는</SmallTitle>
        <LargeTitle>
          컨템포러리 브랜드들이
          <br />
          <Highlight>멜픽</Highlight>과 함께 합니다
        </LargeTitle>

        {/* 브랜드 리스트는 자동 스크롤 애니메이션 적용 */}
        <BrandList>
          <ScrollingContainer>
            {brands.map((brand, idx) => (
              <Brand key={idx}>
                <BrandImage
                  src={brand.img}
                  alt={`brand-${idx}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDragStart={(e) => e.preventDefault()}
                />
                <BrandName>{brand.name}</BrandName>
              </Brand>
            ))}
            {/* 원활한 무한 스크롤을 위해 복제 */}
            {brands.map((brand, idx) => (
              <Brand key={`clone-${idx}`}>
                <BrandImage
                  src={brand.img}
                  alt={`brand-clone-${idx}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDragStart={(e) => e.preventDefault()}
                />
                <BrandName>{brand.name}</BrandName>
              </Brand>
            ))}
          </ScrollingContainer>
        </BrandList>

        {/* 프리미엄 브랜드 리스트 텍스트 */}
        <PremiumBrandText>Premium Brand List</PremiumBrandText>
      </MainContent>
    </Container>
  );
};

export default LandingPage3;

/* ====================== Styled Components ====================== */

/** 400×700 박스, 상단 정렬 */
const Container = styled.div`
  height: 660px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const Hanger = styled.img`
  width: 45px;
  height: auto;
  margin-bottom: 22px;
`;

const SmallTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 40px;
  text-align: center;
  color: #000000;
  margin-bottom: 10px;
`;

const LargeTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #000000;
  margin: 0 0 40px;
`;

/* 멜픽에 색상 적용 */
const Highlight = styled.span`
  color: #f6ac36;
`;

/** 브랜드 리스트 컨테이너 (자동 스크롤용) */
const BrandList = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
  margin-bottom: 32px;
`;

/** 브랜드 아이템들을 감싸고 오른쪽으로 자동 스크롤하는 컨테이너 */
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const ScrollingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(200%); /* 복제된 콘텐츠를 고려하여 200%로 확장 */
  animation: ${scroll} 10s linear infinite;
`;

/** 브랜드 아이템 컨테이너 */
const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: transform 0.3s;
  margin-right: 20px;
`;

/** 브랜드 이미지 */
const BrandImage = styled.img`
  width: 240px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  transition: opacity 0.3s;
`;

/** 이미지 중앙의 브랜드명 */
const BrandName = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 900;
  font-size: 20px;
  width: 100%;
  text-align: center;
  color: #000000;
`;

/** 프리미엄 브랜드 리스트 텍스트 */
const PremiumBrandText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  color: #000000;
`;
