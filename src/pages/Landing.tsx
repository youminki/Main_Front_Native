// src/components/Landing/Landing.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Landing/Header';
import LandingPage1 from '../components/Landing/LandingPage1';
import LandingPage2 from '../components/Landing/LandingPage2';
import LandingPage3 from '../components/Landing/LandingPage3';
import LandingPage4 from '../components/Landing/LandingPage4';
import LandingPage5 from '../components/Landing/LandingPage5';
import LandingPage6 from '../components/Landing/LandingPage6';
import LandingPage7 from '../components/Landing/LandingPage7';
// import BottomNav from '../components/Landing/BottomNav';
import Footer from '../components/Landing/Footer';

interface ScrollFadeInProps {
  children: React.ReactNode;
}

// 스크롤 방향 감지 훅
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDirection;
};

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 뷰포트에 진입 시 visible 처리
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <FadeInWrapper
      ref={ref}
      scrollDirection={scrollDirection}
      className={visible ? 'visible' : ''}
    >
      {children}
    </FadeInWrapper>
  );
};

const Landing: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('landing');

    // 1) 모든 <img> 태그를 수집
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    // 이미지가 하나도 없다면 즉시 로딩 해제
    if (totalImages === 0) {
      setLoading(false);
      return;
    }

    // 2) 이미지 로드/에러 콜백
    const handleImageLoadOrError = () => {
      loadedCount += 1;
      // 모든 이미지가 로드되거나 에러가 난 경우 로딩 해제
      if (loadedCount === totalImages) {
        setLoading(false);
      }
    };

    // 3) 각 이미지마다 load/error 이벤트 리스너 등록
    images.forEach((img) => {
      // 이미 로드가 끝난 이미지라면(캐시 등) 바로 카운트
      if (img.complete) {
        handleImageLoadOrError();
      } else {
        img.addEventListener('load', handleImageLoadOrError);
        img.addEventListener('error', handleImageLoadOrError);
      }
    });

    // clean-up
    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoadOrError);
        img.removeEventListener('error', handleImageLoadOrError);
      });
      document.body.classList.remove('landing');
    };
  }, []);

  // 로딩 중이면 스피너 표시
  if (loading) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    );
  }

  // 로딩 완료 후 랜딩 페이지 표시
  return (
    <LandingContainer>
      {/* 전체 배경을 그리는 래퍼 */}
      <BackgroundWrapper>
        {/* 배경띠2 */}
        <BackgroundStripe2 />
        {/* 배경띠1 */}
        <BackgroundStripe1 />
      </BackgroundWrapper>

      <Header />

      <ContentWrapper>
        {/* 페이지1 */}
        <LandingPage1 />

        {/* 페이지2 ~ 페이지7 */}
        <ScrollFadeIn>
          <LandingPage2 />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <LandingPage3 />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <LandingPage4 />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <LandingPage5 />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <LandingPage6 />
        </ScrollFadeIn>
        <ScrollFadeIn>
          <LandingPage7 />
        </ScrollFadeIn>
      </ContentWrapper>

      {/* Footer에도 애니메이션 효과 적용 */}
      <ScrollFadeIn>
        <Footer />
      </ScrollFadeIn>
    </LandingContainer>
  );
};

export default Landing;

/* ====================== Styled Components ====================== */

const LandingContainer = styled.div`
  position: relative;
  background-color: #f5f5f5; /* 혹은 원하는 색상 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 440px;
  margin: 0 auto;
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  width: 930.88px;
  height: 1299.04px;
  left: -296px;
  top: 34.09px;
`;

const BackgroundStripe2 = styled.div`
  position: absolute;
  width: 1086px;
  height: 170px;
  left: -133.03px;
  top: 737px;
  background: #f6ac36;
  transform: rotate(45deg);
`;

const BackgroundStripe1 = styled.div`
  position: absolute;
  width: 1086px;
  height: 230px;
  left: -126px;
  top: 424px;
  background: #f1bb02;
  transform: rotate(-45deg);
`;

const ContentWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/**
 * FadeInWrapper는 스크롤 시 애니메이션 효과를 주는 컨테이너
 */
const FadeInWrapper = styled.div<{ scrollDirection: 'up' | 'down' }>`
  width: 100%;
  max-width: 700px;
  margin-bottom: 40px;

  overflow: hidden;

  /* 초기 상태 */
  opacity: 0;
  transform: ${({ scrollDirection }) =>
    scrollDirection === 'down'
      ? 'translateY(20px) scale(0.95)'
      : 'translateY(-20px) scale(0.95)'};

  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);

  &.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

/* 로딩 스피너 애니메이션 */
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

/* 로딩 스피너 스타일 (노란색) */
const LoadingSpinner = styled.div`
  border: 8px solid rgba(246, 172, 54, 0.3); /* 반투명 노란색 */
  border-top: 8px solid #f6ac36; /* 노란색 */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

/* 로딩 오버레이 스타일 */
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
