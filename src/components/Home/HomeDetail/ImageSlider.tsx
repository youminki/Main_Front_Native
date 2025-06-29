import React, { memo } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export interface ImageSliderProps {
  images: string[];
  currentIndex: number;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  handleMouseDown?: () => void;
}

const ImageSlider: React.FC<ImageSliderProps> = memo(
  ({ images, currentIndex, onSwipeLeft, onSwipeRight }) => {
    const onGestureEvent = (event: any) => {
      if (event.nativeEvent.state === State.END) {
        const { translationX } = event.nativeEvent;
        if (translationX > 50) {
          onSwipeRight();
        } else if (translationX < -50) {
          onSwipeLeft();
        }
      }
    };

    return (
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={styles.slidesWrapper}>
            <TouchableOpacity
              style={styles.arrowLeft}
              onPress={onSwipeRight}
              activeOpacity={0.7}
            >
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>

            <View
              style={[
                styles.slidesContainer,
                { transform: [{ translateX: -currentIndex * width }] },
              ]}
            >
              {images.map((src, idx) => (
                <View key={idx} style={styles.slide}>
                  <Image
                    source={{ uri: src }}
                    style={styles.image}
                    resizeMode='contain'
                  />
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.arrowRight}
              onPress={onSwipeLeft}
              activeOpacity={0.7}
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>

            <View style={styles.indicators}>
              {images.map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.dot, idx === currentIndex && styles.activeDot]}
                />
              ))}
            </View>
          </View>
        </PanGestureHandler>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    height: 500,
  },
  slidesWrapper: {
    flex: 1,
    position: 'relative',
  },
  slidesContainer: {
    flexDirection: 'row',
    width: width * 100, // 충분한 너비
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: 500,
    width: '100%',
    height: '100%',
  },
  arrowLeft: {
    position: 'absolute',
    top: '50%',
    left: 8,
    transform: [{ translateY: -24 }],
    zIndex: 10,
    opacity: 0.7,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
  },
  arrowRight: {
    position: 'absolute',
    top: '50%',
    right: 8,
    transform: [{ translateY: -24 }],
    zIndex: 10,
    opacity: 0.7,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
  },
  arrowText: {
    fontSize: 48,
    color: '#333',
    fontWeight: 'bold',
  },
  indicators: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
  },
  dot: {
    width: 12,
    height: 12,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#FFD700',
  },
});

export default ImageSlider;
