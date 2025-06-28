import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  { icon: '👕', label: '내 옷장', path: 'CreateMelpik' },
  { icon: '📅', label: '이용 내역', path: 'Scedule' },
  { icon: '💰', label: '포인트', path: 'SalesSettlement' },
  { icon: '⚙️', label: '티켓', path: 'SettingMelpik' },
];

const MelpikPage: React.FC = () => {
  const navigation = useNavigation();

  const visits = 174;
  const sales = 26;
  const dateRange = '2025.01.06 ~ 01.10';
  const visitLabel = '방문수';
  const salesLabel = '판매된 제품수';

  const handleMenuPress = (item: (typeof menuItems)[0]) => {
    navigation.navigate(item.path as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>멜픽</Text>
          <Text style={styles.subtitle}>내 채널을 통해 나는 브랜드가 된다</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statsSection}>
            <Text style={styles.statsLabel}>{visitLabel}</Text>
            <Text style={styles.statsValue}>{visits}</Text>
            <Text style={styles.statsLabel}>{salesLabel}</Text>
            <Text style={styles.statsValue}>{sales}</Text>
            <Text style={styles.dateRange}>{dateRange}</Text>
          </View>
          <Text style={styles.menuIcon}>🎽</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.gridMenu}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.gridItem}
              onPress={() => handleMenuPress(item)}
            >
              <View style={styles.iconLabelRow}>
                <Text style={styles.iconText}>{item.icon}</Text>
                <Text style={styles.label}>{item.label}</Text>
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
  dateRange: {
    fontSize: 10,
    color: '#999',
    marginTop: 8,
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

export default MelpikPage;
