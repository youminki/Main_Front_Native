import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatsSection from '../../../components/StatsSection';
import FixedBottomBar from '../../../components/FixedBottomBar';
import PeriodSection from '../../../components/PeriodSection';
import { useQuery } from '@tanstack/react-query';

// 정산 내역 타입
export interface Settlement {
  id: number;
  status: 'pending' | 'confirmed';
  date: string;
  subDate: string;
  amount: string;
  deduction: string;
}

// mock fetch 함수
async function fetchSettlements(): Promise<Settlement[]> {
  // 실제 API 연동 시 이 부분만 교체
  return [
    {
      id: 1,
      status: 'pending',
      date: '2025-02 (1차)',
      subDate: '2025-02-07',
      amount: '67,200',
      deduction: '공제 2,800원',
    },
    {
      id: 2,
      status: 'confirmed',
      date: '2025-01 (2차)',
      subDate: '2025-01-24 (18:30:40)',
      amount: '86,400',
      deduction: '공제 3,600원',
    },
    {
      id: 3,
      status: 'confirmed',
      date: '2025-01 (1차)',
      subDate: '2025-01-10 (18:30:40)',
      amount: '144,000',
      deduction: '공제 6,000',
    },
    {
      id: 4,
      status: 'confirmed',
      date: '2024-12 (2차)',
      subDate: '2024-12-27 (18:30:40)',
      amount: '94,080',
      deduction: '공제 3,920원',
    },
    {
      id: 5,
      status: 'confirmed',
      date: '2024-12 (1차)',
      subDate: '2024-12-11',
      amount: '67,200',
      deduction: '공제 2,800원',
    },
    {
      id: 6,
      status: 'confirmed',
      date: '2024-11 (2차)',
      subDate: '2024-11-24',
      amount: '86,400',
      deduction: '공제 3,600원',
    },
    {
      id: 7,
      status: 'confirmed',
      date: '2024-11 (1차)',
      subDate: '2024-11-10',
      amount: '144,000',
      deduction: '공제 6,000원',
    },
  ];
}

// react-query 훅
function useSettlements() {
  return useQuery<Settlement[]>({
    queryKey: ['settlements'],
    queryFn: fetchSettlements,
    staleTime: 1000 * 60 * 5,
  });
}

const SalesSettlement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(6);
  const navigation = useNavigation();

  const visits = '230,400';
  const sales = '02.07';
  const dateRange = '정산금 정보';

  const visitLabel = '미정산금';
  const salesLabel = '다음 정산일';

  // react-query로 정산 내역 패칭
  const { data: settlements = [], isLoading } = useSettlements();

  const filteredSettlements =
    selectedPeriod === 3 ? settlements.slice(0, 3) : settlements;

  const handleSettlementPress = (settlementId: number) => {
    navigation.navigate('SalesSettlementDetail' as never, { id: settlementId } as any);
  };

  const handleSettlementRequest = () => {
    Alert.alert('성공', '정산 신청이 완료되었습니다!');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>판매정산</Text>
          <Text style={styles.subtitle}>내 채널을 통해 나는 브랜드가 된다</Text>
        </View>

        <View style={styles.statsRow}>
          <StatsSection
            visits={visits}
            sales={sales}
            dateRange={dateRange}
            visitLabel={visitLabel}
            salesLabel={salesLabel}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <PeriodSection
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />

          <View style={styles.settlementList}>
            {isLoading ? (
              <Text style={styles.loadingText}>로딩 중...</Text>
            ) : (
              filteredSettlements.map((settlement) => (
                <TouchableOpacity
                  key={settlement.id}
                  style={styles.settlementItem}
                  onPress={() => handleSettlementPress(settlement.id)}
                >
                  <View style={styles.leftSection}>
                    <View style={styles.statusDate}>
                      <View
                        style={[
                          styles.statusTag,
                          settlement.status === 'pending' && styles.pendingTag,
                          settlement.status === 'confirmed' &&
                            styles.confirmedTag,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            settlement.status === 'pending' &&
                              styles.pendingText,
                            settlement.status === 'confirmed' &&
                              styles.confirmedText,
                          ]}
                        >
                          {settlement.status === 'pending'
                            ? '정산예정'
                            : '정산확정'}
                        </Text>
                      </View>
                      <Text style={styles.date}>{settlement.date}</Text>
                    </View>
                    <Text style={styles.subDate}>{settlement.subDate}</Text>
                  </View>
                  <View style={styles.rightSection}>
                    <View style={styles.amountWrapper}>
                      {settlement.status === 'pending' && (
                        <Text style={styles.pendingLabel}>예정</Text>
                      )}
                      <Text style={styles.amount}>{settlement.amount}</Text>
                    </View>
                    <Text style={styles.deduction}>{settlement.deduction}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <FixedBottomBar
        text='정산 신청'
        color='black'
        onPress={handleSettlementRequest}
      />
    </View>
  );
};

export default SalesSettlement;

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
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsRow: {
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  section: {
    flex: 1,
    paddingBottom: 80,
  },
  settlementList: {
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    padding: 20,
  },
  settlementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  leftSection: {
    flex: 1,
  },
  statusDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  pendingTag: {
    backgroundColor: '#FFF3CD',
  },
  confirmedTag: {
    backgroundColor: '#D1ECF1',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#856404',
  },
  confirmedText: {
    color: '#0C5460',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subDate: {
    fontSize: 14,
    color: '#666',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pendingLabel: {
    fontSize: 12,
    color: '#856404',
    marginRight: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deduction: {
    fontSize: 14,
    color: '#666',
  },
});
