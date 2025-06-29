import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ReusableModal from '../../ReusableModal';

type AgreementSectionProps = Record<string, never>;

type IndividualChecks = {
  agree1: boolean;
  agree2: boolean;
};

const AgreementSection: React.FC<AgreementSectionProps> = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState<IndividualChecks>({
    agree1: false,
    agree2: false,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleAllChecked = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setIndividualChecks({
      agree1: newValue,
      agree2: newValue,
    });
  };

  const handleIndividualCheck = (id: keyof IndividualChecks) => {
    setIndividualChecks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleViewDetails = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.agreementWrapper}>
      <View style={styles.allAgreeWrapper}>
        <TouchableOpacity
          style={[styles.checkbox, allChecked && styles.checkboxChecked]}
          onPress={handleAllChecked}
        >
          {allChecked && <View style={styles.checkmark} />}
        </TouchableOpacity>
        <Text style={styles.label}>전체동의</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.checkboxWrapper}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              individualChecks.agree1 && styles.checkboxChecked,
            ]}
            onPress={() => handleIndividualCheck('agree1')}
          >
            {individualChecks.agree1 && <View style={styles.checkmark} />}
          </TouchableOpacity>
          <Text style={styles.label}>
            정산에 따른 동의 <Text style={styles.requiredText}>(필수)</Text>
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>
              이용 전 필수사항 및 주의사항 안내.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={handleViewDetails}
          >
            <Text style={styles.viewDetailsButtonText}>전체보기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxWrapper}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              individualChecks.agree2 && styles.checkboxChecked,
            ]}
            onPress={() => handleIndividualCheck('agree2')}
          >
            {individualChecks.agree2 && <View style={styles.checkmark} />}
          </TouchableOpacity>
          <Text style={styles.label}>
            정산계좌 확인 <Text style={styles.requiredText}>(필수)</Text>
          </Text>
        </View>
        <TextInput
          style={styles.readonlyInput}
          value='234501-04-654122 (국민) - 홍길동'
          editable={false}
        />
      </View>

      <ReusableModal visible={modalVisible} onClose={closeModal} title='알림'>
        정산처리가 완료 되었습니다.
      </ReusableModal>
    </View>
  );
};

export default AgreementSection;

const styles = StyleSheet.create({
  agreementWrapper: {
    backgroundColor: '#ffffff',
    marginBottom: 20,
    width: '100%',
  },
  allAgreeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentContainer: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    position: 'relative',
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#ff8c00',
  },
  checkmark: {
    width: 10,
    height: 5,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#ff8c00',
    transform: [{ rotate: '-45deg' }],
  },
  label: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 13,
    color: '#000000',
  },
  requiredText: {
    color: '#666666',
  },
  viewDetailsButton: {
    width: 71,
    height: 34,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  viewDetailsButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  descriptionWrapper: {
    flex: 1,
  },
  description: {
    fontSize: 12,
    color: '#666666',
  },
  readonlyInput: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    fontSize: 14,
    color: '#333333',
  },
});
