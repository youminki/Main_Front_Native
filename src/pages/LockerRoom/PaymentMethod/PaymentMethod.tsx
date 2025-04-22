import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom'; // 수정
import StatsSection from '../../../components/StatsSection';
import PeriodSection from '../../../components/PeriodSection';
import CardIcon from '../../../assets/LockerRoom/CardIcon.svg';

const visitLabel = '결제등록 카드';
const salesLabel = '시즌';
const visits = '1';
const sales = '2025 1분기';
const dateRange = 'SPRING';

// 카드 데이터 타입
interface CardData {
  registerDate?: string;
  brand?: string;
  cardNumber?: string;
  isOrange?: boolean;
}

// 결제 내역 데이터 타입
interface PaymentData {
  date: string;
  detail: string;
  detailColor?: string;
  price: string;
}

const PaymentMethod: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(6);
  const [currentCard, setCurrentCard] = useState(0);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 카드 목록을 State로 관리
  const [cards, setCards] = useState<CardData[]>([
    {
      registerDate: '등록일 2025.02.01',
      brand: '신한카드',
      cardNumber: '4567-●●●●-●●●●-1234',
      isOrange: true,
    },
    {
      // "카드 추가" 용
      isOrange: false,
    },
  ]);

  // 결제 내역 (고정 데이터)
  const payments: PaymentData[] = [
    {
      date: '2025-03-10 / 이용권 결제',
      detail: '정기결제',
      detailColor: '#F6AE24',
      price: '120,000',
    },
    {
      date: '2025-03-08 / 제품구매',
      detail: '일반결제',
      detailColor: '#EF4523',
      price: '260,000',
    },
    {
      date: '2025-03-07 / 지연반납 결제',
      detail: '일반결제',
      detailColor: '#EF4523',
      price: '10,000',
    },
    {
      date: '2025-02-10 / 이용권 결제',
      detail: '정기결제',
      detailColor: '#F6AE24',
      price: '120,000',
    },
  ];

  // ✅ 수정 후 돌아올 때, location.state에서 updatedCard, cardIndex를 가져와서 cards를 업데이트
  useEffect(() => {
    const { state } = location;
    if (
      state &&
      state.updatedCard !== undefined &&
      state.cardIndex !== undefined
    ) {
      const { updatedCard, cardIndex } = state;
      // 기존 cards 복사 후 해당 인덱스의 카드 정보를 수정
      const newCards = [...cards];
      newCards[cardIndex] = updatedCard;
      setCards(newCards);
    }
  }, [location.state, cards]);

  // 카드 스크롤 이벤트로 현재 카드 인덱스 추적
  const handleScroll = () => {
    if (!cardsWrapperRef.current) return;
    const scrollLeft = cardsWrapperRef.current.scrollLeft;
    if (scrollLeft < 150) {
      setCurrentCard(0);
    } else {
      setCurrentCard(1);
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

      <ScrollContainer>
        {/* 카드 표시 영역 */}
        <CardsWrapper ref={cardsWrapperRef} onScroll={handleScroll}>
          {cards.map((card, idx) =>
            card.isOrange ? (
              /* 오렌지색 카드, 클릭 시 카드 상세 페이지로 이동 */
              <CardOrange
                key={idx}
                onClick={() =>
                  navigate('/payment-method/cardDetail', {
                    state: {
                      cardIndex: idx,
                      cardData: card,
                    },
                  })
                }
              >
                <CardTop>
                  <CardRegisterDate>{card.registerDate}</CardRegisterDate>
                </CardTop>
                <CardBody>
                  {/* brand 왼쪽에 CardIcon.svg 이미지를 row로 정렬 */}
                  <CardBrandRow>
                    <CardIconImg src={CardIcon} alt='card icon' />
                    <CardBrandText>{card.brand}</CardBrandText>
                  </CardBrandRow>
                  <CardNumber>{card.cardNumber}</CardNumber>
                </CardBody>
              </CardOrange>
            ) : (
              /* "카드 추가" 용 흰색 카드 */
              <CardWhite
                key={idx}
                onClick={() => navigate('/payment-method/AddCard')}
              >
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
        </CardsWrapper>

        {/* 페이지 인디케이터 (Dots) */}
        <DotsContainer>
          {cards.map((_, idx) => (
            <Dot key={idx} active={currentCard === idx} />
          ))}
        </DotsContainer>

        {/* 결제내역 목록 */}
        <PaymentList>
          <PeriodSection
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />

          <TableHeader>
            <LeftHeader>결제일자 / 결제내역</LeftHeader>
            <RightHeader>변동 / 누적 (포인트)</RightHeader>
          </TableHeader>

          {payments.map((pay, idx) => (
            <PaymentItem key={idx}>
              <PaymentInfo>
                <PaymentMainText>{pay.date}</PaymentMainText>
                <PaymentSubText color={pay.detailColor}>
                  {pay.detail}
                </PaymentSubText>
              </PaymentInfo>
              <PaymentPrice>{pay.price}</PaymentPrice>
            </PaymentItem>
          ))}
        </PaymentList>
      </ScrollContainer>
    </PaymentMethodContainer>
  );
};

export default PaymentMethod;

/* ========== 기존 스타일 ========== */
const PaymentMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fff;
  padding: 1rem;
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
  color: #000000;
  margin-bottom: 0px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-top: 30px;
`;

/* ========== 새로 추가된 스타일 ========== */

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  margin-top: 20px;
  position: relative;
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 10px;
`;

const CardOrange = styled.div`
  min-width: 280px;
  height: 180px;
  background: #f6ae24;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
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
  line-height: 9px;
  color: #ffffff;
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  margin-top: 30px;
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
  line-height: 9px;
  color: #ffffff;
`;

const CardNumber = styled.span`
  font-weight: 800;
  font-size: 14px;
  line-height: 13px;
  color: #ffffff;
`;

const CardWhite = styled.div`
  min-width: 280px;
  height: 180px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  background: #ffffff;
  border: 1px solid #dddddd;
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
  line-height: 15px;
  text-align: center;
  color: #dddddd;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#F6AE24' : '#D9D9D9')};
`;

const PaymentList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  background: rgba(221, 221, 221, 0.96);
  border: 1px solid #dddddd;
  height: 40px;
  margin-top: 10px;
  padding: 0 20px;
  justify-content: space-between;
`;

const LeftHeader = styled.span`
  font-weight: 800;
  font-size: 12px;
  line-height: 11px;
  color: #000000;
`;

const RightHeader = styled.span`
  font-weight: 800;
  font-size: 12px;
  line-height: 11px;
  color: #000000;
  text-align: right;
`;

const PaymentItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #dddddd;
  height: 76px;
  margin-top: 10px;
  padding: 10px 20px;
  justify-content: space-between;
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PaymentMainText = styled.span`
  font-weight: 800;
  font-size: 14px;
  line-height: 13px;
  color: #000000;
`;

const PaymentSubText = styled.span<{ color?: string }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 13px;
  color: ${({ color }) => color || '#000000'};

  margin-top: 5px;
`;

const PaymentPrice = styled.span`
  font-weight: 800;
  font-size: 16px;
  line-height: 15px;
  color: #000000;
  text-align: right;
`;
