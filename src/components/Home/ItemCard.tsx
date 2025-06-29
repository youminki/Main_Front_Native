// src/components/ItemCard.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { HeartIcon } from '../../assets/library/HeartIcon';
import { addToCloset, removeFromCloset } from '../../api/closet/closetApi';
import ReusableModal from '../ReusableModal2';

const { width } = Dimensions.get('window');

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

function ItemCard({
  id,
  image,
  brand,
  description,
  price,
  discount,
  isLiked: initialLiked,
  onOpenModal,
  onDelete,
}: ItemCardProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [animating, setAnimating] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const displayDescription = description.includes('/')
    ? description.split('/')[1]
    : description;

  const handleCardClick = () => onOpenModal(id);
  const handleLikeClick = () => {
    setConfirmAction(liked ? 'remove' : 'add');
  };

  const doAdd = async () => {
    setLiked(true);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    try {
      await addToCloset(+id);
    } catch (err: unknown) {
      setLiked(false);
      showError(err);
    }
  };

  const doRemove = async () => {
    setLiked(false);
    try {
      await removeFromCloset(+id);
      onDelete?.(id);
    } catch (err: unknown) {
      setLiked(true);
      showError(err);
    }
  };

  const showError = (err: unknown) => {
    let status;
    if (typeof err === 'object' && err !== null && 'response' in err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      status = (err as any).response?.status;
    }
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
    confirmAction === 'add' ? doAdd() : doRemove();
  };

  const modalTitle = confirmAction === 'add' ? '찜 등록 확인' : '삭제 확인';
  const modalMessage =
    confirmAction === 'add'
      ? '정말 이 상품을 내 옷장에 추가하시겠습니까?'
      : '정말 이 상품을 내 옷장에 삭제하시겠습니까?';

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={handleCardClick}
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: image.split('#')[0] || 'https://via.placeholder.com/300x450',
            }}
            style={styles.image}
            resizeMode='cover'
          />
          <TouchableOpacity
            style={[styles.likeButton, animating && styles.animating]}
            onPress={handleLikeClick}
            activeOpacity={0.7}
          >
            <HeartIcon filled={liked} />
          </TouchableOpacity>
        </View>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.description}>{displayDescription}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.originalPrice}>{price.toLocaleString()}원</Text>
          <View style={styles.subPrice}>
            <Text style={styles.nowLabel}>NOW</Text>
            <Text style={styles.discountLabel}>{discount}%</Text>
          </View>
        </View>
      </TouchableOpacity>

      <ReusableModal
        isOpen={confirmAction !== null}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        title={modalTitle}
      >
        <Text>{modalMessage}</Text>
      </ReusableModal>

      <ReusableModal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title='오류'
      >
        <Text>{errorMsg}</Text>
      </ReusableModal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    marginBottom: 12,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 2 / 3,
    minHeight: 240,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    minHeight: 240,
  },
  likeButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 24,
    height: 24,
    padding: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  animating: {
    transform: [{ scale: 1.4 }],
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  originalPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  subPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nowLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF6B6B',
    marginRight: 4,
  },
  discountLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B6B',
  },
});

export default ItemCard;
