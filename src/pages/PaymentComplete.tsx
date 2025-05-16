import React from 'react';
import styled from 'styled-components';
import CompleteIcon from '../assets/Complete/CompleteIcon.svg';
import { useNavigate } from 'react-router-dom';

const PaymentComplete: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <Container>
      <Content>
        <IconWrapper>
          <CompleteImg src={CompleteIcon} alt='결제 완료' />
        </IconWrapper>
        <Title>결제가 완료 되었습니다</Title>
        <Subtitle>
          신청하신 제품을 신속하게 준비하여,
          <br />
          빠르게 전달 드리겠습니다.
        </Subtitle>
        <HomeButton onClick={handleHomeClick}>홈으로 돌아가기</HomeButton>
      </Content>
    </Container>
  );
};

export default PaymentComplete;

// Styled Components
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  overflow: hidden;
`;

const Content = styled.div`
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
`;

const CompleteImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 12px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #777777;
  margin-bottom: 32px;
`;

const HomeButton = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background-color: #f6ae24;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #d9981d;
  }
`;
