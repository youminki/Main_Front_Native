import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled, { ThemeProvider } from "styled-components";
import BackButton from "../components/BackButton";
import Button from "../components/Button01";
import InputField from "../components/InputField";
import Theme from "../styles/Theme";
import ReusableModal from "../components/ReusableModal";

// 수정된 유효성 검증 스키마
export const schemaFindId = yup.object({
  nickname: yup
    .string()
    .required("닉네임을 입력해주세요.")
    .matches(
      /^[가-힣a-zA-Z0-9]{2,16}$/,
      "닉네임은 2~16자 사이로 입력해주세요."
    ),
  name: yup
    .string()
    .required("이름을 입력해주세요.")
    .max(10, "이름은 10자 이내로 입력해주세요."),
  birthYear: yup
    .string()
    .required("태어난 해를 선택해주세요.")
    .matches(/^\d{4}$/, "태어난 해는 4자리 숫자로 입력해주세요."),
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
  const [userEmail, setUserEmail] = useState(""); // 모달에 표시될 이메일

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaFindId),
    mode: "onChange",
    defaultValues: {
      name: "",
      nickname: "",
      birthYear: "",
    },
  });

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    const maskedLocalPart = localPart.slice(0, 2) + "*****";
    return `${maskedLocalPart}@${domain}`;
  };

  const handleFindAccount = (data: FormValues) => {
    console.log("입력된 데이터:", data); // 디버깅용 출력
    // 서버에서 계정을 찾았다고 가정하고 이메일을 세팅
    const foundEmail = "goexample21@gmail.com"; // 실제 서버 로직 대체 가능
    setUserEmail(maskEmail(foundEmail));
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
                  <InputField
                    label="태어난 해"
                    id="birthYear"
                    as="select"
                    error={errors.birthYear?.message}
                    {...field}
                  >
                    <option value="">선택하세요</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </InputField>
                )}
              />
            </Row>
            <Button type="submit">아이디 찾기</Button>
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

// 스타일 컴포넌트 정의
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
  height: 105px;
`;

const BackButtonWrapper = styled.div``;

const Title = styled.h2`
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  color: #000000;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
