import React from 'react';
import styled from 'styled-components';
import FixedBottomBar from '../components/FixedBottomBar';
import BasketItemComponent from '../pages/Basket';

const items = [
  {
    id: 1,
    brand: 'SANDRO',
    name: 'SF25S3FRD7699 / 원피스',
    service: '대여 (3일)',
    size: 'M (55)',
    color: '블랙',
    price: '50,000원',
  },
];

const handleSelectItem = (item) => {
  console.log('Selected item:', item);
};

const PaymentPage: React.FC = () => {
  return (
    <Container>
      <MainContent>
        <ProductSection>
          <SectionTitle>신청제품</SectionTitle>
          <ProductContent>
            {items.map((item) => (
              <BasketItemComponent
                key={item.id}
                item={item}
                onSelect={handleSelectItem}
              />
            ))}
          </ProductContent>
        </ProductSection>

        <DeliverySection>
          <SectionTitle>배송지 입력 *</SectionTitle>
          <InputWrapper>
            <AddressInput placeholder='주소를 검색 하세요' />
            <SearchButton>검색</SearchButton>
          </InputWrapper>
          <AddressInput placeholder='상세주소를 입력 하세요' />
          <ContactInput placeholder='010 - 0000 - 0000' />
          <DeliveryMessage placeholder='배송 시 전달할 내용을 입력하세요 ( 예:공동 현관문 비번 등.. )' />
        </DeliverySection>

        <ReturnSection>
          <SectionTitle>반납지 입력 *</SectionTitle>
          <ReturnOption>
            <Option>배송지와 동일</Option>
            <Option>새로 입력</Option>
          </ReturnOption>
        </ReturnSection>

        <PaymentSection>
          <SectionTitle>결제방식 *</SectionTitle>
          <PaymentOption>
            <Option>이용권 / 정기 구독권 ( 2025년 3월분 )</Option>
            <Option>무통장 결제 / 기업 065-143111-0-015, (주)리프트콤마</Option>
            <Option>카드 결제 / 신한카드 1212-****-****-0121</Option>
          </PaymentOption>
        </PaymentSection>

        <CouponSection>
          <SectionTitle>추가 쿠폰 (선택)</SectionTitle>
          <CouponOption>
            <Option>20% 할인 쿠폰 / 26NJ-D6WW-NELY-5GB0</Option>
            <Option>보유 쿠폰 없음</Option>
          </CouponOption>
        </CouponSection>

        <TotalPaymentSection>
          <SectionTitle>총 결제금액 (VAT 포함)</SectionTitle>
          <TotalAmount>
            <AdditionalCost>+ 추가비용 (15,000)</AdditionalCost>
            <Amount>65,000원</Amount>
          </TotalAmount>
        </TotalPaymentSection>
      </MainContent>

      <FixedBottomBar text='결제하기' color='yellow' />
    </Container>
  );
};

export default PaymentPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 14px;
  color: #000000;
  margin-bottom: 10px;
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DeliverySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const AddressInput = styled.input`
  flex: 1;
  height: 57px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 10px;
`;

const SearchButton = styled.button`
  width: 69px;
  height: 57px;
  background: #f6ae24;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
`;

const ContactInput = styled(AddressInput)``;
const DeliveryMessage = styled(AddressInput)``;

const ReturnSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReturnOption = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Option = styled.div`
  flex: 1;
  height: 57px;
  background: #ffffff;
  border: 2px solid #f6ae24;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
`;

const PaymentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PaymentOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CouponSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CouponOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TotalPaymentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdditionalCost = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

const Amount = styled.div`
  font-weight: 900;
  font-size: 16px;
  text-align: right;
`;
