// ItemCard.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 샘플 이미지와 삭제 버튼 아이콘 import
import SampleMyCloset1 from '../../../assets/LockerRoom/SampleMyCloset1.svg';
import SampleMyCloset2 from '../../../assets/LockerRoom/SampleMyCloset2.svg';
import SampleMyCloset3 from '../../../assets/LockerRoom/SampleMyCloset3.svg';
import SampleMyCloset4 from '../../../assets/LockerRoom/SampleMyCloset4.svg';
import DeleteButton from '../../../assets/LockerRoom/DeleteButton.svg';
import ReusableModal2 from '../../../components/ReusableModal2';

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
  onDelete: (id: string) => void; // 삭제 콜백 함수
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    navigate(`/item/${id}`);
  };

  // 삭제 버튼 클릭 시 모달 오픈
  const handleDeleteClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  // 모달의 "네" 버튼 클릭 시 삭제 처리 후 모달 닫기
  const handleConfirmDelete = () => {
    onDelete(id);
    setIsModalOpen(false);
  };

  // 모달의 "아니요" 버튼 클릭 시 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // image prop이 비어있으면 sample 이미지 사용
  const imageToShow =
    image && image.trim() !== ''
      ? image
      : sampleImages[(parseInt(id) - 1) % sampleImages.length];

  return (
    <>
      <CardContainer onClick={handleClick}>
        <ImageWrapper>
          <Image src={imageToShow} alt={brand} />
          <DeleteButtonIcon
            onClick={handleDeleteClick}
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
      <ReusableModal2
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title='삭제 확인'
      >
        <ModalContentWrapper>
          <ModalImage src={imageToShow} alt={brand} />
          <ModalMessage>선택한 옷을 삭제하시겠습니까?</ModalMessage>
        </ModalContentWrapper>
      </ReusableModal2>
    </>
  );
};

export default ItemCard;

// 기존 스타일 정의
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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 11px;
  /* identical to box height */

  color: #000000;
  margin-bottom: 2px;
`;

const Description = styled.p`
  margin-top: 0;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 13px;
  margin-top: 5px;
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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 15px;
  margin-left: 6px;
  color: #000000;
`;

const NowLabel = styled.span`
  position: relative;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 9px;
  color: #000000;
`;

const DiscountLabel = styled.span`
  position: relative;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 11px;
  color: #f6ae24;
`;

// 모달 내부 컨텐츠 스타일
const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalImage = styled.img`
  width: 70%;
  height: auto;
  object-fit: cover;
`;

const ModalMessage = styled.p`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: #000000;

  text-align: center;
`;
