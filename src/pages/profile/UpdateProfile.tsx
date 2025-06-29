// src/pages/Profile/UpdateProfile.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import InputField from '../../components/InputField';
import CustomSelect from '../../components/CustomSelect';
import FixedBottomBar from '../../components/FixedBottomBar';
import ReusableModal from '../../components/ReusableModal';
import { regionDistrictData } from '../../components/Signup/regionDistrictData';

// userApi에서 가져올 함수들
import { useMyInfo, updateMyInfo } from '../../api/user/userApi';

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

  // react-query로 내 정보 패칭
  const { data: myInfo, isLoading } = useMyInfo();

  // 백엔드에서 /user/my-info 가져와서 폼 초기화
  useEffect(() => {
    if (!myInfo) return;

    try {
      // address 문자열에 \u00A0 (non-breaking space) 등이 있을 수 있으므로 일반 공백으로 교체 후 trim
      const normalized = myInfo.address.replace(/\u00A0/g, ' ').trim();
      // 여러 공백/탭 등이 섞여 있을 경우에도 잘 분리되도록 \s+로 split
      const parts = normalized.split(/\s+/);
      const regionPart = parts[0] || '';
      const districtPart = parts.slice(1).join(' ');

      // 이하 기존 로직...
      const [idPart, domainPart] = myInfo.email.split('@');
      const rawPhone = myInfo.phoneNumber.replace(/-/g, '');
      const birthYearStr = String(myInfo.birthYear);
      const genderKor = myInfo.gender === 'female' ? '여성' : '남성';

      reset({
        emailId: idPart,
        emailDomain: domainPart,
        nickname: myInfo.nickname,
        name: myInfo.name,
        birthYear: birthYearStr,
        phoneNumber: rawPhone,
        region: regionPart,
        district: districtPart,
        gender: genderKor,
      });
    } catch (err) {
      console.error('내 정보 조회 오류:', err);
    }
  }, [myInfo, reset]);

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
      // PATCH /user/my-info 에 요청: nickname, address(시/도 + " " + 구/군)
      const payload = {
        nickname: data.nickname,
        address: `${data.region} ${data.district}`,
      };
      await updateMyInfo(payload);
      setSignupResult('✅ 회원정보가 성공적으로 업데이트되었습니다.');
      setShowResultModal(true);
    } catch (err: unknown) {
      console.error('회원정보 수정 오류:', err);
      const msg =
        err instanceof Error &&
        'response' in err &&
        (err as any).response?.data?.message
          ? (err as any).response.data.message
          : err instanceof Error
          ? err.message
          : '알 수 없는 오류';
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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>프로필 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <FormProvider {...methods}>
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          {/* 이메일 아이디 (읽기 전용) */}
          <View style={styles.rowLabel}>
            <InputField
              label='이메일 아이디'
              id='emailId'
              type='text'
              readOnly
              {...register('emailId')}
            />
            <Text style={styles.atSymbol}>@</Text>
            <InputField
              label='이메일 도메인'
              id='emailDomain'
              type='text'
              readOnly
              {...register('emailDomain')}
            />
          </View>

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
          <View style={styles.rowLabel}>
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
              type='text'
              readOnly
              {...register('birthYear')}
            />
          </View>

          {/* 전화번호 (읽기 전용) */}
          <InputField
            label='전화번호'
            id='phoneNumber'
            type='text'
            readOnly
            {...register('phoneNumber')}
          />

          {/* 성별 (읽기 전용) */}
          <InputField
            label='성별'
            id='gender'
            as={CustomSelect}
            readOnly
            {...register('gender')}
          >
            <option value='여성'>여성</option>
            <option value='남성'>남성</option>
          </InputField>

          {/* 시/도 & 구/군 */}
          <View style={styles.rowLabel}>
            <InputField
              label='시/도'
              id='region'
              as={CustomSelect}
              {...register('region')}
            >
              <option value=''>시/도를 선택하세요</option>
              {Object.keys(regionDistrictData).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </InputField>

            <InputField
              label='구/군'
              id='district'
              as={CustomSelect}
              {...register('district')}
            >
              <option value=''>구/군을 선택하세요</option>
              {watch('region') &&
                regionDistrictData[
                  watch('region') as keyof typeof regionDistrictData
                ]?.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </InputField>
          </View>
        </View>

        <FixedBottomBar
          text='저장'
          color='black'
          onPress={onSaveClick}
          disabled={isSubmitting}
        />

        <ReusableModal
          visible={showResultModal}
          onClose={handleResultModalClose}
          title='회원정보 수정'
        >
          {signupResult}
        </ReusableModal>
      </ScrollView>
    </FormProvider>
  );
};

export default UpdateProfile;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  form: {
    flexDirection: 'column',
    gap: 15,
    width: '100%',
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  atSymbol: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
});
