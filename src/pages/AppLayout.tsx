// src/layouts/AppLayout.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UnifiedHeader from '../components/UnifiedHeader';
import BottomNav from '../components/BottomNav1';
import useHeaderConfig from '../hooks/useHeaderConfig';
import useImageLoader from '../hooks/useImageLoader';

const AppLayout: React.FC = () => {
  const navigation = useNavigation();
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
            routes: [{ name: 'Login' }],
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
  } = useHeaderConfig(route.name);

  const { loading, handleBackWithExit } = useImageLoader(
    navigation,
    route.name
  );

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
        {/* React Navigation의 자식 컴포넌트들이 여기에 렌더링됩니다 */}
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
    paddingTop: 70,
    paddingBottom: 70,
    backgroundColor: '#fff',
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default AppLayout;
