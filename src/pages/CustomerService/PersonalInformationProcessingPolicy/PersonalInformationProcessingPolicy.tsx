import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatsSection from '../../../components/StatsSection';

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
            개인정보방침
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 3 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(3)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 3 && styles.periodButtonTextActive,
            ]}
          >
            파기절차
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 4 && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(4)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === 4 && styles.periodButtonTextActive,
            ]}
          >
            기타
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PersonalInformationProcessingPolicy: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const navigation = useNavigation();

  const handleItemClick = () => {
    navigation.navigate('PersonalInformationProcessingPolicyDetail' as never);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>개인정보처리방침</Text>
        <Text style={styles.subtitle}>
          서비스 이용에 따른 정책을 안내 드립니다.
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
              title: '개인정보방침 / 개인정보의 항목 및 수집방법',
              date: '2025.02.01',
              bold: '개인정보방침',
            },
            {
              title: '개인정보방침 / 개인정보의 이용목적',
              date: '2025.02.01',
              bold: '개인정보방침',
            },
            {
              title: '개인정보방침 / 개인정보의 보유 및 이용기간',
              date: '2025.02.01',
              bold: '개인정보방침',
            },
            {
              title: '개인정보방침 / 동의의 거부권 및 거부시 고지사항',
              date: '2025.02.01',
              bold: '개인정보방침',
            },
            {
              title: '파기절차 / 개인정보의 파기절차 및 방법',
              date: '2025.02.01',
              bold: '파기절차',
            },
            {
              title: '기타 / 고지 의무에 따른 안내사항',
              date: '2025.02.01',
              bold: '기타',
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

export default PersonalInformationProcessingPolicy;

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
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  periodButtonActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  periodButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  periodButtonTextActive: {
    color: '#fff',
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
