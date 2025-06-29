// src/pages/LockerRoom/MyCloset/MyCloset.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyCloset } from '../../../api/closet/closetApi';

import StatsSection from '../../../components/StatsSection';
import ItemList, { UIItem } from '../../../components/Home/MyclosetItemList';
import HomeDetail from '../../Home/HomeDetail';
import Spinner from '../../../components/Spinner';
import theme from '../../../styles/Theme';

const { width, height } = Dimensions.get('window');

const salesLabel = '시즌';
const sales = '2025 1분기';
const dateRange = 'SPRING';

const MyCloset: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigation = useNavigation();

  // react-query로 옷장 데이터 패칭
  const { data, isLoading } = useMyCloset();
  const items: UIItem[] =
    data?.items.map((it) => ({
      id: String(it.productId),
      image: it.mainImage,
      brand: it.brand,
      description: it.name,
      price: it.price,
      discount: it.discountRate,
      isLiked: true,
    })) ?? [];

  const handleDelete = () => {};

  const handleOpenDetail = (id: string) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const goToLocker = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>내 옷장</Text>
          <Text style={styles.subtitle}>
            나에게 맞는 스타일을 찾을 때는 멜픽!
          </Text>
        </View>

        <StatsSection
          visits={items.length}
          sales={sales}
          dateRange={dateRange}
          visitLabel='담긴 제품들'
          salesLabel={salesLabel}
        />

        <View style={styles.divider} />

        <View style={styles.content}>
          {isLoading ? (
            <Spinner />
          ) : items.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyMessage}>
                내옷장에 보관한 옷이 없습니다.
              </Text>
              <TouchableOpacity style={styles.addButton} onPress={goToLocker}>
                <Text style={styles.buttonText}>옷 추가하러 가기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ItemList
              items={items}
              onDelete={handleDelete}
              onItemClick={handleOpenDetail}
            />
          )}
        </View>
      </ScrollView>

      <Modal
        visible={isModalOpen}
        animationType='slide'
        presentationStyle='pageSheet'
        onRequestClose={handleCloseDetail}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleCloseDetail}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>닫기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            {selectedItemId && <HomeDetail id={selectedItemId} />}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    width: '100%',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    margin: 0,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 30,
  },
  content: {
    width: '100%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#999',
    marginBottom: 24,
  },
  addButton: {
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
  modalBody: {
    flex: 1,
  },
});

export default MyCloset;
