// src/components/Landing/LandingPage2.tsx
import React from 'react';
import styled from 'styled-components';
import HangerIcon from '../../assets/Landing/hangerIcon.svg';
import ZOOCImage from '../../assets/Landing/ZoocImg.svg';
import SANDROImage from '../../assets/Landing/Sandro.svg';
import ITMICHAImage from '../../assets/Landing/ItMichaa.svg';
import CC_Collect from '../../assets/Landing/CC_Collect.jpg';
import DEW_L from '../../assets/Landing/DEW_L.jpg';
import LIME from '../../assets/Landing/LIME.jpg';
import MAJE from '../../assets/Landing/MAJE.jpg';
import MICHAA from '../../assets/Landing/MICHAA.jpg';
import MOJO_S_PHINE from '../../assets/Landing/MOJO_S_PHINE.jpg';

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
      <ScrollIndicator />
      <Hanger src={HangerIcon} alt='Hanger Icon' />
      <LandingTitle>
        당신의 취향에 꼭 맞는 <br />
        <BrandHighlight>컨템포러리 브랜드들이</BrandHighlight> <br />
        <MelpicHighlight>멜픽과 함께합니다!</MelpicHighlight>
      </LandingTitle>
      <BrandList>
        {brands.map((brand, idx) => (
          <Brand key={idx}>
            <BrandImage src={brand.img} alt={`brand-${idx}`} />
            <BrandName>{brand.name}</BrandName>
          </Brand>
        ))}
      </BrandList>
      <Comment>
        똑똑한 AI가 <br />
        당신도 몰랐던, 당신만의 스타일을 <br />
        매칭해드립니다.
      </Comment>
    </Container>
  );
};

export default LandingPage3;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #ffffff;
  min-height: 900px;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 20px;
`;

const ScrollIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  width: 35px;
  height: 31px;
  margin-top: 35px;
  margin-bottom: 117px;

  &::before {
    content: '↓';
    font-size: 14px;
    color: #767676;
  }
  &::after {
    content: 'scroll';
    font-family: 'Noto Sans', sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #767676;
  }
`;

const Hanger = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 56px;
`;

const LandingTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 50px;
  color: #000000;
`;

const BrandHighlight = styled.span`
  font-weight: 700;
  font-size: 24px;
  color: #f6ae24;
`;

const MelpicHighlight = styled.span`
  color: #f6ae24;
  font-weight: 700;
  font-size: 24px;
`;

const BrandList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
  height: 250px;
  margin-bottom: 90px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  position: relative;
`;

const BrandImage = styled.img`
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 20px;
  opacity: 0.6;
`;

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

const Comment = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  margin-bottom: 161px;
  color: #000000;
`;
