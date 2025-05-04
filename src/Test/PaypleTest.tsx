import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    cpay?: {
      request: (data: any) => void;
    };
    $?: any;
    jQuery?: any;
  }
}

// --- 외부 스크립트 로더 ---
const loadScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    console.log(`[📦] 스크립트 로드 시도: ${src}`);

    if (document.querySelector(`script[src="${src}"]`)) {
      console.log(`[✔️] 이미 로드된 스크립트: ${src}`);
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    script.onload = () => {
      console.log(`[✅] 스크립트 로드 성공: ${src}`);
      resolve();
    };

    script.onerror = (e) => {
      console.error(`[❌] 스크립트 로드 실패: ${src}`, e);
      reject(new Error(`Failed to load ${src}`));
    };

    document.head.appendChild(script);
  });

// --- Payple SDK와 jQuery 로드 (TSX 안에서만 작동하는 확실한 방식) ---
const loadPaypleSdk = async (): Promise<void> => {
  console.log('[🚀] jQuery 로드 시작');
  await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');

  window.$ = window.jQuery;

  console.log('[🕒] Payple SDK 수동 삽입 시작');
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://democpay.payple.kr/js/cpay.payple.1.0.1.js';
    script.async = true;

    script.onload = () => {
      console.log('[✅] Payple SDK 로드 성공');
      console.log('[🔍] window.cpay 확인:', window.cpay);
      resolve();
    };

    script.onerror = (e) => {
      console.error('[❌] Payple SDK 로드 실패', e);
      reject(new Error('Payple SDK 로딩 실패'));
    };

    document.body.appendChild(script); // ✅ body에 직접 삽입
  });
};

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // SDK 로드
  useEffect(() => {
    (async () => {
      try {
        console.log('[🚀] Payple SDK 로딩 시작');
        await loadPaypleSdk();
        console.log('[🎉] Payple SDK 로딩 완료');
      } catch (e) {
        console.error('[🔥] SDK 또는 jQuery 로딩 중 오류 발생:', e);
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

      <SButton onClick={registerCard} disabled={loading || Boolean(error)}>
        {loading ? '로딩 중...' : '카드 등록하기'}
      </SButton>

      {error ? (
        <SMessage type="error">{error}</SMessage>
      ) : !loading ? (
        <SMessage>SDK 준비 완료! 버튼을 눌러 등록을 시작하세요.</SMessage>
      ) : null}
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
