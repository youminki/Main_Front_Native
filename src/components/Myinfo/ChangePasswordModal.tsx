// src/components/ChangePasswordModal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('오류', '새 비밀번호와 확인용 비밀번호가 일치하지 않습니다.');
      return;
    }
    // TODO: API 연동 로직 (이름, 전화번호, newPassword) 추가
    onClose();
    setName('');
    setPhone('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>비밀번호 변경</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={{ fontSize: 20 }}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder='이름을 입력하세요'
            />
            <Text style={styles.label}>전화번호</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder='휴대전화 번호를 입력하세요'
              keyboardType='phone-pad'
            />
            <Text style={styles.label}>새 비밀번호</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder='새 비밀번호를 입력하세요'
              secureTextEntry
            />
            <Text style={styles.label}>새 비밀번호 확인</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder='비밀번호를 한 번 더 입력하세요'
              secureTextEntry
            />
            <View style={styles.divider} />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>비밀번호 재설정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
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
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 12,
    padding: 0,
    zIndex: 2,
  },
  body: {
    padding: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#f5ab35',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
