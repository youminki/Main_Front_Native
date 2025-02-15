import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BackButtonIcon from '../assets/BackButton.svg';
import Alarm from '../assets/Header/AlarmIcon.svg';
import BasketIcon from '../assets/Header/BasketIcon.svg';

// Header 컴포넌트 정의
const Header: React.FC = () => {
  const navigate = useNavigate();

  // 이벤트 핸들러
  const handleBackClick = (): void => {
    navigate(-1); // 뒤로가기
  };

  const handleBasketClick = (): void => {
    navigate('/basket');
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LeftSection>
          <BackButton
            src={BackButtonIcon}
            alt='뒤로가기'
            onClick={handleBackClick}
          />
        </LeftSection>

        <RightSection>
          <Icon src={BasketIcon} alt='장바구니' onClick={handleBasketClick} />
          <Icon src={Alarm} alt='알림' />
        </RightSection>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;

// 스타일 정의
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  z-index: 100;
  background-color: #fff;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const BackButton = styled.img`
  width: auto;
  height: auto;
  cursor: pointer;
`;

const Icon = styled.img`
  width: auto;
  height: auto;
  cursor: pointer;
`;
