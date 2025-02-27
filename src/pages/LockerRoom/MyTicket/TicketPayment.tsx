import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../../../components/InputField'; // 경로 맞춰 수정

const TicketPayment: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    '카드 결제 / 신한카드 1212-****-****-0121'
  );
  const [selectedCoupon, setSelectedCoupon] = useState('보유 쿠폰 없음');

  return (
    <Container>
      {/* 결제영역 */}
      <Section>
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
      </Section>
      <Divider />

      {/* 추가 쿠폰 (선택) */}
      <Section>
        <InputField
          label='추가 쿠폰 (선택)'
          id='couponSelect'
          options={['보유 쿠폰 없음', '20% 할인 쿠폰 / 26NJ-D6WW-NELY-5GB0']}
          value={selectedCoupon}
          onSelectChange={(val: string) => setSelectedCoupon(val)}
        />
      </Section>
      <Divider />

      {/* 총 결제금액 (VAT 포함) */}
      <Section>
        <InputField
          label='총 결제금액 (VAT 포함)'
          id='totalPayment'
          prefixcontent='120,000원'
          readOnly
        />
      </Section>
    </Container>
  );
};

export default TicketPayment;

/* --- styled-components --- */
const Container = styled.div`
  background: #ffffff;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
`;
