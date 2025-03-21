import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LandingPage6: React.FC = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login');
  };

  return (
    <Container>
      <MainContent>
        <Text>
          현재 <BoldText>N명</BoldText>의 인플루언서들이
          <br /> melpik을 신청했어요!
        </Text>
        <StartButton onClick={handleStartClick}>melpik 시작하기</StartButton>
        <Text>
          사전예약 마감까지 <BoldText>N일 00:00시간</BoldText> 남았어요!
        </Text>
      </MainContent>
    </Container>
  );
};

export default LandingPage6;

/* ====================== Styled Components ====================== */

const Container = styled.div`
  width: 100%;
  height: 100%; /* FadeInWrapper가 600px인 경우 100% 채움 */
  position: relative;
  overflow: hidden;
  border-radius: 20px;

  /* 배경색 */
  background-color: #f5ab35;

  /* flex 레이아웃으로 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px;
`;

const Text = styled.div`
  font-family: 'NanumSquare Neo OTF';
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
  transition:
    background-color 0.3s,
    transform 0.1s;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;
