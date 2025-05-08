import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    PaypleCpayAuthCheck?: (data: any) => void;
    PCD_PAY_CALLBACK?: (result: any) => void;
  }
}

const PaypleTest: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ userId: string; userName: string; userEmail: string } | null>(null);

  // ✅ 로그인 유저 정보 로딩
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch('https://api.stylewh.com/users/me', {
          credentials: 'include', // 쿠키 인증 필요 시
        });
        const data = await res.json();
        setUserInfo({
          userId: String(data.id),
          userName: data.name,
          userEmail: data.email,
        });
      } catch (e) {
        console.error('[🔥] 유저 정보 로딩 실패', e);
        setError('로그인 정보를 불러오는 데 실패했습니다.');
      }
    };

    fetchUserInfo();
  }, []);

  const registerCard = useCallback(async () => {
    setError(null);
    setSuccessMessage(null);

    if (!userInfo) {
      setError('로그인 정보를 불러올 수 없습니다.');
      return;
    }

    try {
      const params = new URLSearchParams({
        userId: userInfo.userId,
        userName: userInfo.userName,
        userEmail: userInfo.userEmail,
      });

      const url = `https://api.stylewh.com/payple/card-register-data?${params}`;
      const res = await fetch(url);
      const data = await res.json();

      if (typeof window.PaypleCpayAuthCheck !== 'function') {
        throw new Error('Payple SDK 준비 오류: PaypleCpayAuthCheck 함수가 없음');
      }

      window.PaypleCpayAuthCheck({
        ...data,
        PCD_PAY_WORK: 'CERT',
        PCD_SIMPLE_FLAG: 'Y',
        PCD_PAYER_AUTHTYPE: 'pwd',
      });
    } catch (e) {
      console.error('[🔥] 카드 등록 오류:', e);
      setError('카드 등록 중 오류 발생');
    }
  }, [userInfo]);

  useEffect(() => {
    window.PCD_PAY_CALLBACK = async (result: any) => {
      console.log('[✅ Payple 결과 수신]', JSON.stringify(result, null, 2));

      if (!userInfo) {
        setError('로그인 정보를 찾을 수 없습니다.');
        return;
      }

      try {
        const res = await fetch('https://api.stylewh.com/payple/simple-pay-result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userInfo.userId,
            payerId: result.PCD_PAYER_ID,
            payReqKey: result.PCD_PAY_REQKEY,
            authKey: result.PCD_AUTH_KEY,
            cardName: result.PCD_PAY_CARDNAME ?? '',
            cardNumber: result.PCD_PAY_CARDNUM ?? '',
            goods: '카드 등록',
            amount: 0,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setSuccessMessage(data.message || '카드 등록 완료');
        } else {
          throw new Error(data.message || '카드 등록 실패');
        }
      } catch (e: any) {
        console.error('[🔥] 서버 전송 오류:', e);
        setError('백엔드 처리 중 오류: ' + e.message);
      }
    };
  }, [userInfo]);

  return (
    <SContainer>
      <STitle>Payple 카드 등록</STitle>
      <SButton onClick={registerCard} disabled={!userInfo}>카드 등록하기</SButton>
      {error && <SMessage type="error">{error}</SMessage>}
      {successMessage && <SMessage>{successMessage}</SMessage>}
    </SContainer>
  );
};

export default PaypleTest;
