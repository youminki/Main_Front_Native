import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import AgreementSection from '../../../components/Melpik/settlement/SettlementAgreementSection';
import InputField from '../../../components/InputField';
import FixedBottomBar from '../../../components/FixedBottomBar';

const SettlementRequest: React.FC = () => {
  const taxRate = 0.04;

  const preTaxAmount = 90000;
  const taxAmount = Math.floor(preTaxAmount * taxRate);
  const netAmount = preTaxAmount - taxAmount;

  return (
    <ScrollView style={styles.container}>
      <AgreementSection />
      <InputField
        label='실 정산금액'
        id='netAmount'
        type='text'
        value={netAmount.toLocaleString()}
        readOnly
      />

      <View style={styles.rowContainer}>
        <InputField
          label='정산금액 (세전)'
          id='preTaxAmount'
          type='text'
          value={preTaxAmount.toLocaleString()}
          readOnly
        />

        <InputField
          label='공제세액 (4%)'
          id='taxAmount'
          type='text'
          value={`- ${taxAmount.toLocaleString()}`}
          readOnly
        />
      </View>

      <Text style={styles.notice1}>
        ※ 정산금액은 세액 공제 및 신고비용을 제외한 나머지 금액입니다.
      </Text>
      <Text style={styles.notice2}>
        정산 가능시간 (평일 09:00 ~ 22:00) /{' '}
        <Text style={styles.highlight}>공휴일 신청불가</Text>
      </Text>

      <FixedBottomBar
        text='신청완료'
        color='yellow'
        onPress={() => Alert.alert('알림', '신청이 완료되었습니다')}
      />
    </ScrollView>
  );
};

export default SettlementRequest;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  notice1: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 13,
    color: '#999999',
    marginTop: 10,
  },
  notice2: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 13,
    color: '#000000',
    marginTop: 0,
    paddingHorizontal: 15,
  },
  highlight: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 13,
    color: '#ef4523',
  },
});
