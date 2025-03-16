// src/components/Landing/LandingPage1.tsx
import React from 'react';
import styled from 'styled-components';

const LandingPage6: React.FC = () => {
  const handleStartClick = () => {
    window.location.href = 'https://me1pik.com/login';
  };

  return (
    <Container>
      <Text>
        현재 <BoldText>N명</BoldText>의 인플루언서들이
        <br /> melpik을 신청했어요!
      </Text>

      <StartButton onClick={handleStartClick}>melpik 시작하기</StartButton>

      <Text>
        사전예약 마감까지 <BoldText>N일 00:00시간</BoldText> 남았어요!
      </Text>
    </Container>
  );
};

export default LandingPage6;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: #f5ab35;
  border-radius: 20px 20px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 30px 0;
`;

const Text = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 25px;
  text-align: center;
  color: #ffffff;
`;

const BoldText = styled.span`
  font-weight: 800;
`;

const StartButton = styled.button`
  width: 250px;
  padding: 10px 0;
  background: #ffffff;
  color: #000000;
  border: none;
  border-radius: 100px;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
