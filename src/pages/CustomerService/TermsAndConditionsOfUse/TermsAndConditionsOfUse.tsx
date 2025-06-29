import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
            전체
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
            서비스 정책
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
            판매정책
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
            훼손정책
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TermsAndConditionsOfUse: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>이용약관</Text>
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
              title: '서비스 정책 / 제1장 총칙',
              date: '2025.02.01',
              bold: '서비스 정책',
            },
            {
              title: '서비스 정책 / 제2장 회원가입 사항',
              date: '2025.02.01',
              bold: '서비스 정책',
            },
            {
              title: '서비스 정책 / 제3장 회사의 서비스 (대여)',
              date: '2025.02.01',
              bold: '서비스 정책',
            },
            {
              title: '서비스 정책 / 제4장 회사의 서비스 (구매)',
              date: '2025.02.01',
              bold: '서비스 정책',
            },
            {
              title: '판매정책 / 회사에서 제공하는 판매 서비스 사항',
              date: '2025.02.01',
              bold: '판매정책',
            },
            {
              title: '판매정책 / 판매 서비스 정산의 정의',
              date: '2025.02.01',
              bold: '판매정책',
            },
          ].map((item, idx) => (
            <View key={idx} style={styles.listItem}>
              <View style={styles.textWrapper}>
                <Text style={styles.itemTitle}>
                  <Text style={styles.boldText}>{item.bold}</Text>
                  {item.title.replace(item.bold, '')}
                </Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
              <View style={styles.bullet} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default TermsAndConditionsOfUse;

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
