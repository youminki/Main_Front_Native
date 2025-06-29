import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { addToCloset } from '../../../api/closet/closetApi';
import ReusableModal from '../../ReusableModal';

export interface ProductInfoProps {
  productInfo: {
    brand: string;
    product_num: string;
    name: string;
    retailPrice: number;
    discountPercent: number;
    discountPrice: number;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleAddTekClick = async () => {
    try {
      // productId가 없으므로 임시로 0 사용
      await addToCloset(0);
      setModalTitle('성공');
      setModalMessage('찜 목록에 추가되었습니다!');
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 409) setModalMessage('이미 찜한 상품입니다.');
      else if (status === 401) setModalMessage('로그인이 필요합니다.');
      else setModalMessage('에러가 발생했습니다.');
      setModalTitle('알림');
      console.error(err);
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.categoryText}>
        브랜드 <Text style={styles.gt}>&gt;</Text> {productInfo.brand}
      </Text>
      <Text style={styles.productTitle}>
        {productInfo.product_num} / {productInfo.name}
      </Text>

      <View style={styles.contentContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>
            {productInfo.retailPrice.toLocaleString()}원
          </Text>
          <View style={styles.discountRow}>
            <Text style={styles.discountPercent}>
              {productInfo.discountPercent}%
            </Text>
            <Text style={styles.discountPrice}>
              {productInfo.discountPrice.toLocaleString()}원
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.tekImageContainer}
          onPress={handleAddTekClick}
          activeOpacity={0.7}
        >
          <View style={styles.tekImage}>
            <Text style={styles.tekText}>찜</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ReusableModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <Text>{modalMessage}</Text>
      </ReusableModal>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    width: '100%',
    marginBottom: 30,
  },
  categoryText: {
    fontSize: 11,
    color: '#000',
  },
  gt: {
    color: '#ddd',
    paddingHorizontal: 4,
  },
  productTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginVertical: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  originalPrice: {
    fontWeight: '700',
    fontSize: 13,
    textDecorationLine: 'line-through',
    color: '#999',
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
  },
  discountPercent: {
    color: '#f6ae24',
    marginRight: 10,
    fontWeight: '900',
    fontSize: 16,
  },
  discountPrice: {
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 20,
  },
  tekImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tekImage: {
    width: 80,
    height: 80,
    backgroundColor: '#f6ae24',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tekText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductInfo;
