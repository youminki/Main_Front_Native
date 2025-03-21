import React, { useRef } from 'react';
import styled from 'styled-components';

import ZOOCImage from '../../assets/Landing/Zooc.jpg';
import SANDROImage from '../../assets/Landing/Sandro.jpg';
import ITMICHAImage from '../../assets/Landing/ItMichaa.jpg';
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

  const listRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!listRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - listRef.current.offsetLeft;
    scrollLeft.current = listRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !listRef.current) return;
    e.preventDefault();
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = x - startX.current;
    listRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Container>
      <MainContent>
        <LandingTitle>
          <YellowHighlight>Matching Marketing System</YellowHighlight>
          <br />
          <Text>당신의 취향에 꼭 맞는</Text>
          <BoldText>
            컨템포러리 브랜드들이 <br />
            melpik과 함께합니다!
          </BoldText>
        </LandingTitle>
        <BrandList
          ref={listRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {brands.map((brand, idx) => (
            <Brand key={idx}>
              <BrandImage
                src={brand.img}
                alt={`brand-${idx}`}
                onClick={handleImageClick}
                onDragStart={handleDragStart}
              />
              <BrandName>{brand.name}</BrandName>
            </Brand>
          ))}
        </BrandList>
        <Comment>
          <Text>
            멜픽은 <YellowHighlight>이용자와 브랜드를 매칭하는</YellowHighlight>
            <br />
            <YellowHighlight>AI 기반의 서비스 </YellowHighlight>입니다
            <br />
          </Text>
          <Text>
            똑똑한 AI가 당신도 몰랐던, 당신만의 스타일을
            <br />
            알아서 매칭해드립니다
            <br />
          </Text>
        </Comment>
      </MainContent>
    </Container>
  );
};

export default LandingPage3;

/* ====================== Styled Components ====================== */

const Container = styled.div`
  width: 100%;
  height: 100%; /* FadeInWrapper가 600px인 경우 100%로 채움 */
  position: relative;
  overflow: hidden;
  border-radius: 20px;

  /* 배경색 or 이미지 지정 (이 예시는 흰색) */
  background-color: #ffffff;

  /* flex 레이아웃 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const LandingTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  color: #000000;
`;

const YellowHighlight = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: #f5ab35;
`;

const Text = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 17px;
  line-height: 40px;
  text-align: center;
  margin-top: 10px;
  color: #000000;
`;

const BoldText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 25px;
  line-height: 40px;
  text-align: center;
  color: #000000;
`;

const BrandList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
  height: 250px;
  margin: 20px 0;
  overflow-y: hidden;
  cursor: grab;

  &.active {
    cursor: grabbing;
  }

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
  transition: transform 0.3s;
`;

const BrandImage = styled.img`
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 20px;
  opacity: 0.6;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
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
  margin-bottom: 30px;
  color: #000000;
`;
