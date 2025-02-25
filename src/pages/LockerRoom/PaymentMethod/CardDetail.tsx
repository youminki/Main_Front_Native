// CardDetail.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaCardRegistration } from '../../../hooks/ValidationYup';
import InputField from '../../../components/InputField';
import FixedBottomBar from '../../../components/FixedBottomBar';
import ReusableModal2 from '../../../components/ReusableModal2';
import ReusableModal from '../../../components/ReusableModal';

interface CardData {
  registerDate?: string;
  brand?: string;
  cardNumber?: string;
  isOrange?: boolean;
}

interface FormValues {
  cardIssuer: string;
  cardNumber: string;
  cardExpiration: string;
  cardPassword: string;
  birthOrBusiness: string;
}

const CardDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cardIndex: _cardIndex, cardData } = location.state as {
    cardIndex: number;
    cardData: CardData;
  };

  // react-hook-form 설정 (getValues는 사용하지 않으므로 구조분해에서 제거)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // yup 스키마에는 cardIssuer가 없으므로 타입 단언으로 Resolver 타입을 맞춰줍니다.
    resolver: yupResolver(
      schemaCardRegistration
    ) as unknown as Resolver<FormValues>,
    defaultValues: {
      cardIssuer: cardData.brand || '',
      cardNumber: cardData.cardNumber || '',
      cardExpiration: '06/29',
      cardPassword: '',
      birthOrBusiness: '',
    },
  });

  // 모달 상태
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // "카드를 수정하시겠습니까?"
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false); // "카드 수정이 완료되었습니다"

  // onFocus 시 기존 마스킹(●)이 포함된 값은 지워지도록
  const handleFocusClear = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.includes('●')) {
      e.target.value = '';
    }
  };

  // 폼 제출 시 (검증 통과) → 수정 확인 모달 오픈
  const onSubmit = (data: FormValues) => {
    console.log('Form Submit Data:', data);
    setIsConfirmModalOpen(true);
  };

  // 모달2 "네" 버튼 클릭 → 수정 완료 모달 오픈
  const handleConfirmYes = () => {
    setIsConfirmModalOpen(false);
    setIsFinalModalOpen(true);
  };

  // 최종 모달 "확인" 버튼 클릭 → 단순 페이지 이동
  const handleFinalConfirm = () => {
    setIsFinalModalOpen(false);
    navigate('/payment-method');
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FieldSection>
            <Controller
              name='cardIssuer'
              control={control}
              render={({ field }) => (
                <InputField
                  label='카드사 선택 *'
                  id='cardIssuer'
                  options={['신한카드', '국민카드', '우리카드', '하나카드']}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.cardIssuer}
                />
              )}
            />
          </FieldSection>

          {/* 카드번호 */}
          <FieldSection>
            <Controller
              name='cardNumber'
              control={control}
              render={({ field }) => {
                const handleCardNumberChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const rawValue = e.target.value
                    .replace(/[^0-9]/g, '')
                    .slice(0, 16);
                  const formatted = rawValue.match(/.{1,4}/g)?.join('-') || '';
                  field.onChange(formatted);
                };
                return (
                  <InputField
                    label='카드번호 (16자리) *'
                    id='cardNumber'
                    placeholder='카드번호를 입력해주세요.'
                    maxLength={19}
                    value={field.value}
                    onChange={handleCardNumberChange}
                    onFocus={handleFocusClear}
                    error={errors.cardNumber}
                  />
                );
              }}
            />
          </FieldSection>

          {/* 유효기간 & 비밀번호 (앞 2자리) */}
          <TwoColumns>
            <Column>
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
                      value={field.value}
                      onChange={handleExpirationChange}
                      onFocus={handleFocusClear}
                      error={errors.cardExpiration}
                    />
                  );
                }}
              />
            </Column>
            <Column>
              <Controller
                name='cardPassword'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='비밀번호 (앞 2자리) *'
                    id='cardPassword'
                    placeholder='00'
                    type='password'
                    maxLength={2}
                    value={field.value}
                    onChange={field.onChange}
                    onFocus={handleFocusClear}
                    error={errors.cardPassword}
                  />
                )}
              />
            </Column>
          </TwoColumns>

          {/* 생년/사업자번호 */}
          <FieldSection>
            <Controller
              name='birthOrBusiness'
              control={control}
              render={({ field }) => (
                <InputField
                  label='생년월일 6자리 or 사업자번호 10자리 (법인) *'
                  id='birthOrBusiness'
                  placeholder='800101 또는 3124512345 ( - 없이 입력해주세요 )'
                  maxLength={10}
                  value={field.value}
                  onChange={field.onChange}
                  onFocus={handleFocusClear}
                  error={errors.birthOrBusiness}
                />
              )}
            />
          </FieldSection>

          <GuideMessage>
            ※ 결제를 위한 등록은 본인카드 그리고 사업자는 법인 카드가
            가능합니다.
            <br />
            자세한 문의 ( 평일 09:00 ~ 18:00 ) 서비스팀에 남겨주세요.
          </GuideMessage>
        </Container>
      </FormContainer>

      {/* 하단 고정 버튼 - "카드 수정" */}
      <FixedBottomBar
        text='카드 수정'
        color='yellow'
        onClick={handleSubmit(onSubmit)}
      />

      {/* "카드를 수정하시겠습니까?" 모달 (ReusableModal2) */}
      <ReusableModal2
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmYes}
        title='카드 수정 확인'
        width='376px'
        height='360px'
      >
        <>카드를 수정하시겠습니까?</>
      </ReusableModal2>

      {/* "카드 수정이 완료되었습니다" 모달 (ReusableModal) */}
      <ReusableModal
        isOpen={isFinalModalOpen}
        onClose={handleFinalConfirm}
        title='알림'
      >
        <>카드 수정이 완료되었습니다</>
      </ReusableModal>
    </>
  );
};

export default CardDetail;

/* ------------------ 스타일 정의 ------------------ */

const FormContainer = styled.form`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #ffffff;
`;

const FieldSection = styled.div`
  margin-bottom: 20px;
`;

const TwoColumns = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Column = styled.div`
  flex: 1;
`;

const GuideMessage = styled.div`
  margin-top: 30px;
  font-family: 'NanumSquare Neo OTF';
  font-size: 12px;
  color: #999999;
  line-height: 1.4;
  padding: 0 0 30px 0;
  border-bottom: 1px solid #ccc;
`;
