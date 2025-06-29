import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FavoriteBrandsSection = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandId)) {
        return prev.filter((id) => id !== brandId);
      } else {
        if (prev.length >= 3) {
          return prev;
        }
        return [...prev, brandId];
      }
    });
  };

  const brands = [
    { id: '48', name: 'CADELL' },
    { id: '57', name: 'CC Collect' },
    { id: '10', name: 'CLUB MONACO' },
    { id: '30', name: 'DECO' },
    { id: '15', name: 'DEW L' },
    { id: '51', name: 'DOUCAN' },
    { id: '17', name: 'EGOIST' },
    { id: '20', name: 'G-CUT' },
    { id: '23', name: 'it MICHAA' },
    { id: '11', name: 'JIGOTT' },
    { id: '13', name: 'JJ JIGOTT' },
    { id: '19', name: 'KENNETH LADY' },
    { id: '32', name: 'LÄTT BY T' },
    { id: '50', name: 'Lazyna' },
    { id: '45', name: 'LINE' },
    { id: '18', name: 'LYNN' },
    { id: '34', name: 'MAJE' },
    { id: '46', name: 'Mark de niel' },
    { id: '22', name: 'MICHAA' },
    { id: '16', name: 'MOJO.S.PHINE' },
    { id: '47', name: 'Mujatzz' },
    { id: '29', name: 'OLIVE DES OLIVE' },
    { id: '35', name: 'O˙2nd' },
    { id: '26', name: 'RENEEVON' },
    { id: '27', name: 'SANDRO' },
    { id: '21', name: 'SATIN' },
    { id: '25', name: 'SISLEY' },
    { id: '2', name: 'SJSJ' },
    { id: '33', name: 'SJYP' },
    { id: '28', name: 'STUDIO TOMBOY' },
    { id: '1', name: 'SYSTEM' },
  ];

  return (
    <>
      <Text style={styles.label}>선호하는 브랜드 (3가지)</Text>
      <View style={styles.brandContainer}>
        {brands.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            style={styles.brandCheckbox}
            onPress={() => handleBrandToggle(brand.id)}
          >
            <View
              style={[
                styles.checkbox,
                selectedBrands.includes(brand.id) && styles.checkboxSelected,
              ]}
            >
              {selectedBrands.includes(brand.id) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.brandName}>{brand.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default FavoriteBrandsSection;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  brandContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  brandCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    minWidth: '30%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  brandName: {
    fontSize: 14,
    color: '#333',
  },
});
