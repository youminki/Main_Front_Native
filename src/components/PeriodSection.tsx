import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type PeriodSectionProps = {
  selectedPeriod: number;
  setSelectedPeriod: (period: number) => void;
};

const PeriodSection: React.FC<PeriodSectionProps> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  const dateRangeText =
    selectedPeriod === 3
      ? '2025.03.01 ~ 2025.05.31'
      : '2025.03.01 ~ 2025.08.31';

  return (
    <View style={styles.settlementHeader}>
      <Text style={styles.dateRange}>{dateRangeText}</Text>
      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 3 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(3)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 3 && styles.periodButtonTextActive,
            ]}
          >
            3개월
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 6 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(6)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 6 && styles.periodButtonTextActive,
            ]}
          >
            6개월
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settlementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
  },
  dateRange: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
    flexShrink: 0,
  },
  periodSelector: {
    flexDirection: 'row',
    flexShrink: 0,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 36,
    marginRight: 8,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  periodButtonText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#000',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
});

export default PeriodSection;
