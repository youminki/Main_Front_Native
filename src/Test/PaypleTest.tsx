// src/pages/Test/PaypleTest.tsx
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    cpay?: {
      request: (data: any) => void;
    };
  }
}

// --- 유틸 함수: 외부 스크립트 로드 ---
const loadScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

// --- 유틸 함수: Payple SDK와 jQuery 순차 로드 ---
const loadPaypleSdk = async (): Promise<void> => {
  await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
  await loadScript('https://democpay.payple.kr/js/cpay.payple.1.0.1.js');
};

// --- 유틸 함수: 카드 등록용 데이터 Fetch ---
const fetchCardRegisterData = async () => {
  const params = new URLSearchParams({
    userId: '70',
    userName: '황민서',
    userEmail: 'seehm1541@gmail.com',
  });
  const res = await fetch(
    `https://api.stylewh.com/payple/card-register-data?${params}`,
    {
      headers: { Authorization: 'Bearer YOUR_ACCESS_TOKEN' },
    }
  );
  if (!res.ok) {
    throw new Error(`서버 오류 ${res.status}`);
  }
  return res.json();
};

const PaypleTest: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // SDK 로드
  useEffect(() => {
    (async () => {
      try {
        await loadPaypleSdk();
      } catch (e) {
        console.error(e);
        setError('스크립트 로딩에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 카드 등록 핸들러
  const registerCard = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchCardRegisterData();
      if (!window.cpay?.request) {
        throw new Error('Payple SDK 준비 오류');
      }
      window.cpay.request(data);
    } catch (e) {
      console.error(e);
      setError('카드 등록 중 오류가 발생했습니다.');
    }
  }, []);

  return (
    <SContainer>
      <STitle>Payple 카드 등록 테스트</STitle>

      <SButton onClick={registerCard} disabled={loading || Boolean(error)}>
        {loading ? '로딩 중...' : '카드 등록하기'}
      </SButton>

      {error ? (
        <SMessage type='error'>{error}</SMessage>
      ) : !loading ? (
        <SMessage>SDK 준비 완료! 버튼을 눌러 등록을 시작하세요.</SMessage>
      ) : null}
    </SContainer>
  );
};

export default PaypleTest;

// --- Styled Components ---
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

const SButton = styled.button<{ disabled?: boolean }>`
  padding: 12px 24px;
  font-size: 1rem;
  color: #fff;
  background: ${({ disabled }) => (disabled ? '#aaa' : '#fa9a00')};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s;
  &:hover {
    background: ${({ disabled }) => (disabled ? '#aaa' : '#ff7b00')};
  }
`;

const SMessage = styled.p<{ type?: 'error' }>`
  margin-top: 16px;
  font-size: 0.9rem;
  color: ${({ type }) => (type === 'error' ? '#d32f2f' : '#666')};
`;
