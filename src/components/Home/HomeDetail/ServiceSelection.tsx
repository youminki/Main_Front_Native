import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ServiceSelectionProps {
  selectedService: '' | 'rental' | 'purchase';
  onServiceChange: (service: string) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  selectedService,
  onServiceChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>서비스 선택</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedService === 'rental' && styles.selectedOption,
          ]}
          onPress={() => onServiceChange('rental')}
        >
          <Text
            style={[
              styles.optionText,
              selectedService === 'rental' && styles.selectedOptionText,
            ]}
          >
            대여
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedService === 'purchase' && styles.selectedOption,
          ]}
          onPress={() => onServiceChange('purchase')}
        >
          <Text
            style={[
              styles.optionText,
              selectedService === 'purchase' && styles.selectedOptionText,
            ]}
          >
            구매
          </Text>
        </TouchableOpacity>
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
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#f6ac36',
    borderColor: '#f6ac36',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ServiceSelection;
