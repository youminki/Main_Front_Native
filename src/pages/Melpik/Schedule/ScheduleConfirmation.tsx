// src/pages/Melpik/Schedule/ScheduleConfirmation.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomBar from '../../../components/BottomNav2';
import {
  getSaleScheduleDetail,
  SaleScheduleDetailResponse,
  deleteSaleSchedule,
  patchSaleSchedule,
} from '../../../api/sale/SaleSchedule';
import Spinner from '../../../components/Spinner';
import Calendar from '../../../components/Melpik/Schedule/Reservation1/Calendar';
import DateSelection from '../../../components/Melpik/Schedule/Reservation1/DateSelection';
import Summary from '../../../components/Melpik/Schedule/Reservation1/Summary';

// 내 옷장 API & 타입 import
import { getMyCloset } from '../../../api/closet/closetApi';
import { UIItem } from '../../../components/Home/MyclosetItemList';
import SearchIcon from '../../assets/BottomNav/SearchIcon.svg';

const MAX_SELECTION = 6;

// 색상 상수
const COLOR_WHITE = '#ffffff';
const COLOR_GRAY2 = '#757575';
const COLOR_GRAY4 = '#e0e0e0';

const truncateText = (text: string, limit: number): string =>
  text.length > limit ? text.slice(0, limit) + '...' : text;

