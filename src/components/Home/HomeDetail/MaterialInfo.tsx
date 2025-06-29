import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MaterialInfoProps {
  fabricComposition: Record<'겉감' | '안감' | '배색' | '부속', string>;
}

const MaterialInfo: React.FC<MaterialInfoProps> = ({ fabricComposition }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>소재 정보</Text>
      <View style={styles.materialContainer}>
        {Object.entries(fabricComposition).map(([key, value]) => (
          <View key={key} style={styles.materialItem}>
            <Text style={styles.materialLabel}>{key}</Text>
            <Text style={styles.materialValue}>{value}</Text>
          </View>
        ))}
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
  materialContainer: {
    gap: 8,
  },
  materialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  materialLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  materialValue: {
    fontSize: 14,
    color: '#333',
  },
});

export default MaterialInfo;
