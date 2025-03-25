// src/components/Landing/Header.tsx
import React from 'react';
import styled from 'styled-components';
import LandingLogoIcon from '../../assets/Landing/LandingLogoIcon.svg';
import ShareIcon from '../../assets/Landing/ShareIcon.svg';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo src={LandingLogoIcon} alt='Landing Logo' />
      <Icons src={ShareIcon} alt='Share Icon' />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 440px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 24px;
  width: auto;
  margin-top: 60px;
`;

const Icons = styled.img`
  position: absolute;
  right: 20px;
  height: 20px;
  width: auto;
  margin-top: 60px;
`;
