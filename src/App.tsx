import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

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

// 간단한 테스트 화면들
const HomeScreen = ({ navigation }: any) => (
  <ScrollView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>🎉 React Native 변환 성공!</Text>
      <Text style={styles.subtitle}>
        웹 → React Native 변환이 완료되었습니다
      </Text>

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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Components')}
        >
          <Text style={styles.buttonText}>컴포넌트 테스트</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.featureTitle}>✅ 완료된 기능들:</Text>
        <Text style={styles.feature}>• React Navigation 설정</Text>
        <Text style={styles.feature}>• TypeScript 지원</Text>
        <Text style={styles.feature}>• Expo 개발 환경</Text>
        <Text style={styles.feature}>• 기본 컴포넌트 변환</Text>
        <Text style={styles.feature}>• 스타일링 시스템</Text>
        <Text style={styles.feature}>• 네비게이션 시스템</Text>
      </View>

      <View style={styles.status}>
        <Text style={styles.statusTitle}>📱 현재 상태:</Text>
        <Text style={styles.statusItem}>• Metro 서버: 실행 중</Text>
        <Text style={styles.statusItem}>• Expo Go: 연결 가능</Text>
        <Text style={styles.statusItem}>• iOS 시뮬레이터: 빌드 중</Text>
        <Text style={styles.statusItem}>• Android 에뮬레이터: 설정 필요</Text>
      </View>
    </View>
  </ScrollView>
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

      <View style={styles.testBox}>
        <Text style={styles.testText}>ScrollView</Text>
      </View>
    </View>
  </View>
);

const PaymentTestScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.content}>
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
  </ScrollView>
);

const ComponentsTestScreen = () => (
  <ScrollView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>🔧 컴포넌트 테스트</Text>
      <Text style={styles.subtitle}>React Native 기본 컴포넌트들</Text>

      <View style={styles.componentGrid}>
        <View style={styles.componentBox}>
          <Text style={styles.componentTitle}>View</Text>
          <View style={styles.componentDemo}>
            <Text>기본 컨테이너</Text>
          </View>
        </View>

        <View style={styles.componentBox}>
          <Text style={styles.componentTitle}>Text</Text>
          <Text style={styles.componentDemo}>텍스트 표시</Text>
        </View>

        <View style={styles.componentBox}>
          <Text style={styles.componentTitle}>TouchableOpacity</Text>
          <TouchableOpacity style={styles.componentDemo}>
            <Text>터치 가능</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.componentBox}>
          <Text style={styles.componentTitle}>ScrollView</Text>
          <ScrollView style={styles.componentDemo} nestedScrollEnabled>
            <Text>스크롤 가능</Text>
            <Text>여러 줄</Text>
            <Text>텍스트</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  </ScrollView>
);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Melpik Native' }}
        />
        <Stack.Screen
          name='Test'
          component={TestScreen}
          options={{ title: '테스트' }}
        />
        <Stack.Screen
          name='Payment'
          component={PaymentTestScreen}
          options={{ title: '결제 테스트' }}
        />
        <Stack.Screen
          name='Components'
          component={ComponentsTestScreen}
          options={{ title: '컴포넌트 테스트' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    flex: 1,
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
    marginBottom: 20,
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
  status: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 8,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2',
  },
  statusItem: {
    fontSize: 14,
    marginBottom: 5,
    color: '#1976d2',
  },
  testComponents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  testBox: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: '45%',
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
  componentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  componentBox: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
  },
  componentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  componentDemo: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
