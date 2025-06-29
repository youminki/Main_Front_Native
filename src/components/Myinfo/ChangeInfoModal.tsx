// src/components/ChangeInfoModal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface ChangeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeInfoModal: React.FC<ChangeInfoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [phone, setPhone] = useState('');
  const [serviceArea, setServiceArea] = useState('');

  const handleSubmit = () => {
    // TODO: API 연동 로직 (이름, 생년일, 성별, 휴대전화, 서비스 지역) 추가
    onClose();
    setName('');
    setBirthDate('');
    setGender('male');
    setPhone('');
    setServiceArea('');
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
            <Text style={styles.title}>회원정보 변경</Text>
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
            <Text style={styles.label}>생년월일</Text>
            <TextInput
              style={styles.input}
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder='YYYY-MM-DD'
            />
            <Text style={styles.label}>성별</Text>
            <Picker
              selectedValue={gender}
              style={styles.input}
              onValueChange={(itemValue: 'male' | 'female' | 'other') =>
                setGender(itemValue)
              }
            >
              <Picker.Item label='남성' value='male' />
              <Picker.Item label='여성' value='female' />
              <Picker.Item label='기타' value='other' />
            </Picker>
            <Text style={styles.label}>휴대전화</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder='휴대전화 번호를 입력하세요'
              keyboardType='phone-pad'
            />
            <Text style={styles.label}>서비스 지역</Text>
            <TextInput
              style={styles.input}
              value={serviceArea}
              onChangeText={setServiceArea}
              placeholder='서비스 지역을 입력하세요'
            />
            <View style={styles.divider} />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>정보 저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeInfoModal;

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
