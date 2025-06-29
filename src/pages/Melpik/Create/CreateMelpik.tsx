import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StatsSection from '../../../components/StatsSection';
import ContentList from '../../../components/Melpik/CreateMelpik/ContentList';

const visitLabel = '인스타 계정';
const salesLabel = '현재 등록수  ';
const visits = '@styleweex';
const sales = '2';
const dateRange = 'Now';

const CreateMelpik: React.FC = () => {
  return (
    <ScrollView style={styles.createMelpikContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>멜픽 생성</Text>
        <Text style={styles.subtitle}>내 채널을 통해 나는 브랜드가 된다</Text>
      </View>

      <StatsSection
        visits={visits}
        sales={sales}
        dateRange={dateRange}
        visitLabel={visitLabel}
        salesLabel={salesLabel}
      />
      <View style={styles.divider} />
      <View style={styles.contentWrapper}>
        <ContentList />
      </View>
    </ScrollView>
  );
};

export default CreateMelpik;

// --- Styles ---
const styles = StyleSheet.create({
  createMelpikContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 6,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    lineHeight: 27,
    color: '#000000',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ccc',
  },
  contentWrapper: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 30,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#dddddd',
    marginTop: 30,
  },
});
