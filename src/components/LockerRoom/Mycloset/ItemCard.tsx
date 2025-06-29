import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ReusableModal2 from '../../../components/ReusableModal2';

const { width } = Dimensions.get('window');

type ItemCardProps = {
  id: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  onDelete: (id: string) => void;
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
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    navigation.navigate('HomeDetail' as never, { id } as never);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const imageToShow =
    image.trim() !== '' ? image : 'https://via.placeholder.com/300x450';

  return (
    <>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={handleClick}
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageToShow }}
            style={styles.image}
            resizeMode='cover'
          />
          <TouchableOpacity
            style={styles.deleteButtonIcon}
            onPress={handleDeleteClick}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.originalPrice}>{price.toLocaleString()}원</Text>
          <Text style={styles.nowLabel}>NOW</Text>
          <Text style={styles.discountLabel}>{discount}%</Text>
        </View>
      </TouchableOpacity>

      <ReusableModal2
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title='삭제 확인'
      >
        <View style={styles.modalContentWrapper}>
          <Image
            source={{ uri: imageToShow }}
            style={styles.modalImage}
            resizeMode='contain'
          />
          <Text style={styles.modalMessage}>선택한 옷을 삭제하시겠습니까?</Text>
        </View>
      </ReusableModal2>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 15,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: '#f5f5f5',
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteButtonIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButtonText: {
    fontSize: 24,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  brand: {
    fontWeight: '900',
    fontSize: 12,
    color: '#000',
    marginTop: 8,
    marginBottom: 2,
  },
  description: {
    fontWeight: '400',
    fontSize: 14,
    color: '#999',
    marginVertical: 5,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
  originalPrice: {
    fontWeight: '900',
    fontSize: 16,
    color: '#000',
    marginLeft: 6,
  },
  nowLabel: {
    fontSize: 10,
    color: '#000',
    marginLeft: 5,
  },
  discountLabel: {
    fontWeight: '800',
    fontSize: 12,
    color: '#f6ae24',
    marginLeft: 5,
  },
  modalContentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  modalImage: {
    width: 80,
    height: 120,
  },
  modalMessage: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});

export default ItemCard;
