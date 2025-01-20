import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import HomeIcon from "../assets/Home/Home.svg";
import inventoryIcon from "../assets/Home/inventory.svg";
import PaymentDetailIcon from "../assets/Home/PaymentDetail.svg";
import StoreIcon from "../assets/Home/Store.svg";
import MenuIcon from "../assets/Home/Menu.svg";
import Theme from "../styles/Theme";

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showYellowGlow, setShowYellowGlow] = useState<boolean>(false);
  const [barPosition, setBarPosition] = useState<number>(0);

  const navRef = useRef<HTMLDivElement | null>(null);

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
      case "/home":
        updateTab("home");
        break;
      case "/inventory":
        updateTab("inventory");
        break;
      case "/payment":
        updateTab("payment");
        break;
      case "/store":
        updateTab("store");
        break;
      case "/menu":
        updateTab("menu");
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
    <ThemeProvider theme={Theme}>
      <BottomNavContainer ref={navRef}>
        <NavItem
          data-tab="inventory"
          isActive={activeTab === "inventory"}
          onClick={() => handleClick("inventory", "/inventory")}
        >
          <Icon
            src={inventoryIcon}
            alt="인벤토리"
            isActive={activeTab === "inventory"}
          />
          <NavLabel isActive={activeTab === "inventory"}>인벤토리</NavLabel>
          {activeTab === "inventory" && (
            <IndicatorContainer>
              <Light isActive={showYellowGlow} />
            </IndicatorContainer>
          )}
        </NavItem>
        <NavItem
          data-tab="payment"
          isActive={activeTab === "payment"}
          onClick={() => handleClick("payment", "/payment")}
        >
          <Icon
            src={PaymentDetailIcon}
            alt="결제내역"
            isActive={activeTab === "payment"}
          />
          <NavLabel isActive={activeTab === "payment"}>결제내역</NavLabel>
          {activeTab === "payment" && (
            <IndicatorContainer>
              <Light isActive={showYellowGlow} />
            </IndicatorContainer>
          )}
        </NavItem>
        <NavItem
          data-tab="home"
          isActive={activeTab === "home"}
          onClick={() => handleClick("home", "/home")}
        >
          <Icon src={HomeIcon} alt="홈" isActive={activeTab === "home"} />
          <NavLabel isActive={activeTab === "home"}>홈</NavLabel>
          {activeTab === "home" && (
            <IndicatorContainer>
              <Light isActive={showYellowGlow} />
            </IndicatorContainer>
          )}
        </NavItem>
        <NavItem
          data-tab="store"
          isActive={activeTab === "store"}
          onClick={() => handleClick("store", "/store")}
        >
          <Icon
            src={StoreIcon}
            alt="구매마켓"
            isActive={activeTab === "store"}
          />
          <NavLabel isActive={activeTab === "store"}>구매마켓</NavLabel>
          {activeTab === "store" && (
            <IndicatorContainer>
              <Light isActive={showYellowGlow} />
            </IndicatorContainer>
          )}
        </NavItem>
        <NavItem
          data-tab="menu"
          isActive={activeTab === "menu"}
          onClick={() => handleClick("menu", "/menu")}
        >
          <Icon src={MenuIcon} alt="전체" isActive={activeTab === "menu"} />
          <NavLabel isActive={activeTab === "menu"}>전체</NavLabel>
          {activeTab === "menu" && (
            <IndicatorContainer>
              <Light isActive={showYellowGlow} />
            </IndicatorContainer>
          )}
        </NavItem>
        <Bar style={{ left: `${barPosition}px` }} />
      </BottomNavContainer>
    </ThemeProvider>
  );
};

export default BottomNav;

const BottomNavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.Black1};

  width: 100%;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
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
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 0px;
  margin-left: 15px;
  transition: left 0.3s ease-in-out;
`;

const Light = styled.div<{ isActive: boolean }>`
  position: absolute;
  width: 46px;
  height: 36px;
  background: linear-gradient(to top, black, white);
  border-radius: 50%;
  filter: blur(20px);
  opacity: ${({ isActive }) => (isActive ? "0.8" : "0")};
  top: -8px;
  transition: opacity 0.5s ease-in-out;
  clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
`;

const NavItem = styled.div<{ isActive: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  z-index: 1;
`;

const Icon = styled.img<{ isActive: boolean }>`
  width: 24px;
  height: 24px;
  filter: ${({ isActive }) => (isActive ? "brightness(0) invert(1)" : "none")};
`;

const NavLabel = styled.span<{ isActive: boolean }>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.gray};
  font-size: 12px;
  font-weight: 600;
  margin-top: 5px;
  transition: color 0.3s ease;
`;
