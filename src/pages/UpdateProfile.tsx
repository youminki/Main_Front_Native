// src/pages/Profile/UpdateProfile.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import InputField from '../components/InputField';
import { CustomSelect } from '../components/CustomSelect';
import Theme from '../styles/Theme';
import FixedBottomBar from '../components/FixedBottomBar';
import ReusableModal from '../components/ReusableModal';
import { regionDistrictData } from '../components/Signup/regionDistrictData';

// userApi에서 가져올 함수들
import { getMyInfo, updateMyInfo } from '../api/user/userApi';

export type UpdateProfileFormData = {
  emailId: string;
  emailDomain: string;
  nickname: string;
  name: string;
  birthYear: string;
  phoneNumber: string;
  region: string;
  district: string;
  gender: '여성' | '남성';
};

const UpdateProfile: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<UpdateProfileFormData>({
    mode: 'all',
    defaultValues: {
      emailId: '',
      emailDomain: '',
      nickname: '',
      name: '',
      birthYear: '',
      phoneNumber: '',
      region: '',
      district: '',
      gender: '여성',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    reset,
    setValue,
  } = methods;

  // 모바일 키보드 열림 감지 (원래 로직 그대로 유지)
  const initialHeight = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      const vh = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      setIsKeyboardOpen(vh < initialHeight - 50);
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [initialHeight]);

  // 백엔드에서 /user/my-info 가져와서 폼 초기화
  useEffect(() => {
    (async () => {
      try {
        const info = await getMyInfo();
        // 이메일을 아이디/도메인으로 분리
        const [idPart, domainPart] = info.email.split('@');

        // 주소(info.address)가 "시/도 구/군"뿐 아니라 "경기도 안양시 만안구"처럼
        // 공백이 여러 개일 수 있으므로 첫 요소만 region으로, 나머지를 모두 district로 조합
        const parts = info.address.split(' ');
        const regionPart = parts[0];
        const districtPart = parts.slice(1).join(' '); // "안양시 만안구" 전체

        // 전화번호는 "010-1234-5678" 형태, 이 중 숫자만 추출
        const rawPhone = info.phoneNumber.replace(/-/g, '');

        // 생년(birthYear)은 숫자 => 문자열로 변환
        const birthYearStr = String(info.birthYear);

        // 성별 변환: 'male' => '남성', 'female' => '여성'
        const genderKor = info.gender === 'female' ? '여성' : '남성';

        reset({
          emailId: idPart,
          emailDomain: domainPart,
          nickname: info.nickname,
          name: info.name,
          birthYear: birthYearStr,
          phoneNumber: rawPhone,
          region: regionPart || '',
          district: districtPart || '',
          gender: genderKor,
        });
      } catch (err) {
        console.error('내 정보 조회 오류:', err);
      }
    })();
  }, [reset]);

  // region이 바뀌면 district를 초기화
  useEffect(() => {
    const subscription = watch(({ name }) => {
      if (name === 'region') {
        setValue('district', '');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  // 제출 핸들러: 닉네임과 주소만 PATCH 요청
  const [signupResult, setSignupResult] = useState<React.ReactNode>('');
  const [isSignupSuccess, setIsSignupSuccess] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    try {
      // PATCH /user/my-info 에 요청: nickname, address(시/도 + " " + 구/군)
      const payload = {
        nickname: data.nickname,
        address: `${data.region} ${data.district}`,
      };
      await updateMyInfo(payload);
      setSignupResult('✅ 회원정보가 성공적으로 업데이트되었습니다.');
      setIsSignupSuccess(true);
      setShowResultModal(true);
    } catch (err: any) {
      console.error('회원정보 수정 오류:', err);
      const msg =
        err?.response?.data?.message ||
        (err instanceof Error ? err.message : '알 수 없는 오류');
      setSignupResult(`❌ 업데이트 중 오류가 발생했습니다: ${msg}`);
      setIsSignupSuccess(false);
      setShowResultModal(true);
    }
  };

  const onSaveClick = () => {
    handleSubmit(onSubmit)();
  };

  const handleResultModalClose = () => {
    setShowResultModal(false);
    if (isSignupSuccess) {
      navigate('/MyInfoList');
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <FormProvider {...methods}>
        <Container>
          <Form onSubmit={(e) => e.preventDefault()}>
            {/* 이메일 아이디 (읽기 전용) */}
            <RowLabel>
              <InputField
                label='이메일 아이디'
                id='emailId'
                type='text'
                readOnly
                {...register('emailId')}
              />
              <span>@</span>
              <InputField
                label='이메일 도메인'
                id='emailDomain'
                type='text'
                readOnly
                {...register('emailDomain')}
              />
            </RowLabel>

            {/* 닉네임 (편집 가능) */}
            <InputField
              label='닉네임'
              id='nickname'
              type='text'
              placeholder='닉네임을 입력하세요'
              {...register('nickname')}
              maxLength={8}
            />

            {/* 이름 & 태어난 해 (읽기 전용) */}
            <RowLabel>
              <InputField
                label='이름'
                id='name'
                type='text'
                readOnly
                {...register('name')}
              />
              <InputField
                label='태어난 해'
                id='birthYear'
                as={CustomSelect}
                disabled
                {...register('birthYear')}
              >
                <option value='' disabled>
                  연도 선택
                </option>
                {Array.from(
                  { length: 100 },
                  (_, i) => new Date().getFullYear() - i
                ).map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}년
                  </option>
                ))}
              </InputField>
            </RowLabel>

            {/* 성별 (읽기 전용) */}
            <GenderField>
              <InputFieldLabel>성별</InputFieldLabel>
              <GenderRow>
                <GenderButton
                  type='button'
                  selected={watch('gender') === '여성'}
                  disabled
                  $isSelected={watch('gender') === '여성'}
                >
                  여성
                </GenderButton>
                <GenderButton
                  type='button'
                  selected={watch('gender') === '남성'}
                  disabled
                  $isSelected={watch('gender') === '남성'}
                >
                  남성
                </GenderButton>
              </GenderRow>
            </GenderField>

            {/* 휴대폰 번호 (읽기 전용) */}
            <PhoneField>
              <InputField
                label='전화번호'
                id='phoneNumber'
                type='text'
                readOnly
                {...register('phoneNumber')}
                maxLength={11}
              />
            </PhoneField>

            {/* 서비스 지역 (시/도, 구/군) — 수정 가능 */}
            <RowLabel>
              <InputField
                label='서비스 지역 (시/도)'
                id='region'
                as={CustomSelect}
                {...register('region')}
              >
                <option value='' disabled>
                  시/도 선택
                </option>
                {Object.keys(regionDistrictData).map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </InputField>
              <InputField
                label=''
                id='district'
                as={CustomSelect}
                {...register('district')}
              >
                <option value='' disabled>
                  구/군 선택
                </option>
                {watch('region') && regionDistrictData[watch('region')] ? (
                  regionDistrictData[watch('region')].map((dist: string) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))
                ) : (
                  <option value=''>지역 먼저 선택</option>
                )}
              </InputField>
            </RowLabel>
          </Form>

          {/* BottomBar: 키보드 열렸을 때 숨김 */}
          {!isKeyboardOpen && (
            <FixedBottomBar
              type='button'
              text={isSubmitting ? '저장 중...' : '정보변경'}
              color='black'
              onClick={onSaveClick}
              disabled={isSubmitting}
            />
          )}
        </Container>
      </FormProvider>

      {/* 결과 모달 */}
      {showResultModal && (
        <ReusableModal
          isOpen={showResultModal}
          onClose={handleResultModalClose}
          title='회원정보 수정 결과'
        >
          {signupResult}
        </ReusableModal>
      )}
    </ThemeProvider>
  );
};

export default UpdateProfile;

/* ========== Styled Components ========== */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;
  max-width: 600px;
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
  gap: 10px;
  width: 100%;
`;

const GenderField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const InputFieldLabel = styled.label`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
  font-size: 11px;
  line-height: 11px;
`;

const GenderRow = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
`;

const GenderButton = styled.button<{ selected: boolean; $isSelected: boolean }>`
  flex: 1;
  font-size: 12px;
  font-weight: 700;
  line-height: 11.05px;
  border: ${({ $isSelected }) => ($isSelected ? '2px solid #f6ae24' : 'none')};
  border-radius: 10px;
  background-color: ${({ selected }) => (selected ? '#FFFFFF' : '#EEEEEE')};
  color: ${({ selected }) => (selected ? '#000000' : '#999999')};
  cursor: not-allowed;
  transition:
    background-color 0.3s ease,
    border 0.3s ease,
    color 0.3s ease;
`;

const PhoneField = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input {
    flex: 1;
    padding-right: 0;
  }
`;
