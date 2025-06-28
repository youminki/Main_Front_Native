// src/components/LockerRoom/StatsSection.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsSectionProps {
  visits: string | number;
  sales: string | number;
  dateRange: string;
  visitLabel: string;
  salesLabel: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  visits,
  sales,
  dateRange,
  visitLabel,
  salesLabel,
}) => (
  <View style={styles.statsContainer}>
    <View style={[styles.statBox, styles.whiteBox]}>
      <View style={styles.row}>
        <Text style={styles.statLabel}>{visitLabel}</Text>
        <Text style={styles.statNumber}>{visits}</Text>
      </View>
    </View>
    <View style={[styles.statBox, styles.grayBox]}>
      <View style={styles.row}>
        <Text style={styles.statLabel}>{salesLabel}</Text>
        <Text style={styles.statNumber}>{sales}</Text>
      </View>
      <Text style={styles.dateLabel}>{dateRange}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: 'relative',
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  grayBox: {
    backgroundColor: '#f6f6f6',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontWeight: '800',
    fontSize: 12,
    color: '#f6ae24',
  },
  statLabel: {
    fontWeight: '700',
    fontSize: 12,
    color: '#000',
    marginRight: 5,
  },
  dateLabel: {
    position: 'absolute',
    top: -10,
    right: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontWeight: '900',
    fontSize: 8,
    color: '#fff',
    backgroundColor: '#f6ae24',
  },
});

export default StatsSection;
