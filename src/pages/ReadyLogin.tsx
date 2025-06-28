import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from '../hooks/ValidationYup';

type LoginFormValues = {
  email: string;
  password: string;
};

const ReadyLogin: React.FC = () => {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schemaLogin),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  // 로그인 대신 점검중 메시지 표시
  const handleLoginClick = () => {
    Alert.alert('알림', '지금은 점검중입니다.');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.logo}>ME1PIK</Text>

        <View style={styles.loginForm}>
          <View style={styles.inputFieldRow}>
            <Controller
              control={control}
              name='email'
              render={({ field, fieldState }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>사용자 이메일</Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      fieldState.error && styles.inputError,
                    ]}
                    placeholder='이메일을 입력하세요'
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType='email-address'
                    autoCapitalize='none'
                  />
                  {fieldState.error && (
                    <Text style={styles.errorText}>
                      {fieldState.error.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={styles.inputFieldRow}>
            <Controller
              control={control}
              name='password'
              render={({ field, fieldState }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>비밀번호</Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      fieldState.error && styles.inputError,
                    ]}
                    placeholder='비밀번호를 입력하세요'
                    value={field.value}
                    onChangeText={field.onChange}
                    secureTextEntry
                  />
                  {fieldState.error && (
                    <Text style={styles.errorText}>
                      {fieldState.error.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={styles.checkboxWrapper}>
            <TouchableOpacity style={styles.checkboxLabel}>
              <View style={styles.checkbox}>
                <Text style={styles.checkboxText}>✓</Text>
              </View>
              <Text style={styles.checkboxText}>자동 로그인</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              (!isValid || isSubmitting) && styles.loginButtonDisabled,
            ]}
            onPress={handleSubmit(handleLoginClick)}
            disabled={!isValid || isSubmitting}
          >
            <Text style={styles.loginButtonText}>
              {isSubmitting ? '로그인 중...' : '로그인'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.extraLinks}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FindId' as never)}
          >
            <Text style={styles.link}>아이디 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.linkSeparator}>|</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('FindPassword' as never)}
          >
            <Text style={styles.link}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.linkSeparator}>|</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup' as never)}
          >
            <Text style={styles.link}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loginContainer: {
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f6ac36',
    marginVertical: 50,
  },
  loginForm: {
    width: '100%',
    alignItems: 'center',
  },
  inputFieldRow: {
    width: '100%',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
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
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6ac36',
  },
  checkboxText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
    color: '#333',
  },
  loginButton: {
    width: '100%',
    height: 48,
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
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  link: {
    color: '#333',
    fontSize: 12,
    fontWeight: '700',
  },
  linkSeparator: {
    color: '#999',
    fontSize: 15,
  },
});

export default ReadyLogin;
