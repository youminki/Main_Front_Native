// src/pages/my-ticket/PurchaseOfPasses.tsx
import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, addMonths } from 'date-fns';
import InputField from '../../../components/InputField';
import CustomSelect from '../../../components/CustomSelect';
import FixedBottomBar from '../../../components/FixedBottomBar';
import ReusableModal2 from '../../../components/ReusableModal2';
import { useTicketList } from '../../../api/ticket/ticket';
import { useMembershipInfo } from '../../../api/user/userApi';

const PurchaseOfPasses: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const popupRef = useRef<any>(null);

  // route.params에서 초기값 가져오기
  const initialName = (route.params as any)?.name || '';

  // react-query로 데이터 패칭
  const { data: ticketData } = useTicketList();
  const { data: membershipInfo } = useMembershipInfo();

  const [purchaseOption, setPurchaseOption] = useState<string>(initialName);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 템플릿 목록과 할인율 계산
  const templates = ticketData?.items ?? [];
  const discountRate = membershipInfo
    ? Math.max(0, parseFloat(membershipInfo.discountRate?.toString() || '0'))
    : 0;

  // 초기 구매 옵션 설정
  React.useEffect(() => {
    if (!initialName && templates.length > 0) {
      setPurchaseOption(templates[0].name);
    }
  }, [initialName, templates]);

  // 오늘 및 한 달 후 날짜 포맷
  const today = new Date();
  const formattedToday = format(today, 'yyyy.MM.dd');
  const formattedOneMonthLater = format(addMonths(today, 1), 'yyyy.MM.dd');

  // 선택된 템플릿 객체
  const selectedTemplate = templates.find((t) => t.name === purchaseOption);

  // 가격 계산
  const basePrice = selectedTemplate?.price ?? 0;
  const discountedPrice =
    discountRate > 0 ? basePrice * (1 - discountRate / 100) : basePrice;
  const formattedDiscountedPrice = discountedPrice.toLocaleString();

  // 결제 확인 핸들러
  const handleConfirmPayment = useCallback(() => {
    const params = new URLSearchParams({
      name: selectedTemplate?.name || '',
      discountedPrice: String(discountedPrice),
    }).toString();
    const url = `/my-ticket/PurchaseOfPasses/TicketPayment?${params}`;

    // React Native에서는 웹뷰나 외부 브라우저로 열기
    Alert.alert('결제 페이지', '결제 페이지로 이동하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => {
          // 외부 브라우저로 열기
          Linking.openURL(url).catch(() => {
            Alert.alert('오류', '결제 페이지를 열 수 없습니다.');
          });
          navigation.navigate('MyTicket' as never);
        },
      },
    ]);
    setIsModalOpen(false);
  }, [selectedTemplate, discountedPrice, navigation]);

  return (
    <ScrollView style={styles.container}>
      <InputField
        name='purchaseOption'
        label='구매할 이용권 *'
        id='purchaseOption'
        as={CustomSelect}
        value={purchaseOption}
        onChange={(value: string) => setPurchaseOption(value)}
        options={templates.map((tpl) => ({
          label: tpl.name,
          value: tpl.name,
        }))}
      />

      <InputField
        name='usagePeriod'
        label='이용권 사용기간'
        id='usagePeriod'
        prefixcontent={`${formattedToday} ~ ${formattedOneMonthLater} (1개월)`}
        readOnly
      />

      <View style={styles.rowLabel}>
        <InputField
          name='paymentAmount'
          label='이용권 결제금액'
          id='paymentAmount'
          prefixcontent={`${formattedDiscountedPrice}원`}
          readOnly
        />
      </View>

      <InputField
        name='currentSeason'
        label='진행 중인 시즌 표시'
        id='currentSeason'
        prefixcontent='2025 SPRING | 2025.05 ~ 2025.07'
        readOnly
      />

      <InputField
        name='autoPaymentDate'
        label='자동결제 일자'
        id='autoPaymentDate'
        prefixcontent={formattedToday}
        readOnly
      />

      <View style={styles.divider} />
      <View style={styles.noticeArea}>
        <Text style={styles.noticeText}>
          ※ 이용 중인 구독권은{' '}
          <Text style={styles.orangeBoldText}>시즌 중간에 취소가 불가</Text>
          합니다.
        </Text>
        <Text style={styles.noticeText}>
          구독권 설정은{' '}
          <Text style={styles.blackBoldText}>시즌 시작 전에 선택</Text>해야
          하며, 다음 시즌에 변경 가능합니다.
        </Text>
      </View>

      <FixedBottomBar
        text='이용권 결제하기'
        color='black'
        onPress={() => setIsModalOpen(true)}
      />

      <ReusableModal2
        title='이용권 구매'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPayment}
      >
        이용권을 결제하시겠습니까?
      </ReusableModal2>
    </ScrollView>
  );
};

export default PurchaseOfPasses;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    width: '100%',
    marginVertical: 16,
  },
  noticeArea: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
    width: '100%',
    marginVertical: 16,
  },
  noticeText: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 20,
    margin: 0,
  },
  orangeBoldText: {
    color: '#f6ae24',
    fontWeight: '700',
  },
  blackBoldText: {
    color: '#000000',
    fontWeight: '700',
  },
});
