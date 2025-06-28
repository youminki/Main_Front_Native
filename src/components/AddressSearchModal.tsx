// src/components/AddressSearchModal.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (address: string, lat?: number, lng?: number) => void;
}

const AddressSearchModal: React.FC<AddressSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = () => {
    // 실제 구현에서는 주소 검색 API를 호출
    // 여기서는 예시 데이터를 사용
    const mockResults = [
      '서울특별시 강남구 테헤란로 123',
      '서울특별시 강남구 역삼동 456',
      '서울특별시 서초구 서초대로 789',
    ];
    setSearchResults(mockResults);
  };

  const handleSelectAddress = (address: string) => {
    onSelect(address);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType='slide'
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>주소 검색</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder='주소를 입력하세요'
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>검색</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.resultsContainer}>
            {searchResults.map((address, index) => (
              <TouchableOpacity
                key={index}
                style={styles.resultItem}
                onPress={() => handleSelectAddress(address)}
              >
                <Text style={styles.resultText}>{address}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    fontSize: 14,
    color: '#333',
  },
});

export default AddressSearchModal;
