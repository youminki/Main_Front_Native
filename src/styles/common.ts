import { StyleSheet } from 'react-native';
import { ENV } from '../config/environment';

// 공통 색상
export const Colors = {
  primary: ENV.UI.PRIMARY_COLOR,
  secondary: ENV.UI.SECONDARY_COLOR,
  background: ENV.UI.BACKGROUND_COLOR,
  text: ENV.UI.TEXT_COLOR,
  border: ENV.UI.BORDER_COLOR,
  success: ENV.UI.SUCCESS_COLOR,
  error: ENV.UI.ERROR_COLOR,
  warning: ENV.UI.WARNING_COLOR,
  info: ENV.UI.INFO_COLOR,
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

// 공통 간격
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// 공통 폰트 크기
export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  title: 28,
  largeTitle: 32,
};

// 공통 폰트 굵기
export const FontWeight = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

// 공통 테두리 반경
export const BorderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// 공통 그림자
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// 공통 스타일
export const CommonStyles = StyleSheet.create({
  // 레이아웃
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  // 패딩
  padding: {
    padding: Spacing.md,
  },
  paddingHorizontal: {
    paddingHorizontal: Spacing.md,
  },
  paddingVertical: {
    paddingVertical: Spacing.md,
  },
  paddingTop: {
    paddingTop: Spacing.md,
  },
  paddingBottom: {
    paddingBottom: Spacing.md,
  },
  paddingLeft: {
    paddingLeft: Spacing.md,
  },
  paddingRight: {
    paddingRight: Spacing.md,
  },

  // 마진
  margin: {
    margin: Spacing.md,
  },
  marginHorizontal: {
    marginHorizontal: Spacing.md,
  },
  marginVertical: {
    marginVertical: Spacing.md,
  },
  marginTop: {
    marginTop: Spacing.md,
  },
  marginBottom: {
    marginBottom: Spacing.md,
  },
  marginLeft: {
    marginLeft: Spacing.md,
  },
  marginRight: {
    marginRight: Spacing.md,
  },

  // 텍스트
  text: {
    color: Colors.text,
    fontSize: FontSize.md,
  },
  textSmall: {
    color: Colors.text,
    fontSize: FontSize.sm,
  },
  textLarge: {
    color: Colors.text,
    fontSize: FontSize.lg,
  },
  textBold: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  textTitle: {
    color: Colors.text,
    fontSize: FontSize.title,
    fontWeight: FontWeight.bold,
  },
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },

  // 버튼
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  buttonTextSecondary: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  buttonTextOutline: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },

  // 입력 필드
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.md,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: Colors.error,
  },

  // 카드
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    ...Shadows.sm,
  },

  // 구분선
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },

  // 로딩
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 빈 상태
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    color: Colors.gray[500],
    fontSize: FontSize.md,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
