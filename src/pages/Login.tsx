import React, { useState } from 'react';
import { useNavigate, Link as RouterLink, LinkProps } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginButton from '../components/Button01';
import InputField from '../components/InputField';
import Theme from '../styles/Theme';
import { LoginPost } from '../api/auth/LoginPost';
import { getMembershipInfo, MembershipInfo } from '../api/user/userApi';
import MelpikLogo from '../assets/LoginLogo.svg';
import { schemaLogin } from '../hooks/ValidationYup';
import ReusableModal from '../components/ReusableModal';

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schemaLogin),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const handleModalClose = () => setIsModalOpen(false);

  const handleLoginClick = async (data: LoginFormValues) => {
    try {
      const response = (await LoginPost(
        data.email,
        data.password
      )) as LoginResponse;
      const { accessToken, refreshToken } = response;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const membership: MembershipInfo = await getMembershipInfo();

      navigate('/home', {
        replace: true,
        state: { showNotice: true, membership },
      });
    } catch (error: any) {
      setModalMessage(error?.message || '로그인 실패. 다시 시도해주세요.');
      setIsModalOpen(true);
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <LoginContainer>
          <Logo src={MelpikLogo} alt='멜픽 로고' />

          <LoginForm onSubmit={handleSubmit(handleLoginClick)}>
            <InputFieldRow>
              <Controller
                control={control}
                name='email'
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    label='사용자 이메일'
                    type='text'
                    placeholder='이메일을 입력하세요'
                    error={error}
                    {...field}
                  />
                )}
              />
            </InputFieldRow>
            <InputFieldRow>
              <Controller
                control={control}
                name='password'
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    label='비밀번호'
                    type='password'
                    placeholder='비밀번호를 입력하세요'
                    error={error}
                    {...field}
                  />
                )}
              />
            </InputFieldRow>

            <CheckboxWrapper>
              <CheckboxLabel>
                <CheckboxInput type='checkbox' />
                <CheckboxText>자동 로그인</CheckboxText>
              </CheckboxLabel>
            </CheckboxWrapper>

            <LoginButton type='submit' disabled={!isValid || isSubmitting}>
              {isSubmitting ? '로그인 중...' : '로그인'}
            </LoginButton>
          </LoginForm>

          <ExtraLinks>
            <StyledLink to='/findid'>아이디 찾기</StyledLink>
            <LinkSeparator>|</LinkSeparator>
            <StyledLink to='/findpassword'>비밀번호 찾기</StyledLink>
            <LinkSeparator>|</LinkSeparator>
            <StyledLink to='/signup'>회원가입</StyledLink>
          </ExtraLinks>
        </LoginContainer>

        <ReusableModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title='로그인 실패'
        >
          {modalMessage}
        </ReusableModal>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

// --- styled-components ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 600px;
  padding: 1rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 150px;
  margin: 50px 0 20px;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputFieldRow = styled.div`
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none;
  position: relative;
  cursor: pointer;

  &:checked::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 8px;
    height: 5px;
    border-left: 2px solid #0050b3;
    border-bottom: 2px solid #0050b3;
    transform: rotate(-45deg);
  }
`;

const CheckboxText = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray1};
`;

const ExtraLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const LinkSeparator = styled.span`
  color: ${({ theme }) => theme.colors.gray3};
  font-size: 1rem;
`;

const StyledLink = styled(RouterLink)<LinkProps>`
  font-size: 0.9rem;
  color: black;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
