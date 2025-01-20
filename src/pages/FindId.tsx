import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaFindId } from '../hooks/ValidationYup';
import styled, { ThemeProvider } from 'styled-components';
import BackButton from '../components/BackButton';
import Button from '../components/Button01';
import InputField from '../components/InputField';
import Theme from '../styles/Theme.tsx';
import ReusableModal from '../components/ReusableModal';

const years = Array.from({ length: 100 }, (_, i) =>
  String(new Date().getFullYear() - i)
);

type FormValues = {
  name: string;
  nickname: string;
  birthYear: string;
};

const FindId: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // 모달에 표시될 이메일

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
    // 서버에서 계정을 찾았다고 가정하고 이메일을 세팅
    const foundEmail = 'goexample21@gmail.com';
    setUserEmail(maskEmail(foundEmail));
    setIsModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <HeaderWrapper>
          <BackButtonWrapper>
            <BackButton />
          </BackButtonWrapper>
          <Title>아이디 찾기</Title>
        </HeaderWrapper>
        <ContentWrapper>
          <FormWrapper onSubmit={handleSubmit(handleFindAccount)}>
            <Controller
              control={control}
              name="nickname"
              render={({ field }) => (
                <InputField
                  label="닉네임"
                  id="nickname"
                  type="text"
                  error={errors.nickname?.message}
                  placeholder="닉네임을 입력하세요"
                  {...field}
                />
              )}
            />
            <Row>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <InputField
                    label="이름"
                    id="name"
                    type="text"
                    error={errors.name?.message}
                    placeholder="이름을 입력하세요"
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="birthYear"
                render={({ field }) => (
                  <SelectWrapper>
                    <Label>태어난 해</Label>
                    <Select {...field}>
                      <option value="">선택하세요</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                    {errors.birthYear && (
                      <Error>{errors.birthYear.message}</Error>
                    )}
                  </SelectWrapper>
                )}
              />
            </Row>

            <Button type="button" onClick={openModal}>
              아이디 찾기
            </Button>
          </FormWrapper>
        </ContentWrapper>

        <ReusableModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="아이디 찾기 - 조회결과"
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
  align-items: center;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  height: 105px;
`;

const BackButtonWrapper = styled.div``;

const Title = styled.h2`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  flex-grow: 1;
  margin-left: -50px;
`;

const ContentWrapper = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-family: 'NanumSquare Neo OTF';
  font-size: 10px;
  font-weight: 700;
  line-height: 11.05px;

  text-align: left;
`;

const Select = styled.select`
  padding: 20px;

  border: 1px solid ${({ theme }) => theme.gray2};
  border-radius: 5px;
  padding-left: 3px;
  color: ${({ theme }) => theme.colors.gray2};
`;

const Error = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.error};
  margin-top: 5px;
`;
