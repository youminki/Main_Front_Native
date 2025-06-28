// Signup.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import {
  signUpUser,
  checkEmail,
  verifyPhone,
  verifyCode,
  checkWebpage,
  checkNickname,
} from '../api/user/userApi';
import { regionDistrictData } from '../components/Signup/regionDistrictData';
import ReusableModal from '../components/ReusableModal';

export type SignupFormData = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  name: string;
  birthYear: string;
  phoneNumber: string;
  region: string;
  district: string;
  melpickAddress: string;
  height: string;
  size: string;
  dress: string;
  top: string;
  bottom: string;
  brand: string;
  instar: string;
  shoulder?: string | null;
  chest?: string | null;
  waist?: string | null;
  sleeve?: string | null;
  mebershipCode?: string | null;
};

const Signup: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    name: '',
    birthYear: '',
    phoneNumber: '',
    region: '',
    district: '',
    melpickAddress: '',
    height: '',
    size: '',
    dress: '',
    top: '',
    bottom: '',
    brand: '',
    instar: '',
    shoulder: '',
    chest: '',
    waist: '',
    sleeve: '',
    mebershipCode: '',
  });

  const [isPhoneVerificationSent, setIsPhoneVerificationSent] =
    useState<boolean>(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startTimer = () => {
    setTimer(180);
    if (timerRef.current !== null) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, []);

  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [isMelpickAddressChecked, setIsMelpickAddressChecked] =
    useState<boolean>(false);

  const [emailButtonText, setEmailButtonText] = useState<string>('중복확인');
  const [nicknameButtonText, setNicknameButtonText] =
    useState<string>('중복확인');
  const [phoneVerificationButtonText, setPhoneVerificationButtonText] =
    useState<string>('인증');
  const [melpickAddressButtonText, setMelpickAddressButtonText] =
    useState<string>('체크');

  const [emailApiError, setEmailApiError] = useState<string>('');
  const [nicknameApiError, setNicknameApiError] = useState<string>('');
  const [phoneApiError, setPhoneApiError] = useState<string>('');
  const [melpickApiError, setMelpickApiError] = useState<string>('');

  const [gender, setGender] = useState<string>('여성');
  const [selectedGenderButton, setSelectedGenderButton] =
    useState<string>('여성');
  const [melpickAddress, setMelpickAddress] = useState<string>('');

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const handleBrandSelect = (brands: string[]) => {
    setSelectedBrands(brands);
    setFormData({ ...formData, brand: brands.join(', ') });
  };

  const [signupResult, setSignupResult] = useState<string>('');
  const [isSignupSuccess, setIsSignupSuccess] = useState<boolean>(false);
  const [showSignupResultModal, setShowSignupResultModal] =
    useState<boolean>(false);

  const resetVerificationState = (
    field: 'email' | 'nickname' | 'phoneNumber' | 'melpickAddress'
  ) => {
    switch (field) {
      case 'email':
        setIsEmailChecked(false);
        setEmailButtonText('중복확인');
        setEmailApiError('');
        break;
      case 'nickname':
        setIsNicknameChecked(false);
        setNicknameButtonText('중복확인');
        setNicknameApiError('');
        break;
      case 'phoneNumber':
        setIsPhoneVerified(false);
        setIsPhoneVerificationSent(false);
        setPhoneVerificationButtonText('인증');
        setPhoneApiError('');
        setVerificationCode('');
        if (timerRef.current !== null) clearInterval(timerRef.current);
        setTimer(0);
        break;
      case 'melpickAddress':
        setIsMelpickAddressChecked(false);
        setMelpickAddressButtonText('체크');
        setMelpickApiError('');
        break;
    }
  };

  const handleEmailCheck = async (): Promise<void> => {
    if (!formData.email) {
      Alert.alert('오류', '이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await checkEmail(formData.email);
      setIsEmailChecked(true);
      setEmailButtonText('사용가능');
      setEmailApiError('');
    } catch (error: any) {
      setIsEmailChecked(false);
      setEmailButtonText('중복확인');
      setEmailApiError(error.message || '이메일 중복 확인에 실패했습니다.');
    }
  };

  const handleNicknameCheck = async (): Promise<void> => {
    if (!formData.nickname) {
      Alert.alert('오류', '닉네임을 입력해주세요.');
      return;
    }

    try {
      const response = await checkNickname(formData.nickname);
      setIsNicknameChecked(true);
      setNicknameButtonText('사용가능');
      setNicknameApiError('');
    } catch (error: any) {
      setIsNicknameChecked(false);
      setNicknameButtonText('중복확인');
      setNicknameApiError(error.message || '닉네임 중복 확인에 실패했습니다.');
    }
  };

  const handleSendVerification = async (): Promise<void> => {
    if (!formData.phoneNumber) {
      Alert.alert('오류', '휴대폰 번호를 입력해주세요.');
      return;
    }

    try {
      await verifyPhone(formData.phoneNumber);
      setIsPhoneVerificationSent(true);
      setPhoneVerificationButtonText('재전송');
      setPhoneApiError('');
      startTimer();
    } catch (error: any) {
      setPhoneApiError(error.message || '인증번호 전송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async (): Promise<void> => {
    if (!verificationCode) {
      Alert.alert('오류', '인증번호를 입력해주세요.');
      return;
    }

    try {
      await verifyCode(formData.phoneNumber, verificationCode);
      setIsPhoneVerified(true);
      setPhoneVerificationButtonText('인증완료');
      setPhoneApiError('');
      if (timerRef.current !== null) clearInterval(timerRef.current);
      setTimer(0);
    } catch (error: any) {
      setPhoneApiError(error.message || '인증번호가 올바르지 않습니다.');
    }
  };

  const handleMelpickAddressCheck = async (): Promise<void> => {
    if (!formData.melpickAddress) {
      Alert.alert('오류', '멜픽 주소를 입력해주세요.');
      return;
    }

    try {
      const response = await checkWebpage(formData.melpickAddress);
      setIsMelpickAddressChecked(true);
      setMelpickAddressButtonText('사용가능');
      setMelpickApiError('');
    } catch (error: any) {
      setIsMelpickAddressChecked(false);
      setMelpickAddressButtonText('체크');
      setMelpickApiError(error.message || '멜픽 주소 확인에 실패했습니다.');
    }
  };

  const validateForm = (): boolean => {
    if (!formData.email || !isEmailChecked) {
      Alert.alert('오류', '이메일 중복 확인을 완료해주세요.');
      return false;
    }
    if (!formData.nickname || !isNicknameChecked) {
      Alert.alert('오류', '닉네임 중복 확인을 완료해주세요.');
      return false;
    }
    if (!formData.phoneNumber || !isPhoneVerified) {
      Alert.alert('오류', '휴대폰 인증을 완료해주세요.');
      return false;
    }
    if (!formData.melpickAddress || !isMelpickAddressChecked) {
      Alert.alert('오류', '멜픽 주소 확인을 완료해주세요.');
      return false;
    }
    if (formData.password !== formData.passwordConfirm) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const signupData = {
        ...formData,
        gender,
        melpickAddress: formData.melpickAddress,
      };

      await signUpUser(signupData);
      setIsSignupSuccess(true);
      setSignupResult('회원가입이 완료되었습니다!');
      setShowSignupResultModal(true);
    } catch (error: any) {
      setIsSignupSuccess(false);
      setSignupResult(error.message || '회원가입에 실패했습니다.');
      setShowSignupResultModal(true);
    }
  };

  const handleSignupResultModalClose = () => {
    setShowSignupResultModal(false);
    if (isSignupSuccess) {
      navigation.navigate('Login' as never);
    }
  };

  const handleGenderChange = (selected: string): void => {
    setGender(selected);
    setSelectedGenderButton(selected);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>회원가입</Text>

          {/* 이메일 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이메일 *</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder='이메일을 입력하세요'
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                  resetVerificationState('email');
                }}
                keyboardType='email-address'
                autoCapitalize='none'
              />
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleEmailCheck}
              >
                <Text style={styles.verifyButtonText}>{emailButtonText}</Text>
              </TouchableOpacity>
            </View>
            {emailApiError ? (
              <Text style={styles.errorText}>{emailApiError}</Text>
            ) : null}
          </View>

          {/* 비밀번호 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>비밀번호 *</Text>
            <TextInput
              style={styles.input}
              placeholder='비밀번호를 입력하세요'
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              secureTextEntry
            />
          </View>

          {/* 비밀번호 확인 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>비밀번호 확인 *</Text>
            <TextInput
              style={styles.input}
              placeholder='비밀번호를 다시 입력하세요'
              value={formData.passwordConfirm}
              onChangeText={(text) =>
                setFormData({ ...formData, passwordConfirm: text })
              }
              secureTextEntry
            />
          </View>

          {/* 닉네임 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>닉네임 *</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder='닉네임을 입력하세요'
                value={formData.nickname}
                onChangeText={(text) => {
                  setFormData({ ...formData, nickname: text });
                  resetVerificationState('nickname');
                }}
              />
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleNicknameCheck}
              >
                <Text style={styles.verifyButtonText}>
                  {nicknameButtonText}
                </Text>
              </TouchableOpacity>
            </View>
            {nicknameApiError ? (
              <Text style={styles.errorText}>{nicknameApiError}</Text>
            ) : null}
          </View>

          {/* 이름 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름 *</Text>
            <TextInput
              style={styles.input}
              placeholder='이름을 입력하세요'
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          {/* 성별 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>성별 *</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGenderButton === '여성' &&
                    styles.genderButtonSelected,
                ]}
                onPress={() => handleGenderChange('여성')}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    selectedGenderButton === '여성' &&
                      styles.genderButtonTextSelected,
                  ]}
                >
                  여성
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  selectedGenderButton === '남성' &&
                    styles.genderButtonSelected,
                ]}
                onPress={() => handleGenderChange('남성')}
              >
                <Text
                  style={[
                    styles.genderButtonText,
                    selectedGenderButton === '남성' &&
                      styles.genderButtonTextSelected,
                  ]}
                >
                  남성
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 휴대폰 번호 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>휴대폰 번호 *</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder='휴대폰 번호를 입력하세요'
                value={formData.phoneNumber}
                onChangeText={(text) => {
                  setFormData({ ...formData, phoneNumber: text });
                  resetVerificationState('phoneNumber');
                }}
                keyboardType='phone-pad'
              />
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleSendVerification}
              >
                <Text style={styles.verifyButtonText}>
                  {phoneVerificationButtonText}
                </Text>
              </TouchableOpacity>
            </View>
            {isPhoneVerificationSent && (
              <View style={styles.verificationContainer}>
                <TextInput
                  style={styles.verificationInput}
                  placeholder='인증번호 6자리'
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType='number-pad'
                  maxLength={6}
                />
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={handleVerifyCode}
                >
                  <Text style={styles.verifyButtonText}>확인</Text>
                </TouchableOpacity>
                {timer > 0 && (
                  <Text style={styles.timerText}>{formatTime(timer)}</Text>
                )}
              </View>
            )}
            {phoneApiError ? (
              <Text style={styles.errorText}>{phoneApiError}</Text>
            ) : null}
          </View>

          {/* 멜픽 주소 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>멜픽 주소 *</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder='멜픽 주소를 입력하세요'
                value={formData.melpickAddress}
                onChangeText={(text) => {
                  setFormData({ ...formData, melpickAddress: text });
                  resetVerificationState('melpickAddress');
                }}
                autoCapitalize='none'
              />
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={handleMelpickAddressCheck}
              >
                <Text style={styles.verifyButtonText}>
                  {melpickAddressButtonText}
                </Text>
              </TouchableOpacity>
            </View>
            {melpickApiError ? (
              <Text style={styles.errorText}>{melpickApiError}</Text>
            ) : null}
          </View>

          {/* 회원가입 버튼 */}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>회원가입</Text>
          </TouchableOpacity>
        </View>

        <ReusableModal
          visible={showSignupResultModal}
          onClose={handleSignupResultModalClose}
          title={isSignupSuccess ? '회원가입 완료' : '회원가입 실패'}
        >
          <Text style={styles.modalText}>{signupResult}</Text>
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
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  verifyButton: {
    backgroundColor: '#f6ac36',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  verificationInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  timerText: {
    fontSize: 14,
    color: '#f6ac36',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0000',
    marginTop: 4,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderButtonSelected: {
    backgroundColor: '#f6ac36',
    borderColor: '#f6ac36',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#333',
  },
  genderButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#f6ac36',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default Signup;
