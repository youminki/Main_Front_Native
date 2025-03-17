import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Landing/Header';
import LandingPage1 from '../components/Landing/LandingPage1';
import LandingPage2 from '../components/Landing/LandingPage2';
import LandingPage3 from '../components/Landing/LandingPage3';
import LandingPage4 from '../components/Landing/LandingPage4';
import LandingPage5 from '../components/Landing/LandingPage5';
import LandingPage6 from '../components/Landing/LandingPage6';
import Footer from '../components/Landing/Footer';

type WrapperVariant = 'odd' | 'even';

interface ScrollFadeInProps {
  variant: WrapperVariant;
  children: React.ReactNode;
}

// 전역 스크롤 방향을 감지하는 커스텀 훅
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

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({ variant, children }) => {
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
      variant={variant}
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
        <ScrollFadeIn variant='odd'>
          <LandingPage1 />
        </ScrollFadeIn>
        <ScrollFadeIn variant='even'>
          <LandingPage2 />
        </ScrollFadeIn>
        <ScrollFadeIn variant='odd'>
          <LandingPage3 />
        </ScrollFadeIn>
        <ScrollFadeIn variant='even'>
          <LandingPage4 />
        </ScrollFadeIn>
        <ScrollFadeIn variant='odd'>
          <LandingPage5 />
        </ScrollFadeIn>
        <ScrollFadeIn variant='even'>
          <LandingPage6 />
        </ScrollFadeIn>
      </ContentWrapper>
      <Footer />
    </LandingContainer>
  );
};

export default Landing;

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 50px auto 0;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// FadeInWrapper는 스크롤 방향(scrollDirection) prop에 따라 초기 translateY값을 다르게 적용합니다.
// 스크롤 다운이면 아래에서 위로 (translateY(20px)), 스크롤 업이면 위에서 아래로 (translateY(-20px))
const FadeInWrapper = styled.div<{
  variant: WrapperVariant;
  scrollDirection: 'up' | 'down';
}>`
  width: 100%;
  position: relative;
  margin-bottom: -40px;
  z-index: ${({ variant }) => (variant === 'even' ? 3 : 1)};
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
