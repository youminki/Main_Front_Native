import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaSignup } from '../hooks/ValidationYup';
import InputField from '../components/InputField';
import AgreementSection from '../components/Signup/AgreementSection';
import Theme from '../styles/Theme';
import BottomBar from '../components/BottomNav2';
import ResetButtonIcon from '../assets/ResetButton.png';
import { useNavigate } from 'react-router-dom';
import { CustomSelect } from '../components/CustomSelect';
import ReusableModal from '../components/ReusableModal';
import {
  signUpUser,
  checkEmail,
  verifyPhone,
  verifyCode,
  checkWebpage,
  checkNickname,
} from '../api/user/userApi';
import { regionDistrictData } from '../components/Signup/regionDistrictData';
import Modal from '../components/Melpik/CreateMelpik/Settings/Modal';

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

  height: string;
  size: string;
  dress: string;
  top: string;
  bottom: string;
  brand: string;
  shoulder?: string;
  chest?: string;
  waist?: string;
  sleeve?: string;
  productCount: string;
  exposureFrequency: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<SignupFormData>({
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
      height: '',
      size: '',
      dress: '',
      top: '',
      bottom: '',
      brand: '',
      shoulder: '',
      chest: '',
      waist: '',
      sleeve: '',
      productCount: '',
      exposureFrequency: '',
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    getValues,
    watch,
  } = methods;

  const selectedRegion = watch('region');

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const handleBrandSelect = (brands: string[]) => {
    setSelectedBrands(brands);
    setValue('brand', brands.join(', '));
  };
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // 각 검증 성공 여부 상태
  const [isEmailChecked, setIsEmailChecked] = useState<boolean>(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);
  const [isPhoneVerificationSent, setIsPhoneVerificationSent] =
    useState<boolean>(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const [isMelpickAddressChecked, setIsMelpickAddressChecked] =
    useState<boolean>(false);

  // 버튼 텍스트 상태
  const [emailButtonText, setEmailButtonText] = useState<string>('중복확인');
  const [nicknameButtonText, setNicknameButtonText] =
    useState<string>('중복확인');
  const [melpickAddressButtonText, setMelpickAddressButtonText] =
    useState<string>('체크');
  const [phoneVerificationButtonText, setPhoneVerificationButtonText] =
    useState<string>('인증');

  // 버튼 색상 상태 (기본: 노란색, 성공: 파란색, 실패: 빨간색)
  const [emailButtonColor, setEmailButtonColor] = useState<
    'yellow' | 'blue' | 'red'
  >('yellow');
  const [nicknameButtonColor, setNicknameButtonColor] = useState<
    'yellow' | 'blue' | 'red'
  >('yellow');
  const [phoneVerificationButtonColor, setPhoneVerificationButtonColor] =
    useState<'yellow' | 'blue' | 'red'>('yellow');
  const [melpickAddressButtonColor, setMelpickAddressButtonColor] = useState<
    'yellow' | 'blue' | 'red'
  >('yellow');

  // API 에러 메시지 상태 (실패 사유를 인풋 아래에 표시)
  const [emailApiError, setEmailApiError] = useState<string>('');
  const [nicknameApiError, setNicknameApiError] = useState<string>('');
  const [phoneApiError, setPhoneApiError] = useState<string>('');
  const [melpickApiError, setMelpickApiError] = useState<string>('');

  // 성별 및 멜픽 주소 관련 상태
  const [gender, setGender] = useState<string>('여성');
  const [selectedGenderButton, setSelectedGenderButton] =
    useState<string>('여성');
  const [melpickAddress, setMelpickAddress] = useState<string>('');

  // 회원가입 결과 메시지 및 모달 상태
  const [signupResult, setSignupResult] = useState<string>('');
  const [isSignupSuccess, setIsSignupSuccess] = useState<boolean>(false);
  const [showSignupResultModal, setShowSignupResultModal] =
    useState<boolean>(false);

  // 본인 인증 관련 (인증번호 입력)
  const [verificationCode, setVerificationCode] = useState<string>('');

  // 타이머 (3분 = 180초)
  const [timer, setTimer] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startTimer = () => {
    setTimer(180);
    if (timerRef.current !== null) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current !== null) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, []);

  // 필드별 인증 상태 초기화 함수 (입력값 변경 시 다시 검증하도록)
  const resetVerificationState = (
    field: 'email' | 'nickname' | 'phoneNumber' | 'melpickAddress'
  ) => {
    if (field === 'email') {
      setIsEmailChecked(false);
      setEmailButtonText('중복확인');
      setEmailApiError('');
      setEmailButtonColor('yellow');
    }
    if (field === 'nickname') {
      setIsNicknameChecked(false);
      setNicknameButtonText('중복확인');
      setNicknameApiError('');
      setNicknameButtonColor('yellow');
    }
    if (field === 'phoneNumber') {
      setIsPhoneVerified(false);
      setPhoneVerificationButtonText('인증');
      setPhoneApiError('');
      setPhoneVerificationButtonColor('yellow');
    }
    if (field === 'melpickAddress') {
      setIsMelpickAddressChecked(false);
      setMelpickAddressButtonText('체크');
      setMelpickApiError('');
      setMelpickAddressButtonColor('yellow');
    }
  };

  // 검증 함수 예시 - 이메일 인증
  const handleEmailCheck = async (): Promise<void> => {
    const valid = await trigger('email');
    if (!valid) return;
    const email = getValues('email');
    try {
      const result = await checkEmail(email);
      if (result.isAvailable) {
        setEmailButtonText('인증 완료');
        setIsEmailChecked(true);
        setEmailApiError('');
        setEmailButtonColor('blue');
      } else {
        setEmailButtonText('인증 실패');
        setIsEmailChecked(false);
        setEmailApiError('이메일 인증 실패');
        setEmailButtonColor('red');
      }
    } catch (err: unknown) {
      setEmailButtonText('인증 실패');
      setIsEmailChecked(false);
      setEmailApiError(err instanceof Error ? err.message : '이메일 인증 실패');
      setEmailButtonColor('red');
    }
  };

  const handleNicknameCheck = async (): Promise<void> => {
    const valid = await trigger('nickname');
    if (!valid) return;
    const nickname = getValues('nickname');
    try {
      const result = await checkNickname(nickname);
      if (result.isAvailable) {
        setNicknameButtonText('인증 완료');
        setIsNicknameChecked(true);
        setNicknameApiError('');
        setNicknameButtonColor('blue');
      } else {
        setNicknameButtonText('인증 실패');
        setIsNicknameChecked(false);
        setNicknameApiError('닉네임 인증 실패');
        setNicknameButtonColor('red');
      }
    } catch (err: unknown) {
      setNicknameButtonText('인증 실패');
      setIsNicknameChecked(false);
      setNicknameApiError(
        err instanceof Error ? err.message : '닉네임 인증 실패'
      );
      setNicknameButtonColor('red');
    }
  };

  const handleSendVerification = async (): Promise<void> => {
    const valid = await trigger('phoneNumber');
    if (!valid) return;
    setIsPhoneVerificationSent(true);
    const phoneNumber = getValues('phoneNumber');
    try {
      const result = await verifyPhone({ phoneNumber });
      if (result.message && result.message.includes('성공')) {
        startTimer();
        setPhoneApiError('');
      } else {
        setPhoneVerificationButtonText('인증 실패');
        setPhoneApiError(result.message || '전화번호 인증 실패');
        setPhoneVerificationButtonColor('red');
      }
    } catch (err: unknown) {
      setPhoneVerificationButtonText('인증 실패');
      setPhoneApiError(
        err instanceof Error ? err.message : '전화번호 인증 실패'
      );
      setPhoneVerificationButtonColor('red');
    }
  };

  const handleVerifyCode = async (): Promise<void> => {
    if (!verificationCode) return;
    const phoneNumber = getValues('phoneNumber');
    try {
      const result = await verifyCode({ phoneNumber, code: verificationCode });
      if (result.message && result.message.includes('성공')) {
        setIsPhoneVerified(true);
        setPhoneVerificationButtonText('인증 완료');
        setPhoneApiError('');
        setPhoneVerificationButtonColor('blue');
        if (timerRef.current !== null) clearInterval(timerRef.current);
      } else {
        setPhoneVerificationButtonText('인증 실패');
        setIsPhoneVerified(false);
        setPhoneApiError(result.message || '전화번호 인증 실패');
        setPhoneVerificationButtonColor('red');
      }
    } catch (err: unknown) {
      setPhoneVerificationButtonText('인증 실패');
      setIsPhoneVerified(false);
      setPhoneApiError(
        err instanceof Error ? err.message : '전화번호 인증 실패'
      );
      setPhoneVerificationButtonColor('red');
    }
  };

  const handleMelpickAddressCheck = async (): Promise<void> => {
    const valid = await trigger('melpickAddress');
    if (!valid) return;
    try {
      const result = await checkWebpage(melpickAddress);
      if (result.isAvailable) {
        setMelpickAddressButtonText('인증 완료');
        setIsMelpickAddressChecked(true);
        setMelpickApiError('');
        setMelpickAddressButtonColor('blue');
      } else {
        setMelpickAddressButtonText('인증 실패');
        setIsMelpickAddressChecked(false);
        setMelpickApiError('멜픽 주소 인증 실패');
        setMelpickAddressButtonColor('red');
      }
    } catch (err: unknown) {
      setMelpickAddressButtonText('인증 실패');
      setIsMelpickAddressChecked(false);
      setMelpickApiError(
        err instanceof Error ? err.message : '멜픽 주소 인증 실패'
      );
      setMelpickAddressButtonColor('red');
    }
  };

  // --- 최종 전체 검증 및 회원가입 제출 ---
  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    // 비밀번호 확인
    if (data.password !== data.passwordConfirm) {
      setSignupResult('비밀번호가 일치하지 않습니다.');
      setIsSignupSuccess(false);
      setShowSignupResultModal(true);
      return;
    }

    // 필수 검증 체크
    if (!isEmailChecked) {
      setSignupResult('이메일 중복확인을 완료해주세요.');
      setIsSignupSuccess(false);
      setShowSignupResultModal(true);
      return;
    }
    if (!isNicknameChecked) {
      setSignupResult('닉네임 중복확인을 완료해주세요.');
      setIsSignupSuccess(false);
      setShowSignupResultModal(true);
      return;
    }
    if (!isPhoneVerified) {
      setSignupResult('본인 인증을 완료해주세요.');
      setIsSignupSuccess(false);
      setShowSignupResultModal(true);
      return;
    }
    if (!isMelpickAddressChecked) {
      setSignupResult('멜픽 주소 검증을 완료해주세요.');
      setIsSignupSuccess(false);
      setShowSignupResultModal(true);
      return;
    }

    // phoneNumber가 undefined/null 방지 (sessionStorage 활용)
    let verifiedPhoneNumber =
      sessionStorage.getItem('verifiedPhoneNumber') || data.phoneNumber;

    // phoneNumber 형식 검사 및 변환 (010-xxxx-xxxx 형태 유지)
    const formatPhoneNumber = (phone: string) => {
      const cleaned = phone.replace(/[^0-9]/g, ''); // 숫자만 남기기
      if (cleaned.length === 11) {
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
      return phone;
    };

    verifiedPhoneNumber = formatPhoneNumber(verifiedPhoneNumber);

    // 회원가입 데이터 변환 (백엔드 DTO와 일치하도록)
    const formattedData = {
      email: data.email,
      password: data.password,
      name: data.name,
      nickname: data.nickname,
      birthdate: `${data.birthYear}-01-01`, // "YYYY-MM-DD" 형식 유지
      address: `${data.region} ${data.district}`,
      phoneNumber: verifiedPhoneNumber, // 인증된 휴대폰 번호 사용
      gender: gender === '여성' ? 'female' : 'male', // "female" 또는 "male" 변환
      instagramId: '',
      agreeToTerms: true,
      agreeToPrivacyPolicy: true,
    };

    try {
      const response = await signUpUser(formattedData);

      setSignupResult(
        `🎉 ${response.nickname}님, 회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.`
      );
      setIsSignupSuccess(true);
      setShowSignupResultModal(true);
    } catch (err: any) {
      if (err.response) {
        console.error('❌ 서버 응답 상태 코드:', err.response.status);
        console.error('❌ 서버 응답 데이터:', err.response.data);
      }

      setSignupResult(
        err instanceof Error
          ? '회원가입 중 오류가 발생했습니다: ' + err.message
          : '회원가입 중 오류가 발생했습니다.'
      );
      setIsSignupSuccess(false);
      setShowSignupResultModal(true);
    }
  };

  const handleSignupResultModalClose = () => {
    setShowSignupResultModal(false);
    if (isSignupSuccess) {
      navigate('/login');
    }
  };

  const handleGenderChange = (selected: string): void => {
    setGender(selected);
    setSelectedGenderButton(selected);
  };

  // 전화번호 인풋 필드 수정 시 인증 상태 초기화 처리
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    e.target.value = value;
    resetVerificationState('phoneNumber');
  };

  // 이메일, 닉네임, 멜픽주소 필드 변경 시 인증 상태 초기화 처리
  const handleInputChange =
    (field: 'email' | 'nickname' | 'melpickAddress') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      resetVerificationState(field);
      if (field === 'melpickAddress') {
        setMelpickAddress(e.target.value);
      }
    };

  return (
    <ThemeProvider theme={Theme}>
      <FormProvider {...methods}>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <AgreementSection />
            <InputField
              label='계정(이메일)'
              id='email'
              type='text'
              error={emailApiError ? { message: emailApiError } : errors.email}
              placeholder='계정을 입력하세요'
              buttonLabel={emailButtonText}
              buttonColor={emailButtonColor}
              {...register('email')}
              onChange={handleInputChange('email')}
              required
              maxLength={50}
              onButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handleEmailCheck();
              }}
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
              error={
                nicknameApiError
                  ? { message: nicknameApiError }
                  : errors.nickname
              }
              {...register('nickname')}
              onChange={handleInputChange('nickname')}
              required
              maxLength={8}
              buttonLabel={nicknameButtonText}
              buttonColor={nicknameButtonColor}
              onButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handleNicknameCheck();
              }}
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
                as={CustomSelect}
                error={errors.birthYear}
                required
                {...register('birthYear')}
              >
                <option value='' disabled>
                  태어난 해를 선택하세요
                </option>
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
                error={
                  phoneApiError
                    ? { message: phoneApiError }
                    : errors.phoneNumber
                }
                {...register('phoneNumber')}
                required
                maxLength={11}
                onInput={handlePhoneNumberChange}
                buttonLabel='본인인증'
                buttonColor={phoneVerificationButtonColor}
                onButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleSendVerification();
                }}
              />
            </PhoneField>

            {isPhoneVerificationSent && !isPhoneVerified && (
              <VerificationWrapper>
                <InputField
                  label='인증번호 입력'
                  id='verificationCode'
                  type='text'
                  placeholder='인증번호를 입력하세요'
                  value={verificationCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setVerificationCode(e.target.value)
                  }
                  buttonLabel={phoneVerificationButtonText}
                  buttonColor={phoneVerificationButtonColor}
                  onButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    handleVerifyCode();
                  }}
                />
                <TimerDisplay>{formatTime(timer)}</TimerDisplay>
              </VerificationWrapper>
            )}
            <RowLabel>
              <InputField
                label='지역'
                id='region'
                as={CustomSelect}
                error={errors.region}
                required
                {...register('region')}
              >
                <option value='' disabled>
                  지역을 선택하세요
                </option>
                {Object.keys(regionDistrictData).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </InputField>
              <InputField
                label='구'
                id='district'
                as={CustomSelect}
                error={errors.district}
                required
                {...register('district')}
              >
                <option value='' disabled>
                  구를 선택하세요
                </option>
                {selectedRegion && regionDistrictData[selectedRegion] ? (
                  regionDistrictData[selectedRegion].map((district: string) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))
                ) : (
                  <option value=''>지역을 먼저 선택하세요</option>
                )}
              </InputField>
            </RowLabel>
            <Divider />
            <InputField
              label='멜픽 주소설정(영문, 숫자 12글자 이내)'
              id='melpickAddress'
              type='text'
              placeholder='멜픽 주소를 입력하세요'
              error={
                melpickApiError
                  ? { message: melpickApiError }
                  : errors.melpickAddress
              }
              {...register('melpickAddress')}
              onChange={handleInputChange('melpickAddress')}
              value={melpickAddress}
              buttonLabel={melpickAddressButtonText}
              buttonColor={melpickAddressButtonColor}
              required
              maxLength={12}
              onButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handleMelpickAddressCheck();
              }}
              prefix='https://www.melpick.com/'
            />
            <Divider />
            <InputField
              label='인스타 아이디'
              id='instar'
              type='text'
              placeholder='인스타 아이디를 입력하세요'
              required
              maxLength={50}
              onButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handleMelpickAddressCheck();
              }}
              prefix='https://www.instagram.com/'
            />
            <Divider />
            <RowLabel>
              <InputField
                label='기본정보'
                id='height'
                as={CustomSelect}
                error={errors.height}
                {...register('height', { required: true })}
              >
                <option value='' disabled selected hidden>
                  키 선택
                </option>
                <option value='160'>160 cm</option>
                <option value='165'>165 cm</option>
                <option value='170'>170 cm</option>
                <option value='175'>175 cm</option>
              </InputField>
              <InputField
                label=''
                id='size'
                as={CustomSelect}
                error={errors.size}
                {...register('size', { required: true })}
              >
                <option value='' disabled selected hidden>
                  몸무게 선택
                </option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}kg
                  </option>
                ))}
              </InputField>
            </RowLabel>

            <RowLabel>
              <InputField
                label='착용 제품사이즈'
                id='dress'
                as={CustomSelect}
                error={errors.dress}
                {...register('dress', { required: true })}
              >
                <option value='' disabled selected hidden>
                  상의
                </option>
                <option value='44'>44 (S)</option>
                <option value='55'>55 (M)</option>
                <option value='66'>66 (L)</option>
                <option value='77'>77 (XL)</option>
              </InputField>
              <InputField
                label=''
                id='top'
                as={CustomSelect}
                error={errors.top}
                {...register('top', { required: true })}
              >
                <option value='' disabled selected hidden>
                  원피스
                </option>
                <option value='44'>44 (S)</option>
                <option value='55'>55 (M)</option>
                <option value='66'>66 (L)</option>
                <option value='77'>77 (XL)</option>
              </InputField>
              <InputField
                label=''
                id='bottom'
                as={CustomSelect}
                error={errors.bottom}
                {...register('bottom', { required: true })}
              >
                <option value='' disabled selected hidden>
                  하의
                </option>
                <option value='44'>44 (S)</option>
                <option value='55'>55 (M)</option>
                <option value='66'>66 (L)</option>
                <option value='77'>77 (XL)</option>
              </InputField>
            </RowLabel>

            <RowLabel>
              <InputField
                label='선호 브랜드 선택(최대 3가지)'
                id='brand'
                type='text'
                placeholder='브랜드 3가지를 선택하세요'
                error={errors.brand}
                {...register('brand')}
                value={selectedBrands.join(', ') || '브랜드 3가지를 선택하세요'}
                buttonLabel='선택하기'
                onButtonClick={openModal}
              />
            </RowLabel>

            {/* 추가: 어깨너비, 가슴둘레 */}
            <RowLabel>
              <InputField
                label='어깨너비 cm (선택)'
                id='shoulder'
                type='text'
                placeholder='어깨너비를 입력하세요'
                error={errors.shoulder}
                {...register('shoulder')}
              />
              <InputField
                label='가슴둘레 cm (선택)'
                id='chest'
                type='text'
                placeholder='가슴둘레를 입력하세요'
                error={errors.chest}
                {...register('chest')}
              />
            </RowLabel>

            {/* 추가: 허리둘레, 소매길이 */}
            <RowLabel>
              <InputField
                label='허리둘레 cm (선택)'
                id='waist'
                type='text'
                placeholder='허리둘레를 입력하세요'
                error={errors.waist}
                {...register('waist')}
              />
              <InputField
                label='소매길이 cm (선택)'
                id='sleeve'
                type='text'
                placeholder='소매길이를 입력하세요'
                error={errors.sleeve}
                {...register('sleeve')}
              />
            </RowLabel>
          </Form>

          <BlackContainer />
          <BottomBar
            imageSrc={ResetButtonIcon}
            buttonText={isSubmitting ? '가입 중...' : '회원가입'}
            type='submit'
            disabled={isSubmitting}
          />
        </Container>
      </FormProvider>

      <ReusableModal
        isOpen={showSignupResultModal}
        onClose={handleSignupResultModalClose}
        title='회원가입 결과'
      >
        {signupResult}
      </ReusableModal>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleBrandSelect}
        selectedBrands={selectedBrands}
      />
    </ThemeProvider>
  );
};

export default Signup;

/* --- styled-components --- */
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
  height: 67px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const InputFieldLabel = styled.label`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.black};
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
    padding-right: 120px;
  }
`;

const BlackContainer = styled.div`
  margin-bottom: 100px;
`;

const VerificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const TimerDisplay = styled.div`
  margin-left: auto;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;

  margin-top: 20px;
`;

const Divider = styled.hr`
  border: none;
  width: 100%;
  border: 1px solid #eeeeee;
`;
