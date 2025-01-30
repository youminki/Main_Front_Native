import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaSignup } from '../hooks/ValidationYup';
import BackButton from '../components/BackButton';
import InputField from '../components/InputField';
import AgreementSection from '../components/Signup/AgreementSection';
import Theme from '../styles/Theme';
import BottomBar from '../components/Signup/BottomBar';
import ResetButtonIcon from '../assets/ResetButton.png';

type SignupFormData = {
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
  instar: string;
};

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schemaSignup),
    mode: 'all',
  });

  const [gender, setGender] = useState<string>('여성');
  const [selectedGenderButton, setSelectedGenderButton] =
    useState<string>('여성');
  const [melpickAddress, setMelpickAddress] = useState<string>('');

  const handleBackClick = (): void => {
    window.history.back();
  };

  const handleGenderChange = (selectedGender: string): void => {
    setGender(selectedGender);
    setSelectedGenderButton(selectedGender);
  };

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

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    console.log('Form Data: ', data);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <BackButton onClick={handleBackClick} />
          <Title>회원가입</Title>
          <Placeholder />
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <AgreementSection />
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
          />

          <InputField
            label='비밀번호(숫자, 문자를 조합하여 8자리 이상 입력하세요)'
            id='password'
            type='password'
            placeholder='비밀번호를 입력하세요'
            error={errors.password}
            {...register('password')}
            required
            maxLength={20}
            autoComplete='current-password'
          />

          <InputField
            label='비밀번호 확인'
            id='passwordConfirm'
            type='password'
            placeholder='비밀번호를 한번 더 입력하세요'
            error={errors.passwordConfirm}
            {...register('passwordConfirm')}
            required
            maxLength={20}
          />

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
          />

          <RowLabel>
            <InputField
              label='이름'
              id='name'
              type='text'
              placeholder='이름을 입력하세요'
              error={errors.name}
              {...register('name')}
              required
              maxLength={5}
            />
            <InputField
              label='태어난 해'
              id='birthYear'
              as='select'
              error={errors.birthYear}
              required
              {...register('birthYear')}
            >
              {Array.from({ length: 100 }, (_, i) => 2023 - i).map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </InputField>
          </RowLabel>

          <GenderField>
            <InputFieldLabel>성별</InputFieldLabel>
            <GenderRow>
              <GenderButton
                type='button'
                selected={gender === '여성'}
                onClick={() => handleGenderChange('여성')}
                isSelected={selectedGenderButton === '여성'}
              >
                여성
              </GenderButton>
              <GenderButton
                type='button'
                selected={gender === '남성'}
                onClick={() => handleGenderChange('남성')}
                isSelected={selectedGenderButton === '남성'}
              >
                남성
              </GenderButton>
            </GenderRow>
          </GenderField>

          <PhoneField>
            <InputField
              label='전화번호(11자를 입력하세요)'
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
            <InputField
              label='지역'
              id='region'
              as='select'
              error={errors.region}
              required
              {...register('region')}
            >
              <option value='서울특별시'>서울특별시</option>
              <option value='경기도'>경기도</option>
            </InputField>

            <InputField
              label='구'
              id='district'
              as='select'
              error={errors.district}
              required
              {...register('district')}
            >
              <option value='강남구'>강남구</option>
              <option value='서초구'>서초구</option>
              <option value='금천구'>금천구</option>
            </InputField>
          </RowLabel>

          <InputField
            label='멜픽 주소설정(영문, 숫자 12글자 이내)'
            id='melpickAddress'
            type='text'
            placeholder='주소를 입력하세요'
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
          />
          <BlackContainer />
          <BottomBar imageSrc={ResetButtonIcon} buttonText='작성 완료' />
        </Form>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 27px;
  height: 100vh;
`;

const Placeholder = styled.div`
  width: 24px;
  padding: 0 37px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 105px;
  position: relative;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
`;

const GenderRow = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

const GenderButton = styled.button<{ selected: boolean; isSelected: boolean }>`
  flex: 1;
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
`;

const PhoneField = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input {
    flex: 1;
    padding-right: 120px; /* Ensure space for button */
  }
`;

const BlackContainer = styled.div`
  margin-bottom: 100px;
`;
