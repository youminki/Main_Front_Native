import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { format, addMonths } from 'date-fns';

import InputField from '../../../components/InputField';
import FixedBottomBar from '../../../components/FixedBottomBar';
import {
  postInitPayment,
  getMyCards,
  postRecurringPayment,
} from '../../../api/default/payment';

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

const TicketPayment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL 쿼리에서 파라미터 추출
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name') || '';
  const discountedPriceParam = searchParams.get('discountedPrice') || '0';
  const discountedPrice = parseFloat(discountedPriceParam);

  const roundedPrice = isNaN(discountedPrice) ? 0 : Math.round(discountedPrice);
  const formattedDiscountedPrice = roundedPrice.toLocaleString();

  const [options, setOptions] = useState<string[]>([]);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');

  const today = new Date();
  const formattedToday = format(today, 'yyyy.MM.dd');
  const formattedOneMonthLater = format(addMonths(today, 1), 'MM.dd');

  // 팝업 윈도우에서 결제 결과를 부모 윈도우에 전달 (1회 결제용)
  useEffect(() => {
    (window as any).PCD_PAY_CALLBACK = (result: any) => {
      if (window.opener) {
        window.opener.postMessage(
          {
            paymentStatus: result?.status === 'success' ? 'success' : 'failure',
          },
          window.location.origin
        );
      }
      window.close();
    };
  }, []);

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
        setCards(items);
        setOptions(opts);
        setSelectedPaymentMethod(opts[0]);
      } catch (e) {
        console.error('[🔥] 카드 목록 조회 실패', e);
        setOptions(['등록된 카드가 없습니다', '카드 추가하기']);
        setSelectedPaymentMethod('등록된 카드가 없습니다');
      }
    })();
  }, []);

  const extractPayerId = (val: string) => {
    const card = cards.find(
      (c) => val.includes(c.cardName) && val.includes(c.cardNumber)
    );
    return card?.payerId || '';
  };

  const handleSelectChange = (val: string) => {
    if (val === '카드 추가하기') {
      navigate('/payment-method');
      return;
    }
    setSelectedPaymentMethod(val);
  };

  const handlePaymentClick = async () => {
    const payerId = extractPayerId(selectedPaymentMethod);
    if (!payerId) {
      alert('결제할 카드를 선택해주세요.');
      return;
    }

    const requestData = { payerId, amount: roundedPrice, goods: name };

    try {
      if (name === '1회 이용권') {
        // ✅ 1회 결제: Payple 팝업 호출
        const response = await postInitPayment(requestData);
        (window as any).PaypleCpayAuthCheck(response.data);
      } else if (
        name === '정기 구독권(4회권)' ||
        name === '정기 구독권(무제한)'
      ) {
        // ✅ 정기결제: 성공/실패에 따라 리다이렉트
        const response = await postRecurringPayment(requestData);
        const payResult = response.data.PCD_PAY_RST;

        if (payResult === 'success') {
          navigate('/payment-complete');
        } else {
          navigate('/payment-fail');
        }
      } else {
        alert('알 수 없는 이용권 유형입니다.');
      }
    } catch (error: any) {
      console.error('결제 실패:', error);
      const errMsg =
        error.response?.data?.message || error.message || '알 수 없는 오류';
      alert(`결제 실패: ${errMsg}`);
      navigate('/payment-fail');
    }
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
              <MainTitle>{name}</MainTitle>
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
                  결제금액 -<RowValue>{formattedDiscountedPrice}원</RowValue>
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
          <PaymentAmount>{formattedDiscountedPrice}원</PaymentAmount>
        </PaymentAmountWrapper>
      </Section>

      <FixedBottomBar
        text='결제하기'
        color='yellow'
        onClick={handlePaymentClick}
      />
    </Container>
  );
};

export default TicketPayment;

// styled-components 정의 (생략 없이 동일)
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
