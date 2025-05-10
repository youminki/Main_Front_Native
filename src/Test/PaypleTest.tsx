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
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{
    userId: string;
    userName: string;
    userEmail: string;
  } | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState<boolean>(false);

  // SDK 로딩 상태 확인
  useEffect(() => {
    const checkSdkLoaded = () => {
      const isLoaded = typeof window.PaypleCpayAuthCheck === 'function';
      setSdkLoaded(isLoaded);
      return isLoaded;
    };

    // 초기 확인
    checkSdkLoaded();

    // 5초마다 재확인 (최대 5번)
    let attempts = 0;
    const maxAttempts = 5;
    const interval = setInterval(() => {
      attempts++;
      if (checkSdkLoaded() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ 로그인 유저 정보 불러오기
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
          // 3초 후 로그인 페이지로 리디렉션
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
          return;
        }

        const res = await fetch('https://api.stylewh.com/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError('인증이 만료되었습니다. 다시 로그인해주세요.');
            localStorage.removeItem('accessToken');
            setTimeout(() => {
              window.location.href = '/login';
            }, 3000);
            return;
          }
          throw new Error('로그인 정보 요청 실패');
        }
        
        const data = await res.json();

        setUserInfo({
          userId: String(data.id),
          userName: data.name,
          userEmail: data.email,
        });
      } catch (e: any) {
        console.error('[🔥] 유저 정보 로딩 실패', e);
        setError('로그인 정보를 불러오는 데 실패했습니다: ' + e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ 카드 등록 요청
  const registerCard = useCallback(async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    
    try {
      if (!userInfo) {
        setError('로그인 정보를 불러올 수 없습니다.');
        return;
      }

      if (!sdkLoaded) {
        setError('결제 시스템이 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
        return;
      }

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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          setError('인증이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('accessToken');
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
          return;
        }
        throw new Error('카드 등록 데이터 요청 실패');
      }
      
      const data = await res.json();
      console.log('[✅ 카드 등록용 데이터]', data);

      // ✅ Payple 카드 등록 요청
      window.PaypleCpayAuthCheck({
        ...data,
        PCD_PAY_WORK: 'CERT',
        PCD_SIMPLE_FLAG: 'Y',
        PCD_PAYER_AUTHTYPE: 'pwd',
        PCD_PAY_GOODS: '카드 등록 테스트',
        PCD_PAY_TOTAL: 1000,
      });
    } catch (e: any) {
      console.error('[🔥] 카드 등록 오류:', e);
      setError('카드 등록 중 오류 발생: ' + e.message);
    } finally {
      setLoading(false);
    }
  }, [userInfo, sdkLoaded]);

  // ✅ Payple 콜백 처리
  useEffect(() => {
    window.PCD_PAY_CALLBACK = async (result: any) => {
      console.log('[✅ Payple 결과 수신]', result);
      setLoading(true);
      
      try {
        if (!userInfo) {
          setError('로그인 정보를 찾을 수 없습니다.');
          return;
        }

        if (!result || !result.PCD_PAY_REQKEY) {
          throw new Error('결제 정보가 올바르지 않습니다.');
        }

        const res = await fetch('https://api.stylewh.com/payple/simple-pay-result', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
          },
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
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
          }
          throw new Error(data.message || '카드 등록 실패');
        }

        setSuccessMessage(data.message || '카드 등록이 완료되었습니다.');
        // 성공 메시지 3초 표시 후 리디렉션
        setTimeout(() => {
          // 도메인 일관성 확인 필요 (stylewh.com vs me1pik.com)
          window.location.href = 'https://me1pik.com/payment-method';
        }, 3000);
      } catch (e: any) {
        console.error('[🔥] 서버 전송 오류:', e);
        setError('백엔드 처리 중 오류: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    return () => {
      delete window.PCD_PAY_CALLBACK;
    };
  }, [userInfo]);

  return (
    <Container>
      <Title>Payple 카드 등록하기</Title>
      
      {!sdkLoaded && (
        <Message type='warning'>결제 시스템을 불러오는 중입니다...</Message>
      )}
      
      <Button 
        disabled={!userInfo || loading || !sdkLoaded} 
        onClick={registerCard}
      >
        {loading ? '처리 중...' : '카드 등록하기'}
      </Button>
      
      {error && <Message type='error'>{error}</Message>}
      {successMessage && <Message type='success'>{successMessage}</Message>}
      
      {loading && <LoadingSpinner />}
    </Container>
  );
};

export default PaypleTest;

// ──────────────────────── Styled Components ────────────────────────
const Container = styled.div`
  max-width: 480px;
  margin: 60px auto;
  padding: 32px;
  border-radius: 12px;
  background: #fff8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
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
  width: 100%;
  max-width: 300px;
  
  &:hover {
    background: ${({ disabled }) => (disabled ? '#ccc' : '#e08800')};
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ type?: 'error' | 'success' | 'warning' }>`
  margin-top: 20px;
  font-size: 0.95rem;
  color: ${({ type }) => {
    switch (type) {
      case 'error': return '#d32f2f';
      case 'success': return '#2e7d32';
      case 'warning': return '#ed6c02';
      default: return '#2e7d32';
    }
  }};
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  
  &:after {
    content: '';
    width: 32px;
    height: 32px;
    border: 4px solid #fa9a00;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
