import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, addMonths } from 'date-fns';

import InputField from '../../../components/InputField';
import FixedBottomBar from '../../../components/FixedBottomBar';
import {
  postInitPayment,
  getMyCards,
  postRecurringPayment,
} from '../../../api/default/payment';

export interface CardItem {
  cardId: number;
  payerId: string;
  cardName: string;
  cardNumber: string;
  createdAt: string;
}

const TicketPayment: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // route.params에서 파라미터 추출
  const name = (route.params as any)?.name || '';
  const discountedPriceParam = (route.params as any)?.discountedPrice || '0';
  const discountedPrice = parseFloat(discountedPriceParam);
  const roundedPrice = isNaN(discountedPrice) ? 0 : Math.round(discountedPrice);
  const formattedDiscountedPrice = roundedPrice.toLocaleString();

  const [options, setOptions] = useState<string[]>([]);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const today = new Date();
  const formattedToday = format(today, 'yyyy.MM.dd');
  const formattedOneMonthLater = format(addMonths(today, 1), 'MM.dd');

  // React Native에서는 웹뷰나 외부 브라우저로 결제 처리
  useEffect(() => {
    // 결제 콜백 설정 (웹뷰에서 사용할 수 있도록)
    (global as any).PCD_PAY_CALLBACK = (result: any) => {
      if (result?.status === 'success') {
        navigation.navigate('PaymentComplete' as never);
      } else {
        navigation.navigate('PaymentFail' as never);
      }
    };
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyCards();
        const items: CardItem[] = res.items;
        let opts: string[];
        if (items.length === 0) {
          opts = ['등록된 카드가 없습니다', '카드 추가하기'];
        } else {
          opts = items.map((c) => `카드 결제 / ${c.cardName} ${c.cardNumber}`);
          opts.push('카드 추가하기');
        }
        setCards(items);
        setOptions(opts);
        setSelectedPaymentMethod(opts[0]);
      } catch (e) {
        console.error('[🔥] 카드 목록 조회 실패', e);
        setOptions(['등록된 카드가 없습니다', '카드 추가하기']);
        setSelectedPaymentMethod('등록된 카드가 없습니다');
      }
    })();
  }, []);

  const extractPayerId = (val: string) => {
    const card = cards.find(
      (c) => val.includes(c.cardName) && val.includes(c.cardNumber)
    );
    return card?.payerId || '';
  };

  const handleSelectChange = (val: string) => {
    if (val === '카드 추가하기') {
      navigation.navigate('PaymentMethod' as never);
      return;
    }
    setSelectedPaymentMethod(val);
  };

  const handlePaymentClick = async () => {
    if (isProcessing) return; // 중복 클릭 방지
    setIsProcessing(true);

    const payerId = extractPayerId(selectedPaymentMethod);
    if (!payerId) {
      Alert.alert('알림', '결제할 카드를 선택해주세요.');
      setIsProcessing(false);
      return;
    }

    const requestData = { payerId, amount: roundedPrice, goods: name };

    try {
      if (name === '1회 이용권') {
        const response = await postInitPayment(requestData);
        // React Native에서는 웹뷰나 외부 브라우저로 결제 페이지 열기
        Alert.alert('결제 페이지', '결제 페이지로 이동하시겠습니까?', [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => {
              // 외부 브라우저로 결제 페이지 열기
              Linking.openURL(
                (response.data as any).paymentUrl || 'https://payment.example.com'
              ).catch(() => {
                Alert.alert('오류', '결제 페이지를 열 수 없습니다.');
              });
            },
          },
        ]);
      } else if (
        name === '정기 구독권(4회권)' ||
        name === '정기 구독권(무제한)'
      ) {
        const response = await postRecurringPayment(requestData);
        const payResult = response.data.PCD_PAY_RST;
        if (payResult === 'success') {
          navigation.navigate('PaymentComplete' as never);
        } else {
          navigation.navigate('PaymentFail' as never);
        }
      } else {
        Alert.alert('오류', '알 수 없는 이용권 유형입니다.');
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error('결제 실패:', error);
      const errMsg =
        error.response?.data?.message || error.message || '알 수 없는 오류';
      Alert.alert('결제 실패', errMsg);
      navigation.navigate('PaymentFail' as never);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productInfo}>
        <Text style={styles.title}>결제할 이용권</Text>
        <View style={styles.divider} />

        <View style={styles.productHeader}>
          <View style={styles.leftSide}>
            <Text style={styles.subscriptionLabel}>이용권 결제</Text>
            <View style={styles.productTitle}>
              <Text style={styles.mainTitle}>{name}</Text>
            </View>

            <View style={styles.row}>
              <Image
                source={require('../../../assets/LockerRoom/TicketPaymentSeaSon.png')}
                style={styles.iconImg}
              />
              <View style={styles.rowTextContainer}>
                <Text style={styles.rowLabel}>
                  시즌 -<Text style={styles.rowValue}> 2025 SPRING</Text>
                </Text>
                <Text
                  style={styles.rowPeriod}
                >{`${formattedToday} ~ ${formattedOneMonthLater}`}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <Image
                source={require('../../../assets/LockerRoom/PaymentAmount.png')}
                style={styles.iconImg}
              />
              <View style={styles.rowTextContainer}>
                <Text style={styles.rowLabel}>
                  결제금액 -
                  <Text style={styles.rowValue}>
                    {formattedDiscountedPrice}원
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.rightSideImage}>
            <Image
              source={require('../../../assets/LockerRoom/TicketPaymentRightIcon.png')}
              style={styles.rightImage}
            />
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <InputField
          label='결제방식 *'
          id='paymentMethod'
          options={options}
          value={selectedPaymentMethod}
          onSelectChange={handleSelectChange}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.customLabel}>총 결제금액 (VAT 포함)</Text>
        <View style={styles.paymentAmountWrapper}>
          <Text style={styles.paymentAmount}>{formattedDiscountedPrice}원</Text>
        </View>
      </View>

      <FixedBottomBar
        text={isProcessing ? '결제중...' : '결제하기'}
        color='yellow'
        onPress={handlePaymentClick}
        disabled={isProcessing}
      />
    </ScrollView>
  );
};

export default TicketPayment;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#dddddd',
  },
  section: {
    flexDirection: 'column',
    marginVertical: 20,
  },
  customLabel: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 11,
    color: '#000000',
    marginBottom: 8,
  },
  paymentAmountWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 57,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  paymentAmount: {
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'right',
    color: '#000000',
  },
  productInfo: {
    width: '100%',
    flexDirection: 'column',
    paddingBottom: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 11,
    color: '#000000',
    marginBottom: 10,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  leftSide: {
    flexDirection: 'column',
  },
  subscriptionLabel: {
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 11,
    color: '#000000',
    marginBottom: 10,
  },
  productTitle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 20,
  },
  mainTitle: {
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 22,
    color: '#000000',
  },
  rightSideImage: {
    width: 169,
    height: 210,
    backgroundColor: '#d9d9d9',
    overflow: 'hidden',
    borderRadius: 4,
  },
  rightImage: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  iconImg: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  rowTextContainer: {
    flexDirection: 'column',
  },
  rowLabel: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
  },
  rowValue: {
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
  },
  rowPeriod: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#000000',
  },
});
