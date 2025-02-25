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
  cardNumber: string; // 16자리 숫자
  cardExpiration: string; // MM / YY
  cardPassword: string; // 2자리 숫자
  birthOrBusiness: string; // 6 or 10자리 숫자
}

const AddCard: React.FC = () => {
  const navigate = useNavigate();

  // "전체보기" 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 체크박스 동의
  const [isAgree, setIsAgree] = useState(false);

  // 카드 등록 버튼 관련 모달 (등록 확인)
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  // 최종 완료 모달
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CardFormValues>({
    resolver: yupResolver(schemaCardRegistration),
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      cardExpiration: '',
      cardPassword: '',
      birthOrBusiness: '',
    },
  });

  // 폼 제출 시(유효성 검사 통과) → "등록 확인" 모달 열기
  const onSubmit = (data: CardFormValues) => {
    console.log('Form Submit Data:', data); // data 사용 → 경고 제거
    setIsRegistrationModalOpen(true);
  };

  // '네' 버튼(등록 확인) 클릭 → "등록 확인" 모달 닫고 "최종 완료" 모달 열기
  const handleRegistrationConfirm = () => {
    setIsRegistrationModalOpen(false);
    setIsFinalModalOpen(true);
  };

  // 최종 모달 "확인" 버튼 → /payment-method 이동
  const handleFinalConfirm = () => {
    setIsFinalModalOpen(false);
    navigate('/payment-method');
  };

  // 숫자만 입력되도록 onKeyPress
  const handleNumberKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  // 생년월일/사업자번호: 숫자만 허용
  const handleNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, '');
  };

  return (
    <>
      {/* form으로 감싸고, handleSubmit(onSubmit) 연결 */}
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Container>
          {/* ========== 1) 카드등록 동의 영역 ========== */}
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

          {/* ========== 2) 카드사 선택 ========== */}
          <InputField
            label='카드사 선택 *'
            id='cardIssuer'
            options={['신한카드', '국민카드', '우리카드', '하나카드']}
          />

          {/* ========== 3) 카드번호 ========== */}
          <Controller
            name='cardNumber'
            control={control}
            render={({ field }) => {
              // 카드번호 입력값 포맷팅
              const handleCardNumberChange = (
                e: React.ChangeEvent<HTMLInputElement>
              ) => {
                // 숫자만 추출, 최대 16자리
                const rawValue = e.target.value
                  .replace(/[^0-9]/g, '')
                  .slice(0, 16);
                // 4자리씩 하이픈(-) 삽입
                const formatted = rawValue.match(/.{1,4}/g)?.join('-') || '';
                field.onChange(formatted);
              };

              return (
                <InputField
                  label='카드번호 (16자리) *'
                  id='cardNumber'
                  placeholder='카드번호를 입력해주세요.'
                  maxLength={19} // 16자리 + 하이픈 3개
                  error={errors.cardNumber}
                  value={field.value}
                  onChange={handleCardNumberChange}
                  onKeyPress={handleNumberKeyPress}
                />
              );
            }}
          />

          {/* ========== 4) 유효기간 & 비밀번호(앞2자리) ========== */}
          <TwoColumns>
            <ColumnItem>
              <Controller
                name='cardExpiration'
                control={control}
                render={({ field }) => {
                  // 유효기간 입력값 포맷팅 (MM/YY)
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
              />
            </ColumnItem>
          </TwoColumns>

          {/* ========== 5) 생년월일 or 사업자번호 ========== */}
          <InputField
            label='생년월일 6자리 or 사업자번호 10자리 (법인) *'
            id='birthOrBusiness'
            placeholder='800101 또는 3124512345 ( - 없이 입력해주세요 )'
            maxLength={10}
            error={errors.birthOrBusiness}
            {...register('birthOrBusiness')}
            onKeyPress={handleNumberKeyPress}
            onInput={handleNumberInput}
          />

          {/* ========== 안내 메시지 ========== */}
          <GuideMessage>
            ※ 결제를 위한 등록은 본인카드 그리고 사업자는 법인 카드가
            가능합니다.
            <br />
            자세한 문의 ( 평일 09:00 ~ 18:00 ) 서비스팀에 남겨주세요.
          </GuideMessage>

          {/* ========== "전체보기" 모달 ========== */}
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

      {/* ========== 하단 고정 버튼: "카드 등록" ========== */}
      <FixedBottomBar
        text='카드 등록'
        color='yellow'
        onClick={handleSubmit(onSubmit)}
      />

      {/* ========== "카드 등록 확인" 모달 ========== */}
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

      {/* ========== 최종 완료 모달 ========== */}
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
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  padding: 20px;
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
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  color: #000000;
`;

const RequiredText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
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
  font-family: 'NanumSquare Neo OTF';
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
  margin-top: 20px;
  font-family: 'NanumSquare Neo OTF';
  font-size: 12px;
  color: #999999;
  line-height: 1.4;
  padding: 0 0 30px 0;
  border-bottom: 1px solid #ccc;
`;
