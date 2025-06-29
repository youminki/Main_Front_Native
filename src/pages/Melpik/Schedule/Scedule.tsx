// src/pages/Melpik/Schedule/Schedule.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import Theme from '../../../styles/Theme';
import ScheduleIcon from '../../../assets/Melpik/schedule.svg';
import BletIcon from '../../../assets/Melpik/blet.svg';
import StatsSection from '../../../components/StatsSection';
import {
  getMySaleScheduleSummaries,
  SaleScheduleSummaryItem,
} from '../../../api/sale/SaleSchedule';

// 네비게이션 타입 정의 (필요에 따라 StackParamList를 실제 네비게이션 구조에 맞게 수정)
type RootStackParamList = {
  ScheduleReservation1: undefined;
  ScheduleConfirmation: { id: number };
};

const Schedule: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // API로부터 받아올 스케줄 요약 리스트
  const [schedules, setSchedules] = useState<SaleScheduleSummaryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 마운트 시 API 호출
  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMySaleScheduleSummaries();
        setSchedules(data);
      } catch (err: any) {
        console.error('스케줄 요약 조회 실패', err);
        setError(
          err.response?.data?.message ||
            err.message ||
            '스케줄 조회 중 오류가 발생했습니다.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSummaries();
  }, []);

  // 통계: 총 스케줄 수
  const totalCount = schedules.length;
  const inProgressCount = schedules.filter(
    (item) => item.status === 'scheduled'
  ).length;
  const currentDateRange = schedules.length > 0 ? schedules[0].dateRange : '';

  const visitLabel = '총 스케줄';
  const salesLabel = '진행중인 스케줄';

  const handleBottomClick = (): void => {
    navigation.navigate('ScheduleReservation1');
  };

  // 각 스케줄 클릭 시 상세 페이지로 이동
  const handleItemClick = (id: number): void => {
    navigation.navigate('ScheduleConfirmation', { id });
  };

  const mapStatusToUI = (
    status: string
  ): 'reserved' | 'inProgress' | 'notStarted' => {
    if (status === 'scheduled') return 'reserved';
    if (status === 'scheduling' || status === 'inProgress') return 'inProgress';
    return 'notStarted';
  };

  const formatDateRange = (dateRange: string): string =>
    dateRange
      .split('~')
      .map((part) => part.trim().replace(/-/g, '.'))
      .join(' ~ ');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#000' />
        <Text style={styles.loadingMessage}>로딩 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.scheduleContainer}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>판매 스케줄</Text>
          <Text style={styles.subtitle}>내 채널을 통해 나는 브랜드가 된다</Text>
        </View>

        <View style={styles.statsRow}>
          <StatsSection
            visits={totalCount}
            sales={inProgressCount}
            dateRange={currentDateRange}
            visitLabel={visitLabel}
            salesLabel={salesLabel}
          />
        </View>
        <View style={styles.divider} />

        <View style={styles.scheduleContent}>
          <View style={styles.scheduleList}>
            {schedules.map((item) => {
              const uiStatus = mapStatusToUI(item.status);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.scheduleItemContainer,
                    uiStatus === 'reserved' && styles.scheduleItemReserved,
                    uiStatus === 'inProgress' && styles.scheduleItemInProgress,
                    uiStatus === 'notStarted' && styles.scheduleItemNotStarted,
                  ]}
                  onPress={() => handleItemClick(item.id)}
                >
                  <View style={styles.iconContainer}>
                    <View
                      style={[
                        styles.iconWrapper,
                        uiStatus === 'reserved' && styles.iconWrapperReserved,
                        uiStatus === 'inProgress' &&
                          styles.iconWrapperInProgress,
                        uiStatus === 'notStarted' &&
                          styles.iconWrapperNotStarted,
                      ]}
                    >
                      <ScheduleIcon width={24} height={24} />
                    </View>
                    <View style={styles.connectorLine} />
                  </View>
                  <View style={styles.itemContainer}>
                    <Text style={styles.miniTitle}>
                      {uiStatus === 'reserved'
                        ? '예약된 스케줄'
                        : uiStatus === 'inProgress'
                        ? '진행된 스케줄'
                        : '미진행 스케줄'}
                    </Text>
                    <View style={styles.scheduleItem}>
                      <View style={styles.details}>
                        <View style={styles.seasonWrapper}>
                          <Text style={styles.season}>
                            {item.title} 시즌 {item.id}
                          </Text>
                          <TouchableOpacity
                            style={styles.bletIconWrapper}
                            onPress={() => handleItemClick(item.id)}
                          >
                            <BletIcon width={20} height={20} />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.dateWrapper}>
                          <Text style={styles.dateTitle}>스케줄 일정</Text>
                          <Text style={styles.dateText}>
                            {formatDateRange(item.dateRange)}
                          </Text>
                        </View>
                        <View style={styles.connectorLine1} />
                        <View style={styles.infoRow}>
                          <View style={styles.infoColumn}>
                            <Text style={styles.dateTitle}>선택한 작품</Text>
                            <Text style={styles.dateText}>
                              {item.productCount}가지
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBarContainer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={handleBottomClick}
        >
          <Text style={styles.orderButtonText}>스케줄 예약하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  scheduleContainer: {
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
  loadingMessage: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorMessage: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
  header: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ccc',
  },
  statsRow: {
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleList: {
    gap: 20,
  },
  scheduleItemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  scheduleItemReserved: {
    backgroundColor: '#F8F9FA',
    borderColor: '#007BFF',
  },
  scheduleItemInProgress: {
    backgroundColor: '#E7F3FF',
    borderColor: '#28A745',
  },
  scheduleItemNotStarted: {
    backgroundColor: '#F8F9FA',
    borderColor: '#6C757D',
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconWrapperReserved: {
    backgroundColor: '#007BFF',
  },
  iconWrapperInProgress: {
    backgroundColor: '#28A745',
  },
  iconWrapperNotStarted: {
    backgroundColor: '#6C757D',
  },
  connectorLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E5E5E5',
  },
  itemContainer: {
    flex: 1,
  },
  miniTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  scheduleItem: {
    flex: 1,
  },
  details: {
    gap: 12,
  },
  seasonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  season: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bletIconWrapper: {
    padding: 4,
  },
  dateWrapper: {
    gap: 4,
  },
  dateTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  connectorLine1: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  infoRow: {
    flexDirection: 'row',
  },
  infoColumn: {
    flex: 1,
  },
  bottomBarContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  orderButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
