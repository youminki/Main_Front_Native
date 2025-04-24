import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '../assets/BottomNav/HomeIcon.svg';
import BrandIcon from '../assets/BottomNav/BrandIcon.svg';
import CustomerServiceIcon from '../assets/BottomNav/CustomerServiceIcon.svg';
import LockerRoomIcon from '../assets/BottomNav/LockerRoomIcon.svg';
import MelpikIcon from '../assets/BottomNav/MelpikIcon.svg';

interface Tab {
  key: string;
  route: string;
  icon: string;
  label: string;
}

const TABS: Tab[] = [
  { key: 'home', route: '/home', icon: HomeIcon, label: '홈' },
  { key: 'brand', route: '/brand', icon: BrandIcon, label: '브랜드' },
  { key: 'Melpik', route: '/Melpik', icon: MelpikIcon, label: '멜픽' },
  {
    key: 'LockerRoom',
    route: '/LockerRoom',
    icon: LockerRoomIcon,
    label: '락커룸',
  },
  {
    key: 'CustomerService',
    route: '/CustomerService',
    icon: CustomerServiceIcon,
    label: '고객센터',
  },
];

const BAR_WIDTH = 30;

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [glow, setGlow] = useState(false);
  const [barPos, setBarPos] = useState(0);

  // 스크롤에 따라 보이기/숨기기
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 50) {
        // 아래로 스크롤 → 숨김
        setVisible(false);
      } else {
        // 위로 스크롤 → 보임
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const current = TABS.find((t) => t.route === location.pathname);
    if (current && navRef.current) {
      setActiveKey(current.key);
      const el = navRef.current.querySelector<HTMLElement>(
        `[data-key="${current.key}"]`
      );
      if (el) setBarPos(el.offsetLeft + el.offsetWidth / 2 - BAR_WIDTH / 2);
    } else {
      setActiveKey(null);
    }
    setGlow(false);
    const timer = setTimeout(() => setGlow(true), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleClick = (tab: Tab) => {
    if (activeKey !== tab.key) {
      setGlow(false);
      navigate(tab.route);
    }
  };

  return (
    <DockContainer visible={visible}>
      <Dock ref={navRef}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <NavItem
              key={tab.key}
              data-key={tab.key}
              onClick={() => handleClick(tab)}
            >
              <IconWrapper isActive={isActive && glow}>
                <Icon src={tab.icon} alt={tab.label} />
              </IconWrapper>
              <Label isActive={isActive}>{tab.label}</Label>
            </NavItem>
          );
        })}
        <Bar style={{ left: barPos }} />
      </Dock>
    </DockContainer>
  );
};

export default BottomNav;

/* ========== Styled Components ========== */

const DockContainer = styled.nav<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%)
    translateY(${({ visible }) => (visible ? '0' : '100%')});
  transition: transform 0.3s ease;
  padding: 0 16px;
  z-index: 1000;
`;

const Dock = styled.div`
  display: flex;
  align-items: center;
  background: rgba(29, 29, 27, 0.8);
  backdrop-filter: blur(16px);
  border-radius: 32px;
  @media (max-width: 768px) {
    border-radius: 0;
  }
  padding: 12px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-4px) scale(1.05);
  }
`;

const IconWrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 48px;
  height: 48px;
  background: ${({ isActive }) =>
    isActive ? '#f6ae24' : 'rgba(255,255,255,0.1)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  /* 박스 호버 시 살짝 키우고 배경 밝게 */
  &:hover {
    background: ${({ isActive }) =>
      isActive ? '#f6ae24' : 'rgba(255,255,255,0.2)'};
    transform: scale(1.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 30px;
    background: rgba(255, 238, 0, 0.4);
    filter: blur(16px);
    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
`;

const Label = styled.span<{ isActive: boolean }>`
  margin-top: 6px;
  font-size: 11px;
  color: ${({ isActive }) => (isActive ? '#fff' : 'rgba(255,255,255,0.7)')};
  transition: color 0.2s ease;
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  width: ${BAR_WIDTH}px;
  height: 4px;
  background-color: #ffffff;
  border-radius: 2px;
  transition: left 0.3s ease;
`;
