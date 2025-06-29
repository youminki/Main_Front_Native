// src/pages/Melpik/Schedule/ScheduleReservation2.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Stepper from '../../../components/Melpik/Schedule/Reservation1/Stepper';
import BottomBar from '../../../components/Melpik/Schedule/Reservation1/BottomBar';

import { getMyCloset } from '../../../api/closet/closetApi';
import Spinner from '../../../components/Spinner';
import { UIItem } from '../../../components/Home/MyclosetItemList';

const MAX_SELECTION = 6;

interface ItemCardProps {
  id: string;
  image: string;
  brand: string;
  description: string;
  onSelect: (id: string) => void;
  $isSelected: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  image,
  brand,
  description,
  onSelect,
  $isSelected,
}) => {
  const handleSelect = () => {
    onSelect(id);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.imageWrapper} onPress={handleSelect}>
        <Image source={{ uri: image }} style={styles.image} />
        {$isSelected && (
          <View style={styles.selectionOverlay}>
            <View style={styles.circularSelection}>
              <Image
                source={require('../../../assets/checkIcon.svg')}
                style={styles.checkIconImg}
              />
            </View>
            <Text style={styles.selectText}>제품선택</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.brand}>{brand}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const truncateText = (text: string, limit: number): string => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};

interface ItemListProps {
  HeaderContainer: React.FC;
  items: UIItem[];
  selectedItems: number[];
  onSelect: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  HeaderContainer,
  items,
  selectedItems,
  onSelect,
}) => {
  return (
    <View style={styles.listContainer}>
      <HeaderContainer />
      <View style={styles.itemsWrapper}>
        {items.map((item) => {
          const numericId = Number(item.id);
          const isSel = selectedItems.includes(numericId);
          return (
            <ItemCard
              key={item.id}
              id={item.id}
              image={item.image}
              brand={item.brand}
              description={truncateText(item.description, 12)}
              $isSelected={isSel}
              onSelect={onSelect}
            />
          );
        })}
      </View>
    </View>
  );
};

const ScheduleReservation2: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  // Reservation1에서 전달된 range: route.params가 있을 때 타입 단언
  const prevState = route.params as { range?: [Date, Date] } | null;
  const initialRange = prevState?.range;

  // selectedItems를 number[]로 관리
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [closetItems, setClosetItems] = useState<UIItem[]>([]);
  const [loadingCloset, setLoadingCloset] = useState<boolean>(true);

  // 선택된 날짜 범위가 없다면 이전 페이지로 이동
  useEffect(() => {
    if (!initialRange) {
      navigation.navigate('ScheduleReservation1');
    }
  }, [initialRange, navigation]);

  // 내 옷장 아이템 불러오기
  useEffect(() => {
    setLoadingCloset(true);
    getMyCloset()
      .then((res) => {
        const items: UIItem[] = res.items.map((it) => ({
          id: String(it.productId),
          image: it.mainImage,
          brand: it.brand,
          description: it.name,
          price: it.price,
          discount: it.discountRate,
          // it.isLiked이 없으므로 기본값으로 할당
          isLiked: true,
        }));
        setClosetItems(items);
      })
      .catch((err) => {
        console.error('내 옷장 조회 실패', err);
      })
      .finally(() => {
        setLoadingCloset(false);
      });
  }, []);

  const handleSelect = (id: string) => {
    const numericId = Number(id);
    if (selectedItems.includes(numericId)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== numericId));
    } else if (selectedItems.length < MAX_SELECTION) {
      setSelectedItems([...selectedItems, numericId]);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeWarningModal = () => {
    setIsModalOpen(false);
  };

  const handleBottomClick = () => {
    // Reservation3로 range와 selectedItems 전달 (number[] 그대로)
    navigation.navigate('ScheduleReservation3', {
      range: initialRange,
      selectedItems,
    });
  };

  const ItemContainer: React.FC = () => (
    <View style={styles.customHeader}>
      <View>
        <Text style={styles.label}>
          내 옷장 - 제품목록 <Text style={styles.grayText2}>(선택)</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stepper currentStep={2} />

      <View style={styles.summary}>
        <View style={styles.scheduleInfo}>
          <Text style={styles.label}>예약할 제품 목록</Text>
          <View style={styles.infoText}>
            <Text style={styles.grayText}>
              선택 가능한 갯수 {MAX_SELECTION}개
            </Text>
            <Text style={styles.grayDivider}>/</Text>
            선택한 제품 수 {selectedItems.length} 개
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {loadingCloset ? (
          <Spinner />
        ) : closetItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyMessage}>
              내 옷장에 보관한 옷이 없습니다.
            </Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.addButtonText}>옷장에 추가하기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ItemList
            HeaderContainer={ItemContainer}
            items={closetItems}
            selectedItems={selectedItems}
            onSelect={handleSelect}
          />
        )}
      </ScrollView>

      {/* BottomBar: onNext에서 Reservation3로 이동 */}
      <BottomBar onPress={handleBottomClick} />

      {/* 경고 모달 */}
      <View style={[styles.modal, { display: isModalOpen ? 'flex' : 'none' }]}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>선택 제한</Text>
          <Text style={styles.modalMessage}>
            최대 {MAX_SELECTION}개까지만 선택할 수 있습니다.
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={closeWarningModal}
          >
            <Text style={styles.modalButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScheduleReservation2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  summary: {
    marginTop: 30,
    marginBottom: 30,
  },
  scheduleInfo: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
    color: '#000',
  },
  infoText: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 57,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
  },
  grayText: {
    color: '#999',
    fontSize: 13,
    fontWeight: '700',
  },
  grayDivider: {
    color: '#999',
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 40,
  },
  itemsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 150,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  circularSelection: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIconImg: {
    width: 20,
    height: 20,
  },
  selectText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  brand: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  grayText2: {
    marginLeft: 5,
    color: '#999',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
