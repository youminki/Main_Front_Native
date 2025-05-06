// src/pages/MyInfo.tsx
import React, { useState, useRef, useEffect } from 'react';
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
import { regionDistrictData } from '../components/Signup/regionDistrictData';

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

const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => 2023 - i);
const REGIONS = Object.keys(regionDistrictData);

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
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const selectedRegion = watch('region');
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (selectedRegion && regionDistrictData[selectedRegion]) {
      setDistricts(regionDistrictData[selectedRegion]);
      // region 변경 시 district 초기화
      setValue('district', '');
    } else {
      setDistricts([]);
    }
  }, [selectedRegion, setValue]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [prefixAddress, setPrefixAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const onSubmit: SubmitHandler<MyInfoFormData> = (data) => {
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

          {/* Nickname */}
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

          {/* 비밀번호 변경 */}
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

          {/* 이름 & 출생 연도 */}
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

          {/* 전화번호 */}
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

          {/* 지역 & 구 */}
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
                disabled={!selectedRegion}
              >
                <option value='' disabled>
                  {selectedRegion ? '선택' : '지역 먼저 선택'}
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </InputField>
            </Field>
          </Row>

          {/* 멜픽 주소 */}
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e);
                    setPrefixAddress(e.target.value);
                  }}
                  error={errors.melpickAddress}
                />
              )}
            />
          </Field>

          {/* 프로필 이미지 */}
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
