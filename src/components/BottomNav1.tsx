import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '../assets/BottomNav/HomeIcon.svg';
import BrandIcon from '../assets/BottomNav/BrandIcon.svg';
import CustomerServiceIcon from '../assets/BottomNav/CustomerServiceIcon.svg';
import LockerRoomIcon from '../assets/BottomNav/LockerRoomIcon.svg';
import MelpikIcon from '../assets/BottomNav/MelpikIcon.svg';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showYellowGlow, setShowYellowGlow] = useState<boolean>(false);
  const [barPosition, setBarPosition] = useState<number>(0);
  const [isVisible] = useState<boolean>(true);
  const navRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 방향 감지하여 바텀바 보임 여부 제어
  // useEffect(() => {
  //   let lastScrollY = window.pageYOffset;
  //   const handleScroll = () => {
  //     const currentScrollY = window.pageYOffset;
  //     if (currentScrollY > lastScrollY) {
  //       // 아래로 스크롤 시
  //       setIsVisible(false);
  //     } else {
  //       // 위로 스크롤 시
  //       setIsVisible(true);
  //     }
  //     lastScrollY = currentScrollY;
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    const updateTab = (tabName: string) => {
      const activeElement = navRef.current?.querySelector<HTMLElement>(
        `[data-tab="${tabName}"]`
      );
      if (activeElement) {
        const activeElementPosition =
          activeElement.offsetLeft + activeElement.offsetWidth / 2 - 30;
        setBarPosition(activeElementPosition);
        setActiveTab(tabName);
      }
    };

    switch (location.pathname) {
      case '/home':
        updateTab('home');
        break;
      case '/brand':
        updateTab('brand');
        break;
      case '/LockerRoom':
        updateTab('LockerRoom');
        break;
      case '/CustomerService':
        updateTab('CustomerService');
        break;
      case '/Melpik':
        updateTab('Melpik');
        break;
      default:
        setActiveTab(null);
    }

    setShowYellowGlow(false);
    setTimeout(() => setShowYellowGlow(true), 300);
  }, [location.pathname]);

  const handleClick = (tabName: string, route: string) => {
    if (activeTab !== tabName) {
      setShowYellowGlow(false);
      navigate(route);
    }
  };

  return (
    <BottomNavContainer ref={navRef} isVisible={isVisible}>
      <NavItem
        data-tab='home'
        $isActive={activeTab === 'home'}
        onClick={() => handleClick('home', '/home')}
      >
        <Icon src={HomeIcon} alt='홈' $isActive={activeTab === 'home'} />
        <NavLabel $isActive={activeTab === 'home'}>홈</NavLabel>
        {activeTab === 'home' && (
          <IndicatorContainer>
            <Light $isActive={showYellowGlow} />
          </IndicatorContainer>
        )}
      </NavItem>
      <NavItem
        data-tab='brand'
        $isActive={activeTab === 'brand'}
        onClick={() => handleClick('brand', '/brand')}
      >
        <Icon src={BrandIcon} alt='브랜드' $isActive={activeTab === 'brand'} />
        <NavLabel $isActive={activeTab === 'brand'}>브랜드</NavLabel>
        {activeTab === 'brand' && (
          <IndicatorContainer>
            <Light $isActive={showYellowGlow} />
          </IndicatorContainer>
        )}
      </NavItem>
      <NavItem
        data-tab='Melpik'
        $isActive={activeTab === 'Melpik'}
        onClick={() => handleClick('Melpik', '/Melpik')}
      >
        <Icon src={MelpikIcon} alt='전체' $isActive={activeTab === 'Melpik'} />
        <NavLabel $isActive={activeTab === 'Melpik'}>멜픽</NavLabel>
        {activeTab === 'Melpik' && (
          <IndicatorContainer>
            <Light $isActive={showYellowGlow} />
          </IndicatorContainer>
        )}
      </NavItem>
      <NavItem
        data-tab='LockerRoom'
        $isActive={activeTab === 'LockerRoom'}
        onClick={() => handleClick('LockerRoom', '/LockerRoom')}
      >
        <Icon
          src={LockerRoomIcon}
          alt='락커룸'
          $isActive={activeTab === 'LockerRoom'}
        />
        <NavLabel $isActive={activeTab === 'LockerRoom'}>락커룸</NavLabel>
        {activeTab === 'LockerRoom' && (
          <IndicatorContainer>
            <Light $isActive={showYellowGlow} />
          </IndicatorContainer>
        )}
      </NavItem>
      <NavItem
        data-tab='CustomerService'
        $isActive={activeTab === 'CustomerService'}
        onClick={() => handleClick('CustomerService', '/CustomerService')}
      >
        <Icon
          src={CustomerServiceIcon}
          alt='고객센터'
          $isActive={activeTab === 'CustomerService'}
        />
        <NavLabel $isActive={activeTab === 'CustomerService'}>
          고객센터
        </NavLabel>
        {activeTab === 'CustomerService' && (
          <IndicatorContainer>
            <Light $isActive={showYellowGlow} />
          </IndicatorContainer>
        )}
      </NavItem>
      <Bar style={{ left: `${barPosition}px` }} />
    </BottomNavContainer>
  );
};

export default BottomNav;

// 스타일 컴포넌트
const BottomNavContainer = styled.nav<{ isVisible: boolean }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #1d1d1b;
  width: 100%;
  max-width: 1440px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, ${({ isVisible }) => (isVisible ? '0' : '100%')});
  z-index: 1000;
  margin: 0 auto;
  text-align: center;
  padding: 15px 0 34px 0;
  transition: transform 0.3s ease-in-out;
`;

const IndicatorContainer = styled.div`
  position: absolute;
  top: 0;
  width: 60px;
  height: 15px;
  z-index: 0;
  display: flex;
  justify-content: center;
`;

const Bar = styled.div`
  width: 30px;
  height: 3px;
  background-color: #ffffff;
  position: absolute;
  top: 0px;
  margin-left: 15px;
  transition: left 0.3s ease-in-out;
`;

const Light = styled.div<{ $isActive: boolean }>`
  position: absolute;
  width: 46px;
  height: 36px;
  background: linear-gradient(to top, #1d1d1b, white);
  border-radius: 50%;
  filter: blur(20px);
  opacity: ${({ $isActive }) => ($isActive ? '0.8' : '0')};
  top: -15px;
  transition: opacity 0.5s ease-in-out;
  clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
`;

const NavItem = styled.div<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  z-index: 1;
`;

const Icon = styled.img<{ $isActive: boolean }>`
  width: auto;
  height: auto;
  filter: ${({ $isActive }) =>
    $isActive ? 'brightness(0) invert(1)' : 'none'};
`;

const NavLabel = styled.span<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#555555')};
  font-weight: 800;
  font-size: 10px;
  margin-top: 11px;
  transition: color 0.3s ease;
`;
