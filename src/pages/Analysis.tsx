import React from 'react';
import { View, StyleSheet } from 'react-native';
import Content from '../components/Analysis/AnalysisContent';

const Analysis = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Content />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
});

export default Analysis;
