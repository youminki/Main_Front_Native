import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    cpay?: {
      request: (data: any) => void;
    };
  }
}

// --- 카드 등록용 데이터 요청 ---
const fetchCardRegisterData = async () => {
  const params = new URLSearchParams({
    userId: '70',
    userName: '황민서',
    userEmail: 'seehm1541@gmail.com',
  });

  const url = `https://api.stylewh.com/payple/card-register-data?${params}`;
  console.log(`[🌐] 카드 등록 데이터 요청: ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`[❌] API 응답 실패 (${res.status}): ${res.statusText}`);
    throw new Error(`서버 오류 ${res.status}`);
  }

  const json = await res.json();
  console.log('[✅] 카드 등록 데이터 수신:', json);
  return json;
};

const PaypleTest: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const registerCard = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchCardRegisterData();

      console.log('[❓] window.cpay:', window.cpay);
      console.log('[❓] window.cpay?.request:', window.cpay?.request);

      if (!window.cpay?.request) {
        throw new Error('Payple SDK 준비 오류: window.cpay.request가 없음');
      }

      console.log('[🟢] 카드 등록 요청 실행');
      window.cpay.request(data);
    } catch (e) {
      console.error('[🔥] 카드 등록 중 오류 발생:', e);
      setError('카드 등록 중 오류가 발생했습니다.');
    }
  }, []);

  return (
    <SContainer>
      <STitle>Payple 카드 등록 테스트</STitle>

      <SButton onClick={registerCard}>카드 등록하기</SButton>

      {error && <SMessage type="error">{error}</SMessage>}
    </SContainer>
  );
};

export default PaypleTest;

// --- 스타일 정의 ---
const SContainer = styled.div`
  max-width: 480px;
  margin: 40px auto;
  padding: 24px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const STitle = styled.h1`
  margin-bottom: 24px;
  font-size: 1.5rem;
  color: #333;
`;

const SButton = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  color: #fff;
  background: #fa9a00;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff7b00;
  }
`;

const SMessage = styled.p<{ type?: 'error' }>`
  margin-top: 16px;
  font-size: 0.9rem;
  color: ${({ type }) => (type === 'error' ? '#d32f2f' : '#666')};
`;
