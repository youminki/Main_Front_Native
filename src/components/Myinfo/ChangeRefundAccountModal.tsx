// src/components/Myinfo/ChangeRefundAccountModal.tsx
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

interface ChangeRefundAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeRefundAccountModal: React.FC<ChangeRefundAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const handleSubmit = () => {
    if (!bankName.trim() || !accountNumber.trim() || !accountHolder.trim()) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }
    // TODO: API 연동 로직 (bankName, accountNumber, accountHolder) 추가
    console.log({ bankName, accountNumber, accountHolder });
    onClose();
    setBankName('');
    setAccountNumber('');
    setAccountHolder('');
  };

  return (
    <Modal visible={isOpen} transparent animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>환불 계좌정보 변경</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>은행명</Text>
              <TextInput
                style={styles.input}
                value={bankName}
                onChangeText={setBankName}
                placeholder='은행명을 입력하세요'
                placeholderTextColor='#999'
              />

              <Text style={styles.label}>계좌번호</Text>
              <TextInput
                style={styles.input}
                value={accountNumber}
                onChangeText={setAccountNumber}
                placeholder='계좌번호를 입력하세요'
                placeholderTextColor='#999'
                keyboardType='numeric'
              />

              <Text style={styles.label}>예금주</Text>
              <TextInput
                style={styles.input}
                value={accountHolder}
                onChangeText={setAccountHolder}
                placeholder='예금주명을 입력하세요'
                placeholderTextColor='#999'
              />

              <View style={styles.divider} />

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>계좌정보 저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeRefundAccountModal;

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
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
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
    marginTop: 24,
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
