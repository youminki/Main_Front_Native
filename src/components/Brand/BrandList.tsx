// src/components/Brand/BrandList.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BrandItem, { Brand as BrandType } from './BrandItem';

interface BrandListProps {
  groupedBrands: Record<string, BrandType[]>;
}

const BrandList: React.FC<BrandListProps> = ({ groupedBrands }) => {
  return (
    <View style={styles.container}>
      {Object.entries(groupedBrands).map(([groupName, brands]) => (
        <View key={groupName} style={styles.groupSection}>
          <Text style={styles.groupTitle}>{groupName}</Text>
          {brands.map((brand) => (
            <BrandItem key={brand.id} brand={brand} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  groupSection: {
    marginBottom: 0,
  },
  groupTitle: {
    fontWeight: '900',
    fontSize: 16,
    backgroundColor: '#555',
    padding: 12,
    paddingHorizontal: 20,
    color: 'white',
    margin: 0,
  },
});

export default BrandList;
