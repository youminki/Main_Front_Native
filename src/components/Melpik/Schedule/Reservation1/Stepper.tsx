import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../../../styles/Theme';

const Stepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <View style={styles.stepperContainer}>
      <View style={[styles.step, currentStep >= 1 && styles.completedStep]}>
        <Text style={styles.stepText}>1</Text>
      </View>
      <View style={styles.stepLine} />
      <View style={[styles.step, currentStep >= 2 && styles.completedStep]}>
        <Text style={styles.stepText}>2</Text>
      </View>
      <View style={styles.stepLine} />
      <View style={[styles.step, currentStep >= 3 && styles.completedStep]}>
        <Text style={styles.stepText}>3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.gray2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  completedStep: {
    backgroundColor: Theme.colors.yellow,
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: Theme.colors.gray3,
    alignSelf: 'center',
  },
});

export default Stepper;
