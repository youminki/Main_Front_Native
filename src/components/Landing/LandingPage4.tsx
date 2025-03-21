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
        <Hanger src={HangerIcon} alt='Hanger Icon' />
        <IntroText>
          매일매일 새로운 옷장
          <br />옷 잘입는 언니들의 PICK!
        </IntroText>

        <MainTitle>
          매일매일 새로운 옷장
          <br />옷 잘입는 언니들의 PICK!
        </MainTitle>

        {/* 가로 스크롤 영역 */}
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
      </MainContent>
    </Container>
  );
};

export default LandingPage3;

/* ====================== Styled Components ====================== */

/** 전체 컨테이너 (400×700) */
const Container = styled.div`
  width: 400px;
  height: 700px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hanger = styled.img`
  width: 45px;
  height: auto;
  margin-bottom: 20px;
`;

const IntroText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 40px;
  text-align: center;
  color: #000000;
  margin-bottom: 20px;
`;

const MainTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #000000;
  margin: 0 0 20px;
`;

/** 가로 스크롤 리스트 */
const BrandList = styled.div`
  width: 360px; /* 컨테이너 폭보다 살짝 작게 해서 양옆 여백 확보 */
  height: 230px; /* 이미지 높이에 맞게 조정 (200px + 여백 등) */
  overflow-x: auto; /* 가로 스크롤 가능 */
  overflow-y: hidden; /* 세로 스크롤 숨김 */
  cursor: grab;
  margin-bottom: 20px;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* 드래그 중 스타일 (선택사항) */
  &.active {
    cursor: grabbing;
  }

  /* 내부 요소를 가로로 나열 */
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/** 브랜드 아이템 컨테이너 */
const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: transform 0.3s;
  margin-right: 20px; /* 이미지들 간 간격 */
`;

/** 브랜드 이미지 */
const BrandImage = styled.img`
  width: 150px; /* 컨테이너 밖으로 넘치지 않도록 고정 크기 */
  height: 200px; /* 필요에 맞게 조절 */
  object-fit: cover;
  border-radius: 20px;
  opacity: 0.6;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

/** 이미지 중앙에 브랜드명 표시 */
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
