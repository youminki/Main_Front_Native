// PaymentMethod.tsx
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';

// 동적 데이터
const visitLabel = '결제등록 카드';
const salesLabel = '시즌';
const visits = '1';
const sales = '2025 1분기';
const dateRange = 'SPRING';

// 카드 데이터 타입
interface CardData {
  registerDate?: string; // 등록일 (없으면 "카드 추가" 용도)
  brand?: string; // 카드 브랜드 (없으면 "카드 추가" 용도)
  cardNumber?: string; // 카드번호
  isOrange?: boolean; // true면 오렌지색 카드, false면 흰색 카드
}

// 결제 내역 데이터 타입
interface PaymentData {
  date: string; // 예: "2025-03-10 / 이용권 결제"
  detail: string; // 예: "정기결제"
  detailColor?: string; // 예: "#F6AE24"
  price: string; // 예: "120,000"
}

const PaymentMethod: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  // ① 전체 데이터를 한꺼번에 선언(혹은 API로 fetch)
  const data = {
    cards: [
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
    ] as CardData[],
    payments: [
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
    ] as PaymentData[],
  };

  // ② 카드 스크롤 이벤트로 현재 카드 인덱스 추적
  const handleScroll = () => {
    if (!cardsWrapperRef.current) return;
    const scrollLeft = cardsWrapperRef.current.scrollLeft;
    // 카드 폭 + gap 등을 고려해 간단히 threshold 설정
    // scrollLeft < 150이면 첫 번째 카드, 아니면 두 번째 카드
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
          {data.cards.map((card, idx) =>
            card.isOrange ? (
              /* 오렌지색 카드 */
              <CardOrange key={idx}>
                <CardTop>
                  <CardRegisterDate>{card.registerDate}</CardRegisterDate>
                </CardTop>
                <CardBody>
                  <CardBrand>{card.brand}</CardBrand>
                  <CardNumber>{card.cardNumber}</CardNumber>
                </CardBody>
              </CardOrange>
            ) : (
              /* "카드 추가" 용 흰색 카드 */
              <CardWhite key={idx}>
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
          {/* data.cards.length가 2개인 전제 */}
          {data.cards.map((_, idx) => (
            <Dot key={idx} active={currentCard === idx} />
          ))}
        </DotsContainer>

        {/* 결제내역 목록 */}
        <PaymentList>
          <PaymentListHeader>
            <DateRange>2025.02.01 ~ 2025.04.30</DateRange>
            <PeriodSelector>
              <PeriodButton active>3개월</PeriodButton>
              <PeriodButton>6개월</PeriodButton>
            </PeriodSelector>
          </PaymentListHeader>

          <TableHeader>
            <LeftHeader>결제일자 / 결제내역</LeftHeader>
            <RightHeader>변동 / 누적 (포인트)</RightHeader>
          </TableHeader>

          {/* ③ payments 배열을 순회하여 결제 항목 렌더링 */}
          {data.payments.map((pay, idx) => (
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
  width: 100%;
  background-color: #fff;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
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

/** 전체 스크롤 컨테이너 */
const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  margin-top: 20px;
  position: relative;
`;

/** 카드 2장(가로 스크롤) */
const CardsWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: scroll; /* 수평 스크롤 */
  scroll-behavior: smooth;
  /* 스크롤바 숨기기 (선택) */
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 10px; /* 카드 아래쪽 여백 */
`;

const CardOrange = styled.div`
  min-width: 280px;
  height: 180px;
  background: #f6ae24;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CardTop = styled.div`
  margin: 10px;
  display: flex;
  justify-content: flex-end;
`;

const CardRegisterDate = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 8px;
  line-height: 9px;
  color: #ffffff;
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const CardBrand = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 8px;
  line-height: 9px;
  color: #ffffff;
  margin-bottom: 4px;
`;

const CardNumber = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 12px;
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
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: #dddddd;
`;

/** 페이지 인디케이터 (Dot) */
const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px; /* 인디케이터 아래쪽 여백 */
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#F6AE24' : '#D9D9D9')};
`;

/** 결제내역 목록 */
const PaymentList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentListHeader = styled.div`
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border: 1px solid #dddddd;
  height: 70px;
  margin-top: 20px;
  padding: 10px 20px;
  justify-content: space-between;
`;

const DateRange = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const PeriodSelector = styled.div`
  display: flex;
  gap: 8px;
`;

const PeriodButton = styled.button<{ active?: boolean }>`
  width: 50px;
  height: 29px;
  border-radius: 14px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  text-align: center;
  color: ${({ active }) => (active ? '#ffffff' : '#000000')};
  background: ${({ active }) => (active ? '#000000' : '#ffffff')};
  border: 1px solid ${({ active }) => (active ? '#000000' : '#cccccc')};
  cursor: pointer;
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
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
`;

const RightHeader = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 10px;
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
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const PaymentSubText = styled.span<{ color?: string }>`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: ${({ color }) => color || '#000000'};
`;

const PaymentPrice = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  text-align: right;
`;
