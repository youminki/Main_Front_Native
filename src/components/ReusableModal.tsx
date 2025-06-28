import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal as RNModal,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
  actions?: React.ReactNode;
};

const ReusableModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  children,
  width = screenWidth * 0.8,
  height = 360,
  actions,
}) => {
  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { width, height }]}>
          {title && (
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>
          )}
          <View style={styles.modalBody}>{children}</View>
          {actions && <View style={styles.modalActions}>{actions}</View>}
          <View style={styles.closeButtonWrapper}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleConfirmClick}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 27,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    maxWidth: 300,
    maxHeight: '80%',
  },
  modalHeader: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    fontSize: 14,
    fontWeight: '400',
    maxHeight: '70%',
    flex: 1,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  closeButtonWrapper: {
    marginTop: 10,
  },
  closeButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReusableModal;
