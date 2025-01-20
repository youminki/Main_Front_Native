import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Alarm from '../assets/Home/Alarm.svg';
import ScheduleIcon from '../assets/Home/Schedule.svg';
import Basket from '../assets/Home/Basket.svg';
import Mycloset from '../assets/Home/Mycloset.svg';
import Mypage from '../assets/Home/Mypage.svg';

type HeaderProps = {
  nickname?: string;
  isLoggedIn?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  nickname = 'Mr J',
  isLoggedIn = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMypageClick = () => {
    window.location.href = 'https://api.stylewh.com/oauth/instagram';
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
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
        <Icons>
          {location.pathname === '/store' ? (
            <>
              <Icon src={Basket} alt="장바구니" />
              <Icon src={Mycloset} alt="내 옷장" />
            </>
          ) : isLoggedIn ? (
            <>
              <Icon
                src={ScheduleIcon}
                alt="스케줄"
                onClick={() => navigate('/schedule')}
              />
              <Icon src={Alarm} alt="알림" />
            </>
          ) : (
            <>
              <Icon
                src={ScheduleIcon}
                alt="스케줄"
                onClick={() => navigate('/schedule')}
              />
              <Icon src={Mypage} alt="마이페이지" onClick={handleMypageClick} />
              <Icon src={Alarm} alt="알림" />
            </>
          )}
        </Icons>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  min-width: 340px;

  margin: 0 auto;
  background-color: white;
  padding: 0 27px 27px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  /* height: 125px; */
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
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-style: normal;
  color: #000000;

  & > span {
    font-weight: 500;
    font-size: 24px;
    margin-right: 5px;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 15px;
  margin-left: auto;
`;

const Icon = styled.img`
  width: auto;
  height: auto;
  cursor: pointer;
`;
