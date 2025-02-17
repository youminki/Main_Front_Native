import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../assets/sample-dress.svg';
// 아이콘 import 경로는 실제 경로에 맞춰 수정해주세요.
import PriceIcon from '../assets/Basket/PriceIcon.svg';
import ProductInfoIcon from '../assets/Basket/ProductInfoIcon.svg';
import ServiceInfoIcon from '../assets/Basket/ServiceInfoIcon.svg';

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

const Basket: React.FC = () => {
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

  // 전체 선택/해제
  const handleSelectAll = () => {
    const updatedItems = items.map((item) => ({
      ...item,
      isSelected: !items.every((i) => i.isSelected),
    }));
    setItems(updatedItems);
  };

  // 개별 선택/해제
  const handleSelectItem = (id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );
    setItems(updatedItems);
  };

  return (
    <Container>
      <Header>
        <Checkbox
          type='checkbox'
          checked={items.every((item) => item.isSelected)}
          onChange={handleSelectAll}
        />
        <span>전체선택</span>
      </Header>

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

              {/* 진행 서비스 */}
              {item.type === 'rental' ? (
                <>
                  {/* 1) 진행 서비스 - 대여(3일) */}
                  <InfoRow>
                    <Icon src={ServiceInfoIcon} alt='Service Info' />
                    <DetailText>진행 서비스 - </DetailText>
                    <DetailHighlight>대여(3일)</DetailHighlight>
                  </InfoRow>

                  {/* 2) 대여 기간 (예: 2025.03.02 ~ 03.05) */}
                  <InfoRow>
                    <DetailText>{item.servicePeriod}</DetailText>
                  </InfoRow>
                </>
              ) : (
                <>
                  <InfoRow>
                    <Icon src={ServiceInfoIcon} alt='Service Info' />
                    <DetailText>진행 서비스 - 구매</DetailText>
                  </InfoRow>
                  <InfoRow>
                    <DetailText>{item.deliveryDate}</DetailText>
                  </InfoRow>
                </>
              )}

              {/* 제품 정보 */}
              {/* 3) '제품 정보' 라벨만 별도 라인 */}
              <InfoRow>
                <Icon src={ProductInfoIcon} alt='Product Info' />
                <DetailText>제품 정보</DetailText>
              </InfoRow>
              {/* 4) 사이즈 / 색상 */}
              <InfoRow>
                <DetailText>사이즈 - </DetailText>
                <DetailHighlight>{item.size}</DetailHighlight>
                <DetailText> / 색상 - </DetailText>
                <DetailHighlight>{item.color}</DetailHighlight>
              </InfoRow>

              {/* 결제 금액 */}
              {/* 5) 결제 금액 */}
              <InfoRow>
                <Icon src={PriceIcon} alt='Price' />
                <DetailText>결제금액 - </DetailText>
                <DetailHighlight>
                  {item.price.toLocaleString()}원
                </DetailHighlight>
              </InfoRow>
            </ItemDetails>

            {/* 우측: 이미지 + 체크박스 */}
            <RightSection>
              <ItemImageContainer>
                <CheckboxOverlay>
                  <Checkbox
                    type='checkbox'
                    checked={item.isSelected}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </CheckboxOverlay>
                <ItemImage src={item.imageUrl} alt={item.nameCode} />
              </ItemImageContainer>
            </RightSection>
          </ContentWrapper>

          {/* 하단 버튼 영역 */}
          <ButtonContainer>
            <DeleteButton>삭제</DeleteButton>
            <PurchaseButton>바로구매</PurchaseButton>
          </ButtonContainer>
        </Item>
      ))}
    </Container>
  );
};

export default Basket;

/* 스타일 정의 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-right: 8px;
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
  gap: 8px;
  flex: 1;
`;

const Brand = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
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

// 강조해야 하는 요소 (대여(3일), 사이즈, 색상, 결제금액 등)
const DetailHighlight = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 22px;
  color: #000000;
`;

// 나머지 디테일 요소 (진행 서비스 -, 제품 정보 - 등)
const DetailText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 22px;
  color: #000000;
`;

/**
 * InfoRow:
 * - 각 줄이 항상 한 줄로만 보이도록 white-space: nowrap 적용
 * - 글이 길어지면 가로 스크롤 발생
 */
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  white-space: nowrap; /* 한 줄로만 표시 (줄바꿈 없이) */
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 3px;
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

const CheckboxOverlay = styled.div`
  position: absolute;
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
  padding: 10px 20px;
  white-space: nowrap;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ddd;
`;

const PurchaseButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 30px;
  white-space: nowrap;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ddd;
`;
