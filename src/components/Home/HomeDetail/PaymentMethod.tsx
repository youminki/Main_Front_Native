import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../../../styles/Theme';

const PaymentMethod: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('12');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.paymentMethodContainer}>
      <Text style={styles.paymentMethodText}>결제방식 (선택)</Text>
      <View style={styles.installmentOptions}>
        <TouchableOpacity
          style={styles.nowOptionWrapper}
          onPress={() => handleOptionClick('NOW')}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.nowOption,
              selectedOption === 'NOW' && styles.activeOption,
            ]}
          >
            {selectedOption === 'NOW' && <View style={styles.circle} />}
            <Text style={styles.optionText}>NOW</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.optionContainer}>
          {['6', '12', '18', '24', '36'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.optionWrapper}
              onPress={() => handleOptionClick(option)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.option,
                  selectedOption === option && styles.activeOption,
                ]}
              >
                {selectedOption === option && <View style={styles.circle} />}
                <Text style={styles.optionText}>{option}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentMethodContainer: {
    marginTop: 54,
    marginBottom: 24,
  },
  paymentMethodText: {
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 10,
  },
  installmentOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nowOptionWrapper: {
    marginRight: 10,
    alignItems: 'center',
  },
  nowOption: {
    paddingHorizontal: 20,
    backgroundColor: Theme.colors.gray3,
    borderWidth: 1,
    borderColor: Theme.colors.gray1,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Theme.colors.gray3,
    borderWidth: 1,
    borderColor: Theme.colors.gray1,
    borderRadius: 50,
    height: 30,
  },
  optionWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    padding: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeOption: {
    backgroundColor: Theme.colors.yellow,
  },
  optionText: {
    fontWeight: '800',
    fontSize: 14,
    textAlign: 'center',
    color: Theme.colors.black,
    zIndex: 1,
  },
  circle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 5,
    borderColor: Theme.colors.yellow,
    backgroundColor: 'white',
    borderRadius: 20,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});

export default PaymentMethod;
