import React from 'react';
import styled from 'styled-components';

// 실제 파일 경로에 맞춰 import를 수정하세요.
// 예: import phoneImage from '../../assets/Landing/멜픽-멜픽생성.png';
// import phoneImage from '../../assets/Landing/멜픽-멜픽생성.png';

const LandingPage7: React.FC = () => {
  return (
    <Container>
      <Title>melpik앱으로 편하게 관리하세요</Title>
      <Subtitle>
        판매에 관련된 모든 진행사항을
        <br />
        앱에서 편리하게 관리할 수 있어요
      </Subtitle>

      {/* 핸드폰 이미지를 가운데 배치 */}
      <PhoneWrapper>
        {/* <PhoneImage src={phoneImage} alt='멜픽앱 예시 화면' /> */}
      </PhoneWrapper>

      {/* 페이지 인디케이터 (작은 점 2개 + 주황색 바 1개) */}
      <DotGroup>
        <Rect />
        <Dot />
        <Dot />
      </DotGroup>
    </Container>
  );
};

export default LandingPage7;

/* ====================== Styled Components ====================== */

/**
 * 1) 전체 컨테이너 (400×700 박스, 흰 배경, 테두리 둥글게)
 */
const Container = styled.div`
  width: 400px;
  height: 700px;
  margin: 0 auto;

  background: #ffffff;
  border-radius: 20px;
  box-sizing: border-box;

  /* 세로로 요소들을 순서대로 배치하고, 가운데 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  /* 위쪽 여백이 너무 붙지 않도록 패딩을 줄 수 있음 */
  padding: 30px 0;
`;

/** 2) 상단 큰 제목 (20px) */
const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;

  color: #000000;
  margin: 0; /* h 태그 기본 여백 제거 */
  margin-bottom: 12px; /* 제목과 부제목 간격 */
`;

/** 3) 부제목 (17px) */
const Subtitle = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  color: #000000;

  margin-bottom: 20px; /* 부제목과 이미지 간격 */
`;

/**
 * 4) 핸드폰 이미지를 감싸는 박스
 *  - 가로폭 자동(또는 고정값) 조정 가능
 *  - 회색/테두리를 줄 수도 있음
 */
const PhoneWrapper = styled.div`
  width: 228px;
  /* 높이는 내용물(이미지)에 맞춰 자동 */
  background: #ececec;
  border: 5px solid #d9d9d9;
  border-radius: 20px 20px 0 0;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  margin-bottom: 20px; /* 이미지와 아래 인디케이터 간격 */
`;

/** 실제 핸드폰 화면 이미지 */
const PhoneImage = styled.img`
  width: 100%;
  /* 높이 비율 유지: auto, 필요하면 object-fit: cover */
  height: auto;
  border-radius: 20px 20px 0 0;
`;

/**
 * 5) 페이지 인디케이터 (점2 + 주황색 막대1)
 *  - flex 로 가로 배치
 */
const DotGroup = styled.div`
  display: flex;
  gap: 5px;
  /* 가운데 정렬 */
  justify-content: center;
  align-items: center;
`;

/** 주황색 막대 (20×10) */
const Rect = styled.div`
  width: 20px;
  height: 10px;
  background: #f5ab35;
  border-radius: 100px;
`;

/** 회색 점 (10×10) */
const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: #d9d9d9;
  border-radius: 50%;
`;
