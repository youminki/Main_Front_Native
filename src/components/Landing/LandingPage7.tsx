import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

// 이미지 3장 (실제 경로에 맞춰 import 경로 수정)
import Landing7Img1 from '../../assets/Landing/Landing7Img1.svg';
import Landing7Img2 from '../../assets/Landing/Landing7Img2.svg';
import Landing7Img3 from '../../assets/Landing/Landing7Img3.svg';

const LandingPage7: React.FC = () => {
  // 현재 슬라이드 인덱스(0, 1, 2)를 관리
  const [currentIndex, setCurrentIndex] = useState(0);

  // PhoneWrapper의 DOM 참조
  const scrollRef = useRef<HTMLDivElement>(null);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const wrapperWidth = scrollRef.current.clientWidth;
    // 현재 슬라이드 인덱스 계산 (가장 가까운 정수로 반올림)
    const index = Math.round(scrollLeft / wrapperWidth);
    setCurrentIndex(index);
  };

  // PhoneWrapper가 마운트된 후, 스크롤 이벤트 리스너 등록
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
      <Title>melpik앱으로 편하게 관리하세요</Title>
      <Subtitle>
        판매에 관련된 모든 진행사항을
        <br />
        앱에서 편리하게 관리할 수 있어요
      </Subtitle>

      {/* 가로 스크롤 래퍼 */}
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

      {/* 하단 인디케이터 (3개의 점) */}
      <DotGroup>
        <Dot isActive={currentIndex === 0} />
        <Dot isActive={currentIndex === 1} />
        <Dot isActive={currentIndex === 2} />
      </DotGroup>
    </Container>
  );
};

export default LandingPage7;

/* ====================== Styled Components ====================== */

/**
 * 전체 컨테이너 (400×700 박스, 흰 배경, 테두리 둥글게)
 */
const Container = styled.div`
  width: 400px;
  height: 700px;
  margin: 0 auto;

  background: #ffffff;
  border-radius: 20px;
  box-sizing: border-box;

  /* 세로로 요소들을 순서대로 배치하고, 위쪽부터 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  /* 위쪽 여백을 주어 텍스트가 너무 붙지 않도록 조절 */
  padding: 30px 0;
`;

/** 상단 큰 제목 (20px) */
const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;

  color: #000000;
  margin: 0;
  margin-bottom: 12px;
`;

/** 부제목 (17px) */
const Subtitle = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #000000;

  margin-bottom: 20px;
`;

/**
 * 가로 스크롤 래퍼
 * - 3장의 슬라이드를 가로로 배치
 * - scroll-snap-type: x mandatory; → 스크롤 스냅
 * - scroll-snap-stop: always; → 한 번 스크롤하면 정확히 한 슬라이드씩 넘어감
 */
const PhoneWrapper = styled.div`
  width: 228px;
  height: 470px;
  background: #ececec;
  border: 5px solid #d9d9d9;
  border-radius: 20px 20px 0 0;
  overflow-x: scroll;
  overflow-y: hidden;

  /* 스크롤 스냅 설정 */
  scroll-snap-type: x mandatory;
  scroll-snap-stop: always;
  scroll-behavior: smooth;

  /* 스크롤바 숨기기 (옵션) */
  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

/**
 * 각 슬라이드(이미지 1장씩)
 * - scroll-snap-align: center → 스냅 시 중앙 정렬
 * - flex: 0 0 100% → 부모 PhoneWrapper 폭만큼 한 슬라이드가 차지
 */
const Slide = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: center;

  /* 내부 이미지 중앙 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** 실제 핸드폰 화면 이미지 */
const PhoneImage = styled.img`
  width: 100%;
  height: auto;
`;

/**
 * 하단 인디케이터 그룹
 * - 3개의 점을 배치
 * - 전체를 180도 회전 (원한다면 제거 가능)
 */
const DotGroup = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

/**
 * 각 점(Dot)
 * - isActive = true → 주황색(#F5AB35), 크기 20×10 (캡슐 모양)
 * - isActive = false → 회색(#D9D9D9), 크기 10×10 (원)
 */
const Dot = styled.div<{ isActive: boolean }>`
  width: ${({ isActive }) => (isActive ? '20px' : '10px')};
  height: 10px;
  border-radius: 100px;
  background: ${({ isActive }) => (isActive ? '#F5AB35' : '#D9D9D9')};

  /* 부드러운 전환 효과 */
  transition: all 0.2s ease;
`;
