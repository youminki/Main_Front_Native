import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface CustomSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  options?: { label: string; value: string }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onValueChange,
  placeholder = '선택하세요',
  disabled = false,
  options = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onValueChange?.(selectedValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <TouchableOpacity
        style={[styles.select, disabled && styles.disabled]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <Text
          style={[styles.selectText, !selectedOption && styles.placeholder]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>선택하세요</Text>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.optionsContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    option.value === value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(option.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      option.value === value && styles.selectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    height: 57,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  disabled: {
    backgroundColor: '#f0f0f0',
  },
  selectText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#000000',
    flex: 1,
  },
  placeholder: {
    color: '#999999',
  },
  arrow: {
    fontSize: 12,
    color: '#000000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  optionsContainer: {
    maxHeight: 400,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});

export default CustomSelect;
