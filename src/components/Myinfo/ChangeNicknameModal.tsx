// src/components/Myinfo/ChangeNicknameModal.tsx
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

interface ChangeNicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeNicknameModal: React.FC<ChangeNicknameModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [nickname, setNickname] = useState('');

  const handleSubmit = () => {
    if (!nickname.trim()) {
      Alert.alert('오류', '닉네임을 입력해주세요.');
      return;
    }
    // TODO: API 연동 로직 (nickname) 추가
    console.log({ nickname });
    onClose();
    setNickname('');
  };

  return (
    <Modal visible={isOpen} transparent animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>닉네임 변경</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>새 닉네임</Text>
              <TextInput
                style={styles.input}
                value={nickname}
                onChangeText={setNickname}
                placeholder='새 닉네임을 입력하세요'
                placeholderTextColor='#999'
              />

              <View style={styles.divider} />

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>닉네임 저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeNicknameModal;

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
