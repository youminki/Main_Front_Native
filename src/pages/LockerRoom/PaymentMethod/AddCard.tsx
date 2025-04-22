import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCardRegistration } from '../../../hooks/ValidationYup';

import InputField from '../../../components/InputField';
import ReusableModal from '../../../components/ReusableModal';
import ReusableModal2 from '../../../components/ReusableModal2';
import FixedBottomBar from '../../../components/FixedBottomBar';

interface CardFormValues {
  cardNumber: string;
  cardExpiration: string;
  cardPassword: string;
  birthOrBusiness: string;
  cardIssuer?: string;
}

const AddCard: React.FC = () => {
  const navigate = useNavigate();

  // 모달 상태들
  const [isModalOpen, setIsModalOpen] = useState(false); // "전체보기" 모달
  const [isAgree, setIsAgree] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false); // "카드 등록 확인" 모달
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false); // "등록 완료" 모달

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CardFormValues>({
    resolver: yupResolver(schemaCardRegistration),
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      cardExpiration: '',
      cardPassword: '',
      birthOrBusiness: '',
      cardIssuer: '',
    },
  });

  // onFocus 시 기존 마스킹(●) 제거 (필요하다면)
  const handleFocusClear = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.includes('●')) {
      e.target.value = '';
    }
  };

  // 폼 제출 시 유효성 검사 통과 → "카드 등록 확인" 모달 오픈
  const onSubmit = (data: CardFormValues) => {
    console.log('Form Submit Data:', data);
    setIsRegistrationModalOpen(true);
  };

  // "카드 등록 확인" 모달에서 '네' 버튼 클릭 → "등록 완료" 모달 오픈
  const handleRegistrationConfirm = () => {
    setIsRegistrationModalOpen(false);
    setIsFinalModalOpen(true);
  };

  // 최종 모달 확인 → /payment-method로 이동
  const handleFinalConfirm = () => {
    setIsFinalModalOpen(false);
    navigate('/payment-method');
  };

  // 숫자만 입력되도록 onKeyPress 핸들러 (다른 필드에도 사용)
  const handleNumberKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // onInput 핸들러: 입력값에서 숫자 이외의 문자를 제거 (생년월일/사업자번호 등)
  const handleNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, '');
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Container>
          {/* === 1) 카드등록 동의 영역 === */}
          <AgreementSection>
            <CheckboxLabel>
              <Checkbox
                type='checkbox'
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
              />
              <LabelText>
                카드등록에 따른 동의 <RequiredText>(필수)</RequiredText>
              </LabelText>
            </CheckboxLabel>
            <InfoRow>
              <InfoText>이용 전 필수사항 및 주의사항 안내.</InfoText>
              <ViewAllButton onClick={() => setIsModalOpen(true)}>
                전체보기
              </ViewAllButton>
            </InfoRow>
          </AgreementSection>

          {/* === 2) 카드사 선택 === */}
          <InputField
            label='카드사 선택 *'
            id='cardIssuer'
            options={['신한카드', '국민카드', '우리카드', '하나카드']}
            error={errors.cardIssuer}
            {...register('cardIssuer')}
            onSelectChange={(val: string) => console.log('카드사 선택:', val)}
          />

          {/* === 3) 카드번호 (Controller 사용: 자동 포매팅) === */}
          <Controller
            name='cardNumber'
            control={control}
            render={({ field }) => {
              const handleCardNumberChange = (
                e: React.ChangeEvent<HTMLInputElement>
              ) => {
                // 숫자만 추출, 최대 16자리
                const rawValue = e.target.value
                  .replace(/[^0-9]/g, '')
                  .slice(0, 16);
                // 4자리씩 하이픈(-) 삽입 (예: 1234567812345678 → "1234-5678-1234-5678")
                const formatted = rawValue.match(/.{1,4}/g)?.join('-') || '';
                field.onChange(formatted);
              };

              return (
                <InputField
                  label='카드번호 (16자리) *'
                  id='cardNumber'
                  placeholder='카드번호를 입력해주세요.'
                  maxLength={19} // 16자리 숫자 + 3개 하이픈 = 19자
                  error={errors.cardNumber}
                  value={field.value}
                  onChange={handleCardNumberChange}
                  onKeyPress={handleNumberKeyPress}
                  onFocus={handleFocusClear}
                />
              );
            }}
          />

          {/* === 4) 유효기간 & 비밀번호 (앞 2자리) === */}
          <TwoColumns>
            <ColumnItem>
              <Controller
                name='cardExpiration'
                control={control}
                render={({ field }) => {
                  const handleExpirationChange = (
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    const rawValue = e.target.value
                      .replace(/[^0-9]/g, '')
                      .slice(0, 4);
                    let formatted = rawValue;
                    if (rawValue.length > 2) {
                      formatted =
                        rawValue.slice(0, 2) + '/' + rawValue.slice(2);
                    }
                    field.onChange(formatted);
                  };
                  return (
                    <InputField
                      label='유효기간 *'
                      id='cardExpiration'
                      placeholder='MM/YY'
                      maxLength={5}
                      error={errors.cardExpiration}
                      value={field.value}
                      onChange={handleExpirationChange}
                      onFocus={handleFocusClear}
                    />
                  );
                }}
              />
            </ColumnItem>
            <ColumnItem>
              <InputField
                label='비밀번호 (앞 2자리) *'
                id='cardPassword'
                placeholder='00'
                maxLength={2}
                type='password'
                error={errors.cardPassword}
                {...register('cardPassword')}
                onKeyPress={handleNumberKeyPress}
                onInput={handleNumberInput}
                onFocus={handleFocusClear}
              />
            </ColumnItem>
          </TwoColumns>

          {/* === 5) 생년월일 or 사업자번호 (6자리 또는 10자리, 숫자만) === */}
          <InputField
            label='생년월일 6자리 or 사업자번호 10자리 (법인) *'
            id='birthOrBusiness'
            placeholder='800101 또는 3124512345 ( - 없이 입력해주세요 )'
            maxLength={10}
            error={errors.birthOrBusiness}
            {...register('birthOrBusiness')}
            onKeyPress={handleNumberKeyPress}
            onInput={handleNumberInput}
            onFocus={handleFocusClear}
          />

          {/* === 안내 메시지 === */}
          <GuideMessage>
            ※ 결제를 위한 등록은 본인카드 그리고 사업자는 법인 카드가
            가능합니다.
            <br />
            자세한 문의 ( 평일 09:00 ~ 18:00 ) 서비스팀에 남겨주세요.
          </GuideMessage>

          {/* === "전체보기" 모달 === */}
          <ReusableModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title='필수사항 및 주의사항 안내'
          >
            <>
              이곳에 필수사항과 주의사항에 대한 상세 내용을 임시로 입력해
              주세요.
            </>
          </ReusableModal>
        </Container>
      </FormContainer>

      {/* 하단 고정 버튼 - "카드 등록" (노란색) */}
      <FixedBottomBar
        text='카드 등록'
        color='yellow'
        onClick={handleSubmit(onSubmit)}
      />

      {/* "카드 등록 확인" 모달 (ReusableModal2) */}
      <ReusableModal2
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onConfirm={handleRegistrationConfirm}
        title='카드 등록 확인'
        width='376px'
        height='360px'
      >
        <>카드를 등록하시겠습니까?</>
      </ReusableModal2>

      {/* "등록 완료" 모달 (ReusableModal) */}
      <ReusableModal
        isOpen={isFinalModalOpen}
        onClose={handleFinalConfirm}
        title='알림'
      >
        <>카드 등록이 완료되었습니다</>
      </ReusableModal>
    </>
  );
};

export default AddCard;

/* ------------------ 스타일 정의 ------------------ */

const FormContainer = styled.form`
  padding: 1rem;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #ffffff;
`;

const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f4f4f4;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const LabelText = styled.span`
  font-weight: 700;
  font-size: 12px;
  color: #000000;
`;

const RequiredText = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #999999;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
  margin-bottom: 5px;

  &:checked {
    background-color: #ffffff;
    border-color: #aaa;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 10px;
    height: 5px;
    border-left: 3px solid orange;
    border-bottom: 3px solid orange;
    transform: rotate(-45deg);
  }

  &:focus {
    outline: none;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
`;

const InfoText = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #aaaaaa;
`;

const ViewAllButton = styled.button`
  width: 69px;
  height: 34px;
  background: #000000;
  border-radius: 5px;
  border: none;
  color: #ffffff;

  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
`;

const TwoColumns = styled.div`
  display: flex;
  gap: 10px;
`;

const ColumnItem = styled.div`
  flex: 1;
`;

const GuideMessage = styled.div`
  margin-top: 30px;

  font-size: 12px;
  color: #999999;
  line-height: 1.4;
  padding: 0 0 30px 0;
  border-bottom: 1px solid #ccc;
`;
