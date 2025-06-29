// src/components/FilterContainer.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ReusableModal from '../../components/ReusableModal';

const FilterContainer: React.FC = () => {
  const [isFeatureModalOpen, setFeatureModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterIconContainer}
        onPress={() => setFeatureModalOpen(true)}
        activeOpacity={0.7}
      >
        <View style={styles.filterIcon}>
          <Text style={styles.filterText}>필터</Text>
        </View>
      </TouchableOpacity>

      <ReusableModal
        visible={isFeatureModalOpen}
        onClose={() => setFeatureModalOpen(false)}
        title='준비 중입니다'
      >
        <Text>아직 구현 전인 기능이에요.</Text>
      </ReusableModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterIconContainer: {
    alignItems: 'center',
  },
  filterIcon: {
    width: 34,
    height: 34,
    padding: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default FilterContainer;
