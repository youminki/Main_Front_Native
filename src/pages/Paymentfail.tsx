import React from 'react';
import styled, { keyframes } from 'styled-components';
import CompleteIcon from '../assets/Complete/CompleteIcon.svg';
import FixedBottomBar from '../components/FixedBottomBar';

interface PaymentFailProps {
  onClose: () => void;
}

const PaymentFail: React.FC<PaymentFailProps> = ({ onClose }) => {
  return (
    <Container>
      <Content>
        <IconWrapper>
          <CompleteImg src={CompleteIcon} alt='결제 실패 아이콘' />
        </IconWrapper>
        <Title>
          결제를 <Strong>실패</Strong> 되었습니다.
        </Title>
        <Subtitle>
          신청하신 제품을 신속하게 준비하여,
          <br />
          빠르게 전달 드리겠습니다.
        </Subtitle>
      </Content>

      {/* 이 FixedBottomBar는 내부에서 position: fixed 처리되므로 Container 밖에서도 하단에 고정됩니다 */}
      <FixedBottomBar text='확인' color='black' onClick={onClose} />
    </Container>
  );
};

export default PaymentFail;

// 애니메이션: 화면 왼쪽 밖 → 화면 오른쪽 밖
const slideAcross = keyframes`
  0% {
    left: -80px;
  }
  100% {
    left: calc(100% + 80px);
  }
`;

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: #fff;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  margin: 0 auto 24px;
  overflow: hidden;
`;

const CompleteImg = styled.img`
  position: absolute;
  top: 0;
  width: 80px;
  height: 80px;
  object-fit: contain;
  animation: ${slideAcross} 4s linear infinite;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 24px;
  line-height: 22px;
  color: #000;
  margin-bottom: 22px;
`;

const Strong = styled.span`
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
  text-align: center;

  color: #999999;
`;
