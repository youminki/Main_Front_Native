import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface DateSelectionProps {
  year: number;
  month: number;
  onYearChange: (value: any) => void;
  onMonthChange: (value: any) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  year,
  month,
  onYearChange,
  onMonthChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onYearChange(year - 1)}>
          <Text style={styles.arrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {year}년 {month}월
        </Text>
        <TouchableOpacity onPress={() => onYearChange(year + 1)}>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 24,
    color: '#666',
  },
});
