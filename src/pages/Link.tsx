// src/components/Link.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

import phoneMock from '../assets/Link/phone-mock.png';
import melpikLogo from '../assets/Link/melpik-logo.svg';
import couponCard from '../assets/Link/couponCard.svg';
import CheckIcon from '../assets/Link/CheckIcon.svg';

const Link: React.FC = () => {
  const navigation = useNavigation();

  // 복사할 코드(예시)
  const couponCode = 'ABC2QWR345';

  // 복사 상태 관리
  const [isCopied, setIsCopied] = useState(false);

  // 클립보드 복사 함수
  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(couponCode);
      setIsCopied(true);
      // 2초 후에 원래 상태로 돌려놓고 싶다면 아래 주석 해제
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      Alert.alert('오류', '복사에 실패했습니다.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* ─── 히어로 섹션 ───────────────────────────────────────────────────────────────────── */}
      <View style={styles.hero}>
        <View style={styles.phoneContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/500x800' }}
            style={styles.phoneImage}
            resizeMode='contain'
          />
          <View style={[styles.bubble, { top: '48%', left: '10%' }]}>
            <Text style={styles.bubbleText}>
              나도 이제 프리미엄 브랜드 셀러!
            </Text>
          </View>
          <View style={[styles.bubble, { top: '60%', left: '20%' }]}>
            <Text style={styles.bubbleText}>나만의 스타일을 손쉽게 브랜딩</Text>
          </View>
        </View>

        <View style={styles.heroText}>
          <Text style={styles.title}>
            당신의 스타일을 {'\n'}
            <Text style={styles.highlight}>알아서 매칭</Text>해 드립니다
          </Text>
          <Text style={styles.subTitle}>AI기반 브랜드 매칭 서비스 멜픽</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/120x60' }}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>
      </View>

      {/* ─── 기능 소개 섹션 ───────────────────────────────────────────────────────────────── */}
      <View style={styles.featureSection}>
        <Text style={styles.featureTitle}>
          브랜드를{' '}
          <Text style={styles.yellowHighlight}>
            <Text style={styles.dotChar}>구</Text>
            <Text style={styles.dotChar}>독</Text>
          </Text>
          하다
        </Text>
        <Text style={styles.featureSubtitle}>
          <Text style={styles.pinkHighlight}>구매와 판매, 대여</Text>까지
          {'\n'}{' '}
          <Text style={styles.middleHighlight}>모두 멜픽에서 한 번에!</Text>
        </Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.featureText}>
              <Text style={styles.sevenHighlight}>AI가 분석</Text>해주는 나만의
              맞춤형 스타일
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.featureText}>
              컨템포러리 브랜드를 다양하게 즐긴 후
              <Text style={styles.sevenHighlight}> 구매까지</Text>
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.featureText}>
              나만의 스타일을 브랜딩하여
              <Text style={styles.sevenHighlight}> SNS에 판매</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* ─── 카드 & 구독 섹션 ───────────────────────────────────────────────────────────────── */}
      <View style={styles.cardSection}>
        <View style={styles.cardWrapper}>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>지금 받을 수 있는</Text>
            <Text style={styles.cardHighlight}>신규 회원 더블 혜택</Text>
            <Text style={styles.cardDesc}>
              지금 멜픽을 구독하면 {'\n'}
              10% 할인 멤버십에서{' '}
              <Text style={styles.pinkHighlight}>10% 추가할인</Text>까지!
            </Text>
          </View>
          <Image
            source={{ uri: 'https://via.placeholder.com/300x200' }}
            style={styles.couponImage}
            resizeMode='contain'
          />
        </View>

        {/* ─── 코드 입력 레이블 + 읽기 전용 인풋 + 복사 버튼 ─────────────────────────────── */}
        <View style={styles.codeInputRow}>
          <Text style={styles.codeLabel}>코드 입력</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.codeInput}
              value={couponCode}
              editable={false}
            />
            <TouchableOpacity
              style={[styles.copyButton, isCopied && styles.copyButtonCopied]}
              onPress={handleCopy}
            >
              <Text style={styles.copyButtonText}>
                {isCopied ? '복사됨' : '복사'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => navigation.navigate('Landing' as never)}
        >
          <Text style={styles.subscribeButtonText}>멜픽 구독하러 가기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Link;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6efe5',
  },
  hero: {
    position: 'relative',
    width: '100%',
    height: 360,
    marginBottom: 40,
  },
  phoneContainer: {
    position: 'absolute',
    left: '50%',
    top: '25%',
    transform: [{ translateX: -250 }],
  },
  phoneImage: {
    width: 500,
    height: 800,
  },
  bubble: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bubbleText: {
    fontSize: 14,
  },
  heroText: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'flex-end',
    maxWidth: '80%',
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 8,
    color: '#333',
    lineHeight: 28,
  },
  highlight: {
    color: '#000',
    fontWeight: '800',
  },
  dotChar: {
    position: 'relative',
  },
  yellowHighlight: {
    color: '#f6ac36',
    fontWeight: '800',
    fontSize: 40,
  },
  pinkHighlight: {
    color: '#fd7f61',
    fontWeight: '800',
  },
  sevenHighlight: {
    color: '#000',
    fontWeight: '700',
    marginLeft: 2,
  },
  middleHighlight: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 28,
    lineHeight: 42,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  logo: {
    width: 120,
    height: 60,
  },
  featureSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  featureTitle: {
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 40,
  },
  featureSubtitle: {
    fontSize: 24,
    color: '#666',
    marginBottom: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
  featureList: {
    maxWidth: 360,
    alignItems: 'flex-start',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#4CAF50',
  },
  featureText: {
    fontSize: 15,
    color: '#444',
    flex: 1,
  },
  cardSection: {
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    padding: 40,
  },
  cardWrapper: {
    alignItems: 'center',
    gap: 20,
    marginBottom: 28,
  },
  cardText: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 21,
    color: '#000',
  },
  cardHighlight: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 4,
    color: '#333',
  },
  cardDesc: {
    fontSize: 16,
    color: '#000',
    lineHeight: 22,
    textAlign: 'center',
  },
  couponImage: {
    width: 300,
    height: 200,
  },
  codeInputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  codeLabel: {
    fontSize: 19,
    fontWeight: '700',
    color: '#333',
    width: 80,
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: 400,
  },
  codeInput: {
    height: 48,
    paddingHorizontal: 12,
    paddingRight: 60,
    fontSize: 21,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    backgroundColor: '#fdfdfd',
    fontWeight: '400',
    color: '#282828',
  },
  copyButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    height: 32,
    paddingHorizontal: 12,
    backgroundColor: '#282828',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButtonCopied: {
    backgroundColor: '#4caf50',
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  subscribeButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
});
