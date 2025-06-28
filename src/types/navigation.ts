import { NavigatorScreenParams } from '@react-navigation/native';

// 메인 탭 네비게이션 파라미터
export type MainTabParamList = {
  Home: undefined;
  Brand: undefined;
  LockerRoom: undefined;
  Melpik: undefined;
  MyStyle: undefined;
};

// 홈 스택 네비게이션 파라미터
export type HomeStackParamList = {
  HomeMain: undefined;
  HomeDetail: {
    productId: number;
    productName?: string;
  };
};

// 브랜드 스택 네비게이션 파라미터
export type BrandStackParamList = {
  BrandMain: undefined;
  BrandDetail: {
    brandId: number;
    brandName?: string;
  };
};

// 락커룸 스택 네비게이션 파라미터
export type LockerRoomStackParamList = {
  LockerRoomMain: undefined;
  MyCloset: undefined;
  MyTicket: undefined;
  PurchaseOfPasses: undefined;
  TicketDetail: {
    ticketId: number;
  };
  PaymentMethod: undefined;
  AddCard: undefined;
  Point: undefined;
  ProductReview: undefined;
  ProductReviewWrite: {
    productId: number;
    productName?: string;
  };
  UsageHistory: undefined;
};

// 멜픽 스택 네비게이션 파라미터
export type MelpikStackParamList = {
  MelpikMain: undefined;
  CreateMelpik: undefined;
  ContemporarySettings: undefined;
  Schedule: undefined;
  ScheduleConfirmation: undefined;
  ScheduleReservation1: undefined;
  ScheduleReservation2: undefined;
  ScheduleReservation3: undefined;
  SettingMelpik: undefined;
  SalesSettlement: undefined;
  SalesSettlementDetail: {
    settlementId: number;
  };
  SettlementRequest: undefined;
};

// 마이스타일 스택 네비게이션 파라미터
export type MyStyleStackParamList = {
  MyStyleMain: undefined;
};

// 인증 스택 네비게이션 파라미터
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  FindId: undefined;
  FindPassword: undefined;
  ReadyLogin: undefined;
  TestLogin: undefined;
};

// 공통 스택 네비게이션 파라미터
export type CommonStackParamList = {
  Landing: undefined;
  Link: undefined;
  PersonalLink: undefined;
  Alarm: undefined;
  Basket: undefined;
  Payment: undefined;
  PaymentComplete: {
    orderId: string;
    amount: number;
  };
  PaymentFail: {
    errorCode: string;
    errorMessage: string;
  };
  CustomerService: undefined;
  FrequentlyAskedQuestions: undefined;
  Notice: undefined;
  NoticeDetail: {
    noticeId: number;
  };
  TermsAndConditionsOfUse: undefined;
  TermsAndConditionsOfUseDetail: {
    termsId: number;
  };
  PersonalInformationProcessingPolicy: undefined;
  PersonalInformationProcessingPolicyDetail: {
    policyId: number;
  };
  MyinfoList: undefined;
  PasswordChange: undefined;
  Analysis: undefined;
  ChangeAddressModal: undefined;
  ChangeInfoModal: undefined;
  ChangeNicknameModal: undefined;
  DeliveryManagement: undefined;
  EditAddress: undefined;
  ChangePassword: undefined;
};

// 루트 네비게이션 파라미터
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Common: NavigatorScreenParams<CommonStackParamList>;
};

// 네비게이션 타입들
export type NavigationProps = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  canGoBack: () => boolean;
};

// 라우트 타입들
export type RouteProps = {
  params: any;
  name: string;
  key: string;
};
