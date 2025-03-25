// App.tsx
import React, { useState, useEffect } from 'react';
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
import Alarm from './pages/Alarm';
import Payment from './pages/Payment';
import PersonalLink from './pages/PersonalLink';

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
import Landing from './pages/Landing';

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

// ContentContainer에 disablePadding prop 추가 (personalLink인 경우 padding 제거)
const ContentContainer = styled.div<{
  animate: boolean;
  exit: boolean;
  disablePadding?: boolean;
}>`
  flex: 1;
  padding: ${({ disablePadding }) => (disablePadding ? '0' : '70px 0')};
  animation: ${({ exit, animate }) =>
      exit ? slideOut : animate ? slideIn : 'none'}
    0.3s ease-out;
`;

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [exit, setExit] = useState(false);
  const [loading, setLoading] = useState(true);

  // personalLink 경로일 때 body에 클래스 추가
  useEffect(() => {
    if (location.pathname === '/personalLink') {
      document.body.classList.add('personalLink');
    } else {
      document.body.classList.remove('personalLink');
    }
  }, [location.pathname]);

  // ========= 이미지 로드 완료 시 로딩 해제 =========
  useEffect(() => {
    // 모든 img 태그 수집
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    // 이미지가 하나도 없다면 즉시 로딩 해제
    if (totalImages === 0) {
      setLoading(false);
      return;
    }

    // load/error 시마다 카운트 증가 → 모두 끝나면 로딩 해제
    const handleLoadOrError = () => {
      loadedCount += 1;
      if (loadedCount === totalImages) {
        setLoading(false);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        // 캐시 등으로 이미 로드된 상태
        handleLoadOrError();
      } else {
        img.addEventListener('load', handleLoadOrError);
        img.addEventListener('error', handleLoadOrError);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleLoadOrError);
        img.removeEventListener('error', handleLoadOrError);
      });
    };
  }, []);
  // ==============================================

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
    '/payment',
  ];

  // Header4 (쓰리뎁쓰) 경로 패턴
  const header4Paths = [
    '/signup',
    '/findid',
    '/findPassword',
    '/basket',
    '/alarm',
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
    if (matchPath('/payment', location.pathname)) {
      return '결제하기';
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
    if (matchPath('/alarm', location.pathname)) {
      return '알람';
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

  // 로딩 중이면 스피너 표시
  if (loading) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    );
  }

  // 로딩 완료 후 실제 페이지 렌더링
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
      <ContentContainer
        animate={includeHeader3 || includeHeader4}
        exit={exit}
        disablePadding={
          location.pathname === '/PersonalLink' ||
          location.pathname === '/landing'
        }
      >
        <Routes>
          <Route path='/landing' element={<Landing />} />

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
          <Route path='/alarm' element={<Alarm />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/PersonalLink' element={<PersonalLink />} />

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

// 로딩 스피너 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 로딩 스피너 스타일 (노란색)
const LoadingSpinner = styled.div`
  border: 8px solid rgba(246, 172, 54, 0.3);
  border-top: 8px solid #f6ac36;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

// 로딩 오버레이 스타일
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const AppWrapper: React.FC = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default AppWrapper;
