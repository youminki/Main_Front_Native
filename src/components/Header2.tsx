import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BackButtonIcon from '../assets/BackButton.svg';
import Alarm from '../assets/Header/AlarmIcon.svg';
import BasketIcon from '../assets/Header/BasketIcon.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = (): void => {
    navigate(-1);
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

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  z-index: 100;
  background-color: #fff;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 20px;
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
  cursor: pointer;
`;
