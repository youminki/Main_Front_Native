import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import CheckButtonIcon from '../../assets/Landing/CheckButton.svg';
import SampleImage from '../../assets/Landing/SampleImage5.png';

const LandingPage5: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.bulletIcon}>/</Text>
        <Text style={styles.smallTitle}>오직 나만의, 나를 위한 상품</Text>
        <Text style={styles.bigTitle}>
          나만의 스타일을{'\n'}
          <Text style={styles.highlight}>손쉽게 브랜딩</Text> 해보세요
        </Text>
      </View>

      <View style={styles.cardWrapper}>
        <Image source={SampleImage} style={styles.cardImage} />
      </View>

      <View style={styles.bulletList}>
        <View style={styles.bulletItem}>
          <CheckButtonIcon width={16} height={16} style={styles.checkIcon} />
          <Text style={styles.bulletText}>
            누구라도 판매를 시작할 수 있어요
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <CheckButtonIcon width={16} height={16} style={styles.checkIcon} />
          <Text style={styles.bulletText}>
            프리미엄 <Text style={styles.boldSpan}>브랜드의 셀러</Text>가
            되어보세요
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <CheckButtonIcon width={16} height={16} style={styles.checkIcon} />
          <Text style={styles.bulletText}>
            나만의 스타일로 판매 채널을 꾸며보세요
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <CheckButtonIcon width={16} height={16} style={styles.checkIcon} />
          <Text style={styles.bulletText}>
            판매 스케줄을 간편하게 관리해 보세요
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <CheckButtonIcon width={16} height={16} style={styles.checkIcon} />
          <Text style={styles.bulletText}>매출과 수익을 언제든 확인하세요</Text>
        </View>
      </View>

      <View style={styles.bottomBackground} />
    </View>
  );
};

export default LandingPage5;

const styles = StyleSheet.create({
  container: {
    height: 750,
    margin: 0,
    backgroundColor: '#fffbf5',
    borderRadius: 20,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: -1,
  },
  bulletIcon: {
    fontSize: 35,
    marginBottom: 10,
    color: '#ffe8c7',
    transform: [{ rotate: '10deg' }],
  },
  topSection: {
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  smallTitle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 40,
    textAlign: 'center',
    color: '#000',
    marginBottom: 8,
  },
  bigTitle: {
    fontWeight: '700',
    fontSize: 23,
    lineHeight: 30,
    color: '#000',
    margin: 0,
  },
  highlight: {
    color: '#ff7e61',
  },
  cardWrapper: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  cardImage: {
    width: '100%',
    height: 'auto',
  },
  bulletList: {
    margin: 0,
    width: '80%',
    flexDirection: 'column',
    marginRight: 20,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  boldSpan: {
    fontWeight: '800',
  },
  bulletText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 40,
    color: '#000',
    textAlign: 'left',
  },
  bottomBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 500.5,
    backgroundColor: '#fff6d4',
    zIndex: -1,
    // React Native에서는 clip-path를 직접 지원하지 않으므로
    // 필요한 경우 SVG나 다른 방법을 사용해야 합니다
  },
});
