// src/components/DeliveryListModal.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import { Address } from '../api/address/address';

interface Props {
  isOpen: boolean;
  addresses: Address[];
  selectedId: number | null;
  onSelect: (addr: Address) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const DeliveryListModal: React.FC<Props> = ({
  isOpen,
  addresses,
  selectedId,
  onSelect,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalWrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>배송목록 선택</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {addresses.length === 0 ? (
              <Text style={styles.emptyText}>저장된 배송지가 없습니다.</Text>
            ) : (
              addresses.map((addr, idx) => {
                const isSelected = selectedId === addr.id;
                return (
                  <View key={addr.id} style={styles.block}>
                    <Text style={styles.titleSmall}>
                      {addr.isDefault ? '배송지 (기본)' : `배송지 ${idx + 1}`}
                    </Text>
                    <View style={styles.readOnlyInput}>
                      <Text style={styles.readOnlyText}>{addr.address}</Text>
                    </View>
                    <View style={styles.readOnlyInput}>
                      <Text style={styles.readOnlyText}>
                        {addr.addressDetail}
                      </Text>
                    </View>
                    <View style={styles.readOnlyInput}>
                      <Text style={styles.readOnlyText}>
                        {(addr as any).deliveryMessage || ''}
                      </Text>
                    </View>
                    <View style={styles.radioWrapper}>
                      <TouchableOpacity
                        style={styles.radioLabel}
                        onPress={() => onSelect(addr)}
                      >
                        <View
                          style={[
                            styles.radio,
                            isSelected && styles.radioSelected,
                          ]}
                        >
                          {isSelected && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.radioText}>선택</Text>
                      </TouchableOpacity>
                    </View>
                    {idx < addresses.length - 1 && (
                      <View style={styles.separator} />
                    )}
                  </View>
                );
              })
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>선택 완료</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeBtn: {
    padding: 4,
  },
  closeBtnText: {
    fontSize: 24,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  block: {
    marginBottom: 16,
  },
  titleSmall: {
    fontWeight: '700',
    fontSize: 12,
    color: '#000',
    marginBottom: 8,
  },
  readOnlyInput: {
    width: '100%',
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8,
  },
  readOnlyText: {
    fontSize: 14,
    color: '#333',
  },
  radioWrapper: {
    alignItems: 'flex-end',
  },
  radioLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#000',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioText: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
});

export default DeliveryListModal;
