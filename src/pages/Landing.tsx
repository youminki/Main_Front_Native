// src/components/Landing/Landing.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Landing/Header';
import LandingPage1 from '../components/Landing/LandingPage1';
import LandingPage2 from '../components/Landing/LandingPage2';
import LandingPage3 from '../components/Landing/LandingPage3';
import LandingPage4 from '../components/Landing/LandingPage4';
import LandingPage5 from '../components/Landing/LandingPage5';
import LandingPage6 from '../components/Landing/LandingPage6';
import LandingPage7 from '../components/Landing/LandingPage7';
import BottomNav from '../components/Landing/BottomNav';
import Footer from '../components/Landing/Footer';

interface ScrollFadeInProps {
  children: React.ReactNode;
  pageHeight?: number; // 기본값 700px (페이지 높이)
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

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({
  children,
  pageHeight = 700,
}) => {
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
      pageHeight={pageHeight}
      className={visible ? 'visible' : ''}
    >
      {children}
    </FadeInWrapper>
  );
};

const Landing: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('landing');
    return () => {
      document.body.classList.remove('landing');
    };
  }, []);

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
      <BottomNav />
      <Footer />
    </LandingContainer>
  );
};

export default Landing;

/* ====================== Styled Components ====================== */

/**
 * LandingContainer에 position: relative를 주어,
 * 내부에서 절대 배치되는 배경 띠들이 뒤에 깔리도록 함
 */
const LandingContainer = styled.div`
  position: relative;
  background-color: #f5f5f5; /* 혹은 aquamarine 대신 원하는 색상 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 440px;
  margin: 0 auto;
  overflow-x: hidden;
`;

/**
 * 전체 배경을 그리는 래퍼
 * - z-index: -1로 설정해 콘텐츠보다 뒤로 보이게 함
 */
const BackgroundWrapper = styled.div`
  position: absolute;
  width: 930.88px;
  height: 1299.04px;
  left: -296px;
  top: 34.09px;
`;

/** 배경띠2 */
const BackgroundStripe2 = styled.div`
  position: absolute;
  width: 1086px;
  height: 170px;
  left: -133.03px;
  top: 737px;
  background: #f6ac36;
  transform: rotate(45deg);
`;

/** 배경띠1 */
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
  margin-top: 100px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/**
 * FadeInWrapper는 각 페이지의 컨테이너
 * - 반응형 너비(최대 700px)
 * - pageHeight prop을 통해 페이지 높이 지정 (기본: 700px)
 * - 아래 간격 40px (마지막 제외)
 */
const FadeInWrapper = styled.div<{
  scrollDirection: 'up' | 'down';
  pageHeight: number;
}>`
  width: 100%;
  max-width: 700px;
  height: ${({ pageHeight }) => pageHeight}px;
  margin-bottom: 40px;
  border-radius: 10px;
  overflow: hidden;
  opacity: 0;
  transform: ${({ scrollDirection }) =>
    scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(-20px)'};
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
