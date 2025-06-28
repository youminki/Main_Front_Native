import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Landing & Auth Screens
import Landing from './pages/Landing';
import Login from './pages/Login';
import ReadyLogin from './pages/ReadyLogin';
import TestLogin from './pages/TestLogin';
import Signup from './pages/Signup';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import PersonalLink from './pages/PersonalLink';

// Main App Screens
import AppLayout from './pages/AppLayout';
import Home from './pages/Home/Home';
import HomeDetail from './pages/Home/HomeDetail';
import Analysis from './pages/Analysis';
import Basket from './pages/Basket';
import Alarm from './pages/Alarm';
import Payment from './pages/Payment';
import PaymentComplete from './pages/PaymentComplete';
import PaymentFail from './pages/Paymentfail';

// User Pages
import MyinfoList from './pages/MyinfoList';
import MyStyle from './pages/MyStyle';
import PasswordChange from './pages/PasswordChange';

// Brand Screens
import Brand from './pages/Brand/Brand';
import BrandDetail from './pages/Brand/BrandDetail';

// Melpik Screens
import Melpik from './pages/Melpik/Melpik';
import CreateMelpik from './pages/Melpik/Create/CreateMelpik';
import ContemporarySettings from './pages/Melpik/Create/ContemporarySettings';
import SettingMelpik from './pages/Melpik/Setting/SettingMelpik';
import SalesSettlement from './pages/Melpik/Calculate/SalesSettlement';
import SalesSettlementDetail from './pages/Melpik/Calculate/SalesSettlementDetail';
import SettlementRequest from './pages/Melpik/Calculate/SettlementRequest';

// Schedule Screens
import Scedule from './pages/Melpik/Schedule/Scedule';
import ScheduleConfirmation from './pages/Melpik/Schedule/ScheduleConfirmation';
import ScheduleReservation1 from './pages/Melpik/Schedule/ScheduleReservation1';
import ScheduleReservation2 from './pages/Melpik/Schedule/ScheduleReservation2';
import ScheduleReservation3 from './pages/Melpik/Schedule/ScheduleReservation3';

// LockerRoom Screens
import LockerRoom from './pages/LockerRoom/LockerRoom';
import UsageHistory from './pages/LockerRoom/UsageHistory/UsageHistory';
import Point from './pages/LockerRoom/Point/Point';
import MyCloset from './pages/LockerRoom/MyCloset/MyCloset';
import MyTicket from './pages/LockerRoom/MyTicket/MyTicket';
import PurchaseOfPasses from './pages/LockerRoom/MyTicket/PurchaseOfPasses';
import TicketPayment from './pages/LockerRoom/MyTicket/TicketPayment';
import TicketDetail from './pages/LockerRoom/MyTicket/TicketDetail';

// Payment & Review Screens
import PaymentMethod from './pages/LockerRoom/PaymentMethod/PaymentMethod';
import AddCard from './pages/LockerRoom/PaymentMethod/AddCard';
import ProductReview from './pages/LockerRoom/ProductReview/ProductReview';
import ProductReviewWrite from './pages/LockerRoom/ProductReview/ProductReviewWrite';

// Customer Service Screens
import CustomerService from './pages/CustomerService/CustomerService';
import FrequentlyAskedQuestions from './pages/CustomerService/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import Notice from './pages/CustomerService/Notice/Notice';
import NoticeDetail from './pages/CustomerService/Notice/NoticeDetail';
import PersonalInformationProcessingPolicy from './pages/CustomerService/PersonalInformationProcessingPolicy/PersonalInformationProcessingPolicy';
import PersonalInformationProcessingPolicyDetail from './pages/CustomerService/PersonalInformationProcessingPolicy/PersonalInformationProcessingPolicyDetail';
import TermsAndConditionsOfUse from './pages/CustomerService/TermsAndConditionsOfUse/TermsAndConditionsOfUse';
import TermsAndConditionsOfUseDetail from './pages/CustomerService/TermsAndConditionsOfUse/TermsAndConditionsOfUseDetail';

// Profile Screens
import UpdateProfile from './pages/profile/UpdateProfile';
import ChangePassword from './pages/profile/ChangePassword';
import DeliveryManagement from './pages/profile/DeliveryManagement';
import EditAddress from './pages/profile/EditAddress';

// Test Screens
import PaypleTest from './Test/PaypleTest';
import AddCardPayple from './Test/AddCardPayple';
import Link from './pages/Link';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

// 간단한 테스트 화면들
const HomeScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>🎉 React Native 변환 성공!</Text>
    <Text style={styles.subtitle}>웹 → React Native 변환이 완료되었습니다</Text>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Test')}
      >
        <Text style={styles.buttonText}>테스트 페이지로 이동</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Payment')}
      >
        <Text style={styles.buttonText}>결제 페이지 테스트</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.features}>
      <Text style={styles.featureTitle}>✅ 완료된 기능들:</Text>
      <Text style={styles.feature}>• React Navigation 설정</Text>
      <Text style={styles.feature}>• TypeScript 지원</Text>
      <Text style={styles.feature}>• Expo 개발 환경</Text>
      <Text style={styles.feature}>• 기본 컴포넌트 변환</Text>
      <Text style={styles.feature}>• 스타일링 시스템</Text>
    </View>
  </View>
);

const TestScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>🧪 테스트 페이지</Text>
    <Text style={styles.subtitle}>기본 네비게이션이 작동합니다!</Text>

    <View style={styles.testComponents}>
      <View style={styles.testBox}>
        <Text style={styles.testText}>TouchableOpacity</Text>
      </View>

      <View style={styles.testBox}>
        <Text style={styles.testText}>StyleSheet</Text>
      </View>

      <View style={styles.testBox}>
        <Text style={styles.testText}>React Navigation</Text>
      </View>
    </View>
  </View>
);

