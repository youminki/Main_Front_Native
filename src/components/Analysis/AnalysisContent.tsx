import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnalysisContent = () => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>유형 분석</Text>
      <Text style={styles.paragraph}>
        여기에서 사용자의 유형을 분석할 수 있습니다.
      </Text>
    </View>
  );
};

export default AnalysisContent;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
    maxWidth: 560,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
  },
});
