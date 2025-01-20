import * as yup from "yup";
export const schemaSignup = yup
  .object({
    email: yup
      .string()
      .required("이메일을 입력해주세요.")
      .email("유효한 이메일 형식이 아닙니다.")
      .min(5, "이메일은 최소 5자 이상이어야 합니다.")
      .max(50, "이메일은 최대 50자까지 입력 가능합니다."),
    password: yup
      .string()
      .required("비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 최대 20자까지 입력 가능합니다.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/,
        "비밀번호는 영문과 숫자를 포함해야 합니다."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인을 위해 다시 입력해주세요."),
    nickname: yup
      .string()
      .required("닉네임을 입력해주세요.")
      .max(8, "닉네임은 최대 8자까지 입력 가능합니다.")
      .matches(/^[가-힣a-zA-Z0-9]{1,8}$/, "올바른 닉네임 형식을 입력해주세요."),
    name: yup
      .string()
      .required("이름을 입력해주세요.")
      .max(6, "이름은 최대 6자까지 입력 가능합니다.")
      .matches(/^[가-힣]+$/, "이름은 한글만 입력 가능합니다."),
    birthYear: yup
      .string()
      .required("태어난 해를 선택해주세요.")
      .matches(/^\d{4}$/, "태어난 해는 4자리 숫자로 입력해주세요."),
    phoneNumber: yup
      .string()
      .required("전화번호를 입력해주세요.")
      .length(11, "전화번호는 11자리로 입력해야 합니다.")
      .matches(/^\d{11}$/, "전화번호는 숫자만 입력 가능합니다."),
    region: yup.string().required("지역을 선택해주세요."),
    district: yup.string().required("구를 선택해주세요."),
    melpickAddress: yup
      .string()
      .required("멜픽 주소를 입력해주세요.")
      .matches(
        /^[a-zA-Z0-9]{1,12}$/,
        "멜픽 주소는 영문과 숫자로 이루어진 1~12자 이내로 입력해주세요."
      ),
    instar: yup
      .string()
      .required("인스타그램 아이디를 입력해주세요.")
      .min(5, "인스타그램 아이디는 최소 5자 이상이어야 합니다.")
      .max(30, "인스타그램 아이디는 최대 30자까지 입력 가능합니다.")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "인스타그램 아이디는 영어, 숫자, 밑줄만 가능합니다."
      ),
  })
  .required();

export const schemaLogin = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("유효한 이메일 형식이 아닙니다."),

  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .max(20, "비밀번호는 최대 20자까지 입력 가능합니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
});

export const schemaFindPassword = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("유효한 이메일 형식이 아닙니다."),

  nickname: yup
    .string()
    .required("닉네임을 입력해주세요.")
    .matches(
      /^[가-힣a-zA-Z0-9]{2,16}$/,
      "닉네임은 2~16자 사이로 입력해주세요."
    ),
});

export const schemaFindId = yup.object({
  nickname: yup
    .string()
    .required("닉네임을 입력해주세요.")
    .matches(
      /^[가-힣a-zA-Z0-9]{2,16}$/,
      "닉네임은 2~16자 사이로 입력해주세요."
    ),

  birthYear: yup
    .string()
    .required("태어난 해를 선택해주세요.")
    .matches(/^\d{4}$/, "태어난 해는 4자리 숫자로 입력해주세요."),
});
