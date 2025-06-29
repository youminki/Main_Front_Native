import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

// 타입 정의
interface Sale {
  product: string;
  buyer: string;
  price: string;
  settlement: string;
}

interface SettlementDetail {
  id: number;
  date: string;
  time: string;
  amount: string;
  deduction: string;
  salesList: Sale[];
}

// mock fetch 함수
async function fetchSettlementDetail(
  id: string
): Promise<SettlementDetail | null> {
  const settlements: SettlementDetail[] = [
    {
      id: 1,
      date: '2025-01-15',
      time: '2025년 1월 24일 (금) - 18:30:40',
      amount: '86,400',
      deduction: '-3,600원',
      salesList: [
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000',
        },
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000',
        },
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000',
        },
        {
          product: 'JNS2219 (55) - SANDRO',
          buyer: 'styleweex01',
          price: '386,000',
          settlement: '10,000',
        },
      ],
    },
  ];
  return settlements.find((s) => s.id.toString() === id) ?? null;
}

// react-query 훅
function useSettlementDetail(id: string) {
  return useQuery<SettlementDetail | null>({
    queryKey: ['settlementDetail', id],
    queryFn: () => fetchSettlementDetail(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

const SalesSettlementDetail: React.FC = () => {
  const route = useRoute();
  const { id = '' } = route.params as { id: string };
  const { data: settlement, isLoading } = useSettlementDetail(id);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#000' />
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

  if (!settlement) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>정산 내역을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.inputField}>
            <Text style={styles.label}>정산회차</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>{settlement.date}</Text>
            </View>
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>정산일시</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>{settlement.time}</Text>
            </View>
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>정산금액</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>{settlement.amount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <View style={styles.inputField}>
            <Text style={styles.label}>정산금액</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>{settlement.amount}</Text>
            </View>
          </View>

          <View style={styles.inputField}>
            <Text style={styles.label}>공제세액 (4%)</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>{settlement.deduction}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.note}>
          ※ 정산금액은 세액 공제 및 신고비용을 제외한 나머지 금액입니다.
        </Text>

        <View style={styles.divider} />

        <View style={styles.tableWrapper}>
          <View style={styles.tableHeader}>
            <Text style={styles.thRight}>판매제품 / 구매자 정보</Text>
            <Text style={styles.thLeft}>결제금액 / 정산금액</Text>
          </View>

          {settlement.salesList.map((sale, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tdLeft}>
                <Text
                  style={[
                    styles.productName,
                    sale.product.includes('JNS2219') && styles.boldText,
                  ]}
                >
                  {sale.product}
                </Text>
                <Text style={styles.subInfo}>
                  {`${settlement.date} - (구매자: ${sale.buyer})`}
                </Text>
              </View>
              <View style={styles.tdRight}>
                <Text style={styles.price}>{sale.price}</Text>
                <Text style={[styles.subInfo, styles.boldText]}>
                  {sale.settlement}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SalesSettlementDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 20,
  },
  inputField: {
    flex: 1,
    marginTop: 30,
  },
  label: {
    fontWeight: '700',
    fontSize: 10,
    color: '#000',
    marginBottom: 10,
  },
  input: {
    padding: 21,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
  inputText: {
    fontWeight: '800',
    fontSize: 13,
    color: '#000',
  },
  note: {
    fontWeight: '400',
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  tableWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  thRight: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333',
  },
  thLeft: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tdLeft: {
    flex: 1,
    padding: 12,
    alignItems: 'flex-end',
  },
  tdRight: {
    flex: 1,
    padding: 12,
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  subInfo: {
    fontSize: 12,
    color: '#666',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
