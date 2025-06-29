// src/components/Myinfo/ChangeProfileImageModal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ChangeProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeProfileImageModal: React.FC<ChangeProfileImageModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!imageUri) {
      alert('이미지를 선택해주세요.');
      return;
    }
    // TODO: API 연동 로직 (imageUri) 추가
    onClose();
    setImageUri(null);
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
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.title}>프로필 이미지 변경</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={{ fontSize: 20 }}>×</Text>
            </TouchableOpacity>
          </View>

          {/* 본문 */}
          <View style={styles.body}>
            {/* Avatar & PlusBadge */}
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                style={styles.avatarWrapper}
                onPress={handlePickImage}
              >
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.avatarImg} />
                ) : (
                  <Text style={styles.avatarPlaceholder}>👤</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.helperText}>클릭하여 이미지 선택</Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity
              style={[styles.submitBtn, !imageUri && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={!imageUri}
            >
              <Text style={styles.submitBtnText}>이미지 변경</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangeProfileImageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: 320,
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
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  avatarImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  avatarPlaceholder: {
    fontSize: 48,
    color: '#999',
  },
  helperText: {
    fontSize: 12,
    color: '#888',
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
  submitBtnDisabled: {
    backgroundColor: '#ccc',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
