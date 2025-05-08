// src/Test/PaypleTest.tsx
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
        const res = await fetch('/user/me', { credentials: 'include' });
        if (res.status === 401) throw new Error('로그인이 필요합니다.');
        if (!res.ok) throw new Error('유저 정보 요청 실패');
        const data = await res.json();
        setUserInfo({
          userId: String(data.id),
          userName: data.name,
          userEmail: data.email,
        });
      } catch (e: any) {
        console.error('[🔥] 유저 정보 로딩 실패', e);
        setError(e.message || '로그인 정보를 불러오는 데 실패했습니다.');
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
      const res = await fetch(`/payple/card-register-data?${params}`);
      if (!res.ok) throw new Error('카드 등록 데이터 요청 실패');
      const data = await res.json();
      if (typeof window.PaypleCpayAuthCheck !== 'function')
        throw new Error('결제 SDK가 준비되지 않았습니다.');
      window.PaypleCpayAuthCheck({
        ...data,
        PCD_PAY_WORK: 'CERT',
        PCD_SIMPLE_FLAG: 'Y',
        PCD_PAYER_AUTHTYPE: 'pwd',
      });
    } catch (e: any) {
      console.error('[🔥] 카드 등록 오류:', e);
      setError(e.message || '카드 등록 중 오류 발생');
    }
  }, [userInfo]);

  // Payple 콜백 처리
  useEffect(() => {
    window.PCD_PAY_CALLBACK = async (result: any) => {
      console.log('[✅ Payple 결과]', result);
      if (!userInfo) return setError('로그인 정보를 찾을 수 없습니다.');

      try {
        const res = await fetch('/payple/simple-pay-result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userInfo.userId,
            payerId: result.PCD_PAYER_ID,
            payReqKey: result.PCD_PAY_REQKEY,
            authKey: result.PCD_AUTH_KEY,
            cardName: result.PCD_PAY_CARDNAME || '',
            cardNumber: result.PCD_PAY_CARDNUM || '',
            goods: '카드 등록',
            amount: 0,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || '카드 등록 실패');
        setSuccessMessage(data.message || '카드 등록이 완료되었습니다.');
        window.location.href = '/payment-method';
      } catch (e: any) {
        console.error('[🔥] 서버 전송 오류:', e);
        setError(e.message || '서버 처리 중 오류 발생');
      }
    };
    return () => {
      delete window.PCD_PAY_CALLBACK;
    };
  }, [userInfo]);

  return (
    <Wrapper>
      <Card>
        <Heading>카드 등록</Heading>
        <SubText>카드를 등록하고 더 편리하게 이용하세요.</SubText>
        <Button onClick={registerCard} disabled={!userInfo}>
          카드 등록하기
        </Button>
        {error && <Message type='error'>{error}</Message>}
        {successMessage && <Message>{successMessage}</Message>}
      </Card>
    </Wrapper>
  );
};

export default PaypleTest;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;
const Card = styled.div`
  width: 360px;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
const Heading = styled.h2`
  margin-bottom: 16px;
  font-size: 1.5rem;
  color: #333;
`;
const SubText = styled.p`
  margin-bottom: 24px;
  font-size: 0.9rem;
  color: #666;
`;
const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background: ${({ disabled }) => (disabled ? '#ccc' : '#007aff')};
  border: none;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s;
  &:hover {
    background: ${({ disabled }) => (disabled ? '#ccc' : '#0051a8')};
  }
`;
const Message = styled.p<{ type?: 'error' }>`
  margin-top: 16px;
  font-size: 0.875rem;
  color: ${({ type }) => (type === 'error' ? '#e53935' : '#43a047')};
`;
