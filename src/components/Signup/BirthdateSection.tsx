import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface BirthdateSectionProps {
  onChange?: (birthdate: { year: string; month: string; day: string }) => void; // 생년월일 선택 시 호출되는 콜백
  label?: string;
}

const BirthdateSection: React.FC<BirthdateSectionProps> = ({ onChange }) => {
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const handleYearChange = (value: string) => {
    setBirthYear(value);
    if (onChange) onChange({ year: value, month: birthMonth, day: birthDay });
  };

  const handleMonthChange = (value: string) => {
    setBirthMonth(value);
    if (onChange) onChange({ year: birthYear, month: value, day: birthDay });
  };

  const handleDayChange = (value: string) => {
    setBirthDay(value);
    if (onChange) onChange({ year: birthYear, month: birthMonth, day: value });
  };

  return (
    <View style={styles.birthdateWrapper}>
      <Text style={styles.label}>생년월일</Text>
      <View style={styles.birthdateContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={birthYear}
            onValueChange={handleYearChange}
            style={styles.picker}
          >
            <Picker.Item label='년도를 선택하세요' value='' />
            {Array.from({ length: 100 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <Picker.Item
                  key={year}
                  label={`${year}년`}
                  value={year.toString()}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={birthMonth}
            onValueChange={handleMonthChange}
            style={styles.picker}
          >
            <Picker.Item label='월을 선택하세요' value='' />
            {Array.from({ length: 12 }, (_, i) => {
              const month = i + 1;
              return (
                <Picker.Item
                  key={month}
                  label={`${month}월`}
                  value={month.toString()}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={birthDay}
            onValueChange={handleDayChange}
            style={styles.picker}
          >
            <Picker.Item label='일을 선택하세요' value='' />
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              return (
                <Picker.Item
                  key={day}
                  label={`${day}일`}
                  value={day.toString()}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default BirthdateSection;

const styles = StyleSheet.create({
  birthdateWrapper: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: 'left',
    marginBottom: 12,
    color: '#333',
  },
  birthdateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
