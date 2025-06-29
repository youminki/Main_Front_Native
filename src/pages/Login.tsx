// src/page/Login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginPost } from '../api/auth/LoginPost';
import { getMembershipInfo, MembershipInfo } from '../api/user/userApi';
import MelpikLogo from '../assets/LoginLogo.svg';
import ReusableModal from '../components/ReusableModal';

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const Login: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formData, setFormData] = useState<LoginFormValues>({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const handleModalClose = () => setIsModalOpen(false);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      Alert.alert('오류', '올바른 이메일을 입력해주세요.');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      Alert.alert('오류', '비밀번호는 6자 이상이어야 합니다.');
      return false;
    }
    return true;
  };

  const handleLoginClick = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = (await LoginPost(
        formData.email,
        formData.password
      )) as LoginResponse;
      const { accessToken, refreshToken } = response;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      const membership: MembershipInfo = await getMembershipInfo();

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home' as any,
            params: {
              showNotice: true,
              membership,
            },
          },
        ],
      });
    } catch (error: unknown) {
      setModalMessage(
        error instanceof Error
          ? error.message
          : '로그인 실패. 다시 시도해주세요.'
      );
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginContainer}>
          <View style={styles.logo}>
            <MelpikLogo width={150} height={60} />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputFieldRow}>
              <Text style={styles.label}>사용자 이메일</Text>
              <TextInput
                style={styles.input}
                placeholder='이메일을 입력하세요'
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputFieldRow}>
              <Text style={styles.label}>비밀번호</Text>
              <TextInput
                style={styles.input}
                placeholder='비밀번호를 입력하세요'
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
              />
            </View>

            <View style={styles.checkboxWrapper}>
              <TouchableOpacity
                style={styles.checkboxLabel}
                onPress={() => setAutoLogin(!autoLogin)}
              >
                <View
                  style={[styles.checkbox, autoLogin && styles.checkboxChecked]}
                >
                  {autoLogin && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>자동 로그인</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                (!formData.email || !formData.password || isSubmitting) &&
                  styles.loginButtonDisabled,
              ]}
              onPress={handleLoginClick}
              disabled={!formData.email || !formData.password || isSubmitting}
            >
              <Text style={styles.loginButtonText}>
                {isSubmitting ? '로그인 중...' : '로그인'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.extraLinks}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FindId' as any)}
            >
              <Text style={styles.link}>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}>|</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('FindPassword' as any)}
            >
              <Text style={styles.link}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}>|</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup' as any)}
            >
              <Text style={styles.link}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ReusableModal
          visible={isModalOpen}
          onClose={handleModalClose}
          title='로그인 실패'
        >
          <Text style={styles.modalText}>{modalMessage}</Text>
        </ReusableModal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginContainer: {
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    width: 150,
    height: 60,
    marginVertical: 50,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputFieldRow: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  checkboxWrapper: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  checkboxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#f6ac36',
    borderColor: '#f6ac36',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#f6ac36',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  extraLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'underline',
  },
  linkSeparator: {
    fontSize: 14,
    color: '#ccc',
    marginHorizontal: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default Login;
