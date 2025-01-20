// ItemCard.tsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type ItemCardProps = {
  id: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
};

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  image,
  brand,
  description,
  price,
  discount,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageWrapper>
        {image ? (
          <Image src={image} alt={brand} />
        ) : (
          <Placeholder>이미지가 없습니다</Placeholder>
        )}
      </ImageWrapper>
      <Brand>{brand}</Brand>
      <Description>{description}</Description>
      <PriceWrapper>
        <OriginalPrice>{price.toLocaleString()}원</OriginalPrice>
        <NowLabel>NOW</NowLabel>
        <DiscountLabel>{discount}%</DiscountLabel>
      </PriceWrapper>
    </CardContainer>
  );
};

export default ItemCard;

// 스타일 정의
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  margin-bottom: 15px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
`;

const Brand = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2px;
`;

const Description = styled.p`
  margin-top: 0;
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
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
  margin-left: 6px;
`;

const OriginalPrice = styled.span`
  position: relative;
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 15px;
  color: #000000;
`;

const NowLabel = styled.span`
  position: relative;
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 9px;
  color: #000000;
`;

const DiscountLabel = styled.span`
  position: relative;
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  line-height: 11px;
  color: #f6ae24;
`;
