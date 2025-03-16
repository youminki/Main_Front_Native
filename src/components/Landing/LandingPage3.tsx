// src/components/Landing/LandingPage2.tsx
import React from 'react';
import styled from 'styled-components';

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
      <LandingTitle>
        <YellowHighlight>Matching Marketing System</YellowHighlight> <br />
        <Text>당신의 취향에 꼭 맞는</Text>
        <BoldText>
          컨템포러리 브랜드들이 <br />
          melpik과 함께합니다!
        </BoldText>
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
        <Text>
          멜픽는 <YellowHighlight>이용자와 브랜드를 매칭하는</YellowHighlight>
          <br /> <YellowHighlight>AI 기반의 서비스 </YellowHighlight>입니다
          <br />
        </Text>
        <Text>
          똑똑한 AI가 당신도 몰랐던, 당신만의 스타일을
          <br />
          알아서 매칭해드립니다
          <br />
        </Text>
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

const LandingTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 50px;
  color: #000000;

  margin-top: 100px;
`;

const YellowHighlight = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 40px;
  /* identical to box height, or 200% */
  text-align: center;

  color: #f5ab35;
`;

const Text = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 40px;
  /* or 235% */
  text-align: center;
  margin-top: 10px;

  color: #000000;
`;

const BoldText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 40px;
  /* or 160% */
  text-align: center;

  color: #000000;
`;

const BrandList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
  height: 250px;
  margin-top: 20px;
  margin-bottom: 20px;

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
