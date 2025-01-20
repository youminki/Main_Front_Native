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

  return (
    <HeaderWrapper>
      <HeaderContainer>
        {isLoggedIn ? (
          <>
            <LeftSection>
              <Profile>
                <ProfileImage
                  src="https://via.placeholder.com/44"
                  alt="User profile"
                />
                <Greeting>
                  <GreetingText>
                    <span>{nickname}</span> 님 안녕하세요!
                  </GreetingText>
                </Greeting>
              </Profile>
            </LeftSection>
            <RightSection>
              <Icon
                src={BasketIcon}
                alt="Basket"
                onClick={() => navigate("/Basket")}
              />
              <Icon src={Alarm} alt="알림" />
            </RightSection>
          </>
        ) : (
          <>
            <LeftSection>
              <Icon src={Logo} alt="Login Logo" />
            </LeftSection>
            <RightSection>
              <Icon
                src={MypageIcon}
                alt="마이페이지"
                onClick={handleMypageClick} // 클릭 시 /login 페이지로 이동
              />
              <Icon src={Alarm} alt="알림" />
            </RightSection>
          </>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  min-width: 340px;
  background-color: #e60000;
  padding: 0 27px 27px;
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

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
`;

const GreetingText = styled.span`
  font-family: "NanumSquare Neo OTF", sans-serif;
  font-style: normal;
  color: #000000;

  & > span {
    font-weight: 500;
    font-size: 24px;
    margin-right: 5px;
  }
`;

const Icon = styled.img`
  width: auto;
  height: auto;
  cursor: pointer;
`;
