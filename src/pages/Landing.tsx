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
}

// 스크롤 방향 감지 훅
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
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
  useEffect(() => {
    document.body.classList.add('landing');
    return () => {
      document.body.classList.remove('landing');
    };
  }, []);

  return (
    <LandingContainer>
      <Header />
      <ContentWrapper>
        <ScrollFadeIn>
          <LandingPage1 />
        </ScrollFadeIn>
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

const LandingContainer = styled.div`
  background-color: aquamarine;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 600px;
  margin: 0 auto;
  overflow-x: hidden;
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
 * 1) height: 600px로 고정
 * 2) position: relative, overflow: hidden
 * 3) 자식(Container)에서 height: 100% 사용
 */
const FadeInWrapper = styled.div<{ scrollDirection: 'up' | 'down' }>`
  /* width: 90%;
  height: 700px;
  position: relative;
  overflow: hidden;

  border-radius: 20px;
  margin-bottom: 40px;
  background-color: #ffffff; */

  /* 페이드 인 애니메이션 */
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
