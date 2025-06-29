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
  Dimensions,
} from 'react-native';
import StatsSection from '../../../components/StatsSection';
import PeriodSection from '../../../components/PeriodSection';
import Spinner from '../../../components/Spinner';
import HomeDetail from '../../Home/HomeDetail';
import {
  getMyRentalSchedule,
  cancelRentalSchedule,
  RentalScheduleItem,
} from '../../../api/RentalSchedule/RentalSchedule';

const { width: screenWidth } = Dimensions.get('window');

interface BasketItem extends RentalScheduleItem {
  type: 'rental' | 'purchase';
  servicePeriod?: string;
  deliveryDate?: string;
  price: number | string;
  imageUrl: string;
  $isSelected: boolean;
  rentalDays?: string;
}

const UsageHistory: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(6);
  const [items, setItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // 초기 데이터 로드
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getMyRentalSchedule();
        const mapped: BasketItem[] = data.rentals.map((r) => {
          const isRental = r.serviceType === '대여';
          return {
            ...r,
            type: isRental ? 'rental' : 'purchase',
            servicePeriod: isRental
              ? `${r.startDate} ~ ${r.endDate}`
              : undefined,
            deliveryDate: !isRental ? r.endDate : undefined,
            price: r.ticketName,
            imageUrl:
              r.mainImage || require('../../../assets/sample-dress.png'),
            $isSelected: true,
            rentalDays: isRental
              ? `대여 (${calculateDays(r.startDate, r.endDate)}일)`
              : '구매',
          };
        });
        setItems(mapped);
      } catch (err) {
        console.error(err);
        setError('대여/구매 내역을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  // 날짜 차이 계산
  const calculateDays = (start: string, end: string): number => {
    const s = new Date(start);
    const e = new Date(end);
    return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24) + 1);
  };

  // 취소 요청 / 최종 취소
  const handleCancel = async (item: BasketItem) => {
    const isRequested = item.paymentStatus === '취소요청';
    const confirmMsg = isRequested
      ? '정말 최종 취소하시겠습니까?'
      : '정말 예약을 취소 요청하시겠습니까?';

    Alert.alert('취소 확인', confirmMsg, [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: async () => {
          try {
            setCancelingId(item.id);
            const result = await cancelRentalSchedule(item.id);
            setItems((prev) =>
              prev.map((it) =>
                it.id === item.id
                  ? { ...it, paymentStatus: result.paymentStatus }
                  : it
              )
            );
            Alert.alert(
              '완료',
              isRequested
                ? '최종 취소가 완료되었습니다.'
                : '취소 요청이 완료되었습니다.'
            );
          } catch (err) {
            console.error(err);
            Alert.alert(
              '오류',
              isRequested
                ? '최종 취소에 실패했습니다. 다시 시도해주세요.'
                : '취소 요청에 실패했습니다. 다시 시도해주세요.'
            );
          } finally {
            setCancelingId(null);
          }
        },
      },
    ]);
  };

  // 상세 모달 열기/닫기
  const handleOpenDetail = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };
  const handleCloseDetail = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  // 3개월 / 6개월 필터
  const filteredItems = selectedPeriod === 3 ? items.slice(0, 3) : items;

  if (loading)
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  if (error)
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>이용 내역</Text>
        <Text style={styles.subtitle}>
          나에게 맞는 스타일을 찾을 때는 멜픽!
        </Text>
      </View>

      <StatsSection
        visits={String(items.length)}
        sales={'2025 1분기'}
        dateRange={'SPRING'}
        visitLabel={'담긴 제품들'}
        salesLabel={'시즌'}
      />

      <View style={styles.divider} />

      <View style={styles.section}>
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../../assets/userHistoryEmptyIcon.png')}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>이용하신 내역이 없습니다.</Text>
          </View>
        ) : (
          <View style={styles.itemList}>
            {filteredItems.map((item) => (
              <View key={item.id} style={styles.item}>
                <View style={styles.contentWrapper}>
                  <View style={styles.itemDetails}>
                    <Text style={styles.brand}>{item.brand}</Text>
                    <View style={styles.itemName}>
                      <Text style={styles.code}>{item.productNum}</Text>
                      <Text style={styles.slash}>/</Text>
                      <Text style={styles.name}>{item.category}</Text>
                    </View>

                    <View style={styles.infoRowFlex}>
                      <View style={styles.iconArea}>
                        <Image
                          source={require('../../../assets/Basket/ServiceInfoIcon.png')}
                          style={styles.icon}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <View style={styles.rowText}>
                          <Text style={styles.labelDetailText}>
                            진행 서비스 -{' '}
                          </Text>
                          <Text style={styles.detailHighlight}>
                            {item.rentalDays}
                          </Text>
                        </View>
                        {item.servicePeriod && (
                          <View style={styles.additionalText}>
                            <Text style={styles.detailText}>
                              {item.servicePeriod}
                            </Text>
                          </View>
                        )}
                        {item.deliveryDate && (
                          <View style={styles.additionalText}>
                            <Text style={styles.detailText}>
                              {item.deliveryDate}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <View style={styles.infoRowFlex}>
                      <View style={styles.iconArea}>
                        <Image
                          source={require('../../../assets/Basket/ProductInfoIcon.png')}
                          style={styles.icon}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <View style={styles.rowText}>
                          <Text style={styles.labelDetailText}>제품 정보</Text>
                        </View>
                        <View style={styles.additionalText}>
                          <Text style={styles.detailText}>
                            사이즈 -{' '}
                            <Text style={styles.detailHighlight}>
                              {item.size}
                            </Text>
                          </Text>
                          <Text style={styles.slash}>/</Text>
                        </View>
                        <Text style={styles.detailText}>
                          색상 -{' '}
                          <Text style={styles.detailHighlight}>
                            {item.color}
                          </Text>
                        </Text>
                      </View>
                    </View>

                    <View style={styles.infoRowFlex}>
                      <View style={styles.iconArea}>
                        <Image
                          source={require('../../../assets/Basket/PriceIcon.png')}
                          style={styles.icon}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <View style={styles.rowText}>
                          <Text style={styles.labelDetailText}>
                            결제방식 -{' '}
                          </Text>
                          <Text style={styles.detailHighlight}>
                            {typeof item.price === 'number'
                              ? item.price.toLocaleString()
                              : item.price}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.rightSection}>
                    <View style={styles.itemImageContainer}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.itemImage}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleOpenDetail(item.productId)}
                  >
                    <Text style={styles.deleteButtonText}>제품상세</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.purchaseButton,
                      (cancelingId === item.id ||
                        item.paymentStatus === '취소요청' ||
                        item.paymentStatus === '취소완료') &&
                        styles.purchaseButtonDisabled,
                    ]}
                    onPress={() => handleCancel(item)}
                    disabled={
                      cancelingId === item.id ||
                      item.paymentStatus === '취소요청' ||
                      item.paymentStatus === '취소완료'
                    }
                  >
                    <Text style={styles.purchaseButtonText}>
                      {cancelingId === item.id
                        ? '요청중...'
                        : item.paymentStatus === '취소요청'
                        ? '취소요청'
                        : item.paymentStatus === '취소완료'
                        ? '취소완료'
                        : '취소'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      <Modal
        visible={isModalOpen}
        animationType='slide'
        presentationStyle='fullScreen'
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleCloseDetail}
              style={styles.cancelButton}
            >
              <Image
                source={require('../../../assets/Header/CancleIcon.png')}
                style={styles.cancelIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            {selectedProductId !== null && (
              <HomeDetail id={String(selectedProductId)} />
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default UsageHistory;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 6,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 27,
    color: '#000',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ccc',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#dddddd',
    marginTop: 30,
  },
  section: {
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 80,
    marginTop: 30,
    maxWidth: 600,
  },
  itemList: {
    flexDirection: 'column',
    width: '100%',
  },
  item: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 30,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  brand: {
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 11,
    color: '#000000',
  },
  itemName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 28,
  },
  code: {
    fontWeight: '700',
    fontSize: 13,
    color: '#999',
    marginRight: 4,
  },
  slash: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000',
    marginHorizontal: 4,
  },
  name: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000',
  },
  infoRowFlex: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 5,
    width: '100%',
  },
  iconArea: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    marginBottom: 20,
  },
  rowText: {
    flexDirection: 'row',
    gap: 5,
  },
  additionalText: {
    flexDirection: 'row',
    gap: 5,
  },
  detailText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
  },
  detailHighlight: {
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
  },
  rightSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  itemImageContainer: {
    position: 'relative',
    width: 140,
    height: 210,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#fff',
    width: 91,
    height: 46,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#888',
    fontWeight: '800',
    fontSize: 14,
  },
  purchaseButton: {
    backgroundColor: '#000',
    width: 91,
    height: 46,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    opacity: 0.5,
  },
  purchaseButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
  },
  labelDetailText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
  },
  errorText: {
    color: 'red',
    marginTop: 32,
  },
  emptyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyIcon: {
    width: 80,
    height: 80,
  },
  emptyText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  modalBody: {
    flex: 1,
    paddingTop: 60,
    padding: 16,
  },
  cancelButton: {
    padding: 8,
  },
  cancelIcon: {
    width: 24,
    height: 24,
  },
});
