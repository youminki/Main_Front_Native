import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import ReusableModal2 from '../../../components/ReusableModal2';

import { getMyCards, CardItem } from '../../../api/default/payment';
import { Trash2 as DeleteIconSVG } from 'lucide-react';

interface UserInfo {
  userId: string;
  userName: string;
  userEmail: string;
}

interface CardData {
  count: number;
  registerDate: string;
  brand: string;
  cardNumber: string;
}

const visitLabel = '결제등록 카드';
const salesLabel = '시즌';

const sales = '2025 1분기';
const dateRange = 'SPRING';

const PaymentMethod: React.FC = () => {
  const [currentCard] = useState(0);
  const [cards, setCards] = useState<CardData[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 카드 목록 불러오기
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
      .catch((err) => console.error('카드 목록 조회 실패', err));
  }, []);

  // 유저 정보 로드
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

  // 카드 삭제 모달 처리
  const openDeleteModal = (idx: number) => {
    setSelectedIdx(idx);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    if (selectedIdx !== null)
      setCards((prev) => prev.filter((_, i) => i !== selectedIdx));
    setSelectedIdx(null);
    setIsDeleteModalOpen(false);
  };

  // 카드 등록: 모바일은 페이지 이동, 데스크탑은 팝업
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
    if (isMobile) {
      window.location.href = url;
    } else {
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
        visits={cards.length.toString()}
        sales={sales}
        dateRange={dateRange}
        visitLabel={visitLabel}
        salesLabel={salesLabel}
      />
      <Divider />
      <CardsList>
        {cards.map((card, idx) => (
          <CardItemBox key={idx}>
            <CardTop>
              <DateLabel>{card.registerDate}</DateLabel>
              <DeleteButton onClick={() => openDeleteModal(idx)}>
                <DeleteIconSVG size={16} />
              </DeleteButton>
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
            <Dot key={idx} $active={idx === currentCard} />
          ))}
      </DotsWrapper>
      <ReusableModal2
        isOpen={isDeleteModalOpen}
        title='카드 삭제'
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      >
        카드를 삭제하시겠습니까?
      </ReusableModal2>
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
const CardItemBox = styled.div`
  position: relative;
  height: 180px;
  background: #f6ae24;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  @media (min-width: 1024px) {
    height: 250px;
  }
`;
const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
`;
const DeleteButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  svg {
    color: #fff;
  }
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
  padding-bottom: 50px;
  padding-left: 20px;
  @media (min-width: 1024px) {
    padding-bottom: 70px;
  }
`;
const BrandRow = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;
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
  @media (min-width: 1024px) {
    height: 250px;
  }
`;
const PlusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const PlusBox = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  background: #fff;
  border: 1px solid #ddd;
`;
const PlusLineVert = styled.div`
  width: 2px;
  height: 10px;
  position: absolute;
  left: 9px;
  top: 5px;
  background: #d9d9d9;
`;
const PlusLineHorz = styled.div`
  width: 10px;
  height: 2px;
  position: absolute;
  left: 5px;
  top: 9px;
  background: #d9d9d9;
`;
const AddText = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: #ddd;
`;
const DotsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin: 20px 0;
`;
const Dot = styled.div<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#F6AE24' : '#D9D9D9')};
`;
const ErrorMsg = styled.p`
  color: #d32f2f;
  margin-top: 16px;
`;
