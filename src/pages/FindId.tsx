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

export const schemaFindId = yup.object({
  nickname: yup
    .string()
    .required('닉네임을 입력해주세요.')
    .matches(
      /^[가-힣a-zA-Z0-9]{2,16}$/,
      '닉네임은 2~16자 사이로 입력해주세요.'
    ),
  name: yup
    .string()
    .required('이름을 입력해주세요.')
    .max(10, '이름은 10자 이내로 입력해주세요.'),
  birthYear: yup
    .string()
    .required('태어난 해를 선택해주세요.')
    .matches(/^\d{4}$/, '태어난 해는 4자리 숫자로 입력해주세요.'),
});

type FormValues = {
  name: string;
  nickname: string;
  birthYear: string;
};

const years = Array.from({ length: 100 }, (_, i) =>
  String(new Date().getFullYear() - i)
);

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
      nickname: '',
      birthYear: '',
    },
  });

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    const maskedLocalPart = localPart.slice(0, 2) + '*****';
    return `${maskedLocalPart}@${domain}`;
  };

  const handleFindAccount = (data: FormValues) => {
    console.log('입력된 데이터:', data);

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
            <Controller
              control={control}
              name='nickname'
              render={({ field }) => (
                <InputField
                  label='닉네임'
                  id='nickname'
                  type='text'
                  error={errors.nickname?.message}
                  placeholder='닉네임을 입력하세요'
                  {...field}
                />
              )}
            />
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

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0 auto;

  max-width: 600px;
  height: 75vh;
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
