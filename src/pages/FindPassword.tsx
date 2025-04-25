import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaFindPassword } from '../hooks/ValidationYup';
import styled, { ThemeProvider } from 'styled-components';

import Button from '../components/Button01';
import InputField from '../components/InputField';
import Theme from '../styles/Theme';
// import ReusableModal from '../components/ReusableModal';

type FormValues = {
  email: string;
  nickname: string;
  birthdate?: string;
};

const FindPassword: React.FC = () => {
  // const [setIsModalOpen] = useState(false);
  const {
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaFindPassword),
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickname: '',
      birthdate: '',
    },
  });

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <ContentWrapper>
          <FormWrapper>
            <Controller
              control={control}
              name='email'
              render={({ field }) => (
                <InputField
                  label='계정(이메일)'
                  id='email'
                  type='text'
                  error={errors.email?.message}
                  placeholder='계정을 입력하세요'
                  isEmailField
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name='nickname'
              render={({ field }) => (
                <InputField
                  label='닉네임'
                  id='nickname'
                  type='text'
                  error={errors.nickname?.message}
                  {...field}
                />
              )}
            />
            <Button type='button'>비밀번호 찾기</Button>
          </FormWrapper>
        </ContentWrapper>

        {/* <ReusableModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title='비밀번호 찾기 - 조회결과'
        >
          등록하신 계정으로{' '}
          <span className='highlighted-text'>메일이 발송</span> 되었습니다.
        </ReusableModal> */}
      </Container>
    </ThemeProvider>
  );
};

export default FindPassword;

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
  border-radius: 10px;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
