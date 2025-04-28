import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../../../components/InputField';

import PaymentAmountIcon from '../../../assets/LockerRoom/PaymentAmount.svg';
import TicketPaymentSeaSonIcon from '../../../assets/LockerRoom/TicketPaymentSeaSon.svg';
import TicketPaymentRightIcon from '../../../assets/LockerRoom/TicketPaymentRightIcon.svg';
import FixedBottomBar from '../../../components/FixedBottomBar';

const ProductInfo: React.FC = () => {
  return (
    <ProductInfoContainer>
      <Title>결제할 이용권</Title>
      <Divider />

      <ProductHeader>
        <LeftSide>
          <SubscriptionLabel>정기결제</SubscriptionLabel>

          <ProductTitle>
            <MainTitle>정기 구독권</MainTitle>
            <SubTitle>/ 월 4회권</SubTitle>
          </ProductTitle>

          <Row>
            <IconImg src={TicketPaymentSeaSonIcon} alt='시즌 아이콘' />
            <RowTextContainer>
              <RowLabel>
                시즌 -<RowValue> 2025 SPRING</RowValue>
              </RowLabel>

              <RowPeriod>2025.03.01 ~ 03.31</RowPeriod>
            </RowTextContainer>
          </Row>

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

const TicketPayment: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    '카드 결제 / 신한카드 1212-****-****-0121'
  );
  const [selectedCoupon, setSelectedCoupon] = useState('보유 쿠폰 없음');

  return (
    <Container>
      <ProductInfo />
      <Divider />

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

      <InputField
        label='추가 쿠폰 (선택)'
        id='couponSelect'
        options={['보유 쿠폰 없음', '20% 할인 쿠폰 / 26NJ-D6WW-NELY-5GB0']}
        value={selectedCoupon}
        onSelectChange={(val: string) => setSelectedCoupon(val)}
      />

      <Divider />

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

const Container = styled.div`
  position: relative;

  height: 932px;
  background: #ffffff;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 1000px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const CustomLabel = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 8px;
`;

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
  padding: 0 16px;
`;

const PaymentAmount = styled.span`
  font-weight: 900;
  font-size: 16px;
  line-height: 18px;
  text-align: right;
  color: #000000;
`;

const ProductInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 10px;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  padding: 20px 0;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubscriptionLabel = styled.div`
  font-weight: 900;
  font-size: 12px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 10px;
`;

const ProductTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 20px;
`;

const MainTitle = styled.span`
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;

const SubTitle = styled.span`
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
  border-radius: 4px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const IconImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const RowTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowLabel = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;

const RowValue = styled.span`
  font-weight: 900;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;

const RowPeriod = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;
