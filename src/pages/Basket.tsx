// src/pages/Basket.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppLayout';
import { getCartItems, deleteCartItem } from '../api/cart/cart';
import ReusableModal from '../components/ReusableModal';

interface BasketItemForPayment {
  id: number;
  brand: string;
  nameCode: string;
  nameType: string;
  type: 'rental' | 'purchase';
  servicePeriod?: string;
  size: string;
  color: string;
  price: number;
  imageUrl: string;
  $isSelected: boolean;
}

interface BasketItem {
  id: number;
  productId: number;
  product_num: string;
  name: string;
  productBrand: string;
  productThumbnail: string;
  serviceType: 'rental' | 'purchase';
  rentalStartDate?: string;
  rentalEndDate?: string;
  size: string;
  color: string;
  totalPrice: number;
  $isSelected: boolean;
}

const getServiceLabel = (type: string) => {
  if (type === 'rental') return '대여';
  if (type === 'purchase') return '구매';
  return type;
};

const Basket: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [items, setItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    getCartItems()
      .then((data) => {
        const withSelectFlag = data.map((item) => ({
          id: item.id,
          productId: item.productId,
          product_num: item.product_num,
          name: item.name,
          productBrand: item.productBrand,
          productThumbnail: item.productThumbnail,
          serviceType: item.serviceType,
          rentalStartDate: item.rentalStartDate,
          rentalEndDate: item.rentalEndDate,
          size: item.size,
          color: item.color,
          totalPrice: item.totalPrice ?? 0,
          $isSelected: true,
        }));
        setItems(withSelectFlag);
      })
      .catch((err) => console.error('장바구니 목록 조회 실패', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectAll = () => {
    const allSelected = items.every((i) => i.$isSelected);
    setItems(items.map((item) => ({ ...item, $isSelected: !allSelected })));
  };

  const handleSelectItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, $isSelected: !item.$isSelected } : item
      )
    );
  };

  const navigateToPayment = (item: BasketItem) => {
    const servicePeriod =
      item.rentalStartDate && item.rentalEndDate
        ? `${item.rentalStartDate} ~ ${item.rentalEndDate}`
        : undefined;
    const payload: BasketItemForPayment = {
      id: item.productId,
      brand: item.productBrand,
      nameCode: `${item.product_num} / ${item.name}`,
      nameType: '',
      type: item.serviceType,
      servicePeriod,
      size: item.size,
      color: item.color,
      price: item.totalPrice,
      imageUrl: item.productThumbnail,
      $isSelected: true,
    };
    navigation.navigate('Payment', { itemData: [payload] });
  };

  const handleConfirmPayment = () => {
    const toPay = items.filter((item) => item.$isSelected);
    if (toPay.length === 0) return;

    const payloads: BasketItemForPayment[] = toPay.map((item) => ({
      id: item.productId,
      brand: item.productBrand,
      nameCode: `${item.product_num} / ${item.name}`,
      nameType: '',
      type: item.serviceType,
      servicePeriod:
        item.rentalStartDate && item.rentalEndDate
          ? `${item.rentalStartDate} ~ ${item.rentalEndDate}`
          : undefined,
      size: item.size,
      color: item.color,
      price: item.totalPrice,
      imageUrl: item.productThumbnail,
      $isSelected: true,
    }));
    const firstId = payloads[0].id;
    navigation.navigate('Payment', { itemData: payloads });
  };

  const handleDeleteClick = (id: number) => {
    setSelectedItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItemId != null) {
      deleteCartItem(selectedItemId).catch((err) =>
        console.error('삭제 실패', err)
      );
      setItems(items.filter((item) => item.id !== selectedItemId));
      setSelectedItemId(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleBuyClick = (id: number) => {
    setSelectedItemId(id);
    setIsBuyModalOpen(true);
  };

  const handleConfirmBuy = () => {
    setIsBuyModalOpen(false);
    const item = items.find((i) => i.id === selectedItemId);
    if (item) navigateToPayment(item);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

  const selectedItems = items.filter((item) => item.$isSelected);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>장바구니가 비어있습니다</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={handleSelectAll}
            >
              <View
                style={[
                  styles.checkbox,
                  items.every((item) => item.$isSelected) &&
                    styles.checkboxChecked,
                ]}
              >
                {items.every((item) => item.$isSelected) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.selectAllText}>전체선택</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.itemList}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <View key={item.id} style={styles.item}>
                <View style={styles.itemContent}>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => handleSelectItem(item.id)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        item.$isSelected && styles.checkboxChecked,
                      ]}
                    >
                      {item.$isSelected && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>

                  <Image
                    source={{ uri: item.productThumbnail }}
                    style={styles.itemImage}
                  />

                  <View style={styles.itemDetails}>
                    <Text style={styles.brand}>{item.productBrand}</Text>
                    <Text style={styles.itemName}>
                      {item.product_num} / {item.name}
                    </Text>
                    <Text style={styles.serviceType}>
                      {getServiceLabel(item.serviceType)}
                    </Text>
                    <Text style={styles.itemInfo}>
                      사이즈: {item.size} | 색상: {item.color}
                    </Text>
                    {item.serviceType === 'rental' &&
                      item.rentalStartDate &&
                      item.rentalEndDate && (
                        <Text style={styles.rentalPeriod}>
                          대여기간: {item.rentalStartDate} ~{' '}
                          {item.rentalEndDate}
                        </Text>
                      )}
                    <Text style={styles.price}>
                      {item.totalPrice.toLocaleString()}원
                    </Text>
                  </View>
                </View>

                <View style={styles.itemActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleBuyClick(item.id)}
                  >
                    <Text style={styles.actionButtonText}>구매</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteClick(item.id)}
                  >
                    <Text
                      style={[styles.actionButtonText, styles.deleteButtonText]}
                    >
                      삭제
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.bottomBar}>
            <View style={styles.totalInfo}>
              <Text style={styles.totalText}>
                선택된 상품 {selectedItems.length}개
              </Text>
              <Text style={styles.totalPrice}>
                총 {totalPrice.toLocaleString()}원
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.paymentButton,
                selectedItems.length === 0 && styles.paymentButtonDisabled,
              ]}
              onPress={handleConfirmPayment}
              disabled={selectedItems.length === 0}
            >
              <Text style={styles.paymentButtonText}>결제하기</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <ReusableModal
        visible={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title='삭제 확인'
        onConfirm={handleConfirmDelete}
      >
        이 상품을 장바구니에서 삭제하시겠습니까?
      </ReusableModal>

      <ReusableModal
        visible={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        title='구매 확인'
        onConfirm={handleConfirmBuy}
      >
        이 상품을 구매하시겠습니까?
      </ReusableModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#f6ac36',
    borderColor: '#f6ac36',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemList: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 16,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 12,
    color: '#f6ac36',
    fontWeight: '600',
    marginBottom: 4,
  },
  itemInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  rentalPeriod: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#f6ac36',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
  },
  deleteButtonText: {
    color: '#fff',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalInfo: {
    flex: 1,
  },
  totalText: {
    fontSize: 14,
    color: '#666',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  paymentButton: {
    backgroundColor: '#f6ac36',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  paymentButtonDisabled: {
    backgroundColor: '#ccc',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Basket;
