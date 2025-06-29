import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

declare global {
  interface Window {
    PaypleCpayAuthCheck?: (data: any) => void;
    PCD_PAY_CALLBACK?: (result: any) => void;
  }
}

const PaypleTest = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{
    userId: string;
    userName: string;
    userEmail: string;
  } | null>(null);
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('토큰이 없습니다.');

        const res = await fetch('https://api.stylewh.com/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('로그인 정보 요청 실패');
        const data = await res.json();

        setUserInfo({
          userId: String(data.id),
          userName: data.name,
          userEmail: data.email,
        });
      } catch (e: any) {
        console.error('[🔥] 유저 정보 로딩 실패', e);
        setError('로그인 정보를 불러오는 데 실패했습니다.');
      }
    })();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        const res = await fetch('https://api.stylewh.com/card/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('카드 목록 요청 실패');
        const data = await res.json();
        setCards(data.items);
      } catch (err) {
        console.error('[🔥] 카드 목록 로딩 실패', err);
      }
    };

    fetchCards();
  }, []);

  const registerCard = useCallback(async () => {
    setError(null);
    setSuccessMessage(null);
    if (!userInfo) return setError('로그인 정보를 불러올 수 없습니다.');

    try {
      const params = new URLSearchParams({
        userId: userInfo.userId,
        userName: userInfo.userName,
        userEmail: userInfo.userEmail,
      });

      const res = await fetch(
        `https://api.stylewh.com/payple/card-register-data?${params}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem('accessToken') || ''
            }`,
          },
        }
      );
      if (!res.ok) throw new Error('카드 등록 데이터 요청 실패');

      const data = await res.json();
      // console.log('[✅ 카드 등록용 데이터]', data);

      if (typeof window.PaypleCpayAuthCheck !== 'function') {
        console.error('[❌ Payple SDK 로딩 실패]');
        throw new Error('Payple SDK 준비 오류');
      }

      window.PaypleCpayAuthCheck({
        ...data,
        PCD_PAY_WORK: 'CERT',
        PCD_SIMPLE_FLAG: 'Y',
        PCD_PAYER_AUTHTYPE: 'pwd',
        PCD_PAY_GOODS: '카드 등록 테스트',
        PCD_PAY_TOTAL: 101,
      });
    } catch (e: any) {
      console.error('[🔥] 카드 등록 오류:', e);
      setError('카드 등록 중 오류 발생: ' + e.message);
    }
  }, [userInfo]);

  const requestPayPasswordPopup = async (payerId: string) => {
    try {
      // console.log('🧾 PAYER_ID to use:', payerId);
      if (!payerId || typeof payerId !== 'string' || payerId.trim() === '') {
        alert('유효한 카드가 없습니다.');
        return;
      }

      const token = localStorage.getItem('accessToken');
      const res = await fetch('https://api.stylewh.com/payple/init-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ payerId, goods: '테스트 상품', amount: 102 }),
      });

      const data = await res.json();
      if (typeof window.PaypleCpayAuthCheck !== 'function')
        throw new Error('Payple SDK 준비 오류');
      window.PaypleCpayAuthCheck(data);
    } catch (e) {
      console.error('[🔥] 결제창 호출 실패', e);
      alert('결제창 호출 중 오류 발생');
    }
  };

  useEffect(() => {
    window.PCD_PAY_CALLBACK = async (result: any) => {
      // console.log('[✅ Payple 결과 수신]', result);
      if (!userInfo) return setError('로그인 정보를 찾을 수 없습니다.');

      try {
        const res = await fetch(
          'https://api.stylewh.com/payple/confirm-payment',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              PCD_AUTH_KEY: result.PCD_AUTH_KEY,
              PCD_PAY_REQKEY: result.PCD_PAY_REQKEY,
              PCD_PAYER_ID: result.PCD_PAYER_ID,
              PCD_PAY_GOODS: result.PCD_PAY_GOODS,
              PCD_PAY_TOTAL: result.PCD_PAY_TOTAL,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok || data.PCD_PAY_RST !== 'success') {
          throw new Error(data.PCD_PAY_MSG || '결제 실패');
        }
        setSuccessMessage('✅ 결제 성공: ' + data.PCD_PAY_OID);
      } catch (e: any) {
        console.error('[🔥] 결제 승인 오류:', e);
        setError('결제 승인 실패: ' + e.message);
      }
    };
    return () => {
      delete window.PCD_PAY_CALLBACK;
    };
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payple 테스트</Text>
      {/* 실제 테스트 UI/로직을 여기에 구현 */}
    </View>
  );
};

export default PaypleTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
