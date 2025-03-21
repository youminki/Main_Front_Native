import React from 'react';
import styled from 'styled-components';
// 실제 경로와 파일명에 맞춰 import 경로를 수정하세요
import backgroundImage from '../../assets/Landing/7X5A9526.svg';

const LandingPage6: React.FC = () => {
  return (
    <Container>
      <TextWrapper>
        <SmallTitle>이제는 일일이 찾지 마세요</SmallTitle>
        <BigTitle>
          브랜드는 melpik이 <br />
          <PickText>PICK!</PickText> 해줄게요
        </BigTitle>
      </TextWrapper>
    </Container>
  );
};

export default LandingPage6;

/* ====================== Styled Components ====================== */

/**
 * 1) 전체 컨테이너
 *  - 400×700 크기
 *  - 배경 이미지를 cover로 깔기
 *  - 모서리를 둥글게 처리
 *  - 텍스트를 상단에 정렬
 */
const Container = styled.div`
  width: 400px;
  height: 700px;
  margin: 0 auto;

  /* 배경 이미지 설정 */
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;

  border-radius: 20px;
  box-sizing: border-box;

  /* display 기반 레이아웃: 세로 배치 후 상단 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  /* 텍스트가 너무 위에 붙지 않도록 적당한 padding을 줄 수도 있습니다. */
  padding-top: 30px;
`;

/** 2) 텍스트 묶음 영역 */
const TextWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

/** 3) 작은 제목 (17px) */
const SmallTitle = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 40px;
  color: #000;
  margin-bottom: 8px;
`;

/** 4) 큰 제목 (23px) */
const BigTitle = styled.h1`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 23px;
  line-height: 30px;
  color: #000;
  margin: 0; /* 기본 h1 마진 제거 */
`;

/**
 * 5) PICK! 텍스트만 따로 스타일 지정
 *  - 굵기(900)와 색상(#FD8A2F)을 적용
 */
const PickText = styled.span`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 23px;
  line-height: 30px;
  text-align: center;
  color: #fd8a2f;
`;
