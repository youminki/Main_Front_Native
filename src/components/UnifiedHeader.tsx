// UnifiedHeader.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

// asset imports
import AlarmIcon from '../assets/Header/AlarmIcon.svg';
import BasketIcon from '../assets/Header/BasketIcon.svg';
import MypageIcon from '../assets/Header/MypageIcon.svg';
import Logo from '../assets/Logo.svg';
import BackButtonIcon from '../assets/BackButton.svg';
import CancleIconIcon from '../assets/Header/CancleIcon.svg';

// 모달 (기본헤더에서 사용)
import MypageModal from '../components/MypageModal';

interface UnifiedHeaderProps {
  variant?: 'default' | 'oneDepth' | 'twoDepth' | 'threeDepth';
  title?: string;
}

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  variant = 'default',
  title,
}) => {
  const navigate = useNavigate();

  // 기본헤더와 원뎁쓰에서 로그인 상태를 체크합니다.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('사용자');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 헤더 상태를 지속적으로 업데이트하기 위해 쿠키를 주기적으로 확인합니다.
  useEffect(() => {
    if (variant === 'default' || variant === 'oneDepth') {
      const updateAuth = () => {
        const accessToken = Cookies.get('accessToken');
        const userNickname = Cookies.get('nickname');
        if (accessToken) {
          setIsLoggedIn(true);
          setNickname(userNickname || '멜픽 회원');
        } else {
          setIsLoggedIn(false);
        }
      };
      updateAuth();
      const intervalId = setInterval(updateAuth, 1000);
      return () => clearInterval(intervalId);
    }
  }, [variant]);

  // 공통: 뒤로가기 핸들러
  const handleBackClick = () => {
    navigate(-1);
  };

  // 기본헤더: 장바구니, 마이페이지, 알림 핸들러
  const handleBasketClick = () => navigate('/basket');
  const handleLeftSectionClick = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    }
  };

  // AlarmIcon 클릭 시 /Alarm 페이지로 이동
  const handleAlarmClick = () => {
    navigate('/Alarm');
  };

  // variant 별 렌더링
  if (variant === 'default') {
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
                  <Icon src={AlarmIcon} alt='알림' onClick={handleAlarmClick} />
                </>
              ) : (
                <>
                  <Icon
                    src={MypageIcon}
                    alt='마이페이지'
                    onClick={() => navigate('/login')}
                  />
                  <Icon src={AlarmIcon} alt='알림' onClick={handleAlarmClick} />
                </>
              )}
            </RightSection>
          </HeaderContainer>
        </HeaderWrapper>
        <MypageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  if (variant === 'oneDepth') {
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <LeftSection>
            <BackButton
              src={BackButtonIcon}
              alt='뒤로가기'
              onClick={handleBackClick}
            />
          </LeftSection>
          <RightSection>
            {isLoggedIn ? (
              <>
                <Icon
                  src={BasketIcon}
                  alt='장바구니'
                  onClick={handleBasketClick}
                />
                <Icon src={AlarmIcon} alt='알림' onClick={handleAlarmClick} />
              </>
            ) : (
              <>
                <Icon
                  src={MypageIcon}
                  alt='마이페이지'
                  onClick={() => navigate('/login')}
                />
                <Icon src={AlarmIcon} alt='알림' onClick={handleAlarmClick} />
              </>
            )}
          </RightSection>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }

  if (variant === 'twoDepth') {
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <LeftSection>
            <CancelIcon
              src={CancleIconIcon}
              alt='뒤로가기'
              onClick={handleBackClick}
            />
          </LeftSection>
          <CenterSection>
            <Title>{title || ''}</Title>
          </CenterSection>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }

  if (variant === 'threeDepth') {
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <LeftSection>
            <BackButton
              src={BackButtonIcon}
              alt='뒤로가기'
              onClick={handleBackClick}
            />
          </LeftSection>
          <CenterSection>
            <Title>{title || ''}</Title>
          </CenterSection>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }

  return null;
};

export default UnifiedHeader;

// styled-components
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px 30px;
  text-align: center;
  z-index: 100;
  background-color: #fff;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
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

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
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

const BackButton = styled.img`
  width: auto;
  height: auto;
  cursor: pointer;
`;

const CancelIcon = styled.img`
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  margin: 0;
`;
