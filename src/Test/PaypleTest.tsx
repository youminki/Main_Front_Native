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
  const [userInfo, setUserInfo] = useState<{
    userId: string;
    userName: string;
    userEmail: string;
  } | null>(null);

  // 로그인 유저 정보 로딩
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://api.stylewh.com/user/me', {
          credentials: 'include',
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

  // 카드 등록 요청
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
        `https://api.stylewh.com/payple/card-register-data?${params}`
      );
      if (!res.ok) throw new Error('카드 등록 데이터 요청 실패');
      const data = await res.json();
      if (typeof window.PaypleCpayAuthCheck !== 'function')
        throw new Error('Payple SDK 준비 오류');
      window.PaypleCpayAuthCheck({
        ...data,
        PCD_PAY_WORK: 'CERT',
        PCD_SIMPLE_FLAG: 'Y',
        PCD_PAYER_AUTHTYPE: 'pwd',
      });
    } catch (e: any) {
      console.error('[🔥] 카드 등록 오류:', e);
      setError('카드 등록 중 오류 발생');
    }
  }, [userInfo]);

  // Payple 콜백 처리
  useEffect(() => {
    window.PCD_PAY_CALLBACK = async (result: any) => {
      console.log('[✅ Payple 결과 수신]', result);
      if (!userInfo) return setError('로그인 정보를 찾을 수 없습니다.');

      try {
        const res = await fetch(
          'https://api.stylewh.com/payple/simple-pay-result',
          {
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
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || '카드 등록 실패');
        setSuccessMessage(data.message || '카드 등록 완료');
        // 등록 완료 후 리다이렉트 및 새로고침
        window.location.href = 'https://me1pik.com/payment-method';
      } catch (e: any) {
        console.error('[🔥] 서버 전송 오류:', e);
        setError('백엔드 처리 중 오류: ' + e.message);
      }
    };
    return () => {
      delete window.PCD_PAY_CALLBACK;
    };
  }, [userInfo]);

  return (
    <Container>
      <Title>Payple 카드 등록</Title>
      <Button disabled={!userInfo} onClick={registerCard}>
        카드 등록하기
      </Button>
      {error && <Message type='error'>{error}</Message>}
      {successMessage && <Message>{successMessage}</Message>}
    </Container>
  );
};

export default PaypleTest;

// Styled Components
const Container = styled.div`
  max-width: 480px;
  margin: 60px auto;
  padding: 32px;
  border-radius: 12px;
  background: #fff8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
`;
const Button = styled.button<{ disabled?: boolean }>`
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 500;
  background: #fa9a00;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #e08800;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
const Message = styled.p<{ type?: 'error' }>`
  margin-top: 20px;
  font-size: 0.95rem;
  color: ${({ type }) => (type === 'error' ? '#d32f2f' : '#2e7d32')};
  font-weight: 500;
`;