// 간단한 Payment 테스트 화면
const PaymentTestScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>💳 결제 페이지 테스트</Text>
    <Text style={styles.subtitle}>변환된 Payment 컴포넌트</Text>

    <View style={styles.paymentForm}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>수령인</Text>
        <View style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>주소</Text>
        <View style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>연락처</Text>
        <View style={styles.input} />
      </View>

      <TouchableOpacity style={styles.paymentButton}>
        <Text style={styles.paymentButtonText}>결제하기</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Landing & Auth */}
          <Stack.Screen name='Landing' component={Landing} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='ReadyLogin' component={ReadyLogin} />
          <Stack.Screen name='TestLogin' component={TestLogin} />
          <Stack.Screen name='PersonalLink' component={PersonalLink} />
          <Stack.Screen name='Link' component={Link} />

          {/* Test Screens */}
          <Stack.Screen name='PaypleTest' component={PaypleTest} />
          <Stack.Screen name='AddCardPayple' component={AddCardPayple} />

          {/* Main App */}
          <Stack.Screen name='AppLayout' component={AppLayout} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='FindId' component={FindId} />
          <Stack.Screen name='FindPassword' component={FindPassword} />

          {/* User Pages */}
          <Stack.Screen name='MyinfoList' component={MyinfoList} />
          <Stack.Screen name='MyStyle' component={MyStyle} />

          {/* Main */}
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='HomeDetail' component={HomeDetail} />
          <Stack.Screen name='Analysis' component={Analysis} />
          <Stack.Screen name='Basket' component={Basket} />
          <Stack.Screen name='Alarm' component={Alarm} />
          <Stack.Screen name='Payment' component={PaymentTestScreen} />
          <Stack.Screen name='PaymentComplete' component={PaymentComplete} />
          <Stack.Screen name='PaymentFail' component={PaymentFail} />

          {/* Brand */}
          <Stack.Screen name='Brand' component={Brand} />
          <Stack.Screen name='BrandDetail' component={BrandDetail} />

          {/* Melpik */}
          <Stack.Screen name='Melpik' component={Melpik} />
          <Stack.Screen name='CreateMelpik' component={CreateMelpik} />
          <Stack.Screen
            name='ContemporarySettings'
            component={ContemporarySettings}
          />
          <Stack.Screen name='SettingMelpik' component={SettingMelpik} />

          {/* Settlement */}
          <Stack.Screen name='SalesSettlement' component={SalesSettlement} />
          <Stack.Screen
            name='SalesSettlementDetail'
            component={SalesSettlementDetail}
          />
          <Stack.Screen
            name='SettlementRequest'
            component={SettlementRequest}
          />

          {/* Schedule */}
          <Stack.Screen name='Scedule' component={Scedule} />
          <Stack.Screen
            name='ScheduleConfirmation'
            component={ScheduleConfirmation}
          />
          <Stack.Screen
            name='ScheduleReservation1'
            component={ScheduleReservation1}
          />
          <Stack.Screen
            name='ScheduleReservation2'
            component={ScheduleReservation2}
          />
          <Stack.Screen
            name='ScheduleReservation3'
            component={ScheduleReservation3}
          />

          {/* LockerRoom */}
          <Stack.Screen name='LockerRoom' component={LockerRoom} />
          <Stack.Screen name='UsageHistory' component={UsageHistory} />
          <Stack.Screen name='Point' component={Point} />
          <Stack.Screen name='MyCloset' component={MyCloset} />
          <Stack.Screen name='MyTicket' component={MyTicket} />
          <Stack.Screen name='PurchaseOfPasses' component={PurchaseOfPasses} />
          <Stack.Screen name='TicketPayment' component={TicketPayment} />
          <Stack.Screen name='TicketDetail' component={TicketDetail} />

          {/* PaymentMethod & Reviews */}
          <Stack.Screen name='PaymentMethod' component={PaymentMethod} />
          <Stack.Screen name='AddCard' component={AddCard} />
          <Stack.Screen name='ProductReview' component={ProductReview} />
          <Stack.Screen
            name='ProductReviewWrite'
            component={ProductReviewWrite}
          />

          {/* CustomerService */}
          <Stack.Screen name='CustomerService' component={CustomerService} />
          <Stack.Screen
            name='FrequentlyAskedQuestions'
            component={FrequentlyAskedQuestions}
          />
          <Stack.Screen name='Notice' component={Notice} />
          <Stack.Screen name='NoticeDetail' component={NoticeDetail} />
          <Stack.Screen
            name='PersonalInformationProcessingPolicy'
            component={PersonalInformationProcessingPolicy}
          />
          <Stack.Screen
            name='PersonalInformationProcessingPolicyDetail'
            component={PersonalInformationProcessingPolicyDetail}
          />
          <Stack.Screen
            name='TermsAndConditionsOfUse'
            component={TermsAndConditionsOfUse}
          />
          <Stack.Screen
            name='TermsAndConditionsOfUseDetail'
            component={TermsAndConditionsOfUseDetail}
          />

          {/* Profile */}
          <Stack.Screen name='UpdateProfile' component={UpdateProfile} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} />
          <Stack.Screen
            name='DeliveryManagement'
            component={DeliveryManagement}
          />
          <Stack.Screen name='EditAddress' component={EditAddress} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  features: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  feature: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  testComponents: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  testBox: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  testText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  paymentForm: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 8,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    height: 40,
  },
  paymentButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
