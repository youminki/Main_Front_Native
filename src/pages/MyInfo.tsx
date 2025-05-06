import React, { useState, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaInfo } from '../hooks/ValidationYup';
import InputField from '../components/InputField';
import { CustomSelect } from '../components/CustomSelect';
import Theme from '../styles/Theme';
import BottomBar from '../components/BottomNav2';
import ResetButtonIcon from '../assets/ResetButton.png';
import { FaCamera } from 'react-icons/fa';

// Form data type
type MyInfoFormData = {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  nickname: string;
  name: string;
  birthYear: string;
  phoneNumber: string;
  region: string;
  district: string;
  melpickAddress: string;
};

// Constants
const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => 2023 - i);
const REGIONS = ['서울특별시', '경기도'];
const DISTRICTS = ['강남구', '서초구', '금천구'];

export default function MyInfo() {
  const methods = useForm<MyInfoFormData>({
    resolver: yupResolver(schemaInfo),
    mode: 'all',
    defaultValues: {
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
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
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prefixAddress, setPrefixAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const onSubmit: SubmitHandler<MyInfoFormData> = (data) => {
    // 공통 비밀번호 검증 로직
    if (isVerified) {
      if (data.newPassword !== data.confirmNewPassword) {
        setErrorMsg('새 비밀번호가 일치하지 않습니다.');
        return;
      }
    }
    setErrorMsg(null);
    // TODO: submit logic
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileUrl(URL.createObjectURL(file));
  };

  const handleVerifyCurrent = () => {
    // TODO: 현재 비밀번호 인증 API 호출
    setIsVerified(true);
  };

  return (
    <ThemeProvider theme={Theme}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}

          {/* Email (read-only) */}
          <Field>
            <InputField
              label='계정(이메일)'
              id='email'
              placeholder='계정을 입력하세요'
              readOnly
              {...register('email')}
              error={errors.email}
            />
          </Field>

          {/* Nickname (editable) */}
          <Field>
            <InputField
              label='닉네임(8글자 이내)'
              id='nickname'
              placeholder='닉네임을 입력하세요'
              maxLength={8}
              {...register('nickname')}
              error={errors.nickname}
            />
          </Field>

          {/* Password Section */}
          <SectionLabel>비밀번호 변경</SectionLabel>
          <Field>
            <InputField
              label='현재 비밀번호'
              id='currentPassword'
              type='password'
              placeholder='현재 비밀번호를 입력하세요'
              {...register('currentPassword')}
              error={errors.currentPassword}
              buttonLabel='인증'
              onButtonClick={handleVerifyCurrent}
            />
          </Field>
          {isVerified && (
            <>
              <Field>
                <InputField
                  label='새 비밀번호'
                  id='newPassword'
                  type='password'
                  placeholder='새 비밀번호를 입력하세요'
                  {...register('newPassword')}
                  error={errors.newPassword}
                />
              </Field>
              <Field>
                <InputField
                  label='새 비밀번호 확인'
                  id='confirmNewPassword'
                  type='password'
                  placeholder='새 비밀번호를 다시 입력하세요'
                  {...register('confirmNewPassword')}
                  error={errors.confirmNewPassword}
                />
              </Field>
            </>
          )}

          {/* Name & BirthYear (read-only) */}
          <Row>
            <Field>
              <InputField
                label='이름'
                id='name'
                placeholder='이름을 입력하세요'
                maxLength={5}
                readOnly
                {...register('name')}
                error={errors.name}
              />
            </Field>
            <Field>
              <InputField
                label='태어난 해'
                id='birthYear'
                as={CustomSelect}
                disabled
                {...register('birthYear')}
                error={errors.birthYear}
              >
                <option value='' disabled>
                  선택
                </option>
                {BIRTH_YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </InputField>
            </Field>
          </Row>

          {/* Phone (read-only) */}
          <Field>
            <InputField
              label='전화번호'
              id='phoneNumber'
              placeholder='000-0000-0000'
              readOnly
              {...register('phoneNumber')}
              error={errors.phoneNumber}
            />
          </Field>

          {/* Region & District (editable) */}
          <Row>
            <Field>
              <InputField
                label='지역 *'
                id='region'
                as={CustomSelect}
                {...register('region')}
                error={errors.region}
              >
                <option value='' disabled>
                  선택
                </option>
                {REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </InputField>
            </Field>
            <Field>
              <InputField
                label='구 *'
                id='district'
                as={CustomSelect}
                {...register('district')}
                error={errors.district}
              >
                <option value='' disabled>
                  선택
                </option>
                {DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </InputField>
            </Field>
          </Row>

          {/* Melpick Address (editable) */}
          <Field>
            <Controller
              name='melpickAddress'
              control={control}
              render={({ field }) => (
                <InputField
                  label='멜픽 주소'
                  id='melpickAddress'
                  placeholder='영문+숫자 12자 이내'
                  prefix='melpick.com/'
                  maxLength={12}
                  buttonLabel='확인'
                  buttonColor='yellow'
                  onButtonClick={() => console.log('주소 확인:', prefixAddress)}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setPrefixAddress(e.target.value);
                  }}
                  error={errors.melpickAddress}
                />
              )}
            />
          </Field>

          {/* Profile Image (editable) */}
          <ProfileSection>
            <SectionLabel>프로필 이미지</SectionLabel>
            <AvatarWrapper onClick={() => fileInputRef.current?.click()}>
              {profileUrl ? (
                <AvatarImage src={profileUrl} alt='프로필' />
              ) : (
                <AvatarPlaceholder>+</AvatarPlaceholder>
              )}
              <CameraOverlay>
                <FaCamera />
              </CameraOverlay>
            </AvatarWrapper>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              hidden
              onChange={handleFileChange}
            />
          </ProfileSection>

          <Footer>
            <BottomBar
              imageSrc={ResetButtonIcon}
              buttonText={isSubmitting ? '수정 중...' : '수정하기'}
              type='submit'
              disabled={isSubmitting}
            />
          </Footer>
        </Form>
      </FormProvider>
    </ThemeProvider>
  );
}

// Styled components
const Form = styled.form`
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Row = styled.div`
  display: flex;
  gap: 1rem;
`;
const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const SectionLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 1rem;
`;
const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
`;
const ProfileSection = styled.div`
  margin-top: 1rem;
  text-align: center;
`;
const AvatarWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  cursor: pointer;
`;
const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
`;
const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #999;
  border: 2px dashed #ccc;
`;
const CameraOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;
