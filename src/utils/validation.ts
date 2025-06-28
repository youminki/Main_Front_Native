// React Native용 유효성 검사 유틸리티

// 이메일 유효성 검사
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 유효성 검사
export const validatePassword = (
  password: string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('비밀번호는 최소 8자 이상이어야 합니다.');
  }

  if (password.length > 20) {
    errors.push('비밀번호는 최대 20자까지 입력 가능합니다.');
  }

  if (!/(?=.*[A-Za-z])/.test(password)) {
    errors.push('비밀번호는 영문을 포함해야 합니다.');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('비밀번호는 숫자를 포함해야 합니다.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 전화번호 유효성 검사
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const cleanPhone = phoneNumber.replace(/[-\s]/g, '');
  const phoneRegex = /^010\d{8}$/;
  return phoneRegex.test(cleanPhone);
};

// 닉네임 유효성 검사
export const validateNickname = (
  nickname: string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (nickname.length === 0) {
    errors.push('닉네임을 입력해주세요.');
  }

  if (nickname.length > 8) {
    errors.push('닉네임은 최대 8자까지 입력 가능합니다.');
  }

  if (!/^[가-힣a-zA-Z0-9]{1,8}$/.test(nickname)) {
    errors.push('올바른 닉네임 형식을 입력해주세요.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 이름 유효성 검사
export const validateName = (
  name: string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (name.length === 0) {
    errors.push('이름을 입력해주세요.');
  }

  if (name.length > 6) {
    errors.push('이름은 최대 6자까지 입력 가능합니다.');
  }

  if (!/^[가-힣]+$/.test(name)) {
    errors.push('이름은 한글만 입력 가능합니다.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 생년 유효성 검사
export const validateBirthYear = (birthYear: string): boolean => {
  const year = parseInt(birthYear);
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear;
};

// 주소 유효성 검사
export const validateAddress = (address: string): boolean => {
  return address.length > 0 && address.length <= 100;
};

// 멜픽 주소 유효성 검사
export const validateMelpikAddress = (address: string): boolean => {
  const melpikAddressRegex = /^[a-zA-Z0-9]{1,12}$/;
  return melpikAddressRegex.test(address);
};

// 필수 필드 검사
export const validateRequired = (
  value: any,
  fieldName: string
): {
  isValid: boolean;
  error: string | null;
} => {
  if (!value || (typeof value === 'string' && value.trim().length === 0)) {
    return {
      isValid: false,
      error: `${fieldName}을(를) 입력해주세요.`,
    };
  }
  return {
    isValid: true,
    error: null,
  };
};

// 숫자 범위 검사
export const validateNumberRange = (
  value: number,
  min: number,
  max: number,
  fieldName: string
): {
  isValid: boolean;
  error: string | null;
} => {
  if (value < min || value > max) {
    return {
      isValid: false,
      error: `${fieldName}은(는) ${min}~${max} 사이의 값이어야 합니다.`,
    };
  }
  return {
    isValid: true,
    error: null,
  };
};

// 문자열 길이 검사
export const validateStringLength = (
  value: string,
  min: number,
  max: number,
  fieldName: string
): {
  isValid: boolean;
  error: string | null;
} => {
  if (value.length < min || value.length > max) {
    return {
      isValid: false,
      error: `${fieldName}은(는) ${min}~${max}자 사이로 입력해주세요.`,
    };
  }
  return {
    isValid: true,
    error: null,
  };
};
