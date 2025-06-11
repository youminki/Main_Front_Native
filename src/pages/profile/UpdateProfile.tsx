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

  // region 변경 시 district 초기화: watch로 region 값 관찰
  const watchedRegion = watch('region');
  useEffect(() => {
    // region이 바뀔 때마다 district를 빈값으로
    setValue('district', '');
  }, [watchedRegion, setValue]);

  // 백엔드에서 /user/my-info 가져와서 폼 초기화
  useEffect(() => {
    (async () => {
      try {
        const info = await getMyInfo();

        // 1) 주소 normalization: 각종 공백 문자와 구분자 제거/통일
        const rawAddress: string = info.address || '';
        const normalized = rawAddress
          // non-breaking space 등 다양한 공백 문자를 일반 공백으로
          .replace(/[\u00A0\u2000-\u200B\uFEFF]/g, ' ')
          // 쉼표, 슬래시 등도 공백으로
          .replace(/[,/]/g, ' ')
          // 여러 공백을 하나로
          .replace(/\s+/g, ' ')
          .trim();

        // 2) 정규식으로 “시/도”와 “그 이후(구/군 등)” 분리
        //    한국 행정구역 패턴 중 “도”, “특별시”, “광역시”, “자치시” 등을 포괄.
        //    예: "경기도 안양시 동안구", "서울특별시 강남구", "부산광역시 해운대구" 등.
        let regionPart = '';
        let districtPart = '';
        const addrMatch = normalized.match(
          /^(.*?(?:도|특별시|광역시|자치시))\s+(.*)$/
        );
        if (addrMatch) {
          regionPart = addrMatch[1].trim(); // ex: "경기도"
          districtPart = addrMatch[2].trim(); // ex: "안양시 동안구"
        } else {
          // 매칭 못 되면, fallback: 첫 단어를 region으로, 나머지를 district로
          const parts = normalized.split(' ');
          regionPart = parts[0] || '';
          districtPart = parts.slice(1).join(' ') || '';
        }

        // 3) 이메일 처리
        const email = info.email || '';
        const [idPart, domainPart] = email.split('@');
        // 4) 전화번호 숫자만 추출
        const rawPhone = (info.phoneNumber || '').replace(/-/g, '');
        const birthYearStr =
          info.birthYear != null ? String(info.birthYear) : '';
        const genderKor =
          info.gender === 'female'
            ? '여성'
            : info.gender === 'male'
              ? '남성'
              : '여성';

        // 5) regionDistrictData에 실제 키로 존재하는지 확인
        //    regionDistrictData 구조: { [region: string]: string[] } 형태라고 가정
        const finalRegion = regionDistrictData.hasOwnProperty(regionPart)
          ? regionPart
          : '';
        let finalDistrict = '';
        if (
          finalRegion &&
          Array.isArray(regionDistrictData[finalRegion]) &&
          districtPart
        ) {
          // 배열에 정확히 일치하는 항목이 있는지 확인
          const matched = regionDistrictData[finalRegion].find(
            (d: string) => d.trim() === districtPart
          );
          if (matched) {
            finalDistrict = matched;
          } else {
            // districtPart가 “안양시 동안구” 형태인데 regionDistrictData[finalRegion]에 “동안구”만 있을 수도 있음
            // 필요 시 추가 로직: “안양시 동안구”에서 시 이름 제거 후 “동안구”만 비교
            const subParts = districtPart.split(' ');
            const lastPart = subParts[subParts.length - 1];
            const matched2 = regionDistrictData[finalRegion].find(
              (d: string) => d.trim() === lastPart
            );
            if (matched2) {
              finalDistrict = matched2;
            }
          }
        }
        // 만약 finalRegion 또는 finalDistrict가 비어있다면, select 기본값은 ''로 남겨두어
        // 사용자가 직접 올바른 값을 다시 선택하게 유도할 수 있음.

        // 6) reset 폼 초기화
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
                disabled={!watchedRegion}
              >
                <option value='' disabled>
                  {watchedRegion ? '구/군 선택' : '시/도 먼저 선택'}
                </option>
                {watchedRegion &&
                  Array.isArray(regionDistrictData[watchedRegion]) &&
                  regionDistrictData[watchedRegion].map((dist: string) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
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
