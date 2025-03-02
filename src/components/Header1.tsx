import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import Alarm from '../assets/Header/AlarmIcon.svg';
import BasketIcon from '../assets/Header/BasketIcon.svg';
import MypageIcon from '../assets/Header/MypageIcon.svg';
import Logo from '../assets/Logo.svg';
import MypageModal from '../components/MypageModal';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('사용자');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const userNickname = Cookies.get('nickname');

    if (accessToken) {
      setIsLoggedIn(true);
      setNickname(userNickname || '멜픽 회원');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleBasketClick = () => navigate('/basket');

  const handleLeftSectionClick = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <LeftSection onClick={handleLeftSectionClick}>
            {isLoggedIn ? (
              <Greeting>
                <ProfileImage
                  src='https://via.placeholder.com/44'
                  alt='User profile'
                />
                <GreetingText>
                  <Nickname>{nickname}</Nickname> 님 안녕하세요!
                </GreetingText>
              </Greeting>
            ) : (
              <LogoIcon src={Logo} alt='Logo' />
            )}
          </LeftSection>

          <RightSection>
            {isLoggedIn ? (
              <>
                <Icon
                  src={BasketIcon}
                  alt='장바구니'
                  onClick={handleBasketClick}
                />
                <Icon src={Alarm} alt='알림' />
              </>
            ) : (
              <>
                <Icon
                  src={MypageIcon}
                  alt='마이페이지'
                  onClick={() => navigate('/login')}
                />
                <Icon src={Alarm} alt='알림' />
              </>
            )}
          </RightSection>
        </HeaderContainer>
      </HeaderWrapper>

      <MypageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
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
  cursor: pointer;
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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const Nickname = styled.span`
  font-family: 'NanumSquare Neo OTF';
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
  cursor: pointer;
`;
