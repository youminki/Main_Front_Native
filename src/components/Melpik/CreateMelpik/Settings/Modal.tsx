import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Theme from '../../../../styles/Theme';
import ReusableModal2 from '../../../../components/ReusableModal2';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (brands: string[]) => void;
  selectedBrands: string[]; // 부모에서 내려오는 현재 저장된 brands
}

const BrandSelectionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedBrands: initialSelectedBrands,
}) => {
  const brands = [
    '모조 (MOJO)',
    '듀엘 (DEW L)',
    '쥬크 (ZOOC)',
    '씨씨콜렉트 (CC Collect)',
    '미샤 (MICHAA)',
    '잇미샤 (it MICHAA)',
    '마쥬 (MAJE)',
    '산드로 (SANDRO)',
    '이로 (IRO)',
    '시슬리 (SISLEY)',
    '사틴 (SATIN)',
    '에스블랑 (S Blanc)',
    '올리브 데 올리브 (OLIVE DES OLIVE)',
    '클럽 모나코 (CLUB Monaco)',
    '데코 (DECO)',
    '에고이스트 (EGOIST)',
    '지고트 (JIGOTT)',
    '케네스 레이디 (KENNETH LADY)',
    '라인 (LINE)',
    '지컷 (G-cut)',
  ];

  // 내부 선택 상태
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // 부모로부터 받은 값이 바뀔 때마다 내부 상태 동기화
  useEffect(() => {
    if (isOpen) {
      setSelectedBrands(initialSelectedBrands);
    }
  }, [initialSelectedBrands, isOpen]);

  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [cancelConfirmationVisible, setCancelConfirmationVisible] =
    useState(false);

  const handleBrandSelect = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand));
    } else if (selectedBrands.length < 3) {
      setSelectedBrands((prev) => [...prev, brand]);
    }
  };

  const handleCompleteSelection = () => {
    if (selectedBrands.length < 3) {
      setWarningModalVisible(true);
    } else {
      onSelect(selectedBrands);
      onClose();
    }
  };

  const handleCancelClick = () => {
    setCancelConfirmationVisible(true);
  };

  return (
    <>
      <Modal
        visible={isOpen}
        transparent
        animationType='fade'
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                브랜드 선택 <Text style={styles.grayText}>(3가지 선택)</Text>
              </Text>
              <View style={styles.grayLine} />
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.brandSelectionGrid}>
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    style={[
                      styles.brandOption,
                      selectedBrands.includes(brand) &&
                        styles.brandOptionSelected,
                    ]}
                    onPress={() => handleBrandSelect(brand)}
                  >
                    <Text
                      style={[
                        styles.brandOptionText,
                        selectedBrands.includes(brand) &&
                          styles.brandOptionTextSelected,
                      ]}
                    >
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.grayLine} />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelClick}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleCompleteSelection}
              >
                <Text style={styles.completeButtonText}>선택완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 경고 모달 */}
      <ReusableModal2
        isOpen={warningModalVisible}
        onClose={() => setWarningModalVisible(false)}
        title='경고'
      >
        <Text>3가지 브랜드를 선택해야 합니다.</Text>
      </ReusableModal2>

      {/* 취소 확인 모달 */}
      <ReusableModal2
        isOpen={cancelConfirmationVisible}
        onClose={() => setCancelConfirmationVisible(false)}
        onConfirm={onClose}
        title='선택 취소'
      >
        <Text>설정하신 내용을 취소 하시겠습니까?</Text>
      </ReusableModal2>
    </>
  );
};

export default BrandSelectionModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 27,
  },
  modalContent: {
    backgroundColor: Theme.colors.white,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '60%',
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'column',
  },
  modalTitle: {
    fontWeight: '800',
    fontSize: 16,
  },
  grayText: {
    color: Theme.colors.gray1,
  },
  grayLine: {
    borderWidth: 1,
    borderColor: Theme.colors.gray0,
    width: '100%',
    marginVertical: 10,
  },
  modalBody: {
    flex: 1,
  },
  brandSelectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  brandOption: {
    padding: 10,
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.gray1,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandOptionSelected: {
    backgroundColor: Theme.colors.yellow,
    borderWidth: 3,
    borderColor: Theme.colors.yellow,
  },
  brandOptionText: {
    color: Theme.colors.black,
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 13,
    textAlign: 'center',
  },
  brandOptionTextSelected: {
    color: Theme.colors.black,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    height: 56,
    backgroundColor: Theme.colors.gray1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Theme.colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
  completeButton: {
    flex: 1,
    height: 56,
    backgroundColor: Theme.colors.black,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    color: Theme.colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
});
