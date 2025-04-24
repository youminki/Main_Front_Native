import React, { useState } from 'react';
import styled from 'styled-components';
import { HeartIcon } from '../../assets/library/HeartIcon';
import { addToCloset, removeFromCloset } from '../../api/closet/closetApi';
import ReusableModal from '../ReusableModal';

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

  const handleClick = () => {
    onOpenModal(id);
  };

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
      const msg =
        status === 409
          ? '이미 찜한 상품입니다.'
          : status === 401
            ? '로그인이 필요합니다.'
            : '찜 처리 중 오류가 발생했습니다.';
      setModalTitle('오류');
      setModalMessage(msg);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTitle('');
    setModalMessage('');
  };

  const sanitizedImage =
    image && image.trim() !== '' ? image.split('#')[0] : '/default-image.jpg';
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

      <ReusableModal isOpen={modalOpen} onClose={closeModal} title={modalTitle}>
        {modalMessage}
      </ReusableModal>
    </>
  );
};

export default ItemCard;

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  margin-bottom: 15px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Brand = styled.h3`
  font-weight: 900;
  font-size: 11px;
  margin: 6px 0 2px;
`;

const Description = styled.p`
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
`;

const NowLabel = styled.span`
  font-size: 10px;
`;

const DiscountLabel = styled.span`
  font-weight: 800;
  font-size: 12px;
  color: #f6ae24;
`;

const LikeButton = styled.div<{ liked: boolean }>`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
