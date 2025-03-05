// App.tsx
import React, { useState } from 'react';
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  matchPath,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// 페이지 컴포넌트 임포트
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import MyInfo from './pages/MyInfo';
import MyStyle from './pages/MyStyle';
import Basket from './pages/Basket';
import Payment from './pages/Payment';

import Home from './pages/Home/Home';
import HomeDetail from './pages/Home/HomeDetail';
import Analysis from './pages/Analysis';

import Brand from './pages/Brand/Brand';
import BrandDetail from './pages/Brand/BrandDetail';

import Melpik from './pages/Melpik/Melpik';
import CreateMelpik from './pages/Melpik/Create/CreateMelpik';
import ContemporarySettings from './pages/Melpik/Create/ContemporarySettings';
import Setting from './pages/Melpik/Setting/SettingMelpik';
import SalesSettlement from './pages/Melpik/Calculate/SalesSettlement';
import SalesSettlementDetail from './pages/Melpik/Calculate/SalesSettlementDetail';
import SettlementRequest from './pages/Melpik/Calculate/SettlementRequest';

import LockerRoom from './pages/LockerRoom/LockerRoom';
import UsageHistory from './pages/LockerRoom/UsageHistory/UsageHistory';
import Point from './pages/LockerRoom/Point/Point';
import MyCloset from './pages/LockerRoom/MyCloset/MyCloset';
import MyTicket from './pages/LockerRoom/MyTicket/MyTicket';
import PurchaseOfPasses from './pages/LockerRoom/MyTicket/PurchaseOfPasses';
import TicketPayment from './pages/LockerRoom/MyTicket/TicketPayment';
import SubscriptionPass from './pages/LockerRoom/MyTicket/SubscriptionPass';
import OnetimePass from './pages/LockerRoom/MyTicket/OnetimePass';

import PaymentMethod from './pages/LockerRoom/PaymentMethod/PaymentMethod';
import AddCard from './pages/LockerRoom/PaymentMethod/AddCard';
import CardDetail from './pages/LockerRoom/PaymentMethod/CardDetail';
import ProductReview from './pages/LockerRoom/ProductReview/ProductReview';
import ProductReviewWrite from './pages/LockerRoom/ProductReview/ProductReviewWrite';

import CustomerService from './pages/CustomerService/CustomerService';
import FrequentlyAskedQuestions from './pages/CustomerService/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import Notice from './pages/CustomerService/Notice/Notice';
import NoticeDetail from './pages/CustomerService/Notice/NoticeDetail';
import PersonalInformationProcessingPolicy from './pages/CustomerService/PersonalInformationProcessingPolicy/PersonalInformationProcessingPolicy';
import PersonalInformationProcessingPolicyDetail from './pages/CustomerService/PersonalInformationProcessingPolicy/PersonalInformationProcessingPolicyDetail';
import TermsAndConditionsOfUse from './pages/CustomerService/TermsAndConditionsOfUse/TermsAndConditionsOfUse';
import TermsAndConditionsOfUseDetail from './pages/CustomerService/TermsAndConditionsOfUse/TermsAndConditionsOfUseDetail';

import Scedule from './pages/Melpik/Schedule/Scedule';
import ScheduleConfirmation from './pages/Melpik/Schedule/ScheduleConfirmation';
import ScheduleReservation1 from './pages/Melpik/Schedule/ScheduleReservation1';
import ScheduleReservation2 from './pages/Melpik/Schedule/ScheduleReservation2';
import ScheduleReservation3 from './pages/Melpik/Schedule/ScheduleReservation3';

import BottomNav from './components/BottomNav1';
import UnifiedHeader from './components/UnifiedHeader';

