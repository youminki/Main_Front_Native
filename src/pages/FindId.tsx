import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled, { ThemeProvider } from 'styled-components';
import Button from '../components/Button01';
import InputField from '../components/InputField';
import Theme from '../styles/Theme';
import ReusableModal from '../components/ReusableModal';
import { CustomSelect } from '../components/CustomSelect';

// Validation schema: 이름, 태어난 해, 전화번호
export const schemaFindId = yup.object({
  name: yup
    .string()
    .required('이름을 입력해주세요.')
    .max(10, '이름은 10자 이내로 입력해주세요.'),
  birthYear: yup
    .string()
    .required('태어난 해를 선택해주세요.')
    .matches(/^\d{4}$/, '태어난 해는 4자리 숫자로 입력해주세요.'),
  phone: yup
    .string()
    .required('전화번호를 입력해주세요.')
    .matches(
      /^01[016789]-?\d{3,4}-?\d{4}$/,
      '유효한 전화번호 형식이 아닙니다.'
    ),
});

type FormValues = {
  name: string;
  birthYear: string;
  phone: string;
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

const FindId: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaFindId),
    mode: 'onChange',
    defaultValues: {
      name: '',
      birthYear: '',
      phone: '',
    },
  });

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart.slice(0, 2) + '*****';
    return `${maskedLocalPart}@${domain}`;
  };

  const handleFindAccount = (data: FormValues) => {
    console.log('입력된 데이터:', data);

    // TODO: API 호출로 email 조회
    const foundEmail = 'goexample21@gmail.com';
    setUserEmail(maskEmail(foundEmail));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <ContentWrapper>
          <FormWrapper onSubmit={handleSubmit(handleFindAccount)}>
            {/* 이름과 태어난 해를 한 줄로 묶기 */}
            <Row>
              <Controller
                control={control}
                name='name'
                render={({ field }) => (
                  <InputField
                    label='이름'
                    id='name'
                    type='text'
                    error={errors.name?.message}
                    placeholder='이름을 입력하세요'
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name='birthYear'
                render={({ field }) => (
                  <InputField
                    label='태어난 해'
                    id='birthYear'
                    as={CustomSelect}
                    error={errors.birthYear?.message}
                    {...field}
                  >
                    <option value=''>선택하세요</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </InputField>
                )}
              />
            </Row>

            {/* 전화번호 */}
            <Controller
              control={control}
              name='phone'
              render={({ field }) => (
                <InputField
                  label='전화번호'
                  id='phone'
                  type='text'
                  error={errors.phone?.message}
                  placeholder='010-1234-5678'
                  {...field}
                />
              )}
            />

            <Button type='submit'>아이디 찾기</Button>
          </FormWrapper>
        </ContentWrapper>

        <ReusableModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title='아이디 찾기 - 조회결과'
        >
          찾으시는 계정은 다음과 같습니다.
          <br />
          <strong>{userEmail}</strong>
        </ReusableModal>
      </Container>
    </ThemeProvider>
  );
};

export default FindId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0 auto;
  max-width: 600px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
`;
