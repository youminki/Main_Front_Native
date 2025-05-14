// src/pages/LockerRoom/PaymentMethod.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import StatsSection from '../../../components/StatsSection';
import ReusableModal2 from '../../../components/ReusableModal2';
import CardIcon from '../../../assets/LockerRoom/CardIcon.svg';
import { getMyCards, CardItem } from '../../../api/default/payment';
import { Trash2 as DeleteIconSVG } from 'lucide-react';

const visitLabel = '결제등록 카드';
const salesLabel = '시즌';
const visits = '1';
const sales = '2025 1분기';
const dateRange = 'SPRING';

interface CardData {
  registerDate: string;
  brand: string;
  cardNumber: string;
}

const PaymentMethod: React.FC = () => {
  const [currentCard] = useState(0);
  const [cards, setCards] = useState<CardData[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 카드 목록 API 호출
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getMyCards();
        const items: CardItem[] = response.data.items;
        const mapped: CardData[] = items.map((item) => {
          let date = '알 수 없음';
          if ((item as any).createAt) {
            const dt = new Date((item as any).createAt);
            date = dt.toISOString().split('T')[0];
          }
          return {
            registerDate: `등록일 ${date}`,
            brand: item.cardName || '알 수 없음',
            cardNumber: item.cardNumber || '****-****-****-****',
          };
        });
        setCards(mapped);
      } catch (err) {
        console.error('카드 목록 조회 실패', err);
      }
    };
    fetchCards();
  }, []);

  // 카드 수정 시 state 업데이트 (registerDate 유지)
  useEffect(() => {
    const { state } = location;
    if (state?.updatedCard && typeof state.cardIndex === 'number') {
      const updated = [...cards];
      const original = updated[state.cardIndex];
      updated[state.cardIndex] = {
        registerDate: original.registerDate,
        brand: state.updatedCard.brand || original.brand,
        cardNumber: state.updatedCard.cardNumber || original.cardNumber,
      };
      setCards(updated);
    }
  }, [location.state, cards]);

  const handleDelete = (index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const openDeleteModal = (index: number) => {
    setSelectedIdx(index);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    if (selectedIdx !== null) handleDelete(selectedIdx);
    setIsDeleteModalOpen(false);
    setSelectedIdx(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  const confirmAdd = () => {
    const w = 360;
    const h = 600;
    const left = (window.screen.availWidth - w) / 2;
    const top = (window.screen.availHeight - h) / 2;
    window.open(
      '/test/payple',
      'cardAddPopup',
      `width=${w},height=${h},left=${left},top=${top},resizable,scrollbars`
    );
    setIsAddModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <Title>결제수단</Title>
        <Subtitle>나에게 맞는 스타일을 찾을 때는 멜픽!</Subtitle>
      </Header>

      <StatsSection
        visits={visits}
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
                <CardIconImg src={CardIcon} alt='card icon' />
                <BrandText>{card.brand}</BrandText>
              </BrandRow>
              <NumberText>{card.cardNumber}</NumberText>
            </CardBody>
          </CardItemBox>
        ))}

        <AddCardBox onClick={openAddModal}>
          <PlusWrapper>
            <PlusBox>
              <PlusLineVert />
              <PlusLineHorz />
            </PlusBox>
            <AddText>카드 추가</AddText>
          </PlusWrapper>
        </AddCardBox>
      </CardsList>

      <DotsWrapper>
        {Array(cards.length + 1)
          .fill(0)
          .map((_, idx) => (
            <Dot key={idx} $active={idx === currentCard} />
          ))}
      </DotsWrapper>

      {/* 삭제 모달 */}
      <ReusableModal2
        isOpen={isDeleteModalOpen}
        title='카드 삭제'
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      >
        카드를 삭제하시겠습니까?
      </ReusableModal2>

      {/* 추가 모달 */}
      <ReusableModal2
        isOpen={isAddModalOpen}
        title='카드 추가'
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={confirmAdd}
      >
        카드를 추가하시겠습니까?
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
  max-width: 280px;

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
  font-size: 10px;
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
  gap: 4px;
  margin-bottom: 10px;
`;

const CardIconImg = styled.img`
  width: 12px;
  height: 12px;
`;

const BrandText = styled.span`
  font-size: 10px;
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