const formatDateWithDay = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdayNames[date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${weekday})`;
};

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
  const handleSelect = () => onSelect(id);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.imageWrapper} onPress={handleSelect}>
        <Image source={{ uri: image }} style={styles.image} />
        {$isSelected && (
          <View style={styles.selectionOverlay}>
            <View style={styles.circularSelection}>
              <Text style={styles.checkIconText}>✓</Text>
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

const ScheduleConfirmation: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { scheduleId } = route.params as { scheduleId: string };

  const [detail, setDetail] = useState<SaleScheduleDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 모달
  const [showModal, setShowModal] = useState(false);
  const today = new Date();
  const [modalYear, setModalYear] = useState(today.getFullYear());
  const [modalMonth, setModalMonth] = useState(today.getMonth() + 1);
  const [editRange, setEditRange] = useState<[Date, Date] | null>(null);

  // 내 옷장
  const [closetItems, setClosetItems] = useState<UIItem[]>([]);
  const [loadingCloset, setLoadingCloset] = useState(true);

  // 선택된 제품 ID
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // 스케줄 상세 조회
  useEffect(() => {
    if (!scheduleId) return;
    (async () => {
      setLoading(true);
      try {
        const data = await getSaleScheduleDetail(Number(scheduleId));
        setDetail(data);
        // 기존 스케줄에 있던 제품도 초기 선택 상태로 반영
        setSelectedItems(data.products.map((p) => String(p.id)));
        const [sStr, eStr] = data.dateRange.split('~').map((d) => d.trim());
        const s = new Date(sStr),
          e = new Date(eStr);
        setEditRange([s, e]);
        setModalYear(s.getFullYear());
        setModalMonth(s.getMonth() + 1);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [scheduleId]);

  // 내 옷장 조회
  useEffect(() => {
    setLoadingCloset(true);
    getMyCloset()
      .then((res) => {
        setClosetItems(
          res.items.map((it) => ({
            id: String(it.productId),
            image: it.mainImage,
            brand: it.brand,
            description: it.name,
            price: it.price,
            discount: it.discountRate,
            isLiked: true,
          }))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingCloset(false));
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < MAX_SELECTION
        ? [...prev, id]
        : prev
    );
  };

  const handleDelete = async () => {
    if (!scheduleId) return;
    await deleteSaleSchedule(Number(scheduleId));
    navigation.navigate('SaleSchedule');
  };

  // 수정하기: 날짜·타이틀·선택 제품 모두 저장
  const handleEdit = async () => {
    if (!scheduleId || !detail) return;
    const [s, e] = detail.dateRange.split('~').map((d) => d.trim());
    await patchSaleSchedule(Number(scheduleId), {
      title: detail.title,
      startDate: s,
      endDate: e,
      // productIds: selectedItems.map((id) => Number(id)),
    });
    // 저장 후 다시 상세 조회
    const updated = await getSaleScheduleDetail(Number(scheduleId));
    setDetail(updated);
    setSelectedItems(updated.products.map((p) => String(p.id)));
    Alert.alert('알림', '스케줄이 저장되었습니다.');
  };

  // 모달 내 날짜 선택 로직
  const handleDateClick = (day: number) => {
    if (!editRange) return;
    const clicked = new Date(modalYear, modalMonth - 1, day);
    const todayZero = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime();
    if (clicked.getTime() < todayZero) return;
    const newEnd = new Date(clicked);
    newEnd.setMonth(clicked.getMonth() + 1);
    setEditRange([clicked, newEnd]);
    setModalYear(clicked.getFullYear());
    setModalMonth(clicked.getMonth() + 1);
  };

  const adjustEnd = (offset: number) => {
    if (!editRange) return;
    const [start, end] = editRange;
    const newEnd = new Date(end);
    newEnd.setDate(end.getDate() + offset);
    if (newEnd.getTime() <= start.getTime()) return;
    setEditRange([start, newEnd]);
    setModalYear(newEnd.getFullYear());
    setModalMonth(newEnd.getMonth() + 1);
  };

  const applyModal = () => {
    if (!editRange || !detail) return;
    const [s, e] = editRange;
    const pad = (n: number) => `${n}`.padStart(2, '0');
    const newRangeStr = `${s.getFullYear()}-${pad(s.getMonth() + 1)}-${pad(
      s.getDate()
    )} ~ ${e.getFullYear()}-${pad(e.getMonth() + 1)}-${pad(e.getDate())}`;
    setDetail({ ...detail, dateRange: newRangeStr });
    setShowModal(false);
  };

  if (loading)
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  if (error || !detail)
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>
          {error || '정보를 불러올 수 없습니다.'}
        </Text>
      </View>
    );

  // 실제 예약된 목록 대신, 현재 선택된 내 옷장 제품으로 표시
  const reservedItems = closetItems.filter((it) =>
    selectedItems.includes(it.id)
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.label}>스케줄 타이틀</Text>
        <View style={styles.textBox}>
          <Text style={styles.textBoxText}>{detail.title}</Text>
        </View>

        <Text style={styles.label}>스케줄 예약일자</Text>
        <TouchableOpacity
          style={styles.clickableBox}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.clickableBoxText}>
            {detail.dateRange
              .split('~')
              .map((d) => formatDateWithDay(d.trim()))
              .join(' ~ ')}
          </Text>
        </TouchableOpacity>

        <View style={styles.rowContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>선택된 제품</Text>
            <View style={styles.textBox}>
              <Text style={styles.textBoxText}>
                {reservedItems.length} / {MAX_SELECTION}개
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.connectorLine} />

        <Text style={styles.label}>예약된 제품목록</Text>
        {reservedItems.length === 0 ? (
          <View style={styles.textBox}>
            <Text style={styles.textBoxText}>아직 예약된 제품이 없습니다.</Text>
          </View>
        ) : (
          <ScrollView horizontal style={styles.productList}>
            {reservedItems.map((item) => (
              <View key={item.id} style={styles.product}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productLabel}>{item.brand}</Text>
                <Text style={styles.productName}>
                  {truncateText(item.description, 15)}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        <Text style={styles.label}>내 옷장 제품목록</Text>
        {loadingCloset ? (
          <Spinner />
        ) : (
          <View style={styles.listContainer}>
            <ScrollView horizontal style={styles.itemsWrapper}>
              {closetItems.map((item) => {
                const sel = selectedItems.includes(item.id);
                return (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    brand={item.brand}
                    description={truncateText(item.description, 12)}
                    onSelect={toggleSelect}
                    $isSelected={sel}
                  />
                );
              })}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      <BottomBar onPress={handleEdit} />

      <Modal visible={showModal} transparent animationType='fade'>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <DateSelection
                year={modalYear}
                month={modalMonth}
                onYearChange={(value: any) => setModalYear(Number(value))}
                onMonthChange={(value: any) => setModalMonth(Number(value))}
              />{' '}
              as any
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>
            <Calendar
              {...({
                year: modalYear,
                month: modalMonth,
                startDate: editRange?.[0],
                endDate: editRange?.[1],
                onDateClick: handleDateClick,
                onIncrease: () => adjustEnd(1),
                onDecrease: () => adjustEnd(-1),
                today,
              } as any)}
            />
            <View style={styles.modalFooter}>
              <Summary
                range={editRange}
                seasonProgress={{ total: 6, completed: 2, pending: 0 }}
              />
              <TouchableOpacity style={styles.applyBtn} onPress={applyModal}>
                <Text style={styles.applyBtnText}>적용하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ScheduleConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  content: {
    flex: 1,
    gap: 10,
  },
  label: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
  },
  textBox: {
    paddingVertical: 21,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLOR_GRAY4,
    borderRadius: 5,
  },
  textBoxText: {
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 14,
  },
  clickableBox: {
    paddingVertical: 21,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLOR_GRAY4,
    borderRadius: 5,
  },
  clickableBoxText: {
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  column: {
    flex: 1,
  },
  connectorLine: {
    borderWidth: 1,
    borderColor: COLOR_GRAY4,
    marginVertical: 20,
  },
  productList: {
    flexDirection: 'row',
    gap: 6,
  },
  product: {
    flexShrink: 0,
  },
  productImage: {
    width: 140,
    height: 210,
  },
  productLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  productName: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 13,
    color: '#999',
  },
  errorMessage: {
    padding: 20,
    textAlign: 'center',
    color: 'red',
  },
  listContainer: {
    backgroundColor: COLOR_WHITE,
    overflow: 'hidden',
    marginBottom: 40,
  },
  itemsWrapper: {
    flexDirection: 'row',
  },
  cardContainer: {
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
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 140,
    height: 210,
    backgroundColor: 'rgba(246, 174, 36, 0.95)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularSelection: {
    width: 58,
    height: 58,
    backgroundColor: COLOR_WHITE,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIconText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  selectText: {
    marginTop: 10,
    fontWeight: '700',
    fontSize: 12,
    color: COLOR_WHITE,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxWidth: 500,
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeBtn: {
    padding: 8,
  },
  closeBtnText: {
    fontSize: 18,
  },
  modalFooter: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  applyBtn: {
    width: '100%',
    padding: 12,
    marginTop: 8,
    backgroundColor: '#000',
    borderRadius: 6,
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
});
