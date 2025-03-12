// src/components/Basket.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import sampleImage from '../assets/sample-dress.svg';
import PriceIcon from '../assets/Basket/PriceIcon.svg';
import ProductInfoIcon from '../assets/Basket/ProductInfoIcon.svg';
import ServiceInfoIcon from '../assets/Basket/ServiceInfoIcon.svg';
import FixedBottomBar from '../components/FixedBottomBar';
import { useNavigate } from 'react-router-dom';
import ReusableModal2 from '../components/ReusableModal2';

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

const Basket: React.FC = () => {
  const navigate = useNavigate();
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
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

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

  const handleConfirmPayment = () => {
    navigate('/payment');
  };

  const handleDeleteClick = (id: number) => {
    setSelectedItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleBuyClick = (id: number) => {
    setSelectedItemId(id);
    setIsBuyModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItemId !== null) {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedItemId)
      );
      setSelectedItemId(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleConfirmBuy = () => {
    setIsBuyModalOpen(false);
    navigate('/payment');
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
                      {item.price.toLocaleString()}원
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
                    checked={item.isSelected}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </CheckboxOverlay>
                <ItemImage src={item.imageUrl} alt={item.nameCode} />
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

      {/* 삭제 모달 */}
      <ReusableModal2
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title='알림'
      >
        해당 제품을 삭제하시겠습니까?
      </ReusableModal2>

      {/* 바로구매 모달 */}
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

/* 기본 스타일 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

/* 체크박스 디자인 - 직접 컬러 명시 */
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
  font-style: normal;
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
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
`;

const ItemType = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #999999;
`;

const Slash = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #dddddd;
  margin: 0 4px;
`;

const LabelDetailText = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
`;

const DetailText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
`;

const DetailHighlight = styled.span`
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
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
