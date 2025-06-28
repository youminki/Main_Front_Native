// src/components/BottomNav.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Tab {
  key: string;
  route: string;
  icon: string;
  label: string;
}

const TABS: Tab[] = [
  { key: 'home', route: 'Home', icon: '🏠', label: '홈' },
  { key: 'brand', route: 'Brand', icon: '��️', label: '브랜드' },
  { key: 'melpik', route: 'Melpik', icon: '👗', label: '멜픽' },
  {
    key: 'lockerRoom',
    route: 'LockerRoom',
    icon: '🎽',
    label: '락커룸',
  },
  {
    key: 'customerService',
    route: 'CustomerService',
    icon: '💬',
    label: '고객센터',
  },
];

const { width: screenWidth } = Dimensions.get('window');

const BottomNav: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [glow, setGlow] = useState(false);

  // activeKey 계산
  useEffect(() => {
    const current = TABS.find((t) => t.route === route.name);
    if (current) {
      setActiveKey(current.key);
    } else {
      setActiveKey(null);
    }
    setGlow(false);
    const t = setTimeout(() => setGlow(true), 300);
    return () => clearTimeout(t);
  }, [route.name]);

  const handleClick = (tab: Tab, enabled: boolean) => {
    if (!enabled) return;
    if (tab.key !== activeKey) {
      setGlow(false);
      navigation.navigate(tab.route as never);
    }
  };

  return (
    <View style={styles.dockContainer}>
      <View style={styles.dock}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeKey && glow;
          // home, brand, lockerRoom 만 활성화 예시
          const enabled =
            tab.key === 'home' ||
            tab.key === 'brand' ||
            tab.key === 'lockerRoom';
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.navItem, !enabled && styles.navItemDisabled]}
              onPress={() => handleClick(tab, enabled)}
              disabled={!enabled}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isActive && styles.iconWrapperActive,
                ]}
              >
                <Text
                  style={[
                    styles.iconText,
                    isActive && styles.iconTextActive,
                    !enabled && styles.iconTextDisabled,
                  ]}
                >
                  {tab.icon}
                </Text>
              </View>
              <Text
                style={[
                  styles.label,
                  isActive && styles.labelActive,
                  !enabled && styles.labelDisabled,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dockContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 1000,
  },
  dock: {
    flexDirection: 'row',
    backgroundColor: '#1d1d1b',
    borderRadius: 32,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemDisabled: {
    opacity: 0.5,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconWrapperActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
  },
  iconText: {
    fontSize: 24,
    color: '#fff',
  },
  iconTextActive: {
    color: '#f6ac36',
  },
  iconTextDisabled: {
    color: '#666',
  },
  label: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  labelActive: {
    color: '#f6ac36',
    fontWeight: '700',
  },
  labelDisabled: {
    color: '#666',
  },
});

export default BottomNav;
