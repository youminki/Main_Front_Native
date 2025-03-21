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

  // 드래그 스크롤 관련 상태
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
        <SmallTitle>당신의 취향에 꼭 맞는</SmallTitle>
        <LargeTitle>
          컨템포러리 브랜드들이
          <br />
          melpik과 함께 합니다
        </LargeTitle>

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

/** 400×700 박스, 상단 정렬 */
const Container = styled.div`
  width: 400px;
  height: 700px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;

  /* 세로 방향으로 쌓고, 위쪽 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 상단 정렬 */
`;

const MainContent = styled.div`
  /* 내부 콘텐츠 래퍼 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px; /* 상단 여백 */
`;

const Hanger = styled.img`
  width: 45px;
  height: auto;
  margin-bottom: 20px;
  margin-top: 30px;
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
  margin: 0 0 30px;
`;

/** 가로 스크롤 리스트 */
const BrandList = styled.div`
  width: 100%; /* 컨테이너보다 약간 작게 */
  height: 300px;
  overflow-x: auto;
  overflow-y: hidden;
  cursor: grab;
  margin-bottom: 20px;
  margin-top: 49px;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨김 */
  }

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
  margin-right: 20px;
`;

/** 브랜드 이미지 */
const BrandImage = styled.img`
  width: 240px;
  height: 300px;
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
