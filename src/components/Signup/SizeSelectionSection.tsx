import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SizeSelectionSectionProps {
  onChange?: (field: string, value: string) => void;
}

const SizeSelectionSection: React.FC<SizeSelectionSectionProps> = ({
  onChange,
}) => {
  const [sizeOnePiece, setSizeOnePiece] = useState('');
  const [sizeJacket, setSizeJacket] = useState('');
  const [sizeCoat, setSizeCoat] = useState('');

  const handleSizeChange = (field: string, value: string) => {
    switch (field) {
      case 'sizeOnePieceSeq':
        setSizeOnePiece(value);
        break;
      case 'sizeJacketSeq':
        setSizeJacket(value);
        break;
      case 'sizeCoatSeq':
        setSizeCoat(value);
        break;
    }
    if (onChange) {
      onChange(field, value);
    }
  };

  const sizeOptions = [
    { value: '201', label: 'S (44)' },
    { value: '202', label: 'M (55)' },
    { value: '203', label: 'L (66)' },
  ];

  return (
    <>
      <Text style={styles.label}>평소 입는 원피스(사이즈)</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sizeOnePiece}
          onValueChange={(value) => handleSizeChange('sizeOnePieceSeq', value)}
          style={styles.picker}
        >
          <Picker.Item label='사이즈를 선택하세요' value='' />
          {sizeOptions.map(({ value, label }) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>평소 입는 정장(사이즈)</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sizeJacket}
          onValueChange={(value) => handleSizeChange('sizeJacketSeq', value)}
          style={styles.picker}
        >
          <Picker.Item label='사이즈를 선택하세요' value='' />
          {sizeOptions.map(({ value, label }) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>평소 입는 아우터(사이즈)</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sizeCoat}
          onValueChange={(value) => handleSizeChange('sizeCoatSeq', value)}
          style={styles.picker}
        >
          <Picker.Item label='사이즈를 선택하세요' value='' />
          {sizeOptions.map(({ value, label }) => (
            <Picker.Item key={value} label={label} value={value} />
          ))}
        </Picker>
      </View>
    </>
  );
};

export default SizeSelectionSection;

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
