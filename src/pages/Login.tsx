import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginButton from '../components/Button01';
import InputField from '../components/InputField';
import Theme from '../styles/Theme';
import { LoginPost } from '../api/auth/LoginPost';
import MelpikLogo from '../assets/LoginLogo.svg';
import KakaoImg from '../assets/KakaoImg.svg';
import NaverImg from '../assets/NaverImg.svg';
import GoogleImg from '../assets/GoogleImg.svg';

const schemaLogin = yup.object({
  email: yup
    .string()
    .email('유효한 이메일 주소를 입력하세요')
    .required('이메일은 필수 입력 사항입니다'),
  password: yup
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
    .required('비밀번호는 필수 입력 사항입니다'),
});

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schemaLogin),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const handleLoginClick = async (data: LoginFormValues) => {
    try {
      const response = await LoginPost(data.email, data.password);
      console.log('로그인 성공:', response);
      navigate('/home');
    } catch (error) {
      console.error('로그인 실패:', error);
      setModalMessage('로그인 실패. 이메일 또는 비밀번호를 확인하세요.');
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleBrowseWithoutSignupClick = () => navigate('/home');

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <LoginContainer>
          <Logo src={MelpikLogo} alt="멜픽 로고" />
          <SubContent>
            <NormalText>
              이젠 <Highlighted>멜픽</Highlighted>을 통해
              <br /> 브랜드를 골라보세요
            </NormalText>
            <SubDescription>사고, 빌리고, 판매하는 픽!</SubDescription>
          </SubContent>
          <LoginForm onSubmit={handleSubmit(handleLoginClick)}>
            <InputFieldRow>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <InputField
                    label="계정(이메일)"
                    id="email"
                    type="text"
                    error={errors.email?.message}
                    placeholder="계정을 입력하세요"
                    isEmailField={true}
                    {...field}
                  />
                )}
              />
            </InputFieldRow>
            <InputFieldRow>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <InputField
                    label="비밀번호"
                    id="password"
                    type="password"
                    error={errors.password?.message}
                    placeholder="비밀번호를 입력하세요"
                    {...field}
                  />
                )}
              />
            </InputFieldRow>

            <CheckboxWrapper>
              <CheckboxLabel>
                <CheckboxInput type="checkbox" />
                <CheckboxText>자동 로그인</CheckboxText>
              </CheckboxLabel>
            </CheckboxWrapper>
            <LoginButton type="submit">로그인</LoginButton>
          </LoginForm>
          <ExtraLinks>
            <Link onClick={() => navigate('/findid')}>아이디 찾기</Link>
            <LinkSeparator>|</LinkSeparator>
            <Link onClick={() => navigate('/findPassword')}>비밀번호 찾기</Link>
            <LinkSeparator>|</LinkSeparator>
            <Link onClick={() => navigate('/signup')}>회원가입</Link>
          </ExtraLinks>

          <SnsTextWrapper>
            <SnsText>SNS 계정으로 로그인</SnsText>
          </SnsTextWrapper>
          <IconWrapper>
            <IconButton>
              <Icon src={KakaoImg} alt="Kakao" />
            </IconButton>
            <IconButton>
              <Icon src={NaverImg} alt="Naver" />
            </IconButton>
            <IconButton>
              <Icon src={GoogleImg} alt="Google" />
            </IconButton>
          </IconWrapper>

          <BrowseLink onClick={handleBrowseWithoutSignupClick}>
            회원가입 없이 둘러보기
          </BrowseLink>
        </LoginContainer>
        {isModalOpen && (
          <Modal>
            <p>{modalMessage}</p>
            <button onClick={handleModalClose}>확인</button>
          </Modal>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 150px;
`;

const LoginContainer = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 21px;
`;

const SubContent = styled.div`
  text-align: center;
  margin-bottom: 54px;
`;

const Highlighted = styled.span`
  color: ${({ theme }) => theme.colors.yellow};
  font-family: 'NanumSquare Neo OTF';
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
`;

const NormalText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const SubDescription = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 28px;
  text-align: center;
  color: #cccccc;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputFieldRow = styled.div`
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CheckboxText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-size: 12px;
  font-weight: 700;
  line-height: 13.26px;
  text-align: left;
  text-decoration-skip-ink: none;
  margin-left: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid lightgray;
  appearance: none;
  position: relative;
  cursor: pointer;

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

const ExtraLinks = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  min-width: 264px;
  margin-top: 30px;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.black};
  padding: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  font-family: 'NanumSquare Neo OTF';
  font-size: 12px;
  font-weight: 700;
  line-height: 13.26px;
  text-align: center;

  margin-bottom: 47px;
`;

const LinkSeparator = styled.span`
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 15px;
  opacity: 1;
`;

const BrowseLink = styled.a`
  margin-top: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.DarkBrown3};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
const SnsTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  margin-bottom: 27px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px solid #eeeeee;
  }
`;

const SnsText = styled.span`
  color: #999999;
  font-family: 'NanumSquare Neo OTF';
  font-size: 13px;
  font-weight: 700;
  line-height: 14.37px;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;
