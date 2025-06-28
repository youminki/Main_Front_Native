import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const Spinner: React.FC = () => {
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = createAnimation(dot1Anim, 0);
    const animation2 = createAnimation(dot2Anim, 150);
    const animation3 = createAnimation(dot3Anim, 300);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, [dot1Anim, dot2Anim, dot3Anim]);

  return (
    <View style={styles.spinnerWrapper}>
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              {
                translateY: dot1Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -12],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              {
                translateY: dot2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -12],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              {
                translateY: dot3Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -12],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 100,
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: '#f6ae24',
    borderRadius: 6,
    marginHorizontal: 6,
  },
});

export default Spinner;
