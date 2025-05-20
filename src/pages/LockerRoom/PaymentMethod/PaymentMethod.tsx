// src/pages/LockerRoom/PaymentMethod/PaymentMethod.tsx

import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import Spinner from '../../../components/Spinner';
// import ReusableModal2 from '../../../components/ReusableModal2';
import { getMyCards, CardItem } from '../../../api/default/payment';

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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const PaymentMethod: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const count = cards.length;

  useEffect(() => {
    getMyCards()
      .then((res) => {
        const list = res.data.items.map((item: CardItem) => ({
          registerDate: item.createdAt
            ? `등록일 ${new Date(item.createdAt).toISOString().slice(0, 10)}`
            : '등록일 알 수 없음',
          brand: item.cardName || '알 수 없음',
          cardNumber: item.cardNumber || '****-****-****-****',
        }));
        setCards(list);
      })
      .catch((err) => console.error('카드 목록 조회 실패', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('accessToken');
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
      } catch (e: any) {
        console.error('유저 정보 로딩 실패', e);
        setError(e.message);
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
    const isMobile = window.innerWidth <= 768;
    if (isMobile) window.location.href = url;
    else {
      const w = 360,
        h = 600;
      const left = (window.screen.availWidth - w) / 2;
      const top = (window.screen.availHeight - h) / 2;
      const popup = window.open(
        url,
        'cardAddPopup',
        `width=${w},height=${h},left=${left},top=${top},resizable,scrollbars`
      );
      if (popup) {
        const timer = setInterval(() => {
          if (popup.closed) {
            clearInterval(timer);
            window.location.reload();
          }
        }, 500);
      }
    }
  }, [userInfo]);

  return (
    <Container>
      <Header>
        <Title>결제수단</Title>
        <Subtitle>나에게 맞는 스타일을 찾을 때는 멜픽!</Subtitle>
      </Header>

      <StatsSection
        visits={count}
        sales={sales}
        dateRange={dateRange}
        visitLabel={visitLabel}
        salesLabel={salesLabel}
      />

      <Divider />

      {loading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <CardsList>
            {cards.map((card, idx) => (
              <CardItemBox key={idx}>
                <CardTop>
                  <DateLabel>{card.registerDate}</DateLabel>
                </CardTop>
                <CardBody>
                  <BrandRow>
                    <BrandText>{card.brand}</BrandText>
                  </BrandRow>
                  <NumberText>{card.cardNumber}</NumberText>
                </CardBody>
              </CardItemBox>
            ))}
            <AddCardBox onClick={registerCard}>
              <PlusWrapper>
                <PlusBox>
                  <PlusLineVert />
                  <PlusLineHorz />
                </PlusBox>
                <AddText>카드 추가</AddText>
              </PlusWrapper>
            </AddCardBox>
          </CardsList>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <DotsWrapper>
            {Array(cards.length + 1)
              .fill(0)
              .map((_, idx) => (
                <Dot key={idx} $active={idx === 0} />
              ))}
          </DotsWrapper>
        </>
      )}

      {/* <ReusableModal2
        isOpen={isDeleteModalOpen}
        title='카드 삭제'
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      >
        카드를 삭제하시겠습니까?
      </ReusableModal2> */}
    </Container>
  );
};

export default PaymentMethod;

// Styled Components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 1rem;
  max-width: 1000px;
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #000;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #ccc;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
`;

const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 300px;
  @media (min-width: 1024px) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 0;
  animation: ${fadeIn} 0.5s ease-out;
`;

const CardItemBox = styled.div`
  position: relative;
  height: 180px;
  background: #f6ae24;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  animation: ${fadeInUp} 0.5s ease-out;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
  @media (min-width: 1024px) {
    height: 250px;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
`;

const DateLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 16px 20px;
  @media (min-width: 1024px) {
    padding-bottom: 24px;
  }
`;

const BrandRow = styled.div`
  margin-bottom: 8px;
`;

const BrandText = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #fff;
`;

const NumberText = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: #fff;
`;

const AddCardBox = styled.div`
  height: 180px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${fadeInUp} 0.5s ease-out;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
  @media (min-width: 1024px) {
    height: 250px;
  }
`;

const PlusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const PlusBox = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  background: #fff;
  border: 1px solid #ddd;
`;

const PlusLineVert = styled.div`
  position: absolute;
  left: 9px;
  top: 5px;
  width: 2px;
  height: 10px;
  background: #d9d9d9;
`;

const PlusLineHorz = styled.div`
  position: absolute;
  left: 5px;
  top: 9px;
  width: 10px;
  height: 2px;
  background: #d9d9d9;
`;

const AddText = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: #999;
`;

const DotsWrapper = styled.div`
  display: flex;
  gap: 6px;
  margin: 16px 0;
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#F6AE24' : '#D9D9D9')};
  animation: ${fadeIn} 0.5s ease-out;
`;

const ErrorMsg = styled.p`
  color: #d32f2f;
  margin-top: 12px;
`;
