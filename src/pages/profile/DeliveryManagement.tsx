import React, { useState, useEffect } from 'react';
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
import {
  useAddresses,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
  Address,
  UpdateAddressRequest,
} from '../../api/address/address';

const DeliveryManagement: React.FC = () => {
  const navigation = useNavigation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editAddress, setEditAddress] = useState<string>('');
  const [editDetail, setEditDetail] = useState<string>('');
  const [editMessage, setEditMessage] = useState<string>('');

  // 주소 검색 모달 state
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // react-query로 주소 데이터 패칭
  const { data: addresses = [], isLoading } = useAddresses();
  const updateAddressMutation = useUpdateAddress();
  const deleteAddressMutation = useDeleteAddress();
  const setDefaultAddressMutation = useSetDefaultAddress();

  // 인라인 수정 시작
  const handleStartEdit = (item: Address) => {
    setEditingId(item.id);
    setEditAddress(item.address);
    setEditDetail(item.addressDetail);
    setEditMessage(item.deliveryMessage || '');
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditAddress('');
    setEditDetail('');
    setEditMessage('');
  };

  // 수정 저장
  const handleSaveEdit = async (id: number) => {
    if (!editAddress.trim() || !editDetail.trim()) {
      Alert.alert('알림', '주소와 상세주소를 모두 입력해주세요.');
      return;
    }

    const payload: UpdateAddressRequest = {
      address: editAddress,
      addressDetail: editDetail,
      deliveryMessage: editMessage,
    };

    try {
      await updateAddressMutation.mutateAsync({ id, data: payload });
      Alert.alert('알림', '배송지가 업데이트 되었습니다.');
      setEditingId(null);
      setEditAddress('');
      setEditDetail('');
      setEditMessage('');
    } catch (err) {
      console.error('주소 수정 실패:', err);
      Alert.alert('오류', '배송지 수정 중 오류가 발생했습니다.');
    }
  };

  // 주소 삭제
  const handleDelete = async (id: number) => {
    Alert.alert('확인', '정말 이 배송지를 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteAddressMutation.mutateAsync(id);
            Alert.alert('알림', '배송지가 삭제되었습니다.');
          } catch (err) {
            console.error('주소 삭제 실패:', err);
            Alert.alert('오류', '배송지 삭제 중 오류가 발생했습니다.');
          }
        },
      },
    ]);
  };

  // 기본 주소 설정
  const handleSetDefault = async (id: number) => {
    try {
      await setDefaultAddressMutation.mutateAsync(id);
      Alert.alert('알림', '기본 주소로 설정되었습니다.');
    } catch (err: unknown) {
      console.error('기본 주소 설정 실패:', err);
      if (
        err instanceof Error &&
        'response' in err &&
        typeof err.response === 'object' &&
        err.response &&
        'status' in err.response &&
        err.response.status === 404
      ) {
        Alert.alert('오류', '해당 주소를 찾을 수 없습니다.');
      } else {
        Alert.alert('오류', '기본 주소 설정 중 오류가 발생했습니다.');
      }
    }
  };

  // 신규 등록 페이지로 이동
  const handleRegister = () => {
    navigation.navigate('EditAddress' as never);
  };

  // 주소 검색 실행
  const handleSearch = () => {
    setSearchModalOpen(true);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {isLoading ? (
          <Text style={styles.loadingText}>주소를 불러오는 중...</Text>
        ) : addresses.length === 0 ? (
          <Text style={styles.emptyText}>등록된 배송지가 없습니다.</Text>
        ) : (
          addresses.map((item, idx) => {
            const isEditing = editingId === item.id;
            return (
              <View key={item.id} style={styles.block}>
                <Text style={styles.title}>
                  {item.isDefault ? '배송지 (기본)' : `배송지 ${idx + 1}`}
                </Text>

                <View style={styles.inputGroup}>
                  {isEditing ? (
                    <>
                      <View style={styles.searchWrapper}>
                        <TextInput
                          style={styles.searchInput}
                          value={editAddress}
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
                      <TextInput
                        style={styles.detailInput}
                        value={editDetail}
                        onChangeText={setEditDetail}
                        placeholder='상세주소를 입력하세요'
                      />
                      <Text style={styles.messageTitle}>
                        배송 메시지 (선택)
                      </Text>
                      <TextInput
                        style={styles.messageInput}
                        value={editMessage}
                        placeholder='문 앞에 두고 벨 눌러주세요.'
                        onChangeText={setEditMessage}
                      />
                    </>
                  ) : (
                    <>
                      <TextInput
                        style={styles.readOnlyInput}
                        editable={false}
                        value={item.address}
                      />
                      <TextInput
                        style={styles.readOnlyInput}
                        editable={false}
                        value={item.addressDetail}
                      />
                      <TextInput
                        style={styles.readOnlyInput}
                        editable={false}
                        value={item.deliveryMessage || ''}
                        placeholder='배송 메시지가 없습니다.'
                      />
                    </>
                  )}
                </View>

                <View style={styles.buttonRow}>
                  {/* 왼쪽: 기본주소설정 혹은 현재 기본주소 표시 */}
                  {isEditing ? (
                    <View /> /* 편집중에는 왼쪽 공간 비워둡니다 */
                  ) : item.isDefault ? (
                    <View style={styles.defaultLabel}>
                      <Text style={styles.defaultLabelText}>기본주소</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.defaultButton}
                      onPress={() => handleSetDefault(item.id)}
                    >
                      <Text style={styles.defaultButtonText}>
                        기본주소로 설정
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* 오른쪽: 편집/삭제 버튼 */}
                  <View style={styles.actionButtons}>
                    {isEditing ? (
                      <>
                        <TouchableOpacity
                          style={[
                            styles.actionButton,
                            updateAddressMutation.isPending &&
                              styles.actionButtonDisabled,
                          ]}
                          onPress={() => handleSaveEdit(item.id)}
                          disabled={updateAddressMutation.isPending}
                        >
                          <Text style={styles.actionButtonText}>
                            {updateAddressMutation.isPending
                              ? '저장 중...'
                              : '저장'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={handleCancelEdit}
                        >
                          <Text style={styles.actionButtonText}>취소</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleStartEdit(item)}
                        >
                          <Text style={styles.actionButtonText}>편집</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.actionButton,
                            deleteAddressMutation.isPending &&
                              styles.actionButtonDisabled,
                          ]}
                          onPress={() => handleDelete(item.id)}
                          disabled={deleteAddressMutation.isPending}
                        >
                          <Text style={styles.actionButtonText}>
                            {deleteAddressMutation.isPending
                              ? '삭제 중...'
                              : '삭제'}
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        )}

        {/* 주소 검색 모달 */}
        <AddressSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelect={(addr: string) => {
            setEditAddress(addr);
            setSearchModalOpen(false);
          }}
        />
      </ScrollView>

      {/* 하단 고정 바: 신규 등록 버튼 */}
      <FixedBottomBar
        
        text='신규 등록'
        color='yellow'
        onPress={handleRegister}
      />
    </>
  );
};

export default DeliveryManagement;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  block: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    color: '#000',
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
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
  },
  messageTitle: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
    color: '#000',
    marginTop: 8,
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
  },
  readOnlyInput: {
    width: '100%',
    height: 57,
    paddingLeft: 16,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 14,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  defaultLabel: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f6ae24',
    borderRadius: 4,
  },
  defaultLabelText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
  },
  defaultButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f6ae24',
    borderRadius: 4,
  },
  defaultButtonText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#f6ae24',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 91,
    height: 46,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    fontWeight: '800',
    fontSize: 14,
    color: '#000',
  },
});
