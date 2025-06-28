// src/components/MypageModal.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReusableModal2 from '../components/ReusableModal2';
import { logoutUser } from '../api/user/userApi';
import { Axios } from '../api/Axios';

const getEmailFromToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email as string;
  } catch {
    return null;
  }
};

type MypageModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MypageModal: React.FC<MypageModalProps> = ({ isOpen, onClose }) => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigation = useNavigation();

  const handleLogoutConfirm = async () => {
    try {
      const email = await getEmailFromToken();
      if (email) {
        await logoutUser(email);
      }
    } catch (err) {
      console.error('logout error:', err);
    } finally {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.removeItem('profileImageUrl');

      Axios.defaults.headers.Authorization = '';
      setLogoutModalOpen(false);
      onClose();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <>
      <Modal
        visible={isOpen}
        transparent={true}
        animationType='slide'
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHandle}>
              <View style={styles.handleBar} />
            </View>

            <View style={styles.modalHeader}>
              <Text style={styles.title}>마이페이지</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.modalContentArea}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => {
                  onClose();
                  navigation.navigate('MyInfoList');
                }}
              >
                <View style={styles.placeholderImage}>
                  <Text style={styles.imageText}>마이페이지</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => {
                  onClose();
                  navigation.navigate('Mystyle');
                }}
              >
                <View style={styles.placeholderImage}>
                  <Text style={styles.imageText}>마이스타일</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => setLogoutModalOpen(true)}
            >
              <Text style={styles.logoutButtonText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isLogoutModalOpen && (
        <ReusableModal2
          isOpen={isLogoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handleLogoutConfirm}
          title='알림'
        >
          로그아웃을 하시겠습니까?
        </ReusableModal2>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '90%',
    minHeight: 350,
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
  },
  modalHandle: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
  modalHeader: {
    margin: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    margin: 0,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 0,
  },
  modalContentArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  imageText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  logoutButton: {
    width: '100%',
    height: 56,
    margin: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});

export default MypageModal;
