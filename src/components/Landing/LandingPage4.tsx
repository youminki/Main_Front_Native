import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import HangerIcon from '../../assets/Landing/HangerIcon.svg';

import ZOOCImage from '../../assets/Landing/Zooc.jpg';
import SANDROImage from '../../assets/Landing/Sandro.jpg';
import ITMICHAImage from '../../assets/Landing/ItMichaa.jpg';
import CC_Collect from '../../assets/Landing/CC_Collect.jpg';
import DEW_L from '../../assets/Landing/DEW_L.jpg';
import LINE from '../../assets/Landing/LINE.jpg';
import MAJE from '../../assets/Landing/MAJE.jpg';
import MICHAA from '../../assets/Landing/MICHAA.jpg';
import MOJO from '../../assets/Landing/MOJO.jpg';

const BRAND_ITEM_WIDTH = 240;
const BRAND_ITEM_GAP = 20;
const BRAND_COUNT = 9;

const totalWidth =
  BRAND_COUNT * BRAND_ITEM_WIDTH + (BRAND_COUNT - 1) * BRAND_ITEM_GAP;

const LandingPage4: React.FC = () => {
  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startScrollAnimation = () => {
      Animated.timing(scrollAnim, {
        toValue: -totalWidth,
        duration: 30000, // 30초
        useNativeDriver: true,
      }).start(() => {
        scrollAnim.setValue(0);
        startScrollAnimation();
      });
    };

    startScrollAnimation();
  }, []);

  const brands = [
    { img: ZOOCImage, name: 'ZOOC' },
    { img: SANDROImage, name: 'SANDRO' },
    { img: ITMICHAImage, name: 'it MICHA' },
    { img: CC_Collect, name: 'CC Collect' },
    { img: DEW_L, name: 'DEW L' },
    { img: LINE, name: 'LINE' },
    { img: MAJE, name: 'MAJE' },
    { img: MICHAA, name: 'MICHAA' },
    { img: MOJO, name: 'MOJO' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.iconContainer}>
          <HangerIcon width={60} height={60} />
        </View>
        <Text style={styles.smallTitle}>당신의 취향에 꼭 맞는</Text>
        <Text style={styles.largeTitle}>
          컨템포러리 브랜드들이{'\n'}
          <Text style={styles.highlight}>멜픽</Text>과 함께 합니다
        </Text>

        <View style={styles.brandList}>
          <Animated.View
            style={[
              styles.scrollingWrapper,
              {
                transform: [{ translateX: scrollAnim }],
              },
            ]}
          >
            {brands.map((brand, idx) => (
              <View key={idx} style={styles.brand}>
                <Image source={brand.img} style={styles.brandImage} />
                <Text style={styles.brandName}>{brand.name}</Text>
              </View>
            ))}

            {brands.map((brand, idx) => (
              <View key={`clone-${idx}`} style={styles.brand}>
                <Image source={brand.img} style={styles.brandImage} />
                <Text style={styles.brandName}>{brand.name}</Text>
              </View>
            ))}
          </Animated.View>
        </View>

        <Text style={styles.premiumBrandText}>Premium Brand List</Text>
      </View>
    </View>
  );
};

export default LandingPage4;

const styles = StyleSheet.create({
  container: {
    height: 660,
    margin: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainContent: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
  },
  iconContainer: {
    marginBottom: 20,
  },
  smallTitle: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 40,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 10,
  },
  largeTitle: {
    fontWeight: '700',
    fontSize: 23,
    lineHeight: 30,
    textAlign: 'center',
    color: '#000000',
    margin: 0,
    marginBottom: 40,
  },
  highlight: {
    color: '#f6ac36',
  },
  brandList: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 32,
  },
  scrollingWrapper: {
    flexDirection: 'row',
    width: totalWidth * 2,
  },
  brand: {
    flexShrink: 0,
    position: 'relative',
    width: BRAND_ITEM_WIDTH,
    height: 300,
    marginRight: BRAND_ITEM_GAP,
  },
  brandImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  brandName: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -BRAND_ITEM_WIDTH / 2 }, { translateY: -10 }],
    fontWeight: '900',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    color: '#000000',
  },
  premiumBrandText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 30,
    textAlign: 'center',
    color: '#000000',
  },
});
