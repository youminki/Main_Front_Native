import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  brandCount: number;
  productCount: number;
  brandLabel?: string;
  productLabel?: string;
}

const StatsSection: React.FC<Props> = ({
  brandCount,
  productCount,
  brandLabel = '브랜드',
  productLabel = '제품',
}) => {
  return (
    <View style={styles.statsContainer}>
      <View style={[styles.statBox, styles.whiteBox]}>
        <View style={styles.row}>
          <Text style={styles.statNumber}>{brandCount}</Text>
          <Text style={styles.statLabel}>{brandLabel}</Text>
        </View>
      </View>
      <View style={[styles.statBox, styles.grayBox]}>
        <View style={styles.row}>
          <Text style={styles.statNumber}>{productCount}</Text>
          <Text style={styles.statLabel}>{productLabel}</Text>
        </View>
        <Text style={styles.dateLabel}>NEW 2025. 03.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    gap: 0,
    width: '100%',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    padding: 15,
    paddingHorizontal: 20,
    position: 'relative',
    marginRight: 0,
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
    padding: 4,
    paddingHorizontal: 8,
    fontWeight: '900',
    fontSize: 8,
    lineHeight: 10,
    color: '#fff',
    backgroundColor: '#f6ae24',
  },
});

export default StatsSection;
