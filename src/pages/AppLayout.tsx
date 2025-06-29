// src/layouts/AppLayout.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import UnifiedHeader from '../components/UnifiedHeader';
import BottomNav from '../components/BottomNav1';
import useHeaderConfig from '../hooks/useHeaderConfig';
import useImageLoader from '../hooks/useImageLoader';

import Home from './Home/Home';
import Login from './Login';
import Signup from './Signup';
import FindId from './FindId';
import FindPassword from './FindPassword';
import Basket from './Basket';
import Payment from './Payment';
import Brand from './Brand/Brand';
import BrandDetail from './Brand/BrandDetail';
import LockerRoom from './LockerRoom/LockerRoom';
import MyCloset from './LockerRoom/MyCloset/MyCloset';
import MyTicket from './LockerRoom/MyTicket/MyTicket';
import TicketDetail from './LockerRoom/MyTicket/TicketDetail';
import PurchaseOfPasses from './LockerRoom/MyTicket/PurchaseOfPasses';
import TicketPayment from './LockerRoom/MyTicket/TicketPayment';
import PaymentMethod from './LockerRoom/PaymentMethod/PaymentMethod';
import AddCard from './LockerRoom/PaymentMethod/AddCard';
import Point from './LockerRoom/Point/Point';
import ProductReview from './LockerRoom/ProductReview/ProductReview';
import ProductReviewWrite from './LockerRoom/ProductReview/ProductReviewWrite';
import UsageHistory from './LockerRoom/UsageHistory/UsageHistory';
import CustomerService from './CustomerService/CustomerService';
import Notice from './CustomerService/Notice/Notice';
import NoticeDetail from './CustomerService/Notice/NoticeDetail';
import FrequentlyAskedQuestions from './CustomerService/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import TermsAndConditionsOfUse from './CustomerService/TermsAndConditionsOfUse/TermsAndConditionsOfUse';
import TermsAndConditionsOfUseDetail from './CustomerService/TermsAndConditionsOfUse/TermsAndConditionsOfUseDetail';
import PersonalInformationProcessingPolicy from './CustomerService/PersonalInformationProcessingPolicy/PersonalInformationProcessingPolicy';
import PersonalInformationProcessingPolicyDetail from './CustomerService/PersonalInformationProcessingPolicy/PersonalInformationProcessingPolicyDetail';
import Melpik from './Melpik/Melpik';
import CreateMelpik from './Melpik/Create/CreateMelpik';
import CreateMelpikSettings from './Melpik/Create/ContemporarySettings';
import Schedule from './Melpik/Schedule/Scedule';
import ScheduleReservation1 from './Melpik/Schedule/ScheduleReservation1';
import ScheduleReservation2 from './Melpik/Schedule/ScheduleReservation2';
import ScheduleReservation3 from './Melpik/Schedule/ScheduleReservation3';
import ScheduleConfirmation from './Melpik/Schedule/ScheduleConfirmation';
import SettingMelpik from './Melpik/Setting/SettingMelpik';
import SalesSettlement from './Melpik/Calculate/SalesSettlement';
import SalesSettlementDetail from './Melpik/Calculate/SalesSettlementDetail';
import SettlementRequest from './Melpik/Calculate/SettlementRequest';
import Mystyle from './MyStyle';
import ChangePassword from './profile/ChangePassword';
import DeliveryManagement from './profile/DeliveryManagement';
import EditAddress from './profile/EditAddress';
import UpdateProfile from './profile/UpdateProfile';
import Analysis from './Analysis';
import Alarm from './Alarm';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  FindId: undefined;
  FindPassword: undefined;
  Basket: undefined;
  Payment: { itemData: any[] };
  Brand: undefined;
  BrandDetail: { brandId: string };
  LockerRoom: undefined;
  MyCloset: undefined;
  MyTicket: undefined;
  TicketDetail: { ticketId: string };
  PurchaseOfPasses: { name: string };
  TicketPayment: { name: string; discountedPrice: string };
  PaymentMethod: undefined;
  AddCard: undefined;
  Point: undefined;
  ProductReview: undefined;
  ProductReviewWrite: undefined;
  UsageHistory: undefined;
  CustomerService: undefined;
  Notice: undefined;
  NoticeDetail: undefined;
  FrequentlyAskedQuestions: undefined;
  TermsAndConditionsOfUse: undefined;
  TermsAndConditionsOfUseDetail: undefined;
  PersonalInformationProcessingPolicy: undefined;
  PersonalInformationProcessingPolicyDetail: undefined;
  Melpik: undefined;
  CreateMelpik: undefined;
  CreateMelpikSettings: undefined;
  Schedule: undefined;
  ScheduleReservation1: undefined;
  ScheduleReservation2: { range: any };
  ScheduleReservation3: undefined;
  ScheduleConfirmation: undefined;
  SettingMelpik: undefined;
  SalesSettlement: undefined;
  SalesSettlementDetail: { id: string };
  SettlementRequest: undefined;
  Mystyle: undefined;
  ChangePassword: undefined;
  DeliveryManagement: undefined;
  EditAddress: undefined;
  UpdateProfile: undefined;
  Analysis: undefined;
  Alarm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppLayout: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const publicPaths = [
          'Signup',
          'FindId',
          'FindPassword',
          'Landing',
          'Login',
          'PersonalLink',
        ];
        if (!publicPaths.includes(route.name) && !token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as keyof RootStackParamList }],
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuth();
  }, [route.name, navigation]);

  const {
    includeHeader1,
    includeHeader2,
    includeHeader3,
    includeHeader4,
    includeBottomNav,
    headerTitle,
    disablePadding,
  } = useHeaderConfig();

  const { loading, handleBackWithExit } = useImageLoader();

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size='large' color='#f6ac36' />
      </View>
    );
  }

  // BottomNav 표시 대상 경로
  const bottomNavPaths = [
    'Home',
    'Brand',
    'Melpik',
    'LockerRoom',
    'CustomerService',
  ];

  return (
    <View style={styles.appContainer}>
      {includeHeader1 && <UnifiedHeader variant='default' />}
      {includeHeader2 && <UnifiedHeader variant='oneDepth' />}
      {includeHeader3 && (
        <UnifiedHeader
          variant='twoDepth'
          title={headerTitle}
          onBack={handleBackWithExit}
        />
      )}
      {includeHeader4 && (
        <UnifiedHeader
          variant='threeDepth'
          title={headerTitle}
          onBack={handleBackWithExit}
        />
      )}

      <View
        style={[styles.contentContainer, disablePadding && styles.noPadding]}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='FindId' component={FindId} />
          <Stack.Screen name='FindPassword' component={FindPassword} />
          <Stack.Screen name='Basket' component={Basket} />
          <Stack.Screen name='Payment' component={Payment} />
          <Stack.Screen name='Brand' component={Brand} />
          <Stack.Screen name='BrandDetail' component={BrandDetail} />
          <Stack.Screen name='LockerRoom' component={LockerRoom} />
          <Stack.Screen name='MyCloset' component={MyCloset} />
          <Stack.Screen name='MyTicket' component={MyTicket} />
          <Stack.Screen name='TicketDetail' component={TicketDetail} />
          <Stack.Screen name='PurchaseOfPasses' component={PurchaseOfPasses} />
          <Stack.Screen name='TicketPayment' component={TicketPayment} />
          <Stack.Screen name='PaymentMethod' component={PaymentMethod} />
          <Stack.Screen name='AddCard' component={AddCard} />
          <Stack.Screen name='Point' component={Point} />
          <Stack.Screen name='ProductReview' component={ProductReview} />
          <Stack.Screen
            name='ProductReviewWrite'
            component={ProductReviewWrite}
          />
          <Stack.Screen name='UsageHistory' component={UsageHistory} />
          <Stack.Screen name='CustomerService' component={CustomerService} />
          <Stack.Screen name='Notice' component={Notice} />
          <Stack.Screen name='NoticeDetail' component={NoticeDetail} />
          <Stack.Screen
            name='FrequentlyAskedQuestions'
            component={FrequentlyAskedQuestions}
          />
          <Stack.Screen
            name='TermsAndConditionsOfUse'
            component={TermsAndConditionsOfUse}
          />
          <Stack.Screen
            name='TermsAndConditionsOfUseDetail'
            component={TermsAndConditionsOfUseDetail}
          />
          <Stack.Screen
            name='PersonalInformationProcessingPolicy'
            component={PersonalInformationProcessingPolicy}
          />
          <Stack.Screen
            name='PersonalInformationProcessingPolicyDetail'
            component={PersonalInformationProcessingPolicyDetail}
          />
          <Stack.Screen name='Melpik' component={Melpik} />
          <Stack.Screen name='CreateMelpik' component={CreateMelpik} />
          <Stack.Screen
            name='CreateMelpikSettings'
            component={CreateMelpikSettings}
          />
          <Stack.Screen name='Schedule' component={Schedule} />
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
          <Stack.Screen
            name='ScheduleConfirmation'
            component={ScheduleConfirmation}
          />
          <Stack.Screen name='SettingMelpik' component={SettingMelpik} />
          <Stack.Screen name='SalesSettlement' component={SalesSettlement} />
          <Stack.Screen
            name='SalesSettlementDetail'
            component={SalesSettlementDetail}
          />
          <Stack.Screen
            name='SettlementRequest'
            component={SettlementRequest}
          />
          <Stack.Screen name='Mystyle' component={Mystyle} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} />
          <Stack.Screen
            name='DeliveryManagement'
            component={DeliveryManagement}
          />
          <Stack.Screen name='EditAddress' component={EditAddress} />
          <Stack.Screen name='UpdateProfile' component={UpdateProfile} />
          <Stack.Screen name='Analysis' component={Analysis} />
          <Stack.Screen name='Alarm' component={Alarm} />
        </Stack.Navigator>
      </View>

      {includeBottomNav && bottomNavPaths.includes(route.name) && <BottomNav />}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  noPadding: {
    paddingHorizontal: 0,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AppLayout;
