import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Calendar from '../../../components/Melpik/Schedule/Reservation1/Calendar';
import Stepper from '../../../components/Melpik/Schedule/Reservation1/Stepper';
import Summary from '../../../components/Melpik/Schedule/Reservation1/Summary';
import DateSelection from '../../../components/Melpik/Schedule/Reservation1/DateSelection';
import BottomBar from '../../../components/Melpik/Schedule/Reservation1/BottomBar';

const ScheduleReservation1: React.FC = () => {
  const navigation = useNavigation();

  // 오늘 날짜 기준
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();

  // 연/월 상태: 초기값 오늘 기준
  const [year, setYear] = useState<number>(todayYear);
  const [month, setMonth] = useState<number>(todayMonth);

  // 선택 범위: [start, end], start 고정, end만 증감
  const [range, setRange] = useState<[Date, Date] | null>(null);

  useEffect(() => {
    // 마운트 시 초기범위: 오늘 ~ 한 달後 같은 날짜
    const start = new Date(todayYear, todayMonth - 1, todayDate);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);
    setRange([start, end]);
    setYear(start.getFullYear());
    setMonth(start.getMonth() + 1);
  }, []);

  // 연/월 변경 시 range 유지
  const handleYearChange = (newYear: number) => {
    setYear(newYear);
  };
  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
  };

  // 날짜 클릭: 오늘 이후만, start 고정, end = start + 1달
  const handleDateClick = (day: number) => {
    const clicked = new Date(year, month - 1, day);
    const todayZero = new Date(todayYear, todayMonth - 1, todayDate).getTime();
    if (clicked.getTime() < todayZero) return;

    const newStart = clicked;
    const newEnd = new Date(newStart);
    newEnd.setMonth(newStart.getMonth() + 1);
    setRange([newStart, newEnd]);
    setYear(newStart.getFullYear());
    setMonth(newStart.getMonth() + 1);
  };

  // '+' / '-' 클릭: 마지막 날짜(end)만 증감, 그리고 캘린더 view를 end가 속한 달로 이동
  const adjustEnd = (offsetDays: number) => {
    if (!range) return;
    const [start, end] = range;
    const newEnd = new Date(end);
    newEnd.setDate(end.getDate() + offsetDays);
    if (newEnd.getTime() <= start.getTime()) return;
    setRange([start, newEnd]);
    const neYear = newEnd.getFullYear();
    const neMonth = newEnd.getMonth() + 1;
    setYear(neYear);
    setMonth(neMonth);
  };

  const handleBottomClick = () => {
    navigation.navigate('ScheduleReservation2' as never, { range } as any);
  };

  const seasonProgress = { total: 6, completed: 2, pending: 0 };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stepper currentStep={1} />
        <DateSelection
          year={year}
          month={month}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
        />
        <Calendar
          year={year}
          month={month}
          startDate={range?.[0]}
          endDate={range?.[1]}
          onDateClick={handleDateClick}
          onIncrease={() => adjustEnd(1)}
          onDecrease={() => adjustEnd(-1)}
          today={today}
        />
        <Summary range={range} seasonProgress={seasonProgress} />
      </ScrollView>
      <BottomBar onNext={handleBottomClick} />
    </View>
  );
};

export default ScheduleReservation1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});
