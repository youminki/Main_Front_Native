// src/pages/MyinfoList.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getHeaderInfo, HeaderInfoResponse } from '../api/user/userApi';

const MENU_ITEMS = [
  {
    key: 'info',
    title: '회원정보 변경',
    desc: '이름, 생년월일, 성별, 휴대전화, 서비스 지역',
    icon: '👤',
  },
  {
    key: 'password',
    title: '비밀번호 변경',
    desc: '8자리 이상 (문자, 숫자, 특수문자 조합)',
    icon: '🔒',
  },
  {
    key: 'address',
    title: '배송지 관리',
    desc: '배송지명, 우편번호, 상세주소',
    icon: '📍',
  },
];

const MyinfoList: React.FC = () => {
  const navigation = useNavigation();
  const [notifyOn, setNotifyOn] = useState(false);

  // 프로필 관련: API 호출 결과 저장
  const [headerInfo, setHeaderInfo] = useState<HeaderInfoResponse | null>(null);
  const [loadingHeader, setLoadingHeader] = useState<boolean>(true);

  // 마운트 시 헤더 정보 조회
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        setLoadingHeader(true);
        const data = await getHeaderInfo();
        setHeaderInfo(data);
      } catch (err) {
        console.error('헤더 정보 조회 실패:', err);
      } finally {
        setLoadingHeader(false);
      }
    };
    fetchHeader();
  }, []);

  const handleMenuClick = (key: string) => {
    if (key === 'info') {
      navigation.navigate('UpdateProfile' as never);
    } else if (key === 'password') {
      navigation.navigate('ChangePassword' as never);
    } else if (key === 'address') {
      navigation.navigate('DeliveryManagement' as never);
    }
  };

  const handleProfileClick = () => {
    Alert.alert('준비 중입니다', '아직 구현 전인 기능이에요.');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* PROFILE */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={handleProfileClick}
          >
            <Text style={styles.avatarIcon}>👤</Text>
            <View style={styles.plusBadge}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.profileBox}>
            {loadingHeader ? (
              <>
                <Text style={styles.email}>로딩 중...</Text>
                <Text style={styles.nickname}>닉네임 불러오는 중</Text>
              </>
            ) : headerInfo ? (
              <>
                <Text style={styles.email}>{headerInfo.email}</Text>
                <Text style={styles.nickname}>
                  닉네임: {headerInfo.nickname}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.email}>정보를 가져올 수 없습니다.</Text>
                <Text style={styles.nickname}>닉네임: -</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        {/* MENU LIST */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map(({ key, title, desc, icon }) => (
            <TouchableOpacity
              key={key}
              style={styles.menuItem}
              onPress={() => handleMenuClick(key)}
            >
              <View style={styles.iconBox}>
                <Text style={styles.iconText}>{icon}</Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.menuTitle}>{title}</Text>
                <Text style={styles.menuDesc}>{desc}</Text>
              </View>
              <View style={styles.panel}>
                <Text style={styles.pickText}>PICK</Text>
                <Text style={styles.arrowIcon}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 알림 설정 */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>알림 설정</Text>
          <View style={styles.sectionBody}>
            <Text style={styles.statusText}>
              상태 | <Text style={styles.strongText}>알림 받기</Text>
            </Text>
            <TouchableOpacity
              style={styles.toggleWrapper}
              onPress={() => setNotifyOn((v) => !v)}
            >
              <View style={[styles.toggleBg, notifyOn && styles.toggleBgOn]} />
              <View
                style={[styles.toggleCircle, notifyOn && styles.toggleCircleOn]}
              >
                <Text style={styles.toggleText}>{notifyOn ? 'ON' : 'OFF'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarIcon: {
    fontSize: 40,
  },
  plusBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    backgroundColor: '#f6ae24',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileBox: {
    flex: 1,
    marginLeft: 12,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  nickname: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  menuList: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  textBox: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuDesc: {
    fontSize: 12,
    color: '#666',
  },
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginRight: 8,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#f6ac36',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  sectionBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  strongText: {
    fontWeight: '600',
    color: '#333',
  },
  toggleWrapper: {
    position: 'relative',
    width: 60,
    height: 30,
  },
  toggleBg: {
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ddd',
  },
  toggleBgOn: {
    backgroundColor: '#f6ac36',
  },
  toggleCircle: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleCircleOn: {
    left: 32,
  },
  toggleText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
  },
});

export default MyinfoList;
