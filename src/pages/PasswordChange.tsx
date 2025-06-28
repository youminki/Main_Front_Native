// src/pages/PasswordChange.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function PasswordChange() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [isVerified, setIsVerified] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifyButtonColor, setVerifyButtonColor] = useState<'yellow' | 'blue'>(
    'yellow'
  );
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1단계: 현재 비밀번호 인증 (임시 처리)
  const onVerify = async () => {
    setVerifyError(null);
    if (!formData.currentPassword) {
      setVerifyError('현재 비밀번호를 입력해주세요.');
      return;
    }

    // TODO: 실제 API 호출 시 여기에 로직 넣기
    // 임시로 성공 처리
    setTimeout(() => {
      setIsVerified(true);
      setVerifyButtonColor('blue');
    }, 500);
  };

  // 2단계: 새 비밀번호 변경 (임시 처리)
  const onSubmit = async () => {
    if (!formData.newPassword || !formData.confirmNewPassword) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsSubmitting(true);

    // TODO: 실제 API 호출 시 여기에 로직 넣기
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('성공', '비밀번호가 성공적으로 변경되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    }, 1000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 에러 초기화
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // 비밀번호 일치 여부 검증
  useEffect(() => {
    if (
      formData.confirmNewPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        confirmNewPassword: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmNewPassword: undefined }));
    }
  }, [formData.newPassword, formData.confirmNewPassword]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>비밀번호 변경</Text>

        {/* 1단계: 현재 비밀번호 인증 */}
        {!isVerified ? (
          <View>
            <View style={styles.field}>
              <Text style={styles.label}>현재 비밀번호</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={formData.currentPassword}
                  onChangeText={(value) =>
                    handleInputChange('currentPassword', value)
                  }
                  placeholder='현재 비밀번호를 입력하세요'
                  secureTextEntry
                />
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    {
                      backgroundColor:
                        verifyButtonColor === 'yellow' ? '#f6ac36' : '#007AFF',
                    },
                  ]}
                  onPress={onVerify}
                >
                  <Text style={styles.verifyButtonText}>인증</Text>
                </TouchableOpacity>
              </View>
            </View>
            {verifyError && (
              <Text style={styles.errorMessage}>{verifyError}</Text>
            )}
          </View>
        ) : (
          /* 2단계: 새 비밀번호 입력 폼 */
          <View>
            <View style={styles.field}>
              <Text style={styles.label}>새 비밀번호</Text>
              <TextInput
                style={styles.textInput}
                value={formData.newPassword}
                onChangeText={(value) =>
                  handleInputChange('newPassword', value)
                }
                placeholder='새 비밀번호를 입력하세요'
                secureTextEntry
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>새 비밀번호 확인</Text>
              <TextInput
                style={styles.textInput}
                value={formData.confirmNewPassword}
                onChangeText={(value) =>
                  handleInputChange('confirmNewPassword', value)
                }
                placeholder='새 비밀번호를 다시 입력하세요'
                secureTextEntry
              />
              {errors.confirmNewPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmNewPassword}
                </Text>
              )}
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (isSubmitting || !!errors.confirmNewPassword) &&
                    styles.submitButtonDisabled,
                ]}
                onPress={onSubmit}
                disabled={isSubmitting || !!errors.confirmNewPassword}
              >
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? '변경 중...' : '비밀번호 변경'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 24,
    color: '#333',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginRight: 8,
  },
  verifyButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorMessage: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#f6ac36',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
