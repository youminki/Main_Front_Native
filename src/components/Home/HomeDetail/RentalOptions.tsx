import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface RentalOptionsProps {
  servicePeriod: string;
  onPeriodChange: (period: string) => void;
}

const RentalOptions: React.FC<RentalOptionsProps> = ({
  servicePeriod,
  onPeriodChange,
}) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const minSelectableDate = new Date();
  const minDays = 1;
  const maxDays = 10;

  const getTotalDays = (s: Date, e: Date) =>
    Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const formatDate = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
      d.getDate()
    ).padStart(2, '0')}`;

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setSelectedRange({ start: selectedDate, end: null });
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate && selectedRange.start) {
      const total = getTotalDays(selectedRange.start, selectedDate);
      if (total < minDays) {
        return;
      }
      if (total > maxDays) {
        return;
      }
      setSelectedRange({ start: selectedRange.start, end: selectedDate });
      const formatted = `${formatDate(selectedRange.start)} ~ ${formatDate(
        selectedDate
      )}`;
      onPeriodChange(formatted);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>대여 기간 선택</Text>

      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={styles.dateLabel}>시작일</Text>
          <Text style={styles.dateValue}>
            {selectedRange.start
              ? formatDate(selectedRange.start)
              : '선택하세요'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={styles.dateLabel}>종료일</Text>
          <Text style={styles.dateValue}>
            {selectedRange.end ? formatDate(selectedRange.end) : '선택하세요'}
          </Text>
        </TouchableOpacity>
      </View>

      {selectedRange.start && selectedRange.end && (
        <View style={styles.adjustContainer}>
          <Text style={styles.adjustText}>
            {getTotalDays(selectedRange.start, selectedRange.end)}일
          </Text>
        </View>
      )}

      {showStartPicker && (
        <DateTimePicker
          value={selectedRange.start || new Date()}
          mode='date'
          display='default'
          onChange={handleStartDateChange}
          minimumDate={minSelectableDate}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={selectedRange.end || new Date()}
          mode='date'
          display='default'
          onChange={handleEndDateChange}
          minimumDate={selectedRange.start || new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateButton: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  adjustContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  adjustText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f6ac36',
  },
});

export default RentalOptions;
