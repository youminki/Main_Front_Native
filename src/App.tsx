import React from 'react';
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  matchPath,
} from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
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
import PersonalInformationProcessingPolicy from './pages/CustomerService/PersonalInformationProcessingPolicy/PersonalInformationProcessingPolicy';
import TermsAndConditionsOfUse from './pages/CustomerService/TermsAndConditionsOfUse/TermsAndConditionsOfUse';

import Scedule from './pages/Melpik/Schedule/Scedule';
import ScheduleConfirmation from './pages/Melpik/Schedule/ScheduleConfirmation';
import ScheduleReservation1 from './pages/Melpik/Schedule/ScheduleReservation1';
import ScheduleReservation2 from './pages/Melpik/Schedule/ScheduleReservation2';
import ScheduleReservation3 from './pages/Melpik/Schedule/ScheduleReservation3';

import BottomNav from './components/BottomNav1';
import Header1 from './components/Header1';
import Header2 from './components/Header2';
import Header3 from './components/Header3';
import Header4 from './components/Header4';

import { Navigate } from 'react-router-dom';
const App: React.FC = () => {
  const location = useLocation();

  // BottomNav가 포함될 경로 패턴
  const bottomNavPaths = [
    '/home',
    '/melpik',
    '/brand',
    '/lockerRoom',
    '/customerService',
  ];

  // Header1이 포함될 경로 패턴
  const header1Paths = [
    '/home',
    '/melpik',
    '/brand',
    '/lockerRoom',
    '/customerService',
  ];

  // Header2가 포함될 경로 패턴
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
  ];

  // Header3가 포함될 경로 패턴
  const header3Paths = [
    '/item/:id',
    '/createMelpik/settings',
    '/schedule/confirmation',
    '/signup',
    '/schedule/reservation1',
    '/schedule/reservation2',
    '/schedule/reservation3',
    '/sales-settlement-detail/:id',
    'settlement-request',
    '/payment-review/Write',
    '/payment-method/addcard',
    '/payment-method/cardDetail',
    '/my-ticket/PurchaseOfPasses',
    '/my-ticket/PurchaseOfPasses/TicketPayment',
    '/my-ticket/SubscriptionPass',
    '/my-ticket/OnetimePass',
  ];

  const header4Paths = [
    '/signup',
    '/findid',
    'findPassword',
    '/basket',
    '/payment',
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

    return '';
  };

  return (
    <AppContainer>
      {includeHeader1 && <Header1 />}
      {includeHeader2 && <Header2 />}
      {includeHeader3 && <Header3 title={getHeader3Title()} />}
      {includeHeader4 && <Header4 title={getHeader4Title()} />}
      <ContentContainer>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<Home />} />
          <Route path='/item/:id' element={<HomeDetail />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/findid' element={<FindId />} />
          <Route path='/findPassword' element={<FindPassword />} />
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
            path='/customerService/PersonalInformationProcessingPolicy'
            element={<PersonalInformationProcessingPolicy />}
          />
          <Route
            path='/customerService/TermsAndConditionsOfUse'
            element={<TermsAndConditionsOfUse />}
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

const AppWrapper: React.FC = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default AppWrapper;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 88px 0 120px 0;
`;
