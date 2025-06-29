// src/components/Melpik/Schedule/Reservation1/Summary.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SummaryProps {
  range: [Date, Date] | null;
  seasonProgress: {
    total: number;
    completed: number;
    pending: number;
  };
}

const Summary: React.FC<SummaryProps> = ({ range, seasonProgress }) => {
  const formatRangeText = () => {
    if (!range) return '날짜 선택 필요';
    const [start, end] = range;
    const startMonth = start.getMonth() + 1;
    const startDay = start.getDate();
    const endMonth = end.getMonth() + 1;
    const endDay = end.getDate();
    return `${startMonth}월 ${startDay}일 ~ ${endMonth}월 ${endDay}일`;
  };

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.scheduleInfo}>
        <Text style={styles.label}>선택된 스케줄</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{formatRangeText()}</Text>
        </View>
      </View>
      <View style={styles.scheduleInfo}>
        <Text style={styles.label}>시즌 진행 회차</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            총 {seasonProgress.total}회 / 완료 {seasonProgress.completed}회
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  scheduleInfo: {
    flex: 1,
  },
  label: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
    color: '#000000',
  },
  infoBox: {
    marginTop: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    minHeight: 57,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 14,
    color: '#000000',
  },
});

export default Summary;
