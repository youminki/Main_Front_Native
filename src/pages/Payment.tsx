// src/components/Basket.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../assets/sample-dress.svg';
// 아이콘 import 경로는 실제 경로에 맞춰 수정해주세요.
import PriceIcon from '../assets/Basket/PriceIcon.svg';
import ProductInfoIcon from '../assets/Basket/ProductInfoIcon.svg';
import ServiceInfoIcon from '../assets/Basket/ServiceInfoIcon.svg';
import FixedBottomBar from '../components/FixedBottomBar';
// import { useNavigate } from 'react-router-dom';
// import ReusableModal2 from '../components/ReusableModal2';

interface BasketItem {
  id: number;
  brand: string;
  nameCode: string;
  nameType: string;
  type: 'rental' | 'purchase';
  servicePeriod?: string;
  deliveryDate?: string;
  size: string;
  color: string;
  price: number;
  imageUrl: string;
  isSelected: boolean;
}
// const [isModalOpen, setIsModalOpen] = useState(false);
const PaymentPage: React.FC = () => {
  // const navigate = useNavigate();
  const [items, setItems] = useState<BasketItem[]>([
    {
      id: 1,
      brand: 'SANDRO',
      nameCode: 'SF25S3FRD7699',
      nameType: '원피스',
      type: 'rental',
      servicePeriod: '2025.03.02 (일) ~ 03.05 (수)',
      size: 'M (55)',
      color: '블랙',
      price: 50000,
      imageUrl: sampleImage,
      isSelected: true,
    },
  ]);

  return (
    <Container>
      <LabelDetailText>신청제품</LabelDetailText>
      {items.map((item) => (
        <Item key={item.id}>
          <ContentWrapper>
            {/* 좌측: 상품 텍스트 정보 */}
            <ItemDetails>
              <Brand>{item.brand}</Brand>
              <ItemName>
                <NameCode>{item.nameCode}</NameCode>
                <Slash>/</Slash>
                <ItemType>{item.nameType}</ItemType>
              </ItemName>

              {/* 진행 서비스 + 추가 정보 */}
              {item.type === 'rental' ? (
                <InfoRowFlex>
                  <IconArea>
                    <Icon src={ServiceInfoIcon} alt='Service Info' />
                  </IconArea>
                  <TextContainer>
                    <RowText>
                      <LabelDetailText>진행 서비스 - </LabelDetailText>
                      <DetailHighlight>대여(3일)</DetailHighlight>
                    </RowText>
                    {item.servicePeriod && (
                      <AdditionalText>
                        <DetailText>{item.servicePeriod}</DetailText>
                      </AdditionalText>
                    )}
                  </TextContainer>
                </InfoRowFlex>
              ) : (
                <InfoRowFlex>
                  <IconArea>
                    <Icon src={ServiceInfoIcon} alt='Service Info' />
                  </IconArea>
                  <TextContainer>
                    <RowText>
                      <DetailText>진행 서비스 - 구매</DetailText>
                    </RowText>
                    {item.deliveryDate && (
                      <AdditionalText>
                        <DetailText>{item.deliveryDate}</DetailText>
                      </AdditionalText>
                    )}
                  </TextContainer>
                </InfoRowFlex>
              )}

              {/* 제품 정보: 첫 줄 - 라벨, 두 번째 줄 - 사이즈/색상 */}
              <InfoRowFlex>
                <IconArea>
                  <Icon src={ProductInfoIcon} alt='Product Info' />
                </IconArea>
                <TextContainer>
                  <RowText>
                    <LabelDetailText>제품 정보</LabelDetailText>
                  </RowText>
                  <AdditionalText>
                    <DetailText>사이즈 - </DetailText>
                    <DetailHighlight>{item.size}</DetailHighlight>
                    <Slash>/</Slash>
                    <DetailText>색상 - </DetailText>
                    <DetailHighlight>{item.color}</DetailHighlight>
                  </AdditionalText>
                </TextContainer>
              </InfoRowFlex>

              {/* 결제 금액 */}
              <InfoRowFlex>
                <IconArea>
                  <Icon src={PriceIcon} alt='Price' />
                </IconArea>
                <TextContainer>
                  <RowText>
                    <LabelDetailText>결제금액 - </LabelDetailText>
                    <DetailHighlight>
                      {item.price.toLocaleString()}원
                    </DetailHighlight>
                  </RowText>
                </TextContainer>
              </InfoRowFlex>
            </ItemDetails>

            {/* 우측: 이미지 + 체크박스 */}
            <RightSection>
              <ItemImageContainer>
                <ItemImage src={item.imageUrl} alt={item.nameCode} />
              </ItemImageContainer>
            </RightSection>
          </ContentWrapper>
        </Item>
      ))}

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

const SectionTitle = styled.h2`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;

  margin-bottom: 10px;
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
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 20px 10px;
`;

const SearchButton = styled.button`
  width: 69px;
  height: 34px;
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
`;

const ReturnOption = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Option = styled.div`
  flex: 1;
  border-radius: 4px;
  padding: 20px 10px;
  background: #ffffff;
  border: 1px solid #dddddd;
  display: flex;
  align-items: center;

  font-weight: 800;
  font-size: 13px;
  cursor: pointer;

  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;

  color: #dddddd;
`;

const PaymentSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const PaymentOption = styled.div`
  display: flex;
  flex-direction: column;
`;

const CouponSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const CouponOption = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalPaymentSection = styled.section`
  display: flex;
  flex-direction: column;
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

const Item = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 30px 0;
  margin-bottom: 15px;
  background-color: #fff;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Brand = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 28px;
`;

const NameCode = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
`;

const ItemType = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #999999;
`;

const Slash = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #dddddd;
  margin: 0 4px;
`;

const LabelDetailText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
`;

const DetailText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
`;

const DetailHighlight = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
`;

/**
 * InfoRowFlex:
 * 아이콘과 텍스트 컨테이너를 row로 정렬 (align-items: stretch로 텍스트 높이에 맞춰 아이콘 영역 확장)
 */
const InfoRowFlex = styled.div`
  display: flex;
  align-items: stretch;
  gap: 5px;
  width: 100%;
`;

/**
 * IconArea:
 * 아이콘이 들어갈 영역 – 텍스트 영역의 높이에 맞춰 자동으로 늘어나며, 항상 상단에 위치합니다.
 */
const IconArea = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

/**
 * TextContainer:
 * 아이콘 옆의 텍스트 영역 (column으로 정렬, 내부 행은 nowrap)
 */
const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const RowText = styled.div`
  display: flex;
  gap: 5px;
  white-space: nowrap;
`;

const AdditionalText = styled.div`
  display: flex;
  gap: 5px;
  white-space: nowrap;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-left: 10px;
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 140px;
  height: 210px;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
