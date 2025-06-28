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
  { icon: '📢', label: '공지사항', path: 'Notice' },
  { icon: '❓', label: '자주 묻는 질문', path: 'FrequentlyAskedQuestions' },
  { icon: '📋', label: '이용약관', path: 'TermsAndConditionsOfUse' },
  {
    icon: '🔒',
    label: '개인정보처리방침',
    path: 'PersonalInformationProcessingPolicy',
  },
];

const CustomerService: React.FC = () => {
  const navigation = useNavigation();

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
          <Text style={styles.title}>고객센터</Text>
          <Text style={styles.subtitle}>
            새로운 소식 및 서비스 안내를 드립니다.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statsSection}>
            <Text style={styles.statsLabel}>공지사항</Text>
            <Text style={styles.statsValue}>999</Text>
            <Text style={styles.statsLabel}>자주 묻는 질문</Text>
            <Text style={styles.statsValue}>999</Text>
            <Text style={styles.dateRange}>NEW 2025. 03.</Text>
          </View>
          <Text style={styles.icon}>🎧</Text>
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
  icon: {
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

export default CustomerService;
