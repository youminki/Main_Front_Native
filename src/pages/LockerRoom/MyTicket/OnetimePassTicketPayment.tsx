import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { format, addMonths } from 'date-fns';
import InputField from '../../../components/InputField';
import FixedBottomBar from '../../../components/FixedBottomBar';
import { getMyCards } from '../../../api/default/payment'; // API 함수 경로에 맞게 수정

import PaymentAmountIcon from '../../../assets/LockerRoom/PaymentAmount.svg';
import TicketPaymentSeaSonIcon from '../../../assets/LockerRoom/TicketPaymentSeaSon.svg';
import TicketPaymentRightIcon from '../../../assets/LockerRoom/TicketPaymentRightIcon.svg';

export interface CardItem {
  cardId: number;
  payerId: string;
  cardName: string;
  cardNumber: string;
  createdAt: string;
}

const OnetimePassTicketPayment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, discountedPrice } = location.state || {}; // state에서 name과 discountedPrice 받기

  const formattedDiscountedPrice = discountedPrice
    ? discountedPrice.toLocaleString()
    : '0';

  const [options, setOptions] = useState<string[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');

  // 오늘 날짜 및 한 달 후 날짜 계산
  const today = new Date();
  const formattedToday = format(today, 'yyyy.MM.dd');
  const oneMonthLater = addMonths(today, 1);
  const formattedOneMonthLater = format(oneMonthLater, 'MM.dd');

  // 1) 카드 목록 로드
  useEffect(() => {
    (async () => {
      try {
        const res = await getMyCards();
        const items: CardItem[] = res.data.items;

        let opts: string[];
        if (items.length === 0) {
          opts = ['등록된 카드가 없습니다', '카드 추가하기'];
        } else {
          opts = items.map((c) => `카드 결제 / ${c.cardName} ${c.cardNumber}`);
          opts.push('카드 추가하기');
        }

        setOptions(opts);
        setSelectedPaymentMethod(opts[0]);
      } catch (e) {
        console.error('[🔥] 카드 목록 조회 실패', e);
        setOptions(['등록된 카드가 없습니다', '카드 추가하기']);
        setSelectedPaymentMethod('등록된 카드가 없습니다');
      }
    })();
  }, []);

  const handleSelectChange = (val: string) => {
    if (val === '카드 추가하기') {
      navigate('/payment-method');
      return;
    }
    setSelectedPaymentMethod(val);
  };

  return (
    <Container>
      <ProductInfo>
        <Title>결제할 이용권</Title>
        <Divider />

        <ProductHeader>
          <LeftSide>
            <SubscriptionLabel>이용권 결제</SubscriptionLabel>

            <ProductTitle>
              <MainTitle>{name}</MainTitle> {/* 이름을 여기서 표시 */}
            </ProductTitle>

            <Row>
              <IconImg src={TicketPaymentSeaSonIcon} alt='시즌 아이콘' />
              <RowTextContainer>
                <RowLabel>
                  시즌 -<RowValue> 2025 SPRING</RowValue>
                </RowLabel>
                <RowPeriod>
                  {`${formattedToday} ~ ${formattedOneMonthLater}`}
                </RowPeriod>
              </RowTextContainer>
            </Row>

            <Row>
              <IconImg src={PaymentAmountIcon} alt='결제금액 아이콘' />
              <RowTextContainer>
                <RowLabel>
                  결제금액 -<RowValue>{formattedDiscountedPrice}원</RowValue>{' '}
                  {/* 할인된 가격 표시 */}
                </RowLabel>
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
      </ProductInfo>

      <Divider />

      <Section>
        <InputField
          label='결제방식 *'
          id='paymentMethod'
          options={options}
          value={selectedPaymentMethod}
          onSelectChange={handleSelectChange}
        />
      </Section>

      <Divider />

      <Section>
        <CustomLabel>총 결제금액 (VAT 포함)</CustomLabel>
        <PaymentAmountWrapper>
          <PaymentAmount>{formattedDiscountedPrice}원</PaymentAmount>{' '}
          {/* 할인된 가격 표시 */}
        </PaymentAmountWrapper>
      </Section>

      <FixedBottomBar text='결제하기' color='yellow' />
    </Container>
  );
};

export default OnetimePassTicketPayment;

// --- styled-components ---
const Container = styled.div`
  position: relative;
  background: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 600px;
  min-height: 100vh;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const CustomLabel = styled.div`
  font-weight: 700;
  font-size: 12px;
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

const ProductInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
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
  padding-top: 20px;
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
