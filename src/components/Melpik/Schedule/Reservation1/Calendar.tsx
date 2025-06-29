// src/components/Melpik/Schedule/Reservation1/Calendar.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface CalendarProps {
  year: number;
  month: number;
  startDate?: Date;
  endDate?: Date;
  onDateClick: (day: number) => void;
  onIncrease: () => void;
  onDecrease: () => void;
  today: Date;
}

const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
const getFirstDayOfMonth = (y: number, m: number) =>
  new Date(y, m - 1, 1).getDay();

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  startDate,
  endDate,
  onDateClick,
  onIncrease,
  onDecrease,
  today,
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const todayZero = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();

  const isDisabled = (day: number) => {
    const d = new Date(year, month - 1, day).getTime();
    return d < todayZero;
  };

  const isSelected = (day: number) => {
    if (!startDate || !endDate) return false;
    const s = startDate.getTime();
    const e = endDate.getTime();
    const d = new Date(year, month - 1, day).getTime();
    return d >= Math.min(s, e) && d <= Math.max(s, e);
  };

  return (
    <View style={styles.calendarWrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {year}년 {month}월
        </Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onDecrease}
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onIncrease}
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        {['일', '월', '화', '수', '목', '금', '토'].map((name, idx) => (
          <View key={idx} style={styles.dayName}>
            <Text
              style={[
                styles.dayNameText,
                idx === 0 || idx === 6 ? styles.weekendText : null,
              ]}
            >
              {name}
            </Text>
          </View>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <View key={i} style={styles.emptyBox} />
        ))}

        {Array.from({ length: daysInMonth }, (_, idx) => {
          const day = idx + 1;
          const disabled = isDisabled(day);
          const selected = !disabled && isSelected(day);
          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayBox,
                disabled && styles.disabledDay,
                selected && styles.selectedDay,
              ]}
              onPress={() => {
                if (!disabled) onDateClick(day);
              }}
              disabled={disabled}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayNumber,
                  disabled && styles.disabledText,
                  selected && styles.selectedText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarWrapper: {
    position: 'relative',
    borderRadius: 4,
    paddingTop: 40,
  },
  header: {
    position: 'relative',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerText: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    backgroundColor: '#f6ae24',
    borderRadius: 4,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  dayName: {
    width: (width - 32) / 7,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNameText: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 12,
  },
  weekendText: {
    color: '#888888',
  },
  emptyBox: {
    width: (width - 32) / 7,
    aspectRatio: 1,
  },
  dayBox: {
    width: (width - 32) / 7,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  disabledDay: {
    opacity: 0.3,
  },
  selectedDay: {
    backgroundColor: '#f6ae24',
    borderRadius: 4,
  },
  dayNumber: {
    fontSize: 14,
    color: '#000000',
  },
  disabledText: {
    color: '#cccccc',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Calendar;
