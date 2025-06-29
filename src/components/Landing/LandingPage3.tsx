import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

import Ion1Src from '../../assets/Landing/LandingPage3_ion1.svg';
import Ion2Src from '../../assets/Landing/LandingPage3_ion2.svg';

const LandingPage3: React.FC = () => {
  const fadeInLeftAnim = useRef(new Animated.Value(0)).current;
  const fadeInRightAnim = useRef(new Animated.Value(0)).current;
  const box2Anim = useRef(new Animated.Value(0)).current;
  const box3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Ion1 애니메이션
    Animated.timing(fadeInLeftAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Ion2 애니메이션 (0.2초 지연)
    setTimeout(() => {
      Animated.timing(fadeInRightAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 200);

    // 박스 애니메이션 (8초 주기)
    const startBoxAnimations = () => {
      // Box2: 25%에서 나타남
      setTimeout(() => {
        Animated.timing(box2Anim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }, 2000);

      // Box3: 50%에서 나타남
      setTimeout(() => {
        Animated.timing(box3Anim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }, 4000);

      // 8초 후 리셋
      setTimeout(() => {
        box2Anim.setValue(0);
        box3Anim.setValue(0);
        startBoxAnimations();
      }, 8000);
    };

    startBoxAnimations();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.bulletIcon}>/</Text>
        <Text style={styles.matchingTitle}>AI Matching System</Text>
        <Text style={styles.mainTitle}>
          당신의 스타일을{'\n'}
          알아서 매칭해드립니다
        </Text>
      </View>

      <View style={styles.middleSection}>
        <View style={styles.imageWrapper}>
          <Animated.View
            style={[
              styles.ion1,
              {
                opacity: fadeInLeftAnim,
                transform: [
                  {
                    translateX: fadeInLeftAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Ion1Src width={47} height={36} />
          </Animated.View>
          <Animated.View
            style={[
              styles.ion2,
              {
                opacity: fadeInRightAnim,
                transform: [
                  {
                    translateX: fadeInRightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Ion2Src width={47} height={36} />
          </Animated.View>
          <View style={styles.styledImage} />

          <View style={styles.smallBoxesContainer}>
            <View style={[styles.smallBox, { top: 200, right: 110 }]}>
              <Text style={styles.smallBoxText1}>
                당신은 스포티한 스타일입니다
              </Text>
            </View>
            <Animated.View
              style={[
                styles.smallBox2,
                { top: 245, right: 135 },
                { opacity: box2Anim },
              ]}
            >
              <Text style={styles.smallBoxText2}>활동적인 옷을 좋아하네요</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.smallBox3,
                { bottom: 50, left: 120 },
                { opacity: box3Anim },
              ]}
            >
              <Text style={styles.smallBoxText3}>
                블랙&화이트 컬러가 많아요
              </Text>
            </Animated.View>
          </View>
        </View>
      </View>

      <Text style={styles.bottomComment}>
        멜픽은 이용자와 브랜드 제품을{'\n'}
        분석하는 AI 기반 매칭 서비스 입니다.
      </Text>
    </View>
  );
};

export default LandingPage3;

const styles = StyleSheet.create({
  container: {
    height: 760,
    margin: 0,
    backgroundColor: '#fbe5e1',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bulletIcon: {
    fontSize: 35,
    marginBottom: 10,
    color: '#fff',
    transform: [{ rotate: '10deg' }],
  },
  topSection: {
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
  },
  matchingTitle: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 40,
    textAlign: 'center',
    color: '#f5ab35',
    marginBottom: 10,
  },
  mainTitle: {
    fontWeight: '700',
    fontSize: 23,
    lineHeight: 30,
    textAlign: 'center',
    color: '#000000',
  },
  middleSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageWrapper: {
    position: 'relative',
    width: 228,
    height: 400,
    backgroundColor: '#ececec',
    borderWidth: 5,
    borderColor: '#ffffff',
    borderRadius: 20,
  },
  styledImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  ion1: {
    position: 'absolute',
    top: 30,
    left: -50,
    width: 47,
    height: 36,
  },
  ion2: {
    position: 'absolute',
    bottom: 230,
    right: -35,
    width: 47,
    height: 36,
    zIndex: 1,
  },
  smallBoxesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  smallBox: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  smallBox2: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  smallBox3: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  smallBoxText1: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  smallBoxText2: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  smallBoxText3: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  bottomComment: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 23,
    textAlign: 'center',
    color: '#040404',
    marginTop: 'auto',
    marginBottom: 43,
  },
});
