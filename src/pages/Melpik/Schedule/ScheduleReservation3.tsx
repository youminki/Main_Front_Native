// src/pages/Melpik/Schedule/ScheduleReservation3.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Stepper from '../../../components/Melpik/Schedule/Reservation1/Stepper';
import BottomBar from '../../../components/Melpik/Schedule/Reservation1/BottomBar';
import { getMyCloset } from '../../../api/closet/closetApi';
import Spinner from '../../../components/Spinner';
import { UIItem } from '../../../components/Home/MyclosetItemList'; // UIItem.id는 string 타입
import { createSaleSchedule } from '../../../api/sale/SaleSchedule'; // API 호출 함수
import ReusableModal2 from '../../../components/ReusableModal2';

interface ItemCardProps {
  id: string;
  image: string;
  brand: string;
  description: string;
  onSelect: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  image,
  brand,
  description,
  onSelect,
}) => {
  const navigation = useNavigation<any>();

  const handleSelect = () => {
    const numId = parseInt(id, 10);
    onSelect(numId);
    navigation.navigate('ItemDetail', { id: numId });
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.imageWrapper} onPress={handleSelect}>
        <Image source={{ uri: image || '' }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.brand}>{brand}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

interface ItemListProps {
  HeaderContainer: React.FC;
  items: UIItem[];
  selectedItems: number[];
  onSelect: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  HeaderContainer,
  items,
  selectedItems,
  onSelect,
}) => {
  // UIItem.id는 string이므로 숫자로 변환해 비교
  const filteredItems = items.filter((ui) =>
    selectedItems.includes(parseInt(ui.id, 10))
  );

  return (
    <View style={styles.listContainer}>
      <HeaderContainer />
      {filteredItems.length > 0 ? (
        <View style={styles.itemsWrapper}>
          {filteredItems.map((ui) => (
            <ItemCard
              key={ui.id}
              id={ui.id}
              image={ui.image}
              brand={ui.brand}
              description={truncateText(ui.description, 12)}
              onSelect={onSelect}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.noItemMessage}>선택된 제품이 없습니다.</Text>
      )}
    </View>
  );
};

const truncateText = (text: string, limit: number): string =>
  text.length > limit ? text.slice(0, limit) + '...' : text;

const ScheduleReservation3: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  // Reservation2에서 전달된 params: range와 selectedItems
  const prevState = route.params as {
    range?: [Date, Date];
    selectedItems?: number[];
  } | null;
  const initialRange = prevState?.range;
  const initialSelectedItems = prevState?.selectedItems || [];

  // selectedItems를 초기 state로 설정
  const [selectedItems, setSelectedItems] =
    useState<number[]>(initialSelectedItems);

  // 내 옷장 전체 아이템: UIItem[]
  const [closetItems, setClosetItems] = useState<UIItem[]>([]);
  const [loadingCloset, setLoadingCloset] = useState<boolean>(true);

  // 판매방식 선택 state
  const [saleMethod, setSaleMethod] = useState<string>('제품판매');

  // 예약 생성 중 로딩 상태
  const [submitting, setSubmitting] = useState<boolean>(false);

  // 모달 오픈 상태
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // range가 없으면 이전 단계로 리디렉트
  useEffect(() => {
    if (!initialRange) {
      navigation.navigate('ScheduleReservation1');
    }
  }, [initialRange, navigation]);

  // 내 옷장 전체 아이템 불러오기
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
          // it.isLiked이 없으므로 기본값 할당
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

  const handleSelect = (id: number) => {
    if (!selectedItems.includes(id)) {
      setSelectedItems([...selectedItems, id]);
    }
    // 상세 페이지 이동은 ItemCard 내부 handleSelect에서 처리
  };

  const handleSaleMethodChange = (value: string) => {
    setSaleMethod(value);
  };

  // BottomBar onNext에서 호출: 유효성 검사 후 모달 열기
  const handleOpenModal = () => {
    if (!initialRange) {
      Alert.alert('오류', '날짜 정보가 없습니다.');
      return;
    }
    if (selectedItems.length === 0) {
      Alert.alert('오류', '하나 이상의 제품을 선택해주세요.');
      return;
    }
    setIsModalOpen(true);
  };

  // 모달에서 "네" 클릭 시 실제 생성 처리
  const handleCreateSchedule = async () => {
    if (!initialRange) {
      return;
    }
    const [start, end] = initialRange;
    const pad = (n: number) => String(n).padStart(2, '0');
    const startDate = `${start.getFullYear()}-${pad(
      start.getMonth() + 1
    )}-${pad(start.getDate())}`;
    const endDate = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(
      end.getDate()
    )}`;
    let apiSaleType = saleMethod;
    if (saleMethod === '제품대여') {
      apiSaleType = '제품 대여';
    }
    setSubmitting(true);
    try {
      const reqBody = {
        startDate,
        endDate,
        saleType: apiSaleType,
        productIds: selectedItems,
      };

      await createSaleSchedule(reqBody); // result 변수 제거
      // 성공 시 알림 후 /sales-schedule로 이동
      Alert.alert('알림', '판매 스케줄이 생성되었습니다.');
      navigation.navigate('SalesSchedule');
    } catch (error: any) {
      console.error('스케줄 생성 실패', error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        '스케줄 생성 중 오류가 발생했습니다.';
      Alert.alert('오류', msg);
    } finally {
      setSubmitting(false);
      setIsModalOpen(false);
    }
  };

  // 날짜 범위 포맷 함수 (뷰 표시용)
  const formatKoreanDate = (date: Date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const ItemContainer: React.FC = () => (
    <View style={styles.customHeader}>
      <Text style={styles.label}>
        예약된 제품목록<Text style={styles.grayText2}>(선택)</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stepper currentStep={3} />

      <View style={styles.summary}>
        <View style={styles.scheduleInfo}>
          <Text style={styles.label}>예약한 스케줄</Text>
          <Text style={styles.infoText}>
            {initialRange
              ? `${formatKoreanDate(initialRange[0])} ~ ${formatKoreanDate(
                  initialRange[1]
                )}`
              : '날짜 정보 없음'}
          </Text>
        </View>
        <View style={styles.scheduleInfo}>
          <Text style={styles.label}>예약한 제품목록</Text>
          <Text style={styles.infoText}>
            선택한 제품 수 {selectedItems.length} 개
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {loadingCloset ? (
          <Spinner />
        ) : (
          <ItemList
            HeaderContainer={ItemContainer}
            items={closetItems}
            selectedItems={selectedItems}
            onSelect={handleSelect}
          />
        )}
      </ScrollView>

      <View style={styles.grayLine} />

      <View style={styles.formContainer}>
        <View style={styles.columnWrapper}>
          <Text style={styles.label}>판매방식 선택 *</Text>
          <TouchableOpacity style={styles.styledSelect} onPress={() => {}}>
            <Text style={styles.selectText}>{saleMethod}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.infoMessage}>
        <Text style={styles.grayText}> ※ 노출일정은</Text>
        <Text style={styles.blackText}>스케줄 시작일 기준 2일 이내 </Text>
        <Text style={styles.grayText}>까지 가능합니다.</Text>
      </Text>

      {/* BottomBar: onNext에서 모달 열기 */}
      <BottomBar
        onNext={handleOpenModal}
        buttonText='예약완료'
        disabled={submitting}
      />

      {/* ReusableModal2 */}
      <ReusableModal2
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateSchedule}
        title='판매 스케줄 생성'
      >
        <Text style={styles.modalMessage}>
          선택하신 기간과 제품으로 판매 스케줄을 생성하시겠습니까?
        </Text>
      </ReusableModal2>

      <View style={styles.beenContainer} />
    </View>
  );
};

export default ScheduleReservation3;

// 색상 코드 예시: 프로젝트에 맞춰 변경하세요.
const COLOR_GRAY4 = '#bdbdbd';
const COLOR_GRAY3 = '#9e9e9e';
const COLOR_GRAY2 = '#757575';
const COLOR_GRAY1 = '#616161';
const COLOR_GRAY0 = '#e0e0e0';
const COLOR_WHITE = '#ffffff';
const COLOR_BLACK = '#000000';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    maxWidth: 600,
    margin: 'auto',
  },
  summary: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 30,
  },
  scheduleInfo: {
    flex: 1,
  },
  infoText: {
    height: 57,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLOR_GRAY4,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 14,
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  grayLine: {
    borderWidth: 0,
    borderColor: COLOR_GRAY0,
    borderBottomWidth: 1,
    width: '100%',
    margin: 30,
  },
  formContainer: {
    marginBottom: 30,
    display: 'flex',
    gap: 20,
  },
  columnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
    color: COLOR_BLACK,
  },
  styledSelect: {
    padding: 20,
    borderWidth: 1,
    borderColor: COLOR_BLACK,
    borderRadius: 5,
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 14,
    color: COLOR_BLACK,
  },
  selectText: {
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 14,
  },
  infoMessage: {
    fontSize: 12,
    color: COLOR_GRAY2,
    marginBottom: 20,
  },
  grayText: {
    color: COLOR_GRAY1,
    fontSize: 12,
  },
  blackText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 13,
    color: COLOR_BLACK,
  },
  beenContainer: {
    height: 300,
  },
  listContainer: {
    backgroundColor: COLOR_WHITE,
    overflow: 'hidden',
    marginBottom: 40,
  },
  itemsWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  noItemMessage: {
    padding: 20,
    textAlign: 'center',
    color: COLOR_GRAY2,
    fontSize: 14,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 6,
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
    width: 140,
    height: 210,
  },
  image: {
    width: 140,
    height: 210,
  },
  brand: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    color: COLOR_GRAY2,
  },
  customHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  grayText2: {
    marginLeft: 5,
    color: COLOR_GRAY3,
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
  },
  modalMessage: {
    padding: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
