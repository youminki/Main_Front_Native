import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { HeartIcon } from '../../assets/library/HeartIcon';
import { addToCloset, removeFromCloset } from '../../api/closet/closetApi';
import ReusableModal from '../ReusableModal2';

type ItemCardProps = {
  id: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  isLiked: boolean;
  onOpenModal: (id: string) => void;
  onDelete?: (id: string) => void;
};

type ConfirmAction = 'add' | 'remove' | null;

const heartBeat = keyframes`
  0% { transform: scale(1); }
  30% { transform: scale(1.4); }
  100% { transform: scale(1); }
`;

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  image,
  brand,
  description,
  price,
  discount,
  isLiked: initialLiked,
  onOpenModal,
  onDelete,
}) => {
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [animating, setAnimating] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const displayDescription = description.includes('/')
    ? description.split('/')[1]
    : description;

  const handleCardClick = () => onOpenModal(id);
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmAction(liked ? 'remove' : 'add');
  };

  const doAdd = async () => {
    setLiked(true);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    try {
      await addToCloset(+id);
    } catch (err: any) {
      setLiked(false);
      showError(err);
    }
  };

  const doRemove = async () => {
    setLiked(false);
    try {
      await removeFromCloset(+id);
      onDelete && onDelete(id);
    } catch (err: any) {
      setLiked(true);
      showError(err);
    }
  };

  const showError = (err: any) => {
    const status = err.response?.status;
    const msg =
      status === 409
        ? '이미 찜한 상품입니다.'
        : status === 401
          ? '로그인이 필요합니다.'
          : '찜 처리 중 오류가 발생했습니다.';
    setErrorMsg(msg);
    setErrorModalOpen(true);
  };

  const closeConfirm = () => setConfirmAction(null);
  const handleConfirm = () => {
    closeConfirm();
    if (confirmAction === 'add') doAdd();
    else if (confirmAction === 'remove') doRemove();
  };

  const modalTitle = confirmAction === 'add' ? '찜 등록 확인' : '삭제 확인';
  const modalMessage =
    confirmAction === 'add'
      ? '정말 이 상품을 내 옷장에 추가하시겠습니까?'
      : '정말 이 상품을 내 옷장에 삭제하시겠습니까?';

  return (
    <>
      <CardContainer onClick={handleCardClick}>
        <ImageWrapper>
          <Image src={image?.split('#')[0] ?? '/default.jpg'} alt={brand} />
          <LikeButton onClick={handleLikeClick} animating={animating}>
            <HeartIcon filled={liked} />
          </LikeButton>
        </ImageWrapper>
        <Brand>{brand}</Brand>
        <Description>{displayDescription}</Description>
        <PriceWrapper>
          <OriginalPrice>{price.toLocaleString()}원</OriginalPrice>
          <NowLabel>NOW</NowLabel>
          <DiscountLabel>{discount}%</DiscountLabel>
        </PriceWrapper>
      </CardContainer>

      <ReusableModal
        isOpen={confirmAction !== null}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        title={modalTitle}
      >
        <p>{modalMessage}</p>
      </ReusableModal>

      <ReusableModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title='오류'
      >
        <p>{errorMsg}</p>
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
  margin-bottom: 12px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  background: #f5f5f5;
  border: 1px solid #ccc;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikeButton = styled.div<{ animating: boolean }>`
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  padding: 2px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ animating }) =>
    animating &&
    css`
      animation: ${heartBeat} 0.3s ease-out;
    `}

  & svg {
    width: 16px;
    height: 16px;
  }
`;

const Brand = styled.h3`
  margin: 4px 0 2px;
  font-size: 10px;
  font-weight: 900;
`;

const Description = styled.p`
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OriginalPrice = styled.span`
  font-weight: 900;
  font-size: 14px;
`;

const NowLabel = styled.span`
  font-size: 9px;
`;

const DiscountLabel = styled.span`
  font-weight: 800;
  font-size: 11px;
  color: #f6ae24;
`;
