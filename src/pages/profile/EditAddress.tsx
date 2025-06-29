import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FixedBottomBar from '../../components/FixedBottomBar';
import AddressSearchModal from '../../components/AddressSearchModal';
import { useCreateAddress } from '../../api/address/address';

const EditAddress: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // react-query로 주소 생성 처리
  const createAddressMutation = useCreateAddress();

  const handleSearch = () => {
    setSearchModalOpen(true);
  };

  const handleSave = async () => {
    if (!searchQuery.trim() || !detailAddress.trim()) {
      Alert.alert('알림', '주소와 상세주소를 모두 입력해주세요.');
      return;
    }

    const payload = {
      address: searchQuery,
      addressDetail: detailAddress,
      deliveryMessage,
    };

    try {
      await createAddressMutation.mutateAsync(payload);
      Alert.alert('알림', '주소가 등록되었습니다.');
      navigation.navigate('DeliveryManagement' as never);
    } catch (error: unknown) {
      console.error('주소 등록 실패:', error);
      Alert.alert(
        '오류',
        '주소 등록 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.contentWrapper}>
          {/* 타이틀 */}
          <Text style={styles.fieldTitle}>배송지 입력 *</Text>

          {/* 검색 입력+버튼 */}
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder='주소를 검색 하세요'
              value={searchQuery}
              editable={false}
              onPressIn={handleSearch}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>검색</Text>
            </TouchableOpacity>
          </View>

          {/* 상세주소 입력란 */}
          <TextInput
            style={styles.detailInput}
            placeholder='상세주소를 입력 하세요'
            value={detailAddress}
            onChangeText={setDetailAddress}
          />

          {/* 배송 메시지 타이틀 */}
          <Text style={styles.messageTitle}>배송 메세지 (선택)</Text>

          {/* 배송 메시지 입력란 */}
          <TextInput
            style={styles.messageInput}
            placeholder='배송 시 전달할 내용을 입력하세요 (예: 공동 현관문 비번 등..)'
            value={deliveryMessage}
            onChangeText={setDeliveryMessage}
          />

          <View style={styles.separator} />
        </View>

        {/* 주소 검색 모달 */}
        <AddressSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelect={(addr: string) => {
            setSearchQuery(addr);
            setSearchModalOpen(false);
          }}
        />
      </ScrollView>

      {/* 하단 고정 바: 저장 버튼 */}
      <FixedBottomBar
        
        text={createAddressMutation.isPending ? '등록 중...' : '등록하기'}
        color='yellow'
        onPress={handleSave}
        disabled={createAddressMutation.isPending}
      />
    </>
  );
};

export default EditAddress;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  contentWrapper: {
    flexDirection: 'column',
    width: '100%',
  },
  fieldTitle: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
    color: '#000',
    marginBottom: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 57,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingLeft: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 13,
    lineHeight: 14,
    color: '#000',
  },
  searchButton: {
    width: 69,
    height: 34,
    marginRight: 20,
    backgroundColor: '#f6ae24',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 13,
    color: '#fff',
  },
  detailInput: {
    width: '100%',
    height: 57,
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 14,
    color: '#000',
    marginBottom: 24,
  },
  messageTitle: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
    color: '#000',
    marginBottom: 8,
  },
  messageInput: {
    width: '100%',
    height: 57,
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 14,
    color: '#000',
    marginBottom: 24,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
  },
});
