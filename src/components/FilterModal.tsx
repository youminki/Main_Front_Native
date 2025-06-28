import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';

/* helper component */
const ParenText: React.FC<{ children: string }> = ({ children }) => (
  <Text style={styles.parenText}>{children}</Text>
);

const SectionTitleWithParen: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\(.*?\))/g);
  return (
    <View style={styles.sectionTitle}>
      {parts.map((p, i) =>
        p.startsWith('(') && p.endsWith(')') ? (
          <ParenText key={i}>{p}</ParenText>
        ) : (
          <Text key={i}>{p}</Text>
        )
      )}
    </View>
  );
};

const sizeData = ['44(S)', '55(M)', '66(L)', '77(XL)'];
const colorMap: Record<string, string> = {
  화이트: '#FFFFFF',
  블랙: '#000000',
  그레이: '#808080',
  네이비: '#001F5B',
  아이보리: '#ECEBE4',
  베이지: '#C8AD7F',
  브라운: '#7B4A2F',
  카키: '#4B5320',
  그린: '#2E8B57',
  블루: '#0000FF',
  퍼플: '#800080',
  버건디: '#800020',
  레드: '#FF0000',
  핑크: '#FFC0CB',
  옐로우: '#FFFF00',
  오렌지: '#FFA500',
};

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleSelected = (
    list: string[],
    value: string,
    setFn: (l: string[]) => void
  ) => {
    setFn(
      list.includes(value) ? list.filter((i) => i !== value) : [...list, value]
    );
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType='slide'
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.modalHandle}>
            <View style={styles.handleBar} />
          </View>

          <View style={styles.fixedHeader}>
            <View style={styles.header}>
              <Text style={styles.title}>필터</Text>
            </View>
            <View style={styles.divider} />
          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.section}>
              <SectionTitleWithParen text='사이즈 (셋팅 : 없음)' />
              <View style={styles.buttonRow}>
                {sizeData.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.filterButton,
                      selectedSize.includes(size) &&
                        styles.filterButtonSelected,
                    ]}
                    onPress={() =>
                      toggleSelected(selectedSize, size, setSelectedSize)
                    }
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        selectedSize.includes(size) &&
                          styles.filterButtonTextSelected,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.dashedDivider} />

            <View style={styles.section}>
              <SectionTitleWithParen text='색상 (셋팅 : 없음)' />
              <View style={styles.colorButtonGrid}>
                {Object.keys(colorMap).map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.filterButton,
                      selectedColors.includes(color) &&
                        styles.filterButtonSelected,
                    ]}
                    onPress={() =>
                      toggleSelected(selectedColors, color, setSelectedColors)
                    }
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        selectedColors.includes(color) &&
                          styles.filterButtonTextSelected,
                      ]}
                    >
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.divider} />
          </ScrollView>

          <View style={styles.fixedFooter}>
            <View style={styles.closeButtonWrapper}>
              <TouchableOpacity style={styles.noButton} onPress={onClose}>
                <Text style={styles.noButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.yesButton} onPress={onClose}>
                <Text style={styles.yesButtonText}>설정 적용</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    height: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'column',
  },
  modalHandle: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
  fixedHeader: {
    paddingHorizontal: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginVertical: 16,
  },
  dashedDivider: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 40,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
  },
  parenText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#999',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButtonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filterButton: {
    minWidth: 60,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  filterButtonSelected: {
    backgroundColor: '#000',
  },
  filterButtonText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#000',
  },
  filterButtonTextSelected: {
    color: '#fff',
  },
  fixedFooter: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  closeButtonWrapper: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 16,
  },
  noButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  noButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yesButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  yesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterModal;
