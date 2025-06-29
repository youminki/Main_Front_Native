import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

import Landing7Img1 from '../../assets/Landing/Landing7Img1.svg';
import Landing7Img2 from '../../assets/Landing/Landing7Img2.svg';
import Landing7Img3 from '../../assets/Landing/Landing7Img3.svg';

const { width: screenWidth } = Dimensions.get('window');
const PHONE_WIDTH = 228;

const LandingPage7: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const scrollLeft = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollLeft / PHONE_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>멜픽으로 관리하세요!</Text>
      <Text style={styles.subtitle}>
        판매에 관련된 모든 진행사항을{'\n'}
        서비스 내에서 편리하게 관리할 수 있어요
      </Text>

      <View style={styles.dotGroup}>
        <View style={[styles.dot, currentIndex === 0 && styles.dotActive]} />
        <View style={[styles.dot, currentIndex === 1 && styles.dotActive]} />
        <View style={[styles.dot, currentIndex === 2 && styles.dotActive]} />
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.phoneWrapper}
        contentContainerStyle={styles.phoneWrapperContent}
      >
        <View style={styles.slide}>
          <Landing7Img1 width={200} height={400} style={styles.phoneImage} />
        </View>
        <View style={styles.slide}>
          <Landing7Img2 width={200} height={400} style={styles.phoneImage} />
        </View>
        <View style={styles.slide}>
          <Landing7Img3 width={200} height={400} style={styles.phoneImage} />
        </View>
      </ScrollView>
    </View>
  );
};

export default LandingPage7;

const styles = StyleSheet.create({
  container: {
    height: 640,
    margin: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    color: '#000000',
    margin: 0,
    marginBottom: 12,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#aaaaaa',
    marginBottom: 20,
  },
  dotGroup: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },
  dotActive: {
    width: 20,
    backgroundColor: '#F5AB35',
  },
  phoneWrapper: {
    width: PHONE_WIDTH,
    height: 490,
    marginTop: 'auto',
    backgroundColor: '#ececec',
    borderWidth: 5,
    borderColor: '#d9d9d9',
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  phoneWrapperContent: {
    flexDirection: 'row',
  },
  slide: {
    width: PHONE_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneImage: {
    width: '100%',
    height: 'auto',
  },
});
