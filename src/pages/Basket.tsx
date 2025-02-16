import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../assets/sample-dress.svg';

interface BasketItem {
  id: number;
  brand: string;
  name: string;
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
      name: 'SF25S3FRD7699 / 원피스',
      type: 'rental',
      servicePeriod: '2025.03.02 (일) ~ 03.05 (수)',
      size: 'M (55)',
      color: '블랙',
      price: 50000,
      imageUrl: sampleImage,
      isSelected: true,
    },
  ]);

  const handleSelectAll = () => {
    const updatedItems = items.map((item) => ({
      ...item,
      isSelected: !items.every((i) => i.isSelected),
    }));
    setItems(updatedItems);
  };

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
            <ItemDetails>
              <Brand>{item.brand}</Brand>
              <ItemName>{item.name}</ItemName>
              <ServiceInfo>
                {item.type === 'rental'
                  ? `대여 (3일) - ${item.servicePeriod}`
                  : `구매 - ${item.deliveryDate} 발송 예정`}
              </ServiceInfo>
              <ProductInfo>
                사이즈 - {item.size} / 색상 - {item.color}
              </ProductInfo>
              <Price>{item.price.toLocaleString()}원</Price>
            </ItemDetails>
            <RightSection>
              <ItemImageContainer>
                <CheckboxOverlay>
                  <Checkbox
                    type='checkbox'
                    checked={item.isSelected}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </CheckboxOverlay>
                <ItemImage src={item.imageUrl} alt={item.name} />
              </ItemImageContainer>
            </RightSection>
          </ContentWrapper>
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
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
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

const Brand = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ServiceInfo = styled.div`
  font-size: 12px;
  color: #666;
`;

const ProductInfo = styled.div`
  font-size: 12px;
  color: #666;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
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
  width: auto;
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
