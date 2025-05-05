import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    PaypleCpayAuthCheck?: (data: any) => void;
  }
}

const PaypleTest: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const registerCard = useCallback(async () => {
    setError(null);
    setSuccessMessage(null);
    try {
      const params = new URLSearchParams({
        userId: '70',
        userName: '황민서',
        userEmail: 'seehm1541@gmail.com',
      });

      const url = `https://api.stylewh.com/payple/card-register-data?${params}`;
      const res = await fetch(url);
      const data = await res.json();

      if (typeof window.PaypleCpayAuthCheck !== 'function') {
        throw new Error('Payple SDK 준비 오류: PaypleCpayAuthCheck 함수가 없음');
      }

      window.PaypleCpayAuthCheck(data);
    } catch (e) {
      console.error('[🔥] 카드 등록 오류:', e);
      setError('카드 등록 중 오류 발생');
    }
  }, []);

  const payWithCard = useCallback(async () => {
    setError(null);
    setSuccessMessage(null);
    try {
      // TODO: 실제 authKey, payReqKey는 서버에서 DB 조회로 처리할 수 있도록 사용자 인증 기반으로 구성
      const body = {
        payerId: 'd292WFRocmJuYlJOWnAvbmtTamdJQT09',
        authKey: '등록 시 받은 PCD_AUTH_KEY',
        payReqKey: '등록 시 받은 PCD_PAY_REQKEY',
        goods: '결제 상품명',
        amount: 100,
      };

      const res = await fetch('https://api.stylewh.com/payple/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (res.ok) {
        console.log('[✅] 결제 성공:', result);
        setSuccessMessage('결제가 성공적으로 완료되었습니다.');
      } else {
        throw new Error(result.message || '결제 실패');
      }
    } catch (e: any) {
      console.error('[🔥] 결제 오류:', e);
      setError('결제 중 오류 발생: ' + e.message);
    }
  }, []);

  return (
    <SContainer>
      <STitle>Payple 테스트</STitle>
      <SButton onClick={registerCard}>카드 등록하기</SButton>
      <SButton onClick={payWithCard}>등록된 카드로 결제하기</SButton>

      {error && <SMessage type="error">{error}</SMessage>}
      {successMessage && <SMessage>{successMessage}</SMessage>}
    </SContainer>
  );
};

export default PaypleTest;

// 스타일
const SContainer = styled.div`
  max-width: 480px;
  margin: 40px auto;
  padding: 24px;
  text-align: center;
`;

const STitle = styled.h1`
  margin-bottom: 24px;
  font-size: 1.5rem;
`;

const SButton = styled.button`
  margin: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  color: white;
  background: #fa9a00;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SMessage = styled.p<{ type?: 'error' }>`
  margin-top: 16px;
  color: ${({ type }) => (type === 'error' ? '#d32f2f' : '#2e7d32')};
`;
