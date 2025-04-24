// src/components/Home/ItemCard.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { HeartIcon } from '../../assets/library/HeartIcon';
import { addToCloset, removeFromCloset } from '../../api/closet/closetApi';
import ReusableModal from '../ReusableModal'; // 모달 컴포넌트 import

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
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // 상세 페이지 열기 핸들러
  const handleClick = () => {
    onOpenModal(id);
  };

  // 좋아요 토글 & API 호출
  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 상세페이지 이동 방지
    try {
      if (!liked) {
        await addToCloset(parseInt(id, 10));
        setLiked(true);
      } else {
        await removeFromCloset(parseInt(id, 10));
        setLiked(false);
      }
    } catch (err: any) {
      const status = err.response?.status;
      let msg: string;
      if (status === 409) {
        msg = '이미 찜한 상품입니다.';
      } else if (status === 401) {
        msg = '로그인이 필요합니다.';
      } else {
        msg = '찜 처리 중 오류가 발생했습니다.';
      }
      setModalTitle('오류');
      setModalMessage(msg);
      setModalOpen(true);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setModalTitle('');
    setModalMessage('');
  };

  // 이미지 URL 정제
  const sanitizedImage =
    image && image.trim() !== '' ? image.split('#')[0] : '/default-image.jpg';

  // description 뒷부분만 표시
  const trimmedDescription = description.split('/')[1] || description;

  return (
    <>
      <CardContainer onClick={handleClick}>
        <ImageWrapper>
          <Image src={sanitizedImage} alt={brand} />
          <LikeButton liked={liked} onClick={handleLikeToggle}>
            <HeartIcon filled={liked} />
          </LikeButton>
        </ImageWrapper>
        <Brand>{brand}</Brand>
        <Description>{trimmedDescription}</Description>
        <PriceWrapper>
          <OriginalPrice>{price.toLocaleString()}</OriginalPrice>
          <NowLabel>NOW</NowLabel>
          <DiscountLabel>{discount}%</DiscountLabel>
        </PriceWrapper>
      </CardContainer>

      {/* 에러 메시지 모달 */}
      <ReusableModal isOpen={modalOpen} onClose={closeModal} title={modalTitle}>
        {modalMessage}
      </ReusableModal>
    </>
  );
};

export default ItemCard;

// styled-components
const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  width: 100%;
  margin-bottom: 15px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Brand = styled.h3`
  font-weight: 900;
  font-size: 11px;
  color: #000;
  margin-bottom: 2px;
`;

const Description = styled.p`
  margin-top: 6px;
  font-size: 12px;
  color: #999;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
`;

const OriginalPrice = styled.span`
  font-weight: 900;
  font-size: 16px;
  color: #000;
`;

const NowLabel = styled.span`
  font-size: 10px;
  color: #000;
`;

const DiscountLabel = styled.span`
  font-weight: 800;
  font-size: 12px;
  color: #f6ae24;
`;

const LikeButton = styled.div<{ liked: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.liked ? '#f44336' : '#000')};
`;
