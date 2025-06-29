import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ProductOptionsProps {
  sizes: { size: string; measurements: Record<string, any> }[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  sizes,
  selectedSize,
  onSizeSelect,
  selectedColor,
  onColorSelect,
}) => {
  const colors = ['Black', 'White', 'Red', 'Blue'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>옵션 선택</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>사이즈</Text>
        <View style={styles.optionsContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size.size}
              style={[
                styles.optionButton,
                selectedSize === size.size && styles.selectedOption,
              ]}
              onPress={() => onSizeSelect(size.size)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedSize === size.size && styles.selectedOptionText,
                ]}
              >
                {size.size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>색상</Text>
        <View style={styles.optionsContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.optionButton,
                selectedColor === color && styles.selectedOption,
              ]}
              onPress={() => onColorSelect(color)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedColor === color && styles.selectedOptionText,
                ]}
              >
                {color}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#f6ac36',
    borderColor: '#f6ac36',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProductOptions;
