// src/pages/LockerRoom.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getMembershipInfo, MembershipInfo } from '../../api/user/userApi';

const menuItems = [
  { icon: '👕', label: '내 옷장', path: 'MyCloset', disabled: false },
  { icon: '📋', label: '이용내역', path: 'UsageHistory', disabled: false },
  { icon: '💰', label: '포인트', path: 'Point', disabled: true },
  { icon: '🎫', label: '이용권', path: 'MyTicket', disabled: false },
  { icon: '💳', label: '결제수단', path: 'PaymentMethod', disabled: false },
  { icon: '⭐', label: '상품리뷰', path: 'ProductReview', disabled: true },
];

const LockerRoom: React.FC = () => {
  const navigation = useNavigation();
  const [membership, setMembership] = useState<MembershipInfo | null>(null);

  useEffect(() => {
    getMembershipInfo()
      .then((res) => {
        setMembership(res);
      })
      .catch((err) => {
        console.error('멤버십 정보 조회 실패', err);
      });
  }, []);

  const handleMenuPress = (item: (typeof menuItems)[0]) => {
    if (!item.disabled) {
      navigation.navigate(item.path as never);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>락커룸</Text>
          <Text style={styles.subtitle}>
            나에게 맞는 스타일을 찾을 때는 멜픽!
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statsSection}>
            <Text style={styles.statsLabel}>그룹</Text>
            <Text style={styles.statsValue}>{membership?.name ?? '—'}</Text>
            <Text style={styles.statsLabel}>보유 포인트</Text>
            <Text style={styles.statsValue}>0</Text>
          </View>
          <Text style={styles.menuIcon}>🎽</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.gridMenu}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.gridItem,
                item.disabled && styles.gridItemDisabled,
              ]}
              onPress={() => handleMenuPress(item)}
              disabled={item.disabled}
            >
              <View style={styles.iconLabelRow}>
                <Text style={styles.iconText}>{item.icon}</Text>
                <Text
                  style={[styles.label, item.disabled && styles.labelDisabled]}
                >
                  {item.label}
                </Text>
              </View>
              <View style={styles.pickButton}>
                <Text style={styles.pickButtonText}>
                  PICK <Text style={styles.arrow}>→</Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
  header: {
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    margin: 0,
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 28,
    margin: 0,
    color: '#cccccc',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  statsSection: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  menuIcon: {
    fontSize: 40,
    marginLeft: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  gridMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
  },
  gridItemDisabled: {
    opacity: 0.5,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
    marginRight: 8,
  },
  label: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
  },
  labelDisabled: {
    color: '#999',
  },
  pickButton: {
    alignSelf: 'flex-end',
  },
  pickButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  arrow: {
    color: '#f6ac36',
  },
});

export default LockerRoom;
