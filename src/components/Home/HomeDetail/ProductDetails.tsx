import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProductDetailsProps {
  elasticity: string;
  transparency: string;
  thickness: string;
  lining: string;
  fit: string;
  color: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  elasticity,
  transparency,
  thickness,
  lining,
  fit,
  color,
}) => {
  const details = [
    { label: '신축성', value: elasticity },
    { label: '투명도', value: transparency },
    { label: '두께', value: thickness },
    { label: '안감', value: lining },
    { label: '핏', value: fit },
    { label: '색상', value: color },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>제품 상세 정보</Text>
      <View style={styles.detailsContainer}>
        {details.map((detail) => (
          <View key={detail.label} style={styles.detailItem}>
            <Text style={styles.detailLabel}>{detail.label}</Text>
            <Text style={styles.detailValue}>{detail.value}</Text>
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
  detailsContainer: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
});

export default ProductDetails;
