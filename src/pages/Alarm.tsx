import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface AlarmItem {
  id: number;
  type: 'order' | 'delivery' | 'system' | 'promotion';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  imageUrl?: string;
}

const Alarm: React.FC = () => {
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState<AlarmItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 임시 데이터 로드
    const mockAlarms: AlarmItem[] = [
      {
        id: 1,
        type: 'order',
        title: '주문 완료',
        message: '주문하신 상품이 성공적으로 처리되었습니다.',
        timestamp: '2024-01-15 14:30',
        isRead: false,
      },
      {
        id: 2,
        type: 'delivery',
        title: '배송 시작',
        message: '주문하신 상품이 배송을 시작했습니다.',
        timestamp: '2024-01-14 09:15',
        isRead: true,
      },
      {
        id: 3,
        type: 'system',
        title: '시스템 점검',
        message: '서비스 점검이 완료되었습니다.',
        timestamp: '2024-01-13 16:45',
        isRead: true,
      },
      {
        id: 4,
        type: 'promotion',
        title: '특별 할인',
        message: '신규 회원을 위한 특별 할인 이벤트가 시작되었습니다.',
        timestamp: '2024-01-12 10:20',
        isRead: false,
      },
    ];

    setTimeout(() => {
      setAlarms(mockAlarms);
      setLoading(false);
    }, 1000);
  }, []);

  const getAlarmIcon = (type: string) => {
    switch (type) {
      case 'order':
        return '📦';
      case 'delivery':
        return '🚚';
      case 'system':
        return '⚙️';
      case 'promotion':
        return '🎉';
      default:
        return '🔔';
    }
  };

  const getAlarmColor = (type: string) => {
    switch (type) {
      case 'order':
        return '#4CAF50';
      case 'delivery':
        return '#2196F3';
      case 'system':
        return '#FF9800';
      case 'promotion':
        return '#E91E63';
      default:
        return '#666';
    }
  };

  const handleAlarmPress = (alarm: AlarmItem) => {
    // 알림을 읽음 상태로 변경
    setAlarms((prev) =>
      prev.map((item) =>
        item.id === alarm.id ? { ...item, isRead: true } : item
      )
    );

    // 알림 타입에 따른 네비게이션
    switch (alarm.type) {
      case 'order':
        navigation.navigate('MyTicket' as never);
        break;
      case 'delivery':
        navigation.navigate('UsageHistory' as never);
        break;
      case 'promotion':
        navigation.navigate('Home' as never);
        break;
      default:
        break;
    }
  };

  const markAllAsRead = () => {
    setAlarms((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const deleteAllRead = () => {
    setAlarms((prev) => prev.filter((item) => !item.isRead));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

  const unreadCount = alarms.filter((alarm) => !alarm.isRead).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>알림</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.headerActionText}>모두 읽음</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAllRead}>
            <Text style={styles.headerActionText}>읽은 알림 삭제</Text>
          </TouchableOpacity>
        </View>
      </View>

      {alarms.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyText}>알림이 없습니다</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.alarmList}
          showsVerticalScrollIndicator={false}
        >
          {alarms.map((alarm) => (
            <TouchableOpacity
              key={alarm.id}
              style={[styles.alarmItem, !alarm.isRead && styles.unreadAlarm]}
              onPress={() => handleAlarmPress(alarm)}
            >
              <View style={styles.alarmIcon}>
                <Text style={styles.iconText}>{getAlarmIcon(alarm.type)}</Text>
              </View>
              <View style={styles.alarmContent}>
                <View style={styles.alarmHeader}>
                  <Text style={styles.alarmTitle}>{alarm.title}</Text>
                  <Text style={styles.alarmTime}>{alarm.timestamp}</Text>
                </View>
                <Text style={styles.alarmMessage}>{alarm.message}</Text>
                {!alarm.isRead && <View style={styles.unreadIndicator} />}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{unreadCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerActionText: {
    fontSize: 14,
    color: '#f6ac36',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  alarmList: {
    flex: 1,
  },
  alarmItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  unreadAlarm: {
    backgroundColor: '#f8f9fa',
  },
  alarmIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  alarmContent: {
    flex: 1,
  },
  alarmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  alarmTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  alarmTime: {
    fontSize: 12,
    color: '#999',
  },
  alarmMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f6ac36',
    marginTop: 8,
  },
  unreadBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Alarm;
