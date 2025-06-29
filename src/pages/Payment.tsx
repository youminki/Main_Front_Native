// src/pages/PaymentPage.tsx
import React, { useState, useEffect } from 'react';
// 임시 타입 정의
interface Address {
  address: string;
  addressDetail: string;
  deliveryMessage?: string;
}

// 임시 훅들
const useUserTickets = () => ({ data: [] });
const useAddresses = () => ({ data: [] });

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
// 임시 타입 정의
interface Address {
  address: string;
  addressDetail: string;
  deliveryMessage?: string;
}

// 임시 훅들

import { Picker } from '@react-native-picker/picker';
// 임시 타입 정의
interface Address {
  address: string;
  addressDetail: string;
  deliveryMessage?: string;
}

// 임시 훅들

import { useNavigation, useRoute } from '@react-navigation/native';
// 임시 타입 정의
interface Address {
  address: string;
  addressDetail: string;
  deliveryMessage?: string;
}

// 임시 훅들

import { useCreateRentalOrder } from '../api/rental/rental';

import AddressSearchModal from '../components/AddressSearchModal';
import DeliveryListModal from '../components/DeliveryListModal';
import ReusableModal from '../components/ReusableModal';
import ReusableModal2 from '../components/ReusableModal2';
import UnifiedHeader from '../components/UnifiedHeader';

// SVG 아이콘들을 React Native 컴포넌트로 대체
const PriceIcon = () => (
  <View
    style={{ width: 24, height: 24, backgroundColor: '#ccc', borderRadius: 12 }}
  />
);

const ProductInfoIcon = () => (
  <View
    style={{ width: 24, height: 24, backgroundColor: '#ccc', borderRadius: 12 }}
  />
);

const ServiceInfoIcon = () => (
  <View
    style={{ width: 24, height: 24, backgroundColor: '#ccc', borderRadius: 12 }}
  />
);

interface BasketItemForPayment {
  id: number;
  brand: string;
  nameCode: string;
  nameType: string;
  type: 'rental' | 'purchase';
  servicePeriod?: string; // "YYYY.MM.DD ~ YYYY.MM.DD"
  size: string;
  color: string;
  price: number;
  imageUrl: string;
  $isSelected: boolean;
}

const PaymentPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const itemsData = (route.params as BasketItemForPayment[]) || [];
  const [items] = useState<BasketItemForPayment[]>(itemsData);

  // react-query로 티켓 조회
  const { data: tickets = [] } = useUserTickets();
  const activeTickets = tickets.filter((t: any) => t.isActive);

  // 결제방식 선택: paymentOptions에 '결제방식 선택하기', 티켓 옵션, '이용권 구매하기' 포함
  const paymentOptions = [
    '결제방식 선택하기',
    ...activeTickets.map((t: any) => {
      const name = t.ticketList.name;
      return t.ticketList.isUlimited
        ? name
        : `${name} (${t.remainingRentals}회 남음)`;
    }),
    '이용권 구매하기',
  ];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentOptions[0]
  );
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  const handlePaymentSelect = (value: string) => {
    if (value === '이용권 구매하기') {
      navigation.navigate('MyTicket' as never);
      return;
    }
    setSelectedPaymentMethod(value);
    const ticket = activeTickets.find((t: any) => {
      const label = t.ticketList.isUlimited
        ? t.ticketList.name
        : `${t.ticketList.name} (${t.remainingRentals}회 남음)`;
      return label === value;
    });
    setSelectedTicketId(ticket ? (ticket as any).id : null);
  };

  // 배송방법 고정: "택배배송"
  const fixedDeliveryMethod = '일반배송';

  // 수령인/반납인 & 배송지
  const [recipient, setRecipient] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    detailAddress: '',
    contact: '010',
    message: '',
  });
  const [returnInfo, setReturnInfo] = useState({
    address: '',
    detailAddress: '',
    contact: '010',
    message: '',
  });
  const [isSameAsDelivery, setIsSameAsDelivery] = useState(true);

  // 주소검색/목록 모달
  const [modalField, setModalField] = useState<'delivery' | 'return'>(
    'delivery'
  );
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // react-query로 저장된 배송지 조회
  const { data: savedAddresses = [] } = useAddresses();

  // deliveryInfo 변경 시, isSameAsDelivery가 true면 returnInfo 동기화
  useEffect(() => {
    if (isSameAsDelivery) {
      setReturnInfo({
        address: deliveryInfo.address,
        detailAddress: deliveryInfo.detailAddress,
        contact: deliveryInfo.contact,
        message: deliveryInfo.message,
      });
    }
  }, [deliveryInfo, isSameAsDelivery]);

  // 주소 검색 핸들러
  const handleAddressSearch = (field: 'delivery' | 'return') => {
    setModalField(field);
    setSearchModalOpen(true);
  };

  const handleContactChange = (field: 'delivery' | 'return', value: string) => {
    let v = value.replace(/[^0-9]/g, '');
    if (!v.startsWith('010')) v = '010' + v;
    v = v.slice(0, 11);
    if (v.length === 11) v = v.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    if (field === 'delivery') {
      setDeliveryInfo((info) => ({ ...info, contact: v }));
    } else {
      setReturnInfo((info) => ({ ...info, contact: v }));
    }
  };

  const handleUseSame = () => {
    setIsSameAsDelivery(true);
  };

  const handleNewReturn = () => {
    setIsSameAsDelivery(false);
    setReturnInfo({
      address: '',
      detailAddress: '',
      contact: '010',
      message: '',
    });
  };

  const [listModalOpen, setListModalOpen] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState<Address | null>(null);

  const handleListOpen = () => {
    setListModalOpen(true);
  };

  const confirmList = () => {
    if (selectedAddr) {
      const { address, addressDetail, deliveryMessage } = selectedAddr;
      if (modalField === 'delivery') {
        setDeliveryInfo((i) => ({
          ...i,
          address,
          detailAddress: addressDetail,
          message: deliveryMessage || '',
        }));
      } else {
        if (isSameAsDelivery) {
          // 동기화 useEffect가 처리
        } else {
          setReturnInfo((i) => ({
            ...i,
            address,
            detailAddress: addressDetail,
            message: deliveryMessage || '',
          }));
        }
      }
    }
    setListModalOpen(false);
  };

  // 결제 모달 & 알림
  const [modalAlert, setModalAlert] = useState({ isOpen: false, message: '' });
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // react-query로 렌탈 주문 생성
  const createRentalOrderMutation = useCreateRentalOrder();

  const handlePaymentSubmit = async () => {
    if (!recipient || !deliveryInfo.address || !deliveryInfo.contact) {
      Alert.alert('오류', '배송 정보를 모두 입력해주세요.');
      return;
    }

    if (selectedPaymentMethod === '결제방식 선택하기') {
      Alert.alert('오류', '결제방식을 선택해주세요.');
      return;
    }

    if (!isSameAsDelivery && (!returnInfo.address || !returnInfo.contact)) {
      Alert.alert('오류', '반납 정보를 모두 입력해주세요.');
      return;
    }

    Alert.alert('결제 확인', '결제를 진행하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => {
          // TODO: 실제 결제 로직 구현
          Alert.alert('성공', '결제가 완료되었습니다.', [
            {
              text: '확인',
              onPress: () => navigation.navigate('PaymentComplete' as never),
            },
          ]);
        },
      },
    ]);
  };

  const closeAlertModal = () => setModalAlert({ isOpen: false, message: '' });

  // 결제금액 계산: baseTotal + 추가비용 (택배배송 고정이면 extra=0)
  const baseTotal = items.reduce((sum, x) => sum + x.price, 0);
  const extra = 0;
  const finalAmount = baseTotal + extra;

  return (
    <View style={styles.container}>
      <UnifiedHeader title='결제' />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>결제</Text>

        {/* 상품 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>상품 정보</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <View style={styles.productInfo}>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.nameText}>{item.nameCode}</Text>
                <Text style={styles.typeText}>{item.nameType}</Text>
                {item.servicePeriod && (
                  <Text style={styles.periodText}>{item.servicePeriod}</Text>
                )}
                <Text style={styles.sizeText}>
                  사이즈: {item.size} | 색상: {item.color}
                </Text>
              </View>
              <Text style={styles.priceText}>
                {item.price.toLocaleString()}원
              </Text>
            </View>
          ))}
        </View>

        {/* 결제 방식 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제 방식</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedPaymentMethod}
              onValueChange={handlePaymentSelect}
              style={styles.picker}
            >
              {paymentOptions.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            </Picker>
          </View>
        </View>

        {/* 배송 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>배송 정보</Text>

          {/* 수령인 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>수령인</Text>
            <TextInput
              style={styles.input}
              value={recipient}
              onChangeText={setRecipient}
              placeholder='수령인을 입력하세요'
            />
          </View>

          {/* 배송지 주소 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>배송지 주소</Text>
            <TouchableOpacity
              style={styles.addressButton}
              onPress={() => handleAddressSearch('delivery')}
            >
              <Text style={styles.addressButtonText}>
                {deliveryInfo.address || '주소 검색'}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={deliveryInfo.detailAddress}
              onChangeText={(text) =>
                setDeliveryInfo((prev) => ({ ...prev, detailAddress: text }))
              }
              placeholder='상세주소'
            />
          </View>

          {/* 연락처 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>연락처</Text>
            <TextInput
              style={styles.input}
              value={deliveryInfo.contact}
              onChangeText={(text) => handleContactChange('delivery', text)}
              placeholder='010-0000-0000'
              keyboardType='phone-pad'
            />
          </View>

          {/* 배송 메시지 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>배송 메시지</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={deliveryInfo.message}
              onChangeText={(text) =>
                setDeliveryInfo((prev) => ({ ...prev, message: text }))
              }
              placeholder='배송 메시지를 입력하세요'
              multiline
            />
          </View>
        </View>

        {/* 반납 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>반납 정보</Text>

          <View style={styles.sameAddressButtons}>
            <TouchableOpacity
              style={[
                styles.sameButton,
                isSameAsDelivery && styles.activeButton,
              ]}
              onPress={handleUseSame}
            >
              <Text
                style={[
                  styles.sameButtonText,
                  isSameAsDelivery && styles.activeButtonText,
                ]}
              >
                배송지와 동일
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sameButton,
                !isSameAsDelivery && styles.activeButton,
              ]}
              onPress={handleNewReturn}
            >
              <Text
                style={[
                  styles.sameButtonText,
                  !isSameAsDelivery && styles.activeButtonText,
                ]}
              >
                새로 입력
              </Text>
            </TouchableOpacity>
          </View>

          {!isSameAsDelivery && (
            <>
              {/* 반납지 주소 */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>반납지 주소</Text>
                <TouchableOpacity
                  style={styles.addressButton}
                  onPress={() => handleAddressSearch('return')}
                >
                  <Text style={styles.addressButtonText}>
                    {returnInfo.address || '주소 검색'}
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  value={returnInfo.detailAddress}
                  onChangeText={(text) =>
                    setReturnInfo((prev) => ({ ...prev, detailAddress: text }))
                  }
                  placeholder='상세주소'
                />
              </View>

              {/* 반납 연락처 */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>반납 연락처</Text>
                <TextInput
                  style={styles.input}
                  value={returnInfo.contact}
                  onChangeText={(text) => handleContactChange('return', text)}
                  placeholder='010-0000-0000'
                  keyboardType='phone-pad'
                />
              </View>

              {/* 반납 메시지 */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>반납 메시지</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={returnInfo.message}
                  onChangeText={(text) =>
                    setReturnInfo((prev) => ({ ...prev, message: text }))
                  }
                  placeholder='반납 메시지를 입력하세요'
                  multiline
                />
              </View>
            </>
          )}
        </View>

        {/* 결제 금액 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제 금액</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>상품 금액</Text>
            <Text style={styles.priceValue}>
              {baseTotal.toLocaleString()}원
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>배송비</Text>
            <Text style={styles.priceValue}>{extra.toLocaleString()}원</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>총 결제금액</Text>
            <Text style={styles.totalValue}>
              {finalAmount.toLocaleString()}원
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 결제 버튼 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handlePaymentSubmit}
        >
          <Text style={styles.paymentButtonText}>
            {finalAmount.toLocaleString()}원 결제하기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 모달들 */}
      <AddressSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelect={(address) => {
          if (modalField === 'delivery') {
            setDeliveryInfo((prev) => ({
              ...prev,
              address: (address as any).address,
              detailAddress: (address as any).addressDetail,
            }));
          } else {
            setReturnInfo((prev) => ({
              ...prev,
              address: (address as any).address,
              detailAddress: (address as any).addressDetail,
            }));
          }
          setSearchModalOpen(false);
        }}
      />

      <DeliveryListModal
        isOpen={listModalOpen}
        addresses={savedAddresses as any}
        onClose={() => setListModalOpen(false)}
        onSelect={(address) => {
          setSelectedAddr(address);
          confirmList();
        }}
        selectedId={undefined as any}
        onConfirm={() => {}}
      />

      <ReusableModal
        visible={modalAlert.isOpen}
        onClose={closeAlertModal}
        title='알림'
      >
        <Text>알림</Text>
      </ReusableModal>

      <ReusableModal2
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handlePaymentSubmit as any}
        title='결제 확인'
      >
        <Text>결제하시겠습니까?</Text>
      </ReusableModal2>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  productInfo: {
    flex: 1,
  },
  brandText: {
    fontSize: 14,
    color: '#666',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  typeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  sizeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  addressButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  addressButtonText: {
    fontSize: 16,
    color: '#666',
  },
  sameAddressButtons: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  sameButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sameButtonText: {
    fontSize: 16,
    color: '#666',
  },
  activeButtonText: {
    color: '#fff',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 16,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  bottomBar: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  paymentButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentPage;