// 페이지 컨텐츠 애니메이션 keyframes
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const ContentContainer = styled.div<{ animate: boolean; exit: boolean }>`
  flex: 1;
  padding: 100px 0 120px 0;
  animation: ${({ exit, animate }) =>
      exit ? slideOut : animate ? slideIn : 'none'}
    0.3s ease-out;
`;

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [exit, setExit] = useState(false);

  // BottomNav가 포함될 경로 패턴
  const bottomNavPaths = [
    '/home',
    '/melpik',
    '/brand',
    '/lockerRoom',
    '/customerService',
  ];

  // Header1 (기본헤더) 경로 패턴
  const header1Paths = [
    '/home',
    '/melpik',
    '/brand',
    '/lockerRoom',
    '/customerService',
  ];

  // Header2 (원뎁쓰) 경로 패턴
  const header2Paths = [
    '/create-melpik',
    '/brand/:brandName',
    '/sales-schedule',
    '/melpik-settings',
    '/sales-settlement',
    '/usage-history',
    '/my-tiket',
    '/my-closet',
    '/point',
    '/product-review',
    '/payment-method',
    '/my-ticket',
    '/CustomerService/Notice',
    '/CustomerService/FrequentlyAskedQuestions',
    '/customerService/PersonalInformationProcessingPolicy',
    '/customerService/TermsAndConditionsOfUse',
  ];

  // Header3 (투뎁쓰) 경로 패턴
  const header3Paths = [
    '/item/:id',
    '/createMelpik/settings',
    '/schedule/confirmation',
    '/signup',
    '/schedule/reservation1',
    '/schedule/reservation2',
    '/schedule/reservation3',
    '/sales-settlement-detail/:id',
    '/settlement-request',
    '/payment-review/Write',
    '/payment-method/addcard',
    '/payment-method/cardDetail',
    '/my-ticket/PurchaseOfPasses',
    '/my-ticket/PurchaseOfPasses/TicketPayment',
    '/my-ticket/SubscriptionPass',
    '/my-ticket/OnetimePass',
    '/customerService/NoticeDetail',
    '/customerService/PersonalInformationProcessingPolicyDetail',
    '/customerService/TermsAndConditionsOfUseDetail',
  ];

  // Header4 (쓰리뎁쓰) 경로 패턴
  const header4Paths = [
    '/signup',
    '/findid',
    '/findPassword',
    '/basket',
    '/payment',
    '/MyInfo',
    '/MyStyle',
  ];

  const includeBottomNav = bottomNavPaths.some((path) =>
    matchPath(path, location.pathname)
  );
  const includeHeader1 = header1Paths.some((path) =>
    matchPath(path, location.pathname)
  );
  const includeHeader2 = header2Paths.some((path) =>
    matchPath(path, location.pathname)
  );
  const includeHeader3 = header3Paths.some((path) =>
    matchPath(path, location.pathname)
  );
  const includeHeader4 = header4Paths.some((path) =>
    matchPath(path, location.pathname)
  );

  const getHeader3Title = () => {
    if (matchPath('/createMelpik/settings', location.pathname)) {
      return '컨템포러리';
    }
    if (matchPath('/sales-schedule', location.pathname)) {
      return '판매 스케줄';
    }
    if (matchPath('/schedule/confirmation', location.pathname)) {
      return '예약 스케줄 확인';
    }
    if (matchPath('/schedule/reservation1', location.pathname)) {
      return '스케줄 예약하기';
    }
    if (matchPath('/schedule/reservation2', location.pathname)) {
      return '스케줄 예약하기';
    }
    if (matchPath('/schedule/reservation3', location.pathname)) {
      return '스케줄 예약하기';
    }
    if (matchPath('/sales-settlement-detail/:id', location.pathname)) {
      return '정산내역 상세';
    }
    if (matchPath('/settlement-request', location.pathname)) {
      return '정산신청';
    }
    if (matchPath('/payment-review/Write', location.pathname)) {
      return '평가작성';
    }
    if (matchPath('/payment-method/addcard', location.pathname)) {
      return '카드등록';
    }
    if (matchPath('/payment-method/cardDetail', location.pathname)) {
      return '카드상세';
    }
    if (matchPath('/my-ticket/PurchaseOfPasses', location.pathname)) {
      return '이용권 구매';
    }
    if (
      matchPath('/my-ticket/PurchaseOfPasses/TicketPayment', location.pathname)
    ) {
      return '결제하기';
    }
    if (matchPath('/my-ticket/SubscriptionPass', location.pathname)) {
      return '이용권 상세';
    }
    if (matchPath('/my-ticket/OnetimePass', location.pathname)) {
      return '이용권 상세';
    }
    return '';
  };

  const getHeader4Title = () => {
    if (matchPath('/signup', location.pathname)) {
      return '회원가입';
    }
    if (matchPath('/findid', location.pathname)) {
      return '아이디찾기';
    }
    if (matchPath('/findPassword', location.pathname)) {
      return '비밀번호찾기';
    }
    if (matchPath('/basket', location.pathname)) {
      return '장바구니';
    }
    if (matchPath('/payment', location.pathname)) {
      return '결제하기';
    }
    if (matchPath('/MyInfo', location.pathname)) {
      return '내 정보';
    }
    if (matchPath('/MyStyle', location.pathname)) {
      return '내 스타일';
    }
    return '';
  };

  // 백버튼 또는 캔슬 버튼 클릭 시 exit 애니메이션 적용 후 뒤로가기 처리
  const handleBackWithExit = () => {
    setExit(true);
    setTimeout(() => {
      navigate(-1);
      setExit(false);
    }, 300); // 0.3초 애니메이션 시간과 동일
  };

  return (
    <AppContainer>
      {includeHeader1 && <UnifiedHeader variant='default' />}
      {includeHeader2 && <UnifiedHeader variant='oneDepth' exit={exit} />}
      {includeHeader3 && (
        <UnifiedHeader
          variant='twoDepth'
          title={getHeader3Title()}
          onBack={handleBackWithExit}
          exit={exit}
        />
      )}
      {includeHeader4 && (
        <UnifiedHeader
          variant='threeDepth'
          title={getHeader4Title()}
          onBack={handleBackWithExit}
          exit={exit}
        />
      )}
      <ContentContainer animate={includeHeader3 || includeHeader4} exit={exit}>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<Home />} />
          <Route path='/item/:id' element={<HomeDetail />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/findid' element={<FindId />} />
          <Route path='/findPassword' element={<FindPassword />} />
          <Route path='/MyInfo' element={<MyInfo />} />
          <Route path='/MyStyle' element={<MyStyle />} />
          <Route path='/analysis' element={<Analysis />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/payment' element={<Payment />} />

          <Route path='/brand' element={<Brand />} />
          <Route path='/brand/:brandName' element={<BrandDetail />} />

          <Route path='/melpik' element={<Melpik />} />
          <Route path='/create-melpik' element={<CreateMelpik />} />
          <Route
            path='/createMelpik/settings'
            element={<ContemporarySettings />}
          />
          <Route path='/sales-settlement' element={<SalesSettlement />} />
          <Route
            path='/sales-settlement-detail/:id'
            element={<SalesSettlementDetail />}
          />
          <Route path='/settlement-request' element={<SettlementRequest />} />

          <Route path='/melpik-settings' element={<Setting />} />
          <Route path='/sales-schedule' element={<Scedule />} />
          <Route
            path='/schedule/confirmation'
            element={<ScheduleConfirmation />}
          />
          <Route
            path='/schedule/reservation1'
            element={<ScheduleReservation1 />}
          />
          <Route
            path='/schedule/reservation2'
            element={<ScheduleReservation2 />}
          />
          <Route
            path='/schedule/reservation3'
            element={<ScheduleReservation3 />}
          />

          <Route path='/lockerRoom' element={<LockerRoom />} />
          <Route path='/usage-history' element={<UsageHistory />} />
          <Route path='/my-ticket' element={<MyTicket />} />
          <Route
            path='/my-ticket/PurchaseOfPasses'
            element={<PurchaseOfPasses />}
          />
          <Route
            path='/my-ticket/PurchaseOfPasses/TicketPayment'
            element={<TicketPayment />}
          />
          <Route
            path='/my-ticket/SubscriptionPass'
            element={<SubscriptionPass />}
          />
          <Route path='/my-ticket/OnetimePass' element={<OnetimePass />} />
          <Route path='/customerService' element={<CustomerService />} />
          <Route
            path='/customerService/FrequentlyAskedQuestions'
            element={<FrequentlyAskedQuestions />}
          />
          <Route path='/customerService/Notice' element={<Notice />} />
          <Route
            path='/customerService/NoticeDetail'
            element={<NoticeDetail />}
          />
          <Route
            path='/customerService/PersonalInformationProcessingPolicy'
            element={<PersonalInformationProcessingPolicy />}
          />
          <Route
            path='/customerService/PersonalInformationProcessingPolicyDetail'
            element={<PersonalInformationProcessingPolicyDetail />}
          />
          <Route
            path='/customerService/TermsAndConditionsOfUse'
            element={<TermsAndConditionsOfUse />}
          />
          <Route
            path='/customerService/TermsAndConditionsOfUseDetail'
            element={<TermsAndConditionsOfUseDetail />}
          />

          <Route path='/my-closet' element={<MyCloset />} />
          <Route path='/point' element={<Point />} />
          <Route path='/product-review' element={<ProductReview />} />
          <Route path='/payment-method' element={<PaymentMethod />} />
          <Route path='/payment-method/addcard' element={<AddCard />} />
          <Route path='/payment-method/cardDetail' element={<CardDetail />} />

          <Route
            path='/payment-review/Write'
            element={<ProductReviewWrite />}
          />
        </Routes>
      </ContentContainer>
      {includeBottomNav && <BottomNav />}
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppWrapper: React.FC = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default AppWrapper;
