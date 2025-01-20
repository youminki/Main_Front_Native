import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Alarm from "../assets/Home/Alarm.svg";
import BasketIcon from "../assets/Home/Basket.svg";
import MypageIcon from "../assets/Home/Mypage.svg";
import Logo from "../assets/Logo.svg";

type HeaderProps = {
  nickname?: string;
  isLoggedIn?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  nickname = "Mr J",
  isLoggedIn = false,
}) => {
  const navigate = useNavigate();

  const handleMypageClick = () => {
    navigate("/login"); // /login 페이지로 이동
  };

  const handleBasketClick = () => {
    navigate("/basket"); // /basket 페이지로 이동
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        {/* 왼쪽 섹션 */}
        <LeftSection>
          {isLoggedIn ? (
            <Greeting>
              <ProfileImage
                src="https://via.placeholder.com/44"
                alt="User profile"
              />
              <GreetingText>
                <span>{nickname}</span> 님 안녕하세요!
              </GreetingText>
            </Greeting>
          ) : (
            <LogoIcon src={Logo} alt="Logo" />
          )}
        </LeftSection>

        {/* 오른쪽 섹션 */}
        <RightSection>
          {isLoggedIn ? (
            <>
              <Icon
                src={BasketIcon}
                alt="Basket"
                onClick={handleBasketClick} // 장바구니 클릭 시 이동
              />
              <Icon src={Alarm} alt="알림" />
            </>
          ) : (
            <>
              <Icon
                src={MypageIcon}
                alt="마이페이지"
                onClick={handleMypageClick} // 마이페이지 클릭 시 이동
              />
              <Icon src={Alarm} alt="알림" />
            </>
          )}
        </RightSection>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  min-width: 340px;
  background-color: #e60000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  z-index: 1000;
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

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
`;

const GreetingText = styled.span`
  font-family: "NanumSquare Neo OTF", sans-serif;
  font-style: normal;
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;

  & > span {
    font-weight: 700;
    margin-right: 5px;
  }
`;

const LogoIcon = styled.img`
  width: auto;
  height: auto;
`;

const Icon = styled.img`
  width: auto;
  height: auto;
  cursor: pointer;
`;
