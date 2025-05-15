// src/pages/Basket.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PriceIcon from '../assets/Basket/PriceIcon.svg';
import ProductInfoIcon from '../assets/Basket/ProductInfoIcon.svg';
import ServiceInfoIcon from '../assets/Basket/ServiceInfoIcon.svg';
import FixedBottomBar from '../components/FixedBottomBar';
import { useNavigate } from 'react-router-dom';
import ReusableModal2 from '../components/ReusableModal2';
import { getCartItems, deleteCartItem } from '../api/cart/cart';
import type { CartItemListResponse } from '../api/cart/cart';

// PaymentPage가 기대하는 BasketItem 인터페이스
interface BasketItemForPayment {
  id: number;
  brand: string;
  nameCode: string;
  nameType: string;
  type: 'rental' | 'purchase';
  servicePeriod?: string; // "YYYY.MM.DD ~ YYYY.MM.DD"
  size: string;
  color: string;
  price: number;
  imageUrl: string;
  $isSelected: boolean;
}

interface BasketItem extends CartItemListResponse {
  $isSelected: boolean;
}

const Basket: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    getCartItems()
      .then((data) => {
        const withSelectFlag = data.map((item) => ({
          ...item,
          $isSelected: true,
        }));
        setItems(withSelectFlag);
      })
      .catch((err) => console.error('장바구니 목록 조회 실패', err));
  }, []);

  const handleSelectAll = () => {
    const allSelected = items.every((i) => i.$isSelected);
    setItems(items.map((item) => ({ ...item, $isSelected: !allSelected })));
  };

  const handleSelectItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, $isSelected: !item.$isSelected } : item
      )
    );
  };

  const navigateToPayment = (item: BasketItem) => {
    const servicePeriod =
      item.rentalStartDate && item.rentalEndDate
        ? `${item.rentalStartDate} ~ ${item.rentalEndDate}`
        : undefined;
    const payload: BasketItemForPayment = {
      id: item.productId,
      brand: item.productBrand,
      nameCode: item.productName,
      nameType: '',
      type: item.serviceType.toLowerCase() === 'rental' ? 'rental' : 'purchase',
      servicePeriod,
      size: item.size,
      color: item.color,
      price: item.totalPrice ?? 0,
      imageUrl: item.productThumbnail,
      $isSelected: true,
    };
    navigate(`/payment/${item.productId}`, { state: payload });
  };

  const handleConfirmPayment = () => {
    const toPay = items.filter((item) => item.$isSelected);
    if (toPay.length === 0) return;
    navigateToPayment(toPay[0]);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItemId != null) {
      deleteCartItem(selectedItemId).catch((err) =>
        console.error('삭제 실패', err)
      );
      setItems(items.filter((item) => item.id !== selectedItemId));
      setSelectedItemId(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleBuyClick = (id: number) => {
    setSelectedItemId(id);
    setIsBuyModalOpen(true);
  };

  const handleConfirmBuy = () => {
    setIsBuyModalOpen(false);
    const item = items.find((i) => i.id === selectedItemId);
    if (item) navigateToPayment(item);
  };

  return (
    <Container>
      <Header>
        <Checkbox
          type='checkbox'
          checked={items.every((item) => item.$isSelected)}
          onChange={handleSelectAll}
        />
        <span>전체선택</span>
      </Header>

      {items.map((item) => (
        <Item key={item.id}>
          <ContentWrapper>
            <ItemDetails>
              <Brand>{item.productBrand}</Brand>
              <ItemName>
                <NameCode>{item.productName}</NameCode>
              </ItemName>

              <InfoRowFlex>
                <IconArea>
                  <Icon src={ServiceInfoIcon} alt='Service' />
                </IconArea>
                <TextContainer>
                  <RowText>
                    <LabelDetailText>서비스 타입 - </LabelDetailText>
                    <DetailHighlight>{item.serviceType}</DetailHighlight>
                  </RowText>
                  {item.rentalStartDate && item.rentalEndDate && (
                    <AdditionalText>
                      <DetailText>
                        {item.rentalStartDate} ~ {item.rentalEndDate}
                      </DetailText>
                    </AdditionalText>
                  )}
                </TextContainer>
              </InfoRowFlex>

              <InfoRowFlex>
                <IconArea>
                  <Icon src={ProductInfoIcon} alt='Product' />
                </IconArea>
                <TextContainer>
                  <RowText>
                    <LabelDetailText>사이즈/색상</LabelDetailText>
                  </RowText>
                  <AdditionalText>
                    <DetailText>
                      {item.size} / {item.color}
                    </DetailText>
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
                      {item.totalPrice != null
                        ? item.totalPrice.toLocaleString()
                        : '0'}
                      원
                    </DetailHighlight>
                  </RowText>
                </TextContainer>
              </InfoRowFlex>
            </ItemDetails>

            <RightSection>
              <ItemImageContainer>
                <CheckboxOverlay>
                  <Checkbox
                    type='checkbox'
                    checked={item.$isSelected}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </CheckboxOverlay>
                <ItemImage src={item.productThumbnail} alt={item.productName} />
              </ItemImageContainer>
            </RightSection>
          </ContentWrapper>

          <ButtonContainer>
            <DeleteButton onClick={() => handleDeleteClick(item.id)}>
              삭제
            </DeleteButton>
            <PurchaseButton onClick={() => handleBuyClick(item.id)}>
              바로구매
            </PurchaseButton>
          </ButtonContainer>
        </Item>
      ))}

      <FixedBottomBar
        onClick={handleConfirmPayment}
        text='결제하기'
        color='yellow'
      />

      <ReusableModal2
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title='알림'
      >
        해당 제품을 삭제하시겠습니까?
      </ReusableModal2>

      <ReusableModal2
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onConfirm={handleConfirmBuy}
        title='알림'
      >
        해당 제품을 바로 구매하시겠습니까?
      </ReusableModal2>
    </Container>
  );
};

export default Basket;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 1rem;
  max-width: 600px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  margin-bottom: 5px;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 3px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #ffffff;
    border-color: #999999;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 5px;
    border-left: 3px solid orange;
    border-bottom: 3px solid orange;
    transform: rotate(-45deg);
  }

  &:focus {
    outline: none;
  }
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
  font-weight: 900;
  font-size: 14px;
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
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;

const ItemType = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #999999;
`;

const Slash = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #dddddd;
  margin: 0 4px;
`;

const LabelDetailText = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
`;

const DetailText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
`;

const DetailHighlight = styled.span`
  font-weight: 900;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
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
  width: 91px;
  height: 46px;
  white-space: nowrap;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ddd;
`;

const PurchaseButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  width: 91px;
  height: 46px;
  white-space: nowrap;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ddd;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
