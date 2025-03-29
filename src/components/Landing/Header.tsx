import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LandingLogoIcon from '../../assets/Landing/LandingLogoIcon.svg';
import ShareIcon from '../../assets/Landing/ShareIcon.svg';

const Header: React.FC = () => {
  const [viewCount, setViewCount] = useState<number | null>(null);

  // 조회수 API 호출 (실제 API URL 및 데이터 구조에 맞게 수정하세요)
  useEffect(() => {
    // Basic 인증 헤더에 사용할 값 (유민기:8snSK5KjQFyyPmGZZFSxuw)
    const authHeader = 'Basic 7Jyg66+86riwOjhzblNLNUtqUUZ5eVBtR1paRlN4dXc=';

    fetch('/api/views', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setViewCount(data.count);
      })
      .catch((error) => {
        console.error('조회수 불러오기 에러:', error);
      });
  }, []);

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
      <ViewCount>
        {viewCount !== null ? `${viewCount} 조회` : '조회수 로딩 중...'}
      </ViewCount>
      <Logo src={LandingLogoIcon} alt='Landing Logo' />
      <ShareButton onClick={handleShare}>
        <Icons src={ShareIcon} alt='Share Icon' />
      </ShareButton>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  z-index: 1000;
  border-bottom: 1px solid #eee;
`;

const ViewCount = styled.div`
  position: absolute;
  left: 20px;
  font-size: 14px;
  color: #333;
`;

const Logo = styled.img`
  height: 24px;
  width: auto;
`;

const ShareButton = styled.button`
  position: absolute;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Icons = styled.img`
  height: 20px;
  width: auto;
`;
