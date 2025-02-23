// src/components/ProductReview/ProductReview.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import PeriodSection from '../../../components/PeriodSection'; // 추가된 import
import sampleImage from '../../../assets/sample-dress.svg';
import PriceIcon from '../../../assets/Basket/PriceIcon.svg';
import ProductInfoIcon from '../../../assets/Basket/ProductInfoIcon.svg';
import ServiceInfoIcon from '../../../assets/Basket/ServiceInfoIcon.svg';

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
  price: number | string;
  imageUrl: string;
  isSelected: boolean;
  rentalDays?: string;
}

const ProductReview: React.FC = () => {
  // 기간 선택 상태 (3개월 / 6개월)
  const [selectedPeriod, setSelectedPeriod] = useState(6);
  // Basket.tsx와 동일한 아이템 구조
  const [items] = useState<BasketItem[]>([
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
      rentalDays: '대여 (3일)',
    },
    {
      id: 2,
      brand: 'SANDRO',
      nameCode: 'SF25S3FRD7699',
      nameType: '원피스',
      type: 'rental',
      servicePeriod: '2025.03.02 (일) ~ 03.05 (수)',
      size: 'M (55)',
      color: '블랙',
      price: '489,000',
      imageUrl: sampleImage,
      isSelected: true,
      rentalDays: '구매',
    },
    // 필요에 따라 아이템 추가 가능
  ]);

  // 선택된 기간에 따라 아이템 목록을 필터링 (예시: 3개월이면 앞의 3개, 6개월이면 전체)
  const filteredItems = selectedPeriod === 3 ? items.slice(0, 3) : items;

  return (
    <ProductReviewContainer>
      <Header>
        <Title>이용 내역</Title>
        <Subtitle>나에게 맞는 스타일을 찾을 때는 멜픽!</Subtitle>
      </Header>

      <StatsSection
        visits={'999'}
        sales={'2025 1분기'}
        dateRange={'SPRING'}
        visitLabel={'담긴 제품들'}
        salesLabel={'시즌'}
      />

      <Divider />

      <Section>
        {/* 기존 SettlementHeader 영역을 PeriodSection 컴포넌트로 대체 */}
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <ItemList>
          {filteredItems.map((item) => (
            <Item key={item.id}>
              <ContentWrapper>
                <ItemDetails>
                  <Brand>{item.brand}</Brand>
                  <ItemName>
                    <NameCode>{item.nameCode}</NameCode>
                    <Slash>/</Slash>
                    <ItemType>{item.nameType}</ItemType>
                  </ItemName>
                  {item.type === 'rental' ? (
                    <InfoRowFlex>
                      <IconArea>
                        <Icon src={ServiceInfoIcon} alt='Service Info' />
                      </IconArea>
                      <TextContainer>
                        <RowText>
                          <LabelDetailText>진행 서비스 - </LabelDetailText>
                          <DetailHighlight>{item.rentalDays}</DetailHighlight>
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
                  <InfoRowFlex>
                    <IconArea>
                      <Icon src={PriceIcon} alt='Price' />
                    </IconArea>
                    <TextContainer>
                      <RowText>
                        <LabelDetailText>결제금액 - </LabelDetailText>
                        <DetailHighlight>
                          {typeof item.price === 'number'
                            ? item.price.toLocaleString()
                            : item.price}
                          원
                        </DetailHighlight>
                      </RowText>
                    </TextContainer>
                  </InfoRowFlex>
                </ItemDetails>

                <RightSection>
                  <ItemImageContainer>
                    <ItemImage src={item.imageUrl} alt={item.nameCode} />
                  </ItemImageContainer>
                </RightSection>
              </ContentWrapper>

              <ButtonContainer>
                <DeleteButton>제품상세</DeleteButton>
                <PurchaseButton>재신청</PurchaseButton>
              </ButtonContainer>
            </Item>
          ))}
        </ItemList>
      </Section>
    </ProductReviewContainer>
  );
};

export default ProductReview;

/* ProductReview 기본 스타일 */
const ProductReviewContainer = styled.div`
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
  background: #dddddd;
  margin-top: 30px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 80px;
  margin-top: 30px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
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
  font-weight: 900;
  font-size: 10px;
  line-height: 11px;
  color: #000;
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0 28px;
`;

const NameCode = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 900;
  font-size: 16px;
  line-height: 22px;
  color: #000;
`;

const Slash = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #dddddd;
  margin: 0 4px;
`;

const ItemType = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #999;
`;

const InfoRowFlex = styled.div`
  display: flex;
  align-items: stretch;
  gap: 5px;
  width: 100%;
`;

const IconArea = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

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

const DetailText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: #000;
  white-space: nowrap;
`;

const DetailHighlight = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 900;
  font-size: 12px;
  line-height: 22px;
  color: #000;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-self: flex-end;
`;

const DeleteButton = styled.button`
  background-color: #fff;
  color: #888;
  width: 91px;
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
`;

const PurchaseButton = styled.button`
  background-color: #000;
  color: #fff;
  width: 91px;
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
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
