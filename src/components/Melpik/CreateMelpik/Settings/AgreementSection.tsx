import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const AgreementSection = () => {
  const [individualChecks, setIndividualChecks] = useState({
    agree1: false,
    agree2: false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleIndividualCheck = (id: 'agree1' | 'agree2') => {
    setIndividualChecks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleViewDetails = (content: string) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.agreementWrapper}>
      <View style={styles.contentContainer}>
        <View style={styles.checkboxWrapper}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              individualChecks.agree1 && styles.checkboxChecked,
            ]}
            onPress={() => handleIndividualCheck('agree1')}
          >
            {individualChecks.agree1 && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <Text style={styles.label}>
            정보입력 동의 <Text style={styles.requiredText}>(필수)</Text>
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>
              설정에 필요한 정보입력 동의 안내.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() =>
              handleViewDetails(
                '본 약관은 주식회사 멜픽(이하 "회사"라 합니다.)가 제공하는 의류 및 잡화(이하 "제품"이라 합니다.) 판매 및 전자상거래에 관한 온/오프라인상의 제반 서비스(이하 "서비스"라 합니다.)를 이용함에 있어서 회사와 회원의 권리와 의무에 대한 책임사항을 규정함을 목적으로 합니다.'
              )
            }
          >
            <Text style={styles.viewDetailsButtonText}>전체보기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType='fade'
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>이용약관</Text>
            <View style={styles.grayLine} />
            <Text style={styles.sectionTitle}>제1장 총칙</Text>
            <Text style={styles.subTitle}>제1조 (목적)</Text>
            <Text style={styles.modalText}>{modalContent}</Text>
            <View style={styles.grayLine} />
            <View style={styles.closeButtonWrapper}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AgreementSection;

const styles = StyleSheet.create({
  agreementWrapper: {
    backgroundColor: '#fff',
    marginBottom: 20,
    zIndex: 110,
  },
  contentContainer: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 20,
    width: '100%',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#ff8c00',
  },
  checkmark: {
    color: '#ff8c00',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: 13,
    color: '#000',
  },
  requiredText: {
    color: '#888',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    position: 'relative',
  },
  descriptionWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  description: {
    color: '#888',
    fontWeight: '700',
    fontSize: 12,
  },
  viewDetailsButton: {
    width: 69,
    height: 34,
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 27,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 320,
    maxWidth: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  grayLine: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: '100%',
    marginVertical: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  subTitle: {
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 13,
    color: '#222',
    marginBottom: 12,
  },
  closeButtonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  closeButton: {
    backgroundColor: '#f5ab35',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
