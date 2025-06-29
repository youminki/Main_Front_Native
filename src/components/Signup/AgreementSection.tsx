import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';

const AgreementSection: React.FC = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
    agree1: false,
    agree2: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const handleAllChecked = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    setIndividualChecks({
      agree1: newAllChecked,
      agree2: newAllChecked,
    });
  };

  const handleViewDetails = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
  };

  const handleIndividualCheck = (id: string) => {
    setIndividualChecks((prev) => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.agreementWrapper}>
        <View style={styles.allAgreeWrapper}>
          <Pressable
            style={[styles.checkbox, allChecked && styles.checkboxChecked]}
            onPress={handleAllChecked}
          >
            {allChecked && <Text style={styles.checkmark}>✓</Text>}
          </Pressable>
          <Text style={styles.label}>
            전체 동의 <Text style={styles.requiredText}>(필수)</Text>
          </Text>
        </View>

        <View style={styles.checkboxWrapper}>
          <Pressable
            style={[
              styles.checkbox,
              individualChecks.agree1 && styles.checkboxChecked,
            ]}
            onPress={() => handleIndividualCheck('agree1')}
          >
            {individualChecks.agree1 && <Text style={styles.checkmark}>✓</Text>}
          </Pressable>
          <Text style={styles.label}>
            이용약관 동의 <Text style={styles.requiredText}>(필수)</Text>
          </Text>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>
              서비스 이용에 필요한 이용약관 안내.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() =>
              handleViewDetails(
                '이용약관',
                '이용약관 내용이 여기에 표시됩니다.'
              )
            }
          >
            <Text style={styles.viewDetailsButtonText}>전체보기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxWrapper}>
          <Pressable
            style={[
              styles.checkbox,
              individualChecks.agree2 && styles.checkboxChecked,
            ]}
            onPress={() => handleIndividualCheck('agree2')}
          >
            {individualChecks.agree2 && <Text style={styles.checkmark}>✓</Text>}
          </Pressable>
          <Text style={styles.label}>
            개인정보수집 동의 <Text style={styles.requiredText}>(필수)</Text>
          </Text>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>
              서비스 이용에 필요한 개인정보 수집 안내.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() =>
              handleViewDetails(
                '개인정보 처리방침',
                '개인정보 처리방침 내용이 여기에 표시됩니다.'
              )
            }
          >
            <Text style={styles.viewDetailsButtonText}>전체보기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.fixedHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
            </View>

            <ScrollView style={styles.scrollableContent}>
              <Text style={styles.modalText}>{modalContent}</Text>
            </ScrollView>

            <View style={styles.fixedFooter}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  agreementWrapper: {
    backgroundColor: '#fff',
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
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#fff',
    borderColor: '#f6ae24',
  },
  checkmark: {
    color: '#f6ae24',
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  requiredText: {
    color: '#666',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  descriptionWrapper: {
    flex: 1,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
    color: '#666',
  },
  viewDetailsButton: {
    width: 71,
    height: 34,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 27,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    maxWidth: 500,
    width: '100%',
    height: 670,
    borderRadius: 8,
  },
  fixedHeader: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollableContent: {
    flex: 1,
  },
  modalText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#666',
  },
  fixedFooter: {
    marginTop: 10,
  },
  closeButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgreementSection;
