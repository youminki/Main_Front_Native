import { useRoute } from '@react-navigation/native';

type Variant = 'default' | 'oneDepth' | 'twoDepth' | 'threeDepth';

interface HeaderConfig {
  includeHeader1: boolean;
  includeHeader2: boolean;
  includeHeader3: boolean;
  includeHeader4: boolean;
  includeBottomNav: boolean;
  headerTitle: string;
  disablePadding: boolean;
}

const headerRules: {
  paths: string[];
  variant: Variant;
  getTitle?: (routeName: string, params?: any) => string;
}[] = [
  {
    paths: ['Main', 'Melpik', 'Brand', 'LockerRoom', 'CustomerService'],
    variant: 'default',
  },
  {
    paths: [
      'CreateMelpik',
      'BrandDetail',
      'SalesSchedule',
      'MelpikSettings',
      'SalesSettlement',
      'UsageHistory',
      'MyTicket',
      'MyCloset',
      'Point',
      'ProductReview',
      'PaymentMethod',
    ],
    variant: 'oneDepth',
  },
  {
    paths: [
      'HomeDetail',
      'CreateMelpikSettings',
      'ScheduleConfirmation',
      'ScheduleReservation1',
      'ScheduleReservation2',
      'ScheduleReservation3',
      'SalesSettlementDetail',
      'SettlementRequest',
      'PaymentReviewWrite',
      'AddCard',
      'CardDetail',
      'PurchaseOfPasses',
      'TicketPayment',
      'NoticeDetail',
      'PersonalInformationProcessingPolicyDetail',
      'TermsAndConditionsOfUseDetail',
      'Payment',
      'EditAddress',
    ],
    variant: 'twoDepth',
    getTitle: getTwoDepthTitle,
  },
  {
    paths: [
      'Signup',
      'FindId',
      'FindPassword',
      'Basket',
      'Alarm',
      'MyInfo',
      'MyStyle',
      'MyInfoList',
      'TicketDetail',
      'UpdateProfile',
      'ChangePassword',
      'DeliveryManagement',
    ],
    variant: 'threeDepth',
    getTitle: getThreeDepthTitle,
  },
];

export default function useHeaderConfig(): HeaderConfig {
  const route = useRoute();
  const routeName = route.name as string;
  const params = route.params;

  let variant: Variant = 'default';
  let getTitle: ((routeName: string, params?: any) => string) | undefined;

  for (const rule of headerRules) {
    if (rule.paths.includes(routeName)) {
      variant = rule.variant;
      getTitle = rule.getTitle;
      break;
    }
  }

  const includeHeader1 = variant === 'default';
  const includeHeader2 = variant === 'oneDepth';
  const includeHeader3 = variant === 'twoDepth';
  const includeHeader4 = variant === 'threeDepth';
  const includeBottomNav = includeHeader1 || includeHeader2;
  const headerTitle = getTitle ? getTitle(routeName, params) : '';
  const disablePadding =
    routeName === 'PersonalLink' || routeName === 'Landing';

  return {
    includeHeader1,
    includeHeader2,
    includeHeader3,
    includeHeader4,
    includeBottomNav,
    headerTitle,
    disablePadding,
  };
}

function getTwoDepthTitle(routeName: string, params?: any): string {
  const map: Record<string, string> = {
    CreateMelpikSettings: '컨템포러리',
    SalesSchedule: '판매 스케줄',
    ScheduleConfirmation: '예약 스케줄 확인',
    ScheduleReservation1: '스케줄 예약하기',
    ScheduleReservation2: '스케줄 예약하기',
    ScheduleReservation3: '스케줄 예약하기',
    EditAddress: '내 정보 - 배송지 관리',
    SalesSettlementDetail: '정산내역 상세',
    SettlementRequest: '정산신청',
    PaymentReviewWrite: '평가작성',
    AddCard: '카드등록',
    CardDetail: '카드상세',
    PurchaseOfPasses: '이용권 구매',
    TicketPayment: '결제하기',
    Payment: '결제하기',
  };
  return map[routeName] || '';
}

function getThreeDepthTitle(routeName: string, params?: any): string {
  const map: Record<string, string> = {
    Signup: '회원가입',
    FindId: '아이디찾기',
    FindPassword: '비밀번호찾기',
    Basket: '장바구니',
    Alarm: '알람',
    MyInfo: '내 정보',
    MyStyle: '내 스타일',
    MyInfoList: '내 정보',
    TicketDetail: '이용권 상세',
    UpdateProfile: '내 정보 - 회원정보 변경',
    ChangePassword: '내 정보 - 비밀번호 변경',
    DeliveryManagement: '내 정보 - 배송지 관리',
  };
  return map[routeName] || '';
}
