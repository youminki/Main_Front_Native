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
  getUserByEmail,
  verifyPhone,
  verifyCode,
  checkWebpage,
  checkNickname,
} from '../api/user/userApi';

const regionDistrictData: { [key: string]: string[] } = {
  서울특별시: [
    '종로구',
    '중구',
    '용산구',
    '성동구',
    '광진구',
    '동대문구',
    '중랑구',
    '성북구',
    '강북구',
    '도봉구',
    '노원구',
    '은평구',
    '서대문구',
    '마포구',
    '양천구',
    '강서구',
    '구로구',
    '금천구',
    '영등포구',
    '동작구',
    '관악구',
    '서초구',
    '강남구',
    '송파구',
    '강동구',
  ],
  부산광역시: [
    '중구',
    '서구',
    '동구',
    '영도구',
    '부산진구',
    '동래구',
    '남구',
    '북구',
    '해운대구',
    '사하구',
    '금정구',
    '강서구',
    '연제구',
    '수영구',
    '사상구',
    '기장군',
  ],
  대구광역시: [
    '중구',
    '동구',
    '서구',
    '남구',
    '북구',
    '수성구',
    '달서구',
    '달성군',
  ],
  인천광역시: [
    '중구',
    '동구',
    '남구',
    '연수구',
    '부평구',
    '계양구',
    '서구',
    '강화군',
    '옹진군',
  ],
  광주광역시: ['동구', '서구', '남구', '북구', '광산구'],
  대전광역시: ['동구', '중구', '서구', '유성구', '대덕구'],
  울산광역시: ['중구', '남구', '동구', '북구', '울주군'],
  세종특별자치시: ['세종특별자치시'],
  경기도: [
    '수원시 장안구',
    '수원시 권선구',
    '수원시 팔달구',
    '수원시 영통구',
    '성남시 수정구',
    '성남시 중원구',
    '성남시 분당구',
    '안양시 만안구',
    '안양시 동안구',
    '부천시',
    '광명시',
    '평택시',
    '동두천시',
    '안산시 단원구',
    '안산시 상록구',
    '고양시 덕양구',
    '고양시 일산동구',
    '고양시 일산서구',
    '과천시',
    '구리시',
    '용인시 처인구',
    '용인시 기흥구',
    '용인시 수지구',
    '시흥시',
    '파주시',
    '이천시',
    '안성시',
    '김포시',
    '화성시',
    '광주시',
    '양주시',
    '포천시',
    '여주시',
  ],
  강원도: [
    '춘천시',
    '원주시',
    '강릉시',
    '동해시',
    '태백시',
    '속초시',
    '삼척시',
    '홍천군',
    '횡성군',
    '영월군',
    '평창군',
    '정선군',
    '철원군',
    '화천군',
    '양구군',
    '인제군',
    '고성군',
    '양양군',
  ],
  충청북도: [
    '청주시 상당구',
    '청주시 서원구',
    '청주시 흥덕구',
    '충주시',
    '제천시',
    '보은군',
    '옥천군',
    '영동군',
    '진천군',
    '괴산군',
    '음성군',
    '단양군',
    '증평군',
  ],
  충청남도: [
    '천안시 동남구',
    '천안시 서북구',
    '공주시',
    '보령시',
    '아산시',
    '서산시',
    '논산시',
    '계룡시',
    '당진시',
    '금산군',
    '부여군',
    '서천군',
    '청양군',
    '홍성군',
    '예산군',
    '태안군',
  ],
  전라북도: [
    '전주시 완산구',
    '전주시 덕진구',
    '군산시',
    '익산시',
    '정읍시',
    '남원시',
    '김제시',
    '완주군',
    '진안군',
    '무주군',
    '장수군',
    '임실군',
    '순창군',
    '고창군',
    '부안군',
  ],
  전라남도: [
    '목포시',
    '여수시',
    '순천시',
    '나주시',
    '광양시',
    '담양군',
    '곡성군',
    '구례군',
    '고흥군',
    '보성군',
    '화순군',
    '장흥군',
    '강진군',
    '해남군',
    '영암군',
    '무안군',
    '함평군',
    '영광군',
    '장성군',
    '완도군',
    '진도군',
    '신안군',
  ],
  경상북도: [
    '포항시 남구',
    '포항시 북구',
    '경주시',
    '김천시',
    '안동시',
    '구미시',
    '영주시',
    '영천시',
    '상주시',
    '문경시',
    '경산시',
    '군위군',
    '의성군',
    '청송군',
    '영양군',
    '영덕군',
    '청도군',
    '고령군',
    '성주군',
    '칠곡군',
    '예천군',
    '봉화군',
    '울진군',
  ],
  경상남도: [
    '창원시 마산합포구',
    '창원시 마산회원구',
    '창원시 성산구',
    '창원시 의창구',
    '창원시 진해구',
    '김해시',
    '거제시',
    '양산시',
    '마산시',
    '통영시',
    '사천시',
    '진주시',
    '창녕군',
    '고성군',
    '남해군',
    '함안군',
    '의령군',
    '산청군',
    '함양군',
    '거창군',
    '합천군',
  ],
  제주특별자치도: ['제주시', '서귀포시'],
};

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
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = methods;

  const [gender, setGender] = useState<string>('여성');
  const [selectedGenderButton, setSelectedGenderButton] =
    useState<string>('여성');
  const [melpickAddress, setMelpickAddress] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const [showDuplicateModal, setShowDuplicateModal] = useState<boolean>(false);
  const [duplicateResult, setDuplicateResult] = useState<string>('');
  const [showVerificationInput, setShowVerificationInput] =
    useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [showVerificationResultModal, setShowVerificationResultModal] =
    useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<string>('');

  // 회원가입 결과 모달 상태
  const [showSignupResultModal, setShowSignupResultModal] =
    useState<boolean>(false);
  const [signupResult, setSignupResult] = useState<string>('');

  // 타이머 상태 (3분 = 180초)
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

  // 컴포넌트 언마운트 시 타이머 클린업
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, []);

  const handleVerification = async (): Promise<void> => {
    const phoneNumber = getValues('phoneNumber');
    try {
      const result = await verifyPhone({ phoneNumber });
      alert(result.message || '인증 코드 전송 성공');
      startTimer();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('본인 인증 요청 실패: ' + err.message);
      } else {
        alert('본인 인증 요청 실패');
      }
    }
    setShowVerificationInput(true);
  };

  const handleGenderChange = (selected: string): void => {
    setGender(selected);
    setSelectedGenderButton(selected);
  };

  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    e.target.value = value;
  };

  const handleMelpickAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMelpickAddress(e.target.value);
  };

  const handleEmailCheck = async (): Promise<void> => {
    const email = getValues('email');
    try {
      await getUserByEmail(email);
      setDuplicateResult('이미 존재합니다.');
    } catch (err: unknown) {
      if (err && (err as any).response?.status === 404) {
        setDuplicateResult('사용 가능합니다.');
      } else if (err instanceof Error) {
        setDuplicateResult('에러 발생: ' + err.message);
      } else {
        setDuplicateResult('알 수 없는 에러 발생');
      }
    }
    setShowDuplicateModal(true);
  };

  const handleNicknameCheck = async (): Promise<void> => {
    const nickname = getValues('nickname');
    try {
      const result = await checkNickname(nickname);
      setDuplicateResult(
        result.isAvailable ? '사용 가능합니다.' : '이미 존재합니다.'
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setDuplicateResult('에러 발생: ' + err.message);
      } else {
        setDuplicateResult('알 수 없는 에러 발생');
      }
    }
    setShowDuplicateModal(true);
  };

  const handleVerifyCode = async (): Promise<void> => {
    const phoneNumber = getValues('phoneNumber');
    try {
      const result = await verifyCode({ phoneNumber, code: verificationCode });
      setVerificationResult(result.message || '인증에 성공했습니다.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setVerificationResult('인증에 실패했습니다: ' + err.message);
      } else {
        setVerificationResult('인증에 실패했습니다.');
      }
    }
    setShowVerificationResultModal(true);
  };

  const handleCheckClick = async (): Promise<void> => {
    try {
      const result = await checkWebpage(melpickAddress);
      setDuplicateResult(
        result.isAvailable ? '사용 가능합니다.' : '이미 존재합니다.'
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setDuplicateResult('에러 발생: ' + err.message);
      } else {
        setDuplicateResult('알 수 없는 에러 발생');
      }
    }
    setShowDuplicateModal(true);
  };

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    if (data.password !== data.passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    setErrorMessage(null);
    const formattedData = {
      email: data.email,
      password: data.password,
      name: data.name,
      nickname: data.nickname,
      birthdate: `${data.birthYear}-01-01`,
      address: `${data.region} ${data.district}`,
      phoneNumber: data.phoneNumber,
      gender: gender === '여성' ? 'female' : 'male',
      instagramId: '',
      agreeToTerms: true,
      agreeToPrivacyPolicy: true,
    };
    try {
      const response = await signUpUser(formattedData);
      console.log('회원가입 성공:', response);
      setSignupResult(
        '🎉 회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.'
      );
      setShowSignupResultModal(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('회원가입 실패:', err);
        setSignupResult('회원가입 중 오류가 발생했습니다: ' + err.message);
      } else {
        setSignupResult('회원가입 중 오류가 발생했습니다.');
      }
      setShowSignupResultModal(true);
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <FormProvider {...methods}>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <AgreementSection />
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <InputField
              label='계정(이메일)'
              id='email'
              type='text'
              error={errors.email}
              placeholder='계정을 입력하세요'
              buttonLabel='중복확인'
              {...register('email')}
              required
              maxLength={20}
              onButtonClick={handleEmailCheck}
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
                as={CustomSelect}
                error={errors.birthYear}
                required
                {...register('birthYear')}
              >
                <option value='' disabled selected>
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
                error={errors.phoneNumber}
                {...register('phoneNumber')}
                required
                maxLength={11}
                onInput={handlePhoneNumberChange}
                buttonLabel='본인인증'
                onButtonClick={handleVerification}
              />
            </PhoneField>
            {showVerificationInput && (
              <VerificationWrapper>
                <VerificationLabel>인증번호 입력</VerificationLabel>
                <VerificationRow>
                  <VerificationContainer>
                    <VerificationInput
                      type='text'
                      placeholder='인증번호를 입력하세요'
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <VerificationBtn onClick={handleVerifyCode}>
                      인증
                    </VerificationBtn>
                  </VerificationContainer>
                  <TimerDisplay>{formatTime(timer)}</TimerDisplay>
                </VerificationRow>
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
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSelectedRegion(e.target.value);
                }}
              >
                <option value='' disabled selected>
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
                <option value='' disabled selected>
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

      <ReusableModal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        title='중복확인'
      >
        {duplicateResult}
      </ReusableModal>

      <ReusableModal
        isOpen={showVerificationResultModal}
        onClose={() => setShowVerificationResultModal(false)}
        title='인증 결과'
      >
        {verificationResult}
      </ReusableModal>

      <ReusableModal
        isOpen={showSignupResultModal}
        onClose={() => {
          setShowSignupResultModal(false);
          navigate('/login');
        }}
        title='회원가입 결과'
      >
        {signupResult}
      </ReusableModal>
    </ThemeProvider>
  );
};

export default Signup;

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

const ErrorText = styled.div`
  color: red;
  text-align: center;
`;

const VerificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const VerificationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const VerificationLabel = styled.label`
  font-size: 13px;
  font-weight: bold;
`;

const VerificationContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 40px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  overflow: hidden;
`;

const VerificationInput = styled.input`
  flex: 1;
  height: 100%;
  padding: 0 10px;
  font-size: 14px;
  border: none;
  outline: none;
`;

const VerificationBtn = styled.button`
  height: 100%;
  width: 80px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

const TimerDisplay = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
