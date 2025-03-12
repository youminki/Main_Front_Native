// UnifiedHeader.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';

// asset imports
import AlarmIcon from '../assets/Header/AlarmIcon.svg';
import BasketIcon from '../assets/Header/BasketIcon.svg';
import MypageIcon from '../assets/Header/MypageIcon.svg';
import Logo from '../assets/Logo.svg';
import BackButtonIcon from '../assets/BackButton.svg';
import CancleIconIcon from '../assets/Header/CancleIcon.svg';
import ShareIcon from '../assets/Header/ShareIcon.svg';
import HomeIcon from '../assets/Header/HomeIcon.svg';

// 모달 (기본헤더에서 사용)
import MypageModal from '../components/MypageModal';

interface UnifiedHeaderProps {
  variant?: 'default' | 'oneDepth' | 'twoDepth' | 'threeDepth';
  title?: string;
  onBack?: () => void;
  exit?: boolean;
}

// 애니메이션 keyframes (App.tsx의 것과 동일)
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

// 애니메이션을 적용할 래퍼 컴포넌트 (threeDepth에만 사용)
const AnimatedHeaderWrapper = styled.div<{ exit?: boolean }>`
  animation: ${({ exit }) => (exit ? slideOut : slideIn)} 0.3s ease-out;
`;

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  variant = 'default',
  title,
  onBack,
  exit,
}) => {
  const navigate = useNavigate();

  // 로그인 상태 체크
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('사용자');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  // 기본 뒤로가기 핸들러 (애니메이션 효과 적용)
  const handleBackWithAnimation = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // 취소 버튼 (twoDepth)에서는 애니메이션 효과 없이 바로 뒤로가기
  const handleCancel = () => {
    navigate(-1);
  };

  if (variant === 'default') {
    return (
      <>
        <HeaderWrapper>
          <HeaderContainer>
            <LeftSection
              onClick={() => {
                if (isLoggedIn) {
                  setIsModalOpen(true);
                }
              }}
            >
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
                    onClick={() => navigate('/basket')}
                  />
                  <Icon
                    src={AlarmIcon}
                    alt='알림'
                    onClick={() => navigate('/Alarm')}
                  />
                </>
              ) : (
                <>
                  <Icon
                    src={MypageIcon}
                    alt='마이페이지'
                    onClick={() => navigate('/login')}
                  />
                  <Icon
                    src={AlarmIcon}
                    alt='알림'
                    onClick={() => navigate('/Alarm')}
                  />
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
              onClick={handleBackWithAnimation}
            />
          </LeftSection>
          <RightSection>
            {isLoggedIn ? (
              <>
                <Icon
                  src={BasketIcon}
                  alt='장바구니'
                  onClick={() => navigate('/basket')}
                />
                <Icon
                  src={AlarmIcon}
                  alt='알림'
                  onClick={() => navigate('/Alarm')}
                />
              </>
            ) : (
              <>
                <Icon
                  src={MypageIcon}
                  alt='마이페이지'
                  onClick={() => navigate('/login')}
                />
                <Icon
                  src={AlarmIcon}
                  alt='알림'
                  onClick={() => navigate('/Alarm')}
                />
              </>
            )}
          </RightSection>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }

  // twoDepth: 취소 버튼(CancleIconIcon) 클릭 시 애니메이션 효과 없이 바로 뒤로가기
  // 오른쪽 섹션에 ShareIcon과 HomeIcon을 추가함
  if (variant === 'twoDepth') {
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <LeftSection>
            <CancelIcon
              src={CancleIconIcon}
              alt='취소'
              onClick={handleCancel}
            />
          </LeftSection>
          <CenterSection>
            <Title>{title || ''}</Title>
          </CenterSection>
          <RightSection>
            <Icon
              src={ShareIcon}
              alt='공유'
              onClick={() => {
                // 공유 기능 구현
              }}
            />
            <Icon src={HomeIcon} alt='홈' onClick={() => navigate('/')} />
          </RightSection>
        </HeaderContainer>
      </HeaderWrapper>
    );
  }

  // threeDepth: 백 버튼(BackButtonIcon) 클릭 시 exit 애니메이션 효과 적용
  if (variant === 'threeDepth') {
    return (
      <AnimatedHeaderWrapper exit={exit}>
        <HeaderWrapper>
          <HeaderContainer>
            <LeftSection>
              <BackButton
                src={BackButtonIcon}
                alt='뒤로가기'
                onClick={handleBackWithAnimation}
              />
            </LeftSection>
            <CenterSection>
              <Title>{title || ''}</Title>
            </CenterSection>
          </HeaderContainer>
        </HeaderWrapper>
      </AnimatedHeaderWrapper>
    );
  }

  return null;
};

export default UnifiedHeader;

// 기존 스타일들 (변경 없음)
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  padding: 0px 27px;
  text-align: center;
  z-index: 100;
  background-color: #fff;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 69px;
  margin-bottom: 27px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 19px;
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
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const Nickname = styled.span`
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
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  margin: 0;
`;
