// src/pages/LockerRoom/PaymentMethod/PaymentMethod.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import StatsSection from '../../../components/StatsSection';
import Spinner from '../../../components/Spinner';
import { useMyCards } from '../../../api/default/payment';
import { CardItem } from '../../../api/default/payment';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserInfo {
  userId: string;
  userName: string;
  userEmail: string;
}

interface CardData {
  registerDate: string;
  brand: string;
  cardNumber: string;
}

const visitLabel = '결제등록 카드';
const salesLabel = '시즌';
const sales = '2025 1분기';
const dateRange = 'SPRING';

const PaymentMethod: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // react-query로 카드 데이터 패칭
  const { data: cardsData, isLoading } = useMyCards();

  const cards: CardData[] =
    cardsData?.items.map((item: CardItem) => ({
      registerDate: item.createdAt
        ? `등록일 ${new Date(item.createdAt).toISOString().slice(0, 10)}`
        : '등록일 알 수 없음',
      brand: item.cardName || '알 수 없음',
      cardNumber: item.cardNumber || '**** **** **** ****',
    })) ?? [];

  const count = cards.length;

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) throw new Error('로그인 필요');
        const res = await fetch('https://api.stylewh.com/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('유저 정보 요청 실패');
        const data = await res.json();
        setUserInfo({
          userId: String(data.id),
          userName: data.name,
          userEmail: data.email,
        });
      } catch (e: unknown) {
        console.error('유저 정보 로딩 실패', e);
        setError(e instanceof Error ? e.message : '알 수 없는 오류');
      }
    })();
  }, []);

  const registerCard = useCallback(() => {
    if (!userInfo) {
      setError('로그인 정보를 불러올 수 없습니다.');
      return;
    }
    setError(null);
    const params = new URLSearchParams({
      userId: userInfo.userId,
      userName: userInfo.userName,
      userEmail: userInfo.userEmail,
    }).toString();
    const url = `/test/AddCardPayple?${params}`;

    // React Native에서는 외부 브라우저로 열기
    Alert.alert('카드 추가', '카드 추가 페이지로 이동하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => {
          Linking.openURL(url).catch(() => {
            Alert.alert('오류', '카드 추가 페이지를 열 수 없습니다.');
          });
        },
      },
    ]);
  }, [userInfo]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>결제수단</Text>
        <Text style={styles.subtitle}>
          나에게 맞는 스타일을 찾을 때는 멜픽!
        </Text>
      </View>

      <StatsSection
        visits={count}
        sales={sales}
        dateRange={dateRange}
        visitLabel={visitLabel}
        salesLabel={salesLabel}
      />

      <View style={styles.divider} />

      {isLoading ? (
        <View style={styles.spinnerWrapper}>
          <Spinner />
        </View>
      ) : (
        <>
          <View style={styles.cardsList}>
            {cards.map((card, idx) => (
              <View key={idx} style={styles.cardItemBox}>
                <View style={styles.chip} />
                <View style={styles.content}>
                  <Text style={styles.brandLogo}>{card.brand}</Text>
                  <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                </View>
                <Text style={styles.dateLabel}>{card.registerDate}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.addCardBox} onPress={registerCard}>
              <View style={styles.plusWrapper}>
                <View style={styles.plusBox}>
                  <View style={styles.plusLineVert} />
                  <View style={styles.plusLineHorz} />
                </View>
                <Text style={styles.addText}>카드 추가</Text>
              </View>
            </TouchableOpacity>
          </View>

          {error && <Text style={styles.errorMsg}>{error}</Text>}

          <View style={styles.dotsWrapper}>
            {Array(cards.length + 1)
              .fill(0)
              .map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.dot, idx === 0 && styles.dotActive]}
                />
              ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default PaymentMethod;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    width: '100%',
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 30,
  },
  cardsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 800,
  },
  spinnerWrapper: {
    justifyContent: 'center',
    paddingVertical: 60,
  },
  cardItemBox: {
    position: 'relative',
    width: 300,
    height: 180,
    borderRadius: 16,
    backgroundColor: '#f6ae24',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 100,
    marginRight: 40,
    gap: 8,
  },
  brandLogo: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 9,
    color: '#ffffff',
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#ffffff',
  },
  dateLabel: {
    position: 'absolute',
    top: 12,
    right: 16,
    fontSize: 12,
    opacity: 0.8,
    color: '#ffffff',
  },
  addCardBox: {
    backgroundColor: '#fff',
    color: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 24,
    maxWidth: 800,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  plusWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  plusBox: {
    position: 'relative',
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusLineVert: {
    position: 'absolute',
    width: 2,
    height: 14,
    backgroundColor: '#ccc',
  },
  plusLineHorz: {
    position: 'absolute',
    width: 14,
    height: 2,
    backgroundColor: '#ccc',
  },
  addText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#999',
  },
  dotsWrapper: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  dotActive: {
    backgroundColor: '#F6AE24',
  },
  errorMsg: {
    color: '#d32f2f',
    marginTop: 12,
  },
});
