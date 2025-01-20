import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";

import Alarm from "../assets/Header/AlarmIcon.svg";
import BasketIcon from "../assets/Header/BasketIcon.svg";
import MypageIcon from "../assets/Header/MypageIcon.svg";
import Logo from "../assets/Logo.svg";

// Header 컴포넌트 정의
const Header: React.FC = () => {
  const navigate = useNavigate();

  // 상태 정의
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");

  // useEffect로 쿠키 가져오기
  useEffect(() => {
    const userNickname = Cookies.get("nickname"); // 쿠키에서 "nickname" 가져오기
    if (userNickname) {
      setIsLoggedIn(true);
      setNickname(userNickname);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 이벤트 핸들러
  const handleMypageClick = (): void => {
    navigate("/login");
  };

  const handleBasketClick = (): void => {
    navigate("/basket");
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LeftSection>
          {isLoggedIn ? (
            <Greeting>
              <ProfileImage
                src="https://via.placeholder.com/44"
                alt="User profile"
              />
              <GreetingText>
                <Nickname>{nickname}</Nickname> 님 안녕하세요!
              </GreetingText>
            </Greeting>
          ) : (
            <LogoIcon src={Logo} alt="Logo" />
          )}
        </LeftSection>

        <RightSection>
          {isLoggedIn ? (
            <>
              <Icon src={BasketIcon} alt="Basket" onClick={handleBasketClick} />
              <Icon src={Alarm} alt="알림" />
            </>
          ) : (
            <>
              <Icon
                src={MypageIcon}
                alt="마이페이지"
                onClick={handleMypageClick}
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

// 스타일 정의
const HeaderWrapper = styled.div`
  min-width: 340px;
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

const GreetingText = styled.div`
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const Nickname = styled.span`
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 20px;
  color: #000000;
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
