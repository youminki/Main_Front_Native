// src/components/ChangeAddressModal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';

interface ChangeAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeAddressModal: React.FC<ChangeAddressModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [addressName, setAddressName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const handleSubmit = () => {
    if (!addressName.trim() || !postalCode.trim() || !detailAddress.trim()) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }
    // TODO: API 연동 로직 (배송지명, 우편번호, 상세주소) 추가
    // console.log({ addressName, postalCode, detailAddress });
    onClose();
    setAddressName('');
    setPostalCode('');
    setDetailAddress('');
  };

  return (
    <Modal visible={isOpen} transparent animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>배송지 관리</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>배송지명</Text>
              <TextInput
                style={styles.input}
                value={addressName}
                onChangeText={setAddressName}
                placeholder='배송지명을 입력하세요'
                placeholderTextColor='#999'
              />

              <Text style={styles.label}>우편번호</Text>
              <TextInput
                style={styles.input}
                value={postalCode}
                onChangeText={setPostalCode}
                placeholder='우편번호를 입력하세요'
                placeholderTextColor='#999'
                keyboardType='numeric'
              />

              <Text style={styles.label}>상세주소</Text>
              <TextInput
                style={styles.input}
                value={detailAddress}
                onChangeText={setDetailAddress}
                placeholder='상세주소를 입력하세요'
                placeholderTextColor='#999'
              />

              <View style={styles.divider} />

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>주소 저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeAddressModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fffcfc',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    padding: 0,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#000',
  },
  body: {
    padding: 16,
  },
  formContainer: {
    gap: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#000',
  },
  divider: {
    marginTop: 50,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  submitBtn: {
    marginTop: 12,
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
});
