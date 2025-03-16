// src/components/Landing/LandingPage1.tsx
import React from 'react';
import styled from 'styled-components';

const LandingPage1: React.FC = () => {
  // 버튼 클릭 시 이동할 주소 (필요하다면 수정하세요)
  const handleStartClick = () => {
    window.location.href = 'https://me1pik.com/login';
  };

  return (
    <Container>
      {/* 상단 문구 */}

      {/* N명 bold 처리 문구 */}
      <Text>
        현재 <BoldText>N명</BoldText>의 인플루언서들이
        <br /> melpik을 신청했어요!
      </Text>

      {/* 버튼 */}
      <StartButton onClick={handleStartClick}>melpik 시작하기</StartButton>

      {/* N일 00:00시간 bold 처리 문구 */}
      <Text>
        사전예약 마감까지 <BoldText>N일 00:00시간</BoldText> 남았어요!
      </Text>
    </Container>
  );
};

export default LandingPage1;

/* ---------- 스타일 정의 ---------- */
const Container = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: #f5ab35;
  border-radius: 20px 20px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;
`;

const Text = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 25px;
  /* or 147% */
  text-align: center;
  color: #ffffff;
`;

const BoldText = styled.span`
  font-weight: 800; /* “N명”, “N일 00:00시간” 등만 볼드 처리 */
`;

const StartButton = styled.button`
  width: 250px;
  padding: 10px 0;
  background: #ffffff;
  color: #000000;
  border: none;
  border-radius: 100px; /* 디자인 예시 참고 */
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800; /* 버튼 텍스트는 볼드 */
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
