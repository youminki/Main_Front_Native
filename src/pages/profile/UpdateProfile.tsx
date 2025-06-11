// src/pages/Profile/UpdateProfile.tsx

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import InputField from '../../components/InputField';
import { CustomSelect } from '../../components/CustomSelect';
import Theme from '../../styles/Theme';
import FixedBottomBar from '../../components/FixedBottomBar';
import ReusableModal from '../../components/ReusableModal';
import { regionDistrictData } from '../../components/Signup/regionDistrictData';

// userApi에서 가져올 함수들
import { getMyInfo, updateMyInfo } from '../../api/user/userApi';

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

        // address 문자열에 여러 공백 종류나 특수 구분자 등이 있을 수 있으므로
        // 1) non-breaking space(\u00A0) 등을 일반 공백으로 교체
        // 2) 쉼표, 슬래시 등으로 구분되어 온다면 이들도 공백으로 대체
        // 3) 연속된 공백이나 탭 등을 하나의 공백으로 축소
        // 4) 양쪽 trim
        const rawAddress = info.address || '';
        const normalized = rawAddress
          .replace(/\u00A0/g, ' ') // non-breaking space -> 일반 공백
          .replace(/[\u2002-\u200B\uFEFF]/g, ' ') // 기타 공백 문자 범위도 대체
          .replace(/[,/]/g, ' ') // 쉼표, 슬래시 등을 공백으로
          .replace(/\s+/g, ' ') // 여러 공백/탭/줄바꿈 등을 하나로
          .trim();

        // split by 한 칸 공백
        const parts = normalized.split(' ');
        const regionPart = parts[0] || '';
        const districtPart = parts.slice(1).join(' ');

        // 이메일 처리
        const [idPart, domainPart] = info.email.split('@');
        // 전화번호 숫자만 추출
        const rawPhone = info.phoneNumber.replace(/-/g, '');
        const birthYearStr = String(info.birthYear);
        const genderKor = info.gender === 'female' ? '여성' : '남성';

        // regionPart가 regionDistrictData에 없는 경우를 대비해, 없으면 빈 문자열로 두거나
        // 백엔드 포맷에 맞추어 선택 유도할 수 있음
        const finalRegion = regionDistrictData[regionPart] ? regionPart : '';

        // districtPart가 region에 속하지 않으면 빈 문자열 또는 기본값
        const finalDistrict =
          finalRegion && regionDistrictData[finalRegion].includes(districtPart)
            ? districtPart
            : '';

        reset({
          emailId: idPart || '',
          emailDomain: domainPart || '',
          nickname: info.nickname || '',
          name: info.name || '',
          birthYear: birthYearStr,
          phoneNumber: rawPhone || '',
          region: finalRegion,
          district: finalDistrict,
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
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    try {
      // 주소 조합: region + ' ' + district
      const addressPayload =
        data.region && data.district
          ? `${data.region} ${data.district}`
          : data.region || data.district || '';

      const payload = {
        nickname: data.nickname,
        address: addressPayload,
      };
      await updateMyInfo(payload);
      setSignupResult('✅ 회원정보가 성공적으로 업데이트되었습니다.');
      setShowResultModal(true);
    } catch (err: any) {
      console.error('회원정보 수정 오류:', err);
      const msg =
        err?.response?.data?.message ||
        (err instanceof Error ? err.message : '알 수 없는 오류');
      setSignupResult(`❌ 업데이트 중 오류가 발생했습니다: ${msg}`);
      setShowResultModal(true);
    }
  };

  const onSaveClick = () => {
    handleSubmit(onSubmit)();
  };

  const handleResultModalClose = () => {
    setShowResultModal(false);
    // 필요 시, 성공 후 다른 동작(ex: 뒤로 이동 등)을 이곳에 추가 가능
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
