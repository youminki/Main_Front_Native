// src/components/BottomNav.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

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
  { key: 'melpik', route: '/melpik', icon: MelpikIcon, label: '멜픽' },
  {
    key: 'lockerRoom',
    route: '/my-closet',
    icon: LockerRoomIcon,
    label: '락커룸',
  },
  {
    key: 'customerService',
    route: '/customerService',
    icon: CustomerServiceIcon,
    label: '고객센터',
  },
];

const BAR_WIDTH = 40;

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [glow, setGlow] = useState(false);
  const [barPos, setBarPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(!(y > lastScrollY.current && y > 50));
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const current = TABS.find((t) => t.route === location.pathname);
    if (current && navRef.current) {
      setActiveKey(current.key);
      const el = navRef.current.querySelector<HTMLElement>(
        `[data-key="${current.key}"]`
      );
      if (el) {
        const containerRect = navRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const left =
          elRect.left - containerRect.left + (elRect.width - BAR_WIDTH) / 2;
        setBarPos(left);
      }
    } else {
      setActiveKey(null);
    }
    setGlow(false);
    const t = setTimeout(() => setGlow(true), 300);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const handleClick = (tab: Tab, enabled: boolean) => {
    if (!enabled) return;
    if (tab.key !== activeKey) {
      setGlow(false);
      navigate(tab.route);
    }
  };

  return (
    <DockContainer $visible={visible}>
      <Dock ref={navRef}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeKey && glow;
          const enabled = tab.key === 'home' || tab.key === 'lockerRoom';
          return (
            <NavItem
              key={tab.key}
              data-key={tab.key}
              $disabled={!enabled}
              onClick={() => handleClick(tab, enabled)}
            >
              <IconWrapper $isActive={isActive} $disabled={!enabled}>
                <Icon src={tab.icon} alt={tab.label} />
              </IconWrapper>
              <Label $isActive={isActive} $disabled={!enabled}>
                {tab.label}
              </Label>
            </NavItem>
          );
        })}
        <Bar style={{ left: barPos }} />
      </Dock>
    </DockContainer>
  );
};

export default BottomNav;

const DockContainer = styled.nav<{ $visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%)
    translateY(${({ $visible }) => ($visible ? '0' : '100%')});
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 400px;
  padding: 0 16px;
  z-index: 1000;

  @media (min-width: 768px) {
    bottom: 3%;
    transform: translateX(-50%);
  }
`;

const Dock = styled.div`
  position: relative;
  display: flex;
  background: rgba(29, 29, 27, 0.8);
  backdrop-filter: blur(16px);
  border-radius: 32px;
  padding: 12px 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

const NavItem = styled.div<{ $disabled: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const IconWrapper = styled.div<{ $isActive: boolean; $disabled: boolean }>`
  position: relative;
  width: 48px;
  height: 48px;

  background: ${({ $isActive }) =>
    $isActive ? '#fff' : 'rgba(255,255,255,0.1)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  ${({ $disabled }) =>
    $disabled &&
    css`
      background: rgba(255, 255, 255, 0.05);
    `}

  ${({ $disabled, $isActive }) =>
    !$disabled &&
    css`
      &:hover {
        background: ${$isActive ? '#fff' : 'rgba(255,255,255,0.2)'};
      }
    `}

  img {
    filter: ${({ $isActive }) =>
      $isActive ? 'none' : 'brightness(0) invert(1)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 20px;
    background: rgba(250, 234, 6, 0.4);
    filter: blur(16px);
    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Label = styled.span<{ $isActive: boolean; $disabled: boolean }>`
  margin-top: 6px;
  font-size: 11px;
  color: ${({ $isActive, $disabled }) =>
    $disabled
      ? 'rgba(255,255,255,0.5)'
      : $isActive
        ? '#fff'
        : 'rgba(255,255,255,0.7)'};
  transition: color 0.2s ease;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  width: ${BAR_WIDTH}px;
  height: 4px;
  background-color: #fff;
  border-radius: 2px;
  transition: left 0.3s ease;
`;
