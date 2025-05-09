import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import StatsSection from '../../../components/StatsSection';
import CardIcon from '../../../assets/LockerRoom/CardIcon.svg';

const visitLabel = '결제등록 카드';
const salesLabel = '시즌';
const visits = '1';
const sales = '2025 1분기';
const dateRange = 'SPRING';

interface CardData {
  registerDate?: string;
  brand?: string;
  cardNumber?: string;
  isOrange?: boolean;
}

const PaymentMethod: React.FC = () => {
  const [currentCard] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const [cards, setCards] = useState<CardData[]>([
    {
      registerDate: '등록일 2025.02.01',
      brand: '신한카드',
      cardNumber: '4567-●●●●-●●●●-1234',
      isOrange: true,
    },
    {
      isOrange: false,
    },
  ]);

  useEffect(() => {
    const { state } = location;
    if (
      state &&
      state.updatedCard !== undefined &&
      state.cardIndex !== undefined
    ) {
      const newCards = [...cards];
      newCards[state.cardIndex] = state.updatedCard;
      setCards(newCards);
    }
  }, [location.state]);

  // ✅ 카드 등록 요청 함수
  const handleCardRegisterClick = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('https://api.stylewh.com/payple/card-register-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log('[✅ 카드 등록 데이터]', data);

      if (!window.cpay || typeof window.cpay.request !== 'function') {
        alert('Payple SDK 로딩 실패');
        return;
      }

      // ✅ Payple 결제창 호출
      window.cpay.request(data);
    } catch (error) {
      console.error('카드 등록 중 오류 발생:', error);
      alert('카드 등록 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <PaymentMethodContainer>
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

      <CardsContainer>
        {cards.map((card, idx) =>
          card.isOrange ? (
            <CardOrange
              key={idx}
              onClick={() =>
                navigate('/payment-method/cardDetail', {
                  state: { cardIndex: idx, cardData: card },
                })
              }
            >
              <CardTop>
                <CardRegisterDate>{card.registerDate}</CardRegisterDate>
              </CardTop>
              <CardBody>
                <CardBrandRow>
                  <CardIconImg src={CardIcon} alt='card icon' />
                  <CardBrandText>{card.brand}</CardBrandText>
                </CardBrandRow>
                <CardNumber>{card.cardNumber}</CardNumber>
              </CardBody>
            </CardOrange>
          ) : (
            <CardWhite key={idx} onClick={handleCardRegisterClick}>
              <PlusWrapper>
                <PlusBox>
                  <PlusLineVert />
                  <PlusLineHorz />
                </PlusBox>
                <CardAddText>카드 추가</CardAddText>
              </PlusWrapper>
            </CardWhite>
          )
        )}
      </CardsContainer>

      <DotsContainer>
        {cards.map((_, idx) => (
          <Dot key={idx} active={currentCard === idx} />
        ))}
      </DotsContainer>
    </PaymentMethodContainer>
  );
};

export default PaymentMethod;

// Styled Components
const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  max-width: 1000px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 24px;
  line-height: 27px;
  color: #000;
  margin-bottom: 0;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 280px;
`;

const CardOrange = styled.div`
  height: 180px;
  background: #f6ae24;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const CardWhite = styled.div`
  height: 180px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CardTop = styled.div`
  margin: 20px;
  display: flex;
  justify-content: flex-end;
`;

const CardRegisterDate = styled.span`
  font-weight: 700;
  font-size: 10px;
  color: #fff;
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const CardBrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
`;

const CardIconImg = styled.img`
  width: 12px;
  height: 12px;
`;

const CardBrandText = styled.span`
  font-weight: 700;
  font-size: 10px;
  color: #fff;
`;

const CardNumber = styled.span`
  font-weight: 800;
  font-size: 14px;
  color: #fff;
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
  background: #d9d9d9;
  position: absolute;
  left: 9px;
  top: 5px;
`;

const PlusLineHorz = styled.div`
  width: 10px;
  height: 2px;
  background: #d9d9d9;
  position: absolute;
  left: 5px;
  top: 9px;
`;

const CardAddText = styled.span`
  font-weight: 800;
  font-size: 14px;
  color: #ddd;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#F6AE24' : '#D9D9D9')};
`;
