import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StatsSection from '../../../components/StatsSection';
import PeriodSection from '../../../components/PeriodSection';

const visitLabel = '포인트';
const salesLabel = '포인트 변동';
const visits = '0';
const sales = '9';
const dateRange = 'COUNT';

const pointHistory = [
  {
    date: '2025-03-10 / 구매사용',
    detail: '포인트 사용',
    detailColor: '#F6AE24',
    change: '- 29,500',
    total: '0',
  },
  {
    date: '2025-03-08 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '29,500',
  },
  {
    date: '2025-03-07 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '29,000',
  },
  {
    date: '2025-03-06 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '28,500',
  },
  {
    date: '2025-03-06 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '28,000',
  },
  {
    date: '2025-03-04 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '27,500',
  },
  {
    date: '2025-03-03 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '27,000',
  },
  {
    date: '2025-03-03 / 제품평가 작성',
    detail: '포인트 적립',
    detailColor: '#EF4523',
    change: '500',
    total: '26,500',
  },
];

const Point: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(6);

  return (
    <ScrollView style={styles.pointContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>포인트</Text>
        <Text style={styles.subtitle}>
          나에게 맞는 스타일을 찾을 때는 멜픽!
        </Text>
      </View>

      <StatsSection
        visits={visits}
        sales={sales}
        dateRange={dateRange}
        visitLabel={visitLabel}
        salesLabel={salesLabel}
      />
      <View style={styles.divider} />

      <View style={styles.section}>
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.leftHeader}>일자 / 내역정보</Text>
            <Text style={styles.rightHeader}>변동 / 누적 (포인트)</Text>
          </View>

          {pointHistory.map((item, idx) => {
            const splitted = item.date.split(' / ');
            const datePart = splitted[0];
            const slashPart = splitted[1] || '';

            return (
              <View key={idx} style={styles.historyRow}>
                <View style={styles.rowLeft}>
                  <View style={styles.dateRow}>
                    <Text style={styles.datePart}>{datePart}</Text>
                    {slashPart && <Text style={styles.slash}> / </Text>}
                    {slashPart && (
                      <Text style={styles.slashPart}>{slashPart}</Text>
                    )}
                  </View>

                  <Text
                    style={[styles.detailText, { color: item.detailColor }]}
                  >
                    {item.detail}
                  </Text>
                </View>

                <View style={styles.rowRight}>
                  <Text style={styles.changeText}>{item.change}</Text>
                  <Text style={styles.totalText}>{item.total}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Point;

// --- Styles ---
const styles = StyleSheet.create({
  pointContainer: {
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
    color: '#000000',
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
  },
  historyContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(221, 221, 221, 0.96)',
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
  },
  leftHeader: {
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 11,
    color: '#000000',
  },
  rightHeader: {
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 11,
    color: '#000000',
    textAlign: 'right',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 20,
  },
  rowLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  datePart: {
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 13,
    color: '#000000',
  },
  slash: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 13,
    color: '#000000',
  },
  slashPart: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 13,
    color: '#000000',
  },
  rowRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 15,
  },
  detailText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 13,
    margin: 0,
    color: '#000000',
  },
  changeText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 13,
    margin: 0,
    color: '#000000',
    textAlign: 'right',
  },
  totalText: {
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 13,
    margin: 0,
    color: '#000000',
    textAlign: 'right',
  },
});
