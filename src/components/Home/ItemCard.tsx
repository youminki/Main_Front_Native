// src/components/Home/ItemCard.tsx
import React from 'react';
import styled from 'styled-components';
import DetailButton from '../../assets/Home/DetailButton.svg';

type ItemCardProps = {
  id: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  onOpenModal: (id: string) => void;
};

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  image,
  brand,
  description,
  price,
  discount,
  onOpenModal,
}) => {
  const handleClick = () => {
    onOpenModal(id);
  };

  // 이미지가 존재하면 해시(#) 뒤의 부분 제거, 없으면 기본 이미지 사용
  const sanitizedImage =
    image && image.trim() !== '' ? image.split('#')[0] : '/default-image.jpg';

  // description에서 '/' 이전의 부분을 제거
  const trimmedDescription = description.split('/')[1] || description;

  return (
    <CardContainer onClick={handleClick}>
      <ImageWrapper>
        <Image src={sanitizedImage} alt={brand} />
        <DetailButtonIcon src={DetailButton} alt='상세 버튼' />
      </ImageWrapper>
      <Brand>{brand}</Brand>
      <Description>{trimmedDescription}</Description>
      <PriceWrapper>
        <OriginalPrice>{price.toLocaleString()}</OriginalPrice>
        <NowLabel>NOW</NowLabel>
        <DiscountLabel>{discount}%</DiscountLabel>
      </PriceWrapper>
    </CardContainer>
  );
};

export default ItemCard;

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  margin-bottom: 15px;
`;

const ImageWrapper = styled.div`
  border: 1px solid #eeeeee;
  aspect-ratio: 2 / 3;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailButtonIcon = styled.img`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 36px;
  height: 36px;
  cursor: default;
`;

const Brand = styled.h3`
  font-weight: 900;
  font-size: 11px;
  line-height: 11px;
  color: #000000;
  margin-bottom: 2px;
`;

const Description = styled.p`
  margin-top: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #999999;
`;

const PriceWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  border-left: 1px solid #e0e0e0;
`;

const OriginalPrice = styled.span`
  font-weight: 900;
  font-size: 16px;
  line-height: 15px;
  margin-left: 6px;
  color: #000000;
`;

const NowLabel = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 9px;
  color: #000000;
`;

const DiscountLabel = styled.span`
  font-weight: 800;
  font-size: 12px;
  line-height: 11px;
  color: #f6ae24;
`;
