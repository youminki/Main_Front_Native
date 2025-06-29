import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatsSection from '../../../components/StatsSection';
import SearchIcon from '../../../assets/CustomerService/SearchIcon.svg';

const PeriodSection = ({
  selectedPeriod,
  setSelectedPeriod,
}: {
  selectedPeriod: number;
  setSelectedPeriod: (period: number) => void;
}) => {
  return (
    <View style={styles.settlementHeader}>
      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 1 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(1)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 1 && styles.periodButtonTextActive,
            ]}
          >
            공지
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 2 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(2)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 2 && styles.periodButtonTextActive,
            ]}
          >
            안내
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchInput} placeholder='검색' />
        <SearchIcon width={16} height={16} />
      </View>
    </View>
  );
};

const Notice: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const navigation = useNavigation<any>();

  const handleItemClick = () => {
    navigation.navigate('NoticeDetail' as any);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>공지사항</Text>
        <Text style={styles.subtitle}>
          새로운 소식 및 서비스 안내를 드립니다.
        </Text>
      </View>

      <StatsSection
        visits='999'
        sales='999'
        dateRange='NEW 2025. 03.'
        visitLabel='전체'
        salesLabel='최근 업데이트'
      />
      <View style={styles.divider} />

      <View style={styles.section}>
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <View style={styles.listContainer}>
          {[
            {
              title: '공지 / 새로운 시즌 의류 업데이트 (2025 봄)',
              date: '2025.02.01',
              bold: '공지',
            },
            {
              title: '공지 / 새로운 시즌 의류 업데이트 (2025 봄)',
              date: '2025.02.01',
              bold: '공지',
            },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.listItem}
              onPress={handleItemClick}
            >
              <View style={styles.textWrapper}>
                <Text style={styles.itemTitle}>
                  <Text style={styles.boldText}>{item.bold}</Text>
                  {item.title.replace(item.bold, '')}
                </Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
              <View style={styles.bullet} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 6,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 27,
    color: '#000',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ccc',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#dddddd',
    marginTop: 30,
  },
  section: {
    width: '100%',
    paddingBottom: 80,
    marginTop: 30,
  },
  settlementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
  },
  periodSelector: {
    flexDirection: 'row',
    marginRight: 10,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 36,
    marginRight: 8,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  periodButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  periodButtonText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 11,
    color: '#000',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dddddd',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  textWrapper: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginLeft: 12,
  },
});
