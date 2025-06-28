// React Native 환경 설정

export const ENV = {
  // API 설정
  API_BASE_URL: 'https://api.stylewh.com',

  // 앱 설정
  APP_NAME: 'Melpik',
  APP_VERSION: '1.0.0',

  // 스토리지 키
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    USER_PROFILE: 'userProfile',
    USER_SETTINGS: 'userSettings',
  },

  // 네비게이션 설정
  NAVIGATION: {
    ANIMATION_DURATION: 300,
    HEADER_HEIGHT: 60,
    BOTTOM_TAB_HEIGHT: 80,
  },

  // UI 설정
  UI: {
    PRIMARY_COLOR: '#f6ae24',
    SECONDARY_COLOR: '#000000',
    BACKGROUND_COLOR: '#ffffff',
    TEXT_COLOR: '#000000',
    BORDER_COLOR: '#dddddd',
    SUCCESS_COLOR: '#28a745',
    ERROR_COLOR: '#dc3545',
    WARNING_COLOR: '#ffc107',
    INFO_COLOR: '#17a2b8',
  },

  // 이미지 설정
  IMAGES: {
    PLACEHOLDER: 'https://via.placeholder.com/300x300',
    DEFAULT_AVATAR: 'https://via.placeholder.com/100x100',
  },

  // 개발 모드 설정
  IS_DEV: __DEV__,
  IS_PROD: !__DEV__,
};

export default ENV;
