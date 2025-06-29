import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';

import backgroundImage from '../../assets/Landing/7X5A9526.jpg';
import IconLeft from '../../assets/Landing/LandingPage6_icon1.svg';
import IconRight from '../../assets/Landing/LandingPage6_icon2.svg';

const LandingPage6: React.FC = () => {
  const leftIconAnim = useRef(new Animated.Value(1)).current;
  const rightIconAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const createFlickerAnimation = (
      animValue: Animated.Value,
      delay: number = 0
    ) => {
      const flickerSequence = Animated.sequence([
        Animated.timing(animValue, {
          toValue: 0.6,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0.3,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0.9,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0.5,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0.7,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0.2,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0.8,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]);

      setTimeout(() => {
        const startAnimation = () => {
          flickerSequence.start(() => {
            setTimeout(startAnimation, 5000);
          });
        };
        startAnimation();
      }, delay);
    };

    createFlickerAnimation(leftIconAnim, 1000);
    createFlickerAnimation(rightIconAnim, 500);
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <Animated.View
        style={[
          styles.iconLeftImg,
          {
            opacity: leftIconAnim,
            transform: [
              {
                scale: leftIconAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1.05],
                }),
              },
            ],
          },
        ]}
      >
        <IconLeft width={60} height={60} />
      </Animated.View>

      <Animated.View
        style={[
          styles.iconRightImg,
          {
            opacity: rightIconAnim,
            transform: [
              {
                scale: rightIconAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1.05],
                }),
              },
            ],
          },
        ]}
      >
        <IconRight width={60} height={60} />
      </Animated.View>

      <View style={styles.textWrapper}>
        <Text style={styles.smallTitle}>이제는 일일이 찾지 마세요</Text>
        <Text style={styles.bigTitle}>
          브랜드는 멜픽이{'\n'}
          <Text style={styles.pickText}>PICK!</Text> 해줄게요
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LandingPage6;

const styles = StyleSheet.create({
  container: {
    height: 700,
    margin: 0,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 59,
    position: 'relative',
  },
  iconLeftImg: {
    position: 'absolute',
    top: '30%',
    left: 60,
    transform: [{ translateY: -25 }],
  },
  iconRightImg: {
    position: 'absolute',
    top: '40%',
    right: 55,
    transform: [{ translateY: -25 }],
  },
  textWrapper: {
    width: '100%',
    textAlign: 'center',
  },
  smallTitle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
  },
  bigTitle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    color: '#000000',
    margin: 0,
  },
  pickText: {
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    color: '#fd8a2f',
  },
});
