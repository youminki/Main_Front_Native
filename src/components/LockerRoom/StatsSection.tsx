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
    <View style={styles.statBoxWhite}>
      <View style={styles.row}>
        <Text style={styles.statLabel}>{visitLabel}</Text>
        <Text style={styles.statNumber}>{visits}</Text>
      </View>
    </View>
    <View style={styles.statBoxGray}>
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
  statBoxWhite: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 15,
    paddingHorizontal: 20,
  },
  statBoxGray: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    padding: 15,
    paddingHorizontal: 20,
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 13,
    color: '#f6ae24',
  },
  statLabel: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 13,
    color: '#000000',
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
    lineHeight: 10,
    color: '#fff',
    backgroundColor: '#f6ae24',
    borderRadius: 4,
  },
});

export default StatsSection;
