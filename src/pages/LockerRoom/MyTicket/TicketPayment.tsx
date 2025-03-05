import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../../../components/InputField';

// 아이콘 import
import PaymentAmountIcon from '../../../assets/LockerRoom/PaymentAmount.svg';
import TicketPaymentSeaSonIcon from '../../../assets/LockerRoom/TicketPaymentSeaSon.svg';
import TicketPaymentRightIcon from '../../../assets/LockerRoom/TicketPaymentRightIcon.svg';
import FixedBottomBar from '../../../components/FixedBottomBar';

/* ---------------------------
   신청제품 섹션 (상단)
---------------------------- */
const ProductInfo: React.FC = () => {
  return (
    <ProductInfoContainer>
      {/* 타이틀 */}
      <Title>결제할 이용권</Title>
      <Divider />
      {/* 제품명 + 우측 이미지 */}
      <ProductHeader>
        <LeftSide>
          {/* 정기결제 라벨 */}
          <SubscriptionLabel>정기결제</SubscriptionLabel>

          {/* 정기 구독권 / 월 4회권 */}
          <ProductTitle>
            <MainTitle>정기 구독권</MainTitle>
            <SubTitle>/ 월 4회권</SubTitle>
          </ProductTitle>

          {/* 시즌 정보 */}
          <Row>
            <IconImg src={TicketPaymentSeaSonIcon} alt='시즌 아이콘' />
            <RowTextContainer>
              <RowLabel>
                시즌 -<RowValue> 2025 SPRING</RowValue>
              </RowLabel>

              <RowPeriod>2025.03.01 ~ 03.31</RowPeriod>
            </RowTextContainer>
          </Row>

          {/* 결제금액 정보 */}
          <Row>
            <IconImg src={PaymentAmountIcon} alt='결제금액 아이콘' />
            <RowTextContainer>
              <RowLabel>
                결제금액 -<RowValue>120,000원</RowValue>
              </RowLabel>

              <RowPeriod>매월 1일 (자동결제)</RowPeriod>
            </RowTextContainer>
          </Row>
        </LeftSide>

        {/* 우측 이미지 */}
        <RightSideImage>
          <img
            src={TicketPaymentRightIcon}
            alt='정기 구독권 예시 이미지'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </RightSideImage>
      </ProductHeader>
    </ProductInfoContainer>
  );
};

/* ---------------------------
   메인 컴포넌트
---------------------------- */
const TicketPayment: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    '카드 결제 / 신한카드 1212-****-****-0121'
  );
  const [selectedCoupon, setSelectedCoupon] = useState('보유 쿠폰 없음');

  return (
    <Container>
      {/* 신청제품 섹션 */}
      <ProductInfo />
      <Divider />
      {/* 결제영역: 결제방식 */}

      <InputField
        label='결제방식 *'
        id='paymentMethod'
        options={[
          '카드 결제 / 신한카드 1212-****-****-0121',
          '무통장 결제 / 기업 065-143111-01-015, (주)리프트콤마',
          '이용권 / 정기 구독권 ( 2025년 3월분 )',
        ]}
        value={selectedPaymentMethod}
        onSelectChange={(val: string) => setSelectedPaymentMethod(val)}
      />

      {/* 추가 쿠폰 (선택) */}

      <InputField
        label='추가 쿠폰 (선택)'
        id='couponSelect'
        options={['보유 쿠폰 없음', '20% 할인 쿠폰 / 26NJ-D6WW-NELY-5GB0']}
        value={selectedCoupon}
        onSelectChange={(val: string) => setSelectedCoupon(val)}
      />

      <Divider />

      {/* 총 결제금액 (VAT 포함) */}
      <Section>
        <CustomLabel>총 결제금액 (VAT 포함)</CustomLabel>
        <PaymentAmountWrapper>
          <PaymentAmount>120,000원</PaymentAmount>
        </PaymentAmountWrapper>
      </Section>
      <FixedBottomBar text='결제하기' color='yellow' />
    </Container>
  );
};

export default TicketPayment;

/* -------------------------------------------
   styled-components
------------------------------------------- */

/* 전체 컨테이너 */
const Container = styled.div`
  position: relative;

  height: 932px;
  background: #ffffff;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`;

/* 구분선 */
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
`;

/* 각 섹션 공통 스타일 */
const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
`;

/* "총 결제금액" 라벨 */
const CustomLabel = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 8px;
`;

/* 총 결제금액 영역 (커스텀) */
const PaymentAmountWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 57px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  padding: 0 16px; /* 금액이 오른쪽에 오도록 패딩 조정 */
`;

/* 총 결제금액 텍스트 */
const PaymentAmount = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 18px;
  text-align: right;
  color: #000000;
`;

/* -------------------------------------------
   [신청제품 섹션] 관련 styled-components
------------------------------------------- */
const ProductInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// 상단 타이틀 ("결제할 이용권")
const Title = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 10px;
`;

// 전체 영역(정기결제/제품명/아이콘 등)
const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  /* 원하는 구분선 있으면 사용(예: border-top, border-bottom) */
  padding: 20px 0;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubscriptionLabel = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 10px;
`;

/* "정기 구독권" + "/ 월 4회권" */
const ProductTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 20px;
`;

const MainTitle = styled.span`
  /* 정기 구독권 */
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;

const SubTitle = styled.span`
  /* / 월 4회권 */
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #999999;
`;

const RightSideImage = styled.div`
  width: 169px;
  height: 210px;
  background: #d9d9d9;
  overflow: hidden;
  border-radius: 4px; /* 필요 시 */
`;

/* 아이콘 + 텍스트 */
const Row = styled.div`
  display: flex;
  align-items: flex-start; /* 아이콘이 텍스트 상단에 오도록 */
  margin-bottom: 8px;
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

/* Row 내부에 "시즌 -" / "- 2025 SPRING" / "2025.03.01 ~ 03.31" 등 */
const RowTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

/* 시즌 - , 결제금액 - (볼드 700, size 12) */
const RowLabel = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;

/* - 2025 SPRING, 120,000원 (볼드 900, size 12) */
const RowValue = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;

/* 2025.03.01 ~ 03.31, 매월 1일 (자동결제) (weight 400, size 12) */
const RowPeriod = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;
