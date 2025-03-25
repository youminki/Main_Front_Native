import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

// 이미지 3장 (실제 경로에 맞춰 import 경로 수정)
import Landing7Img1 from '../../assets/Landing/Landing7Img1.svg';
import Landing7Img2 from '../../assets/Landing/Landing7Img2.svg';
import Landing7Img3 from '../../assets/Landing/Landing7Img3.svg';

const LandingPage7: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const wrapperWidth = scrollRef.current.clientWidth;
    const index = Math.round(scrollLeft / wrapperWidth);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const wrapper = scrollRef.current;
    if (!wrapper) return;

    wrapper.addEventListener('scroll', handleScroll);
    return () => {
      wrapper.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      <Title>멜픽으로 관리하세요!</Title>
      <Subtitle>
        판매에 관련된 모든 진행사항을
        <br />
        서비스 내에서 편리하게 관리할 수 있어요
      </Subtitle>

      {/* 하단 인디케이터 (3개의 점) */}
      <DotGroup>
        <Dot isActive={currentIndex === 0} />
        <Dot isActive={currentIndex === 1} />
        <Dot isActive={currentIndex === 2} />
      </DotGroup>

      {/* 가로 스크롤 래퍼 (하단 정렬) */}
      <PhoneWrapper ref={scrollRef}>
        <Slide>
          <PhoneImage src={Landing7Img1} alt='첫 번째 화면' />
        </Slide>
        <Slide>
          <PhoneImage src={Landing7Img2} alt='두 번째 화면' />
        </Slide>
        <Slide>
          <PhoneImage src={Landing7Img3} alt='세 번째 화면' />
        </Slide>
      </PhoneWrapper>
    </Container>
  );
};

export default LandingPage7;

/* ====================== Styled Components ====================== */

const Container = styled.div`
  height: 640px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  box-sizing: border-box;

  /* 수직 레이아웃: 위 → 아래 */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 상단에 여백을 주어 텍스트가 너무 붙지 않도록 */
  padding-top: 30px;
`;

/** 상단 큰 제목 (20px) */
const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: #000000;
  margin: 0;
  margin-bottom: 12px;
`;

/** 부제목 (17px) */
const Subtitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

/** 인디케이터 점들을 모아두는 래퍼 */
const DotGroup = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

/** 인디케이터 점(Dot) */
const Dot = styled.div<{ isActive: boolean }>`
  width: ${({ isActive }) => (isActive ? '20px' : '10px')};
  height: 10px;
  border-radius: 100px;
  background: ${({ isActive }) => (isActive ? '#F5AB35' : '#D9D9D9')};
  transition: all 0.2s ease;
`;

/**
 * 폰 래퍼(가로 스크롤) - 하단 정렬
 * - `margin-top: auto;`를 통해 상단 콘텐츠 이후 남은 공간을 모두 차지
 * - 화면 하단에 붙도록 함
 */
const PhoneWrapper = styled.div`
  width: 228px;
  height: 490px;
  margin-top: auto; /* 상단 공간을 채우고 하단에 정렬 */

  background: #ececec;
  border: 5px solid #d9d9d9;
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  overflow-x: scroll;
  overflow-y: hidden;

  scroll-snap-type: x mandatory;
  scroll-snap-stop: always;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  flex-direction: row;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhoneImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  image-rendering: crisp-edges;
`;
