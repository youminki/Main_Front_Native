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

import Footer from '../components/Landing/Footer';

import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ScrollFadeInProps {
  children: React.ReactNode;
}

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({ children }) => {
  return <View style={styles.fadeInWrapper}>{children}</View>;
};

const Landing: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 이미지 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size='large' color='#f6ac36' />
      </View>
    );
  }

  return (
    <View style={styles.landingContainer}>
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundStripe2} />
        <View style={styles.backgroundStripe1} />
      </View>

      <Header />

      <ScrollView
        style={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
      >
        <LandingPage1 />

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
      </ScrollView>

      <ScrollFadeIn>
        <Footer />
      </ScrollFadeIn>
    </View>
  );
};

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  backgroundWrapper: {
    position: 'absolute',
    width: 930.88,
    height: 1299.04,
    left: -296,
    top: 34.09,
  },
  backgroundStripe2: {
    position: 'absolute',
    width: 1086,
    height: 170,
    left: -13.03,
    top: 777,
    backgroundColor: '#f6ac36',
    transform: [{ rotate: '30deg' }],
  },
  backgroundStripe1: {
    position: 'absolute',
    width: 1086,
    height: 230,
    left: -6,
    top: 304,
    backgroundColor: '#f1bb02',
    transform: [{ rotate: '-45deg' }],
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  fadeInWrapper: {
    opacity: 1,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Landing;

const LandingContainer = styled.div`
  position: relative;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  padding: 0 20px;
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
  left: -13.03px;
  top: 777px;
  background: #f6ac36;
  transform: rotate(30deg);
`;

const BackgroundStripe1 = styled.div`
  position: absolute;
  width: 1086px;
  height: 230px;
  left: -6px;
  top: 304px;
  background: #f1bb02;
  transform: rotate(-45deg);
`;

const ContentWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FadeInWrapper = styled.div<{ scrollDirection: 'up' | 'down' }>`
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;

  overflow: hidden;

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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 8px solid rgba(246, 172, 54, 0.3);
  border-top: 8px solid #f6ac36;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

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
