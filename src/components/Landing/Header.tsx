// src/components/Landing/Header.tsx
import React from 'react';
import styled from 'styled-components';
import LandingLogoIcon from '../../assets/Landing/LandingLogoIcon.svg';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo src={LandingLogoIcon} alt='Landing Logo' />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* 필요에 따라 높이 조정 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; /* 배경색은 필요에 따라 수정 */
  z-index: 1000;
`;

const Logo = styled.img`
  height: 40px; /* 로고 높이 조정, 필요에 따라 수정 */
  width: auto;
`;
