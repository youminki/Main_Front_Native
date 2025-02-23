// ItemCard.tsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 샘플 이미지와 삭제 버튼 아이콘 import
import SampleMyCloset1 from '../../../assets/LockerRoom/SampleMyCloset1.svg';
import SampleMyCloset2 from '../../../assets/LockerRoom/SampleMyCloset2.svg';
import SampleMyCloset3 from '../../../assets/LockerRoom/SampleMyCloset3.svg';
import SampleMyCloset4 from '../../../assets/LockerRoom/SampleMyCloset4.svg';
import DeleteButton from '../../../assets/LockerRoom/DeleteButton.svg';

const sampleImages = [
  SampleMyCloset1,
  SampleMyCloset2,
  SampleMyCloset3,
  SampleMyCloset4,
];

type ItemCardProps = {
  id: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  onDelete: (id: string) => void; // 삭제 처리용 콜백 함수 추가
};

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  image,
  brand,
  description,
  price,
  discount,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${id}`);
  };

  // image prop이 비어있으면 sample 이미지 사용
  const imageToShow =
    image && image.trim() !== ''
      ? image
      : sampleImages[(parseInt(id) - 1) % sampleImages.length];

  // delete 버튼 클릭 핸들러
  const handleDelete = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    onDelete(id);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageWrapper>
        <Image src={imageToShow} alt={brand} />
        <DeleteButtonIcon
          onClick={handleDelete}
          src={DeleteButton}
          alt='삭제'
        />
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
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButtonIcon = styled.img`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

const Brand = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2px;
`;

const Description = styled.p`
  margin-top: 0;
  font-family: 'NanumSquare Neo OTF';
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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 14px;
  line-height: 15px;
  color: #000000;
`;

const NowLabel = styled.span`
  position: relative;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 9px;
  color: #000000;
`;

const DiscountLabel = styled.span`
  position: relative;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  line-height: 11px;
  color: #f6ae24;
`;
