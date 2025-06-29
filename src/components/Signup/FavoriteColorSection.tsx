import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FavoriteColorSectionProps {
  onChange?: (value: string) => void;
}

const FavoriteColorSection: React.FC<FavoriteColorSectionProps> = ({
  onChange,
}) => {
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    if (onChange) {
      // React Native에서는 이벤트 객체 대신 값만 전달
      onChange(value);
    }
  };

  const colorOptions = [
    {
      value: '1',
      label: 'Black',
      backgroundColor: 'black',
      textColor: 'white',
    },
    {
      value: '2',
      label: 'White',
      backgroundColor: 'white',
      textColor: 'black',
    },
    { value: '3', label: 'Pink', backgroundColor: 'pink', textColor: 'black' },
    { value: '4', label: 'Navy', backgroundColor: 'navy', textColor: 'white' },
    {
      value: '5',
      label: 'Green',
      backgroundColor: 'green',
      textColor: 'white',
    },
    { value: '6', label: 'Blue', backgroundColor: 'blue', textColor: 'white' },
    {
      value: '7',
      label: 'Cream',
      backgroundColor: 'cream',
      textColor: 'black',
    },
    {
      value: '8',
      label: 'Yellow',
      backgroundColor: 'yellow',
      textColor: 'black',
    },
    {
      value: '9',
      label: 'Lilac',
      backgroundColor: 'lilac',
      textColor: 'black',
    },
    {
      value: '10',
      label: 'Ivory',
      backgroundColor: 'ivory',
      textColor: 'black',
    },
    {
      value: '11',
      label: 'Olive',
      backgroundColor: 'olive',
      textColor: 'white',
    },
    {
      value: '12',
      label: 'Orange',
      backgroundColor: 'orange',
      textColor: 'black',
    },
    { value: '13', label: 'Mint', backgroundColor: 'mint', textColor: 'black' },
    { value: '14', label: 'Grey', backgroundColor: 'grey', textColor: 'black' },
    {
      value: '15',
      label: 'Camel',
      backgroundColor: 'camel',
      textColor: 'black',
    },
    {
      value: '16',
      label: 'Beige',
      backgroundColor: 'beige',
      textColor: 'black',
    },
    { value: '17', label: 'Red', backgroundColor: 'red', textColor: 'white' },
    {
      value: '18',
      label: 'Sky Blue',
      backgroundColor: 'skyblue',
      textColor: 'black',
    },
    {
      value: '19',
      label: 'Purple',
      backgroundColor: 'purple',
      textColor: 'white',
    },
    { value: '20', label: 'Nude', backgroundColor: 'nude', textColor: 'black' },
    {
      value: '21',
      label: 'Khaki',
      backgroundColor: 'khaki',
      textColor: 'black',
    },
    { value: '22', label: 'Wine', backgroundColor: 'wine', textColor: 'white' },
    {
      value: '23',
      label: 'Brown',
      backgroundColor: 'brown',
      textColor: 'white',
    },
    {
      value: '24',
      label: 'Charcoal',
      backgroundColor: 'charcoal',
      textColor: 'white',
    },
  ];

  return (
    <>
      <Text style={styles.label}>좋아하는 색상을 선택하세요</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedColor}
          onValueChange={handleColorChange}
          style={styles.picker}
        >
          <Picker.Item label='좋아하는 색상을 선택하세요' value='' />
          {colorOptions.map(({ value, label }) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
      </View>
    </>
  );
};

export default FavoriteColorSection;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
    textAlign: 'left',
    letterSpacing: 1,
  },
  pickerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
