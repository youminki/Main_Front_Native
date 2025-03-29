// src/components/Landing/Header.tsx
import React from 'react';
import styled from 'styled-components';
import LandingLogoIcon from '../../assets/Landing/LandingLogoIcon.svg';
import ShareIcon from '../../assets/Landing/ShareIcon.svg';

const Header: React.FC = () => {
  const handleShare = async () => {
    const shareUrl = 'https://me1pik.com';
    if (navigator.share) {
      try {
        await navigator.share({
          url: shareUrl,
        });
      } catch (error) {
        console.error('공유 중 에러 발생:', error);
      }
    } else {
      alert('이 브라우저는 공유 기능을 지원하지 않습니다.');
    }
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <NaverCounterInline />
      </LeftSection>
      <CenterSection>
        <Logo src={LandingLogoIcon} alt='Landing Logo' />
      </CenterSection>
      <RightSection>
        <ShareButton onClick={handleShare}>
          <Icons src={ShareIcon} alt='Share Icon' />
        </ShareButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;

const NaverCounterInline: React.FC = () => {
  const [viewCount, setViewCount] = React.useState<number>(0);

  // 조회수 데이터를 가져오는 함수 (실제 API 주소와 응답 구조에 맞게 수정)
  const fetchViewCount = () => {
    fetch('https://api.naver.com/viewcount?site=https://me1pik.com/#/landing')
      .then((res) => res.json())
      .then((data) => {
        // 응답 데이터에 count 필드가 있다고 가정
        setViewCount(data.count);
      })
      .catch((error) => console.error('조회수 데이터 가져오기 실패:', error));
  };

  React.useEffect(() => {
    fetchViewCount();
    // 1분마다 조회수 업데이트 (60000ms)
    const interval = setInterval(fetchViewCount, 60000);
    return () => clearInterval(interval);
  }, []);

  return <CounterText> 조회수: {viewCount}</CounterText>;
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: 50px;
  display: flex;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
  z-index: 1000;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;

const Logo = styled.img`
  height: 24px;
  width: auto;
`;

const ShareButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Icons = styled.img`
  height: 20px;
  width: auto;
`;

const CounterText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  color: #333;
`;
