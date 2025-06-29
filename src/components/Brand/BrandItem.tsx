// src/components/Brand/BrandItem.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * BrandType: BrandList에서 내려주는 로컬 브랜드 타입
 * 반드시 id, name, category, group 등을 포함해야 합니다.
 */
export interface Brand {
  id: number;
  name: string; // 예: brandName
  category: string; // 예: brand_category
  group: string; // 예: groupName
  // 필요시 company 등 추가 필드
}

interface BrandItemProps {
  brand: Brand;
}

const BrandItem: React.FC<BrandItemProps> = ({ brand }) => {
  const navigation = useNavigation<any>();

  const handleClick = () => {
    navigation.navigate('BrandDetail', { brandId: brand.id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={styles.brandDetails}>
        <Text style={styles.brandName}>{brand.name}</Text>
        {brand.group && <Text style={styles.groupName}>{brand.group}</Text>}
      </View>
      {brand.category ? (
        <View style={styles.brandCategoryWrapper}>
          <Text style={styles.brandCategory}>{brand.category}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  brandDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  brandName: {
    fontWeight: '900',
    fontSize: 15,
    color: '#000',
    marginBottom: 4,
  },
  groupName: {
    fontWeight: '400',
    fontSize: 12,
    color: '#666',
  },
  brandCategoryWrapper: {
    marginLeft: 'auto',
    alignItems: 'center',
  },
  brandCategory: {
    fontWeight: '400',
    fontSize: 13,
    color: '#999',
  },
});

export default BrandItem;
