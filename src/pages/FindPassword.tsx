import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../components/Button01';
import InputField from '../components/InputField';
import ReusableModal from '../components/ReusableModal';
import { resetPassword } from '../api/user/userApi';

// Validation schema
const schemaFindPassword = yup.object().shape({
  name: yup
    .string()
    .required('이름을 입력해주세요.')
    .max(10, '이름은 최대 10자까지 입력 가능합니다.')
    .matches(/^[가-힣]+$/, '이름은 한글만 입력 가능합니다.'),
  email: yup
    .string()
    .required('이메일을 입력해주세요.')
    .email('유효한 이메일 형식이어야 합니다.'),
  phone: yup
    .string()
    .required('전화번호를 입력해주세요.')
    .matches(
      /^\d{3}-\d{4}-\d{4}$/,
      '유효한 전화번호 형식(010-1234-5678)이어야 합니다.'
    ),
  newPassword: yup
    .string()
    .required('새 비밀번호를 입력해주세요.')
    .min(8, '새 비밀번호는 최소 8자 이상이어야 합니다.'),
  confirmPassword: yup
    .string()
    .required('비밀번호 확인을 입력해주세요.')
    .oneOf([yup.ref('newPassword')], '비밀번호가 일치하지 않습니다.'),
});

type FormValues = yup.InferType<typeof schemaFindPassword>;

const FindPassword: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaFindPassword),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // 유효성 에러 시 호출
  const onError = (_errors: FieldErrors<FormValues>) => {
    setErrorMessage('입력하신 내용을 다시 확인해주세요.');
  };

  const onSubmit = async (data: FormValues) => {
    setErrorMessage('');
    try {
      await resetPassword({
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        newPassword: data.newPassword,
      });
      setSuccessMessage('새 비밀번호가 성공적으로 설정되었습니다.');
      setIsModalOpen(true);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : '비밀번호 재설정에 실패했습니다.'
      );
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.row}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputField
                label='이름'
                id='name'
                placeholder='홍길동'
                error={errors.name}
                {...field}
                onChangeText={(text: string) => {
                  const onlyKorean = text.replace(/[^가-힣]/g, '');
                  field.onChange(onlyKorean);
                }}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InputField
                label='이메일'
                id='email'
                placeholder='user@example.com'
                error={errors.email}
                {...field}
              />
            )}
          />
        </View>

        <Controller
          name='phone'
          control={control}
          render={({ field }) => (
            <InputField
              label='전화번호'
              id='phone'
              placeholder='010-1234-5678'
              error={errors.phone}
              value={field.value}
              onChangeText={(text: string) => {
                const digits = text.replace(/\D/g, '').slice(0, 11);
                const part1 = digits.slice(0, 3);
                const part2 = digits.length > 3 ? digits.slice(3, 7) : '';
                const part3 = digits.length > 7 ? digits.slice(7, 11) : '';
                const formatted = [part1, part2, part3]
                  .filter(Boolean)
                  .join('-');
                field.onChange(formatted);
              }}
            />
          )}
        />

        <Controller
          name='newPassword'
          control={control}
          render={({ field }) => (
            <InputField
              label='새 비밀번호'
              id='newPassword'
              type='password'
              placeholder='새 비밀번호를 입력하세요'
              error={errors.newPassword}
              {...field}
            />
          )}
        />

        <Controller
          name='confirmPassword'
          control={control}
          render={({ field }) => (
            <InputField
              label='비밀번호 확인'
              id='confirmPassword'
              type='password'
              placeholder='비밀번호를 다시 입력하세요'
              error={errors.confirmPassword}
              {...field}
            />
          )}
        />

        {/* API 에러 메시지 */}
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity
          style={[
            styles.button,
            (!isValid || isSubmitting) && styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit, onError)}
          disabled={!isValid || isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? '조회 중...' : '비밀번호 변경'}
          </Text>
        </TouchableOpacity>
      </View>

      <ReusableModal
        visible={isModalOpen}
        onClose={closeModal}
        title='비밀번호 찾기 결과'
      >
        <Text>{successMessage}</Text>
      </ReusableModal>
    </ScrollView>
  );
};

export default FindPassword;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  form: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
