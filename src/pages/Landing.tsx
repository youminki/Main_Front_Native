import React, { useEffect, useRef, useState } from 'react';
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
