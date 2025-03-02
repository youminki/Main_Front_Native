import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaSignup } from '../hooks/ValidationYup';
import InputField from '../components/InputField';

import Theme from '../styles/Theme';
import BottomBar from '../components/BottomNav2';
import ResetButtonIcon from '../assets/ResetButton.png';

import { CustomSelect } from '../components/CustomSelect';

type MyInfoFormData = {
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
};

const MyInfo: React.FC = () => {
  const methods = useForm<MyInfoFormData>({
    resolver: yupResolver(schemaSignup),
    mode: 'all',
    defaultValues: {
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
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [gender] = useState<string>('여성');
  const [melpickAddress, setMelpickAddress] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    e.target.value = value;
  };

  const handleNicknameCheck = (): void => {
    console.log('닉네임 중복 확인 클릭');
  };

  const handleInstagramCheck = (): void => {
    console.log('인스타그램 아이디 확인 클릭');
  };

  const handleVerification = (): void => {
    console.log('본인 인증 클릭');
  };

  const handleMelpickAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMelpickAddress(e.target.value);
  };

  const handleCheckClick = (): void => {
    console.log('멜픽 주소 확인:', melpickAddress);
  };

  const onSubmit: SubmitHandler<MyInfoFormData> = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    setErrorMessage(null);
  };

  return (
    <ThemeProvider theme={Theme}>
      <FormProvider {...methods}>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

            {/* readOnly: 계정(이메일) */}
            <InputField
              label='계정(이메일)'
              id='email'
              type='text'
              error={errors.email}
              placeholder='계정을 입력하세요'
              isEmailField
              {...register('email')}
              required
              maxLength={20}
              onButtonClick={handleInstagramCheck}
              readOnly
            />

            {/* 수정 가능: 비밀번호 */}
            <InputField
              label='비밀번호 *(숫자, 문자를 조합하여 8자리 이상 입력하세요)'
              id='password'
              type='password'
              placeholder='비밀번호를 입력하세요'
              error={errors.password}
              {...register('password')}
              required
              maxLength={20}
              autoComplete='current-password'
            />

            {/* 수정 가능: 비밀번호 확인 */}
            <InputField
              label='비밀번호 확인 *'
              id='passwordConfirm'
              type='password'
              placeholder='비밀번호를 한번 더 입력하세요'
              error={errors.passwordConfirm}
              {...register('passwordConfirm')}
              required
              maxLength={20}
            />

            {/* readOnly: 닉네임 */}
            <InputField
              label='닉네임(8글자 이내)'
              id='nickname'
              type='text'
              placeholder='닉네임을 입력하세요'
              error={errors.nickname}
              {...register('nickname')}
              required
              maxLength={8}
              buttonLabel='중복확인'
              onButtonClick={handleNicknameCheck}
              readOnly
            />

            <RowLabel>
              {/* readOnly: 이름 */}
              <InputField
                label='이름'
                id='name'
                type='text'
                placeholder='이름을 입력하세요'
                error={errors.name}
                {...register('name')}
                required
                maxLength={5}
                readOnly
              />

              {/* readOnly: 태어난 해 (as CustomSelect → disabled 적용) */}
              <InputField
                label='태어난 해'
                id='birthYear'
                as={CustomSelect}
                error={errors.birthYear}
                required
                {...register('birthYear')}
                disabled
              >
                <option value='' disabled selected>
                  1990
                </option>
                {Array.from({ length: 100 }, (_, i) => 2023 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </InputField>
            </RowLabel>

            {/* readOnly: 성별 → 버튼 disable 처리 */}
            <GenderField>
              <InputFieldLabel>성별</InputFieldLabel>
              <GenderRow>
                <GenderButton
                  type='button'
                  disabled
                  selected={gender === '여성'}
                  isSelected={gender === '여성'}
                >
                  여성
                </GenderButton>
                <GenderButton
                  type='button'
                  disabled
                  selected={gender === '남성'}
                  isSelected={gender === '남성'}
                >
                  남성
                </GenderButton>
              </GenderRow>
            </GenderField>

            {/* 수정 가능: 전화번호 */}
            <PhoneField>
              <InputField
                label='전화번호 *(11자를 입력하세요)'
                id='phoneNumber'
                type='text'
                placeholder='전화번호를 입력하세요'
                error={errors.phoneNumber}
                {...register('phoneNumber')}
                required
                maxLength={11}
                onInput={handlePhoneNumberChange}
                buttonLabel='본인인증'
                onButtonClick={handleVerification}
              />
            </PhoneField>

            <RowLabel>
              {/* 수정 가능: 지역 */}
              <InputField
                label='지역 *'
                id='region'
                as={CustomSelect}
                error={errors.region}
                required
                {...register('region')}
              >
                <option value='' disabled selected>
                  지역을 선택하세요
                </option>
                <option value='서울특별시'>서울특별시</option>
                <option value='경기도'>경기도</option>
              </InputField>

              {/* 수정 가능: 구 */}
              <InputField
                label='구 *'
                id='district'
                as={CustomSelect}
                error={errors.district}
                required
                {...register('district')}
              >
                <option value='' disabled selected>
                  구를 선택하세요
                </option>
                <option value='강남구'>강남구</option>
                <option value='서초구'>서초구</option>
                <option value='금천구'>금천구</option>
              </InputField>
            </RowLabel>

            {/* readOnly: 멜픽 주소설정 */}
            <InputField
              label='멜픽 주소설정(영문, 숫자 12글자 이내)'
              id='melpickAddress'
              type='text'
              placeholder='멜픽 주소를 입력하세요'
              error={errors.melpickAddress}
              {...register('melpickAddress')}
              value={melpickAddress}
              onChange={handleMelpickAddressChange}
              buttonLabel='체크'
              buttonColor='yellow'
              required
              maxLength={12}
              onButtonClick={handleCheckClick}
              prefix='melpick.com/'
              readOnly
            />

            <BlackContainer />
            <BottomBar
              imageSrc={ResetButtonIcon}
              buttonText={isSubmitting ? '가입 중...' : '회원가입'}
              type='submit'
              disabled={isSubmitting}
            />
          </Form>
        </Container>
      </FormProvider>
    </ThemeProvider>
  );
};

export default MyInfo;

/* 스타일 정의 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;
const RowLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;
const GenderField = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const InputFieldLabel = styled.label`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.black};
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 11px;

  margin-top: 30px;
`;
const GenderRow = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;
const GenderButton = styled.button<{ selected: boolean; isSelected: boolean }>`
  flex: 1;
  padding: 10px;

  border: ${({ isSelected }) => (isSelected ? '2px solid #f6ae24' : 'none')};
  border-radius: 10px;
  background-color: ${({ selected }) => (selected ? '#FFFFFF' : '#EEEEEE')};
  color: ${({ selected }) => (selected ? '#000000' : '#999999')};
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border 0.3s ease,
    color 0.3s ease;
  &:hover {
    border: 2px solid #f6ae24;
  }
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
  &:disabled {
    background-color: #f0f0f0;
    color: #999999;
    cursor: not-allowed;
  }
`;
const PhoneField = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  input {
    flex: 1;
    padding-right: 120px;
  }
`;
const BlackContainer = styled.div`
  margin-bottom: 100px;
`;
const ErrorText = styled.div`
  color: red;
  text-align: center;
`;
