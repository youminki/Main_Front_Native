import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../config/environment';

// 토큰 관리
export const TokenStorage = {
  // 액세스 토큰 저장
  setAccessToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(ENV.STORAGE_KEYS.ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Failed to save access token:', error);
    }
  },

  // 액세스 토큰 가져오기
  getAccessToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(ENV.STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  },

  // 리프레시 토큰 저장
  setRefreshToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(ENV.STORAGE_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Failed to save refresh token:', error);
    }
  },

  // 리프레시 토큰 가져오기
  getRefreshToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(ENV.STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Failed to get refresh token:', error);
      return null;
    }
  },

  // 모든 토큰 삭제
  clearTokens: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([
        ENV.STORAGE_KEYS.ACCESS_TOKEN,
        ENV.STORAGE_KEYS.REFRESH_TOKEN,
      ]);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  },
};

// 사용자 데이터 관리
export const UserStorage = {
  // 사용자 프로필 저장
  setUserProfile: async (profile: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(
        ENV.STORAGE_KEYS.USER_PROFILE,
        JSON.stringify(profile)
      );
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  },

  // 사용자 프로필 가져오기
  getUserProfile: async (): Promise<any | null> => {
    try {
      const profile = await AsyncStorage.getItem(ENV.STORAGE_KEYS.USER_PROFILE);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      return null;
    }
  },

  // 사용자 설정 저장
  setUserSettings: async (settings: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(
        ENV.STORAGE_KEYS.USER_SETTINGS,
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error('Failed to save user settings:', error);
    }
  },

  // 사용자 설정 가져오기
  getUserSettings: async (): Promise<any | null> => {
    try {
      const settings = await AsyncStorage.getItem(
        ENV.STORAGE_KEYS.USER_SETTINGS
      );
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Failed to get user settings:', error);
      return null;
    }
  },

  // 모든 사용자 데이터 삭제
  clearUserData: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([
        ENV.STORAGE_KEYS.USER_PROFILE,
        ENV.STORAGE_KEYS.USER_SETTINGS,
      ]);
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  },
};

// 일반 스토리지 유틸리티
export const Storage = {
  // 데이터 저장
  set: async (key: string, value: any): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  },

  // 데이터 가져오기
  get: async (key: string): Promise<any | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Failed to get data:', error);
      return null;
    }
  },

  // 데이터 삭제
  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove data:', error);
    }
  },

  // 모든 데이터 삭제
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear all data:', error);
    }
  },

  // 모든 키 가져오기
  getAllKeys: async (): Promise<readonly string[]> => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Failed to get all keys:', error);
      return [];
    }
  },
};
