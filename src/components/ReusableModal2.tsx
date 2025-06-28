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
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
};

const ReusableModal2: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  width = screenWidth * 0.8,
  height = 360,
}) => {
  const handleConfirmClick = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <View style={styles.styledModal}>
        <View style={[styles.modalContent, { width, height }]}>
          {title && (
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>
          )}
          <View style={styles.modalBody}>{children}</View>
          <View style={styles.closeButtonWrapper}>
            <TouchableOpacity style={styles.noButton} onPress={onClose}>
              <Text style={styles.buttonText}>아니요</Text>
            </TouchableOpacity>
            {onConfirm && (
              <TouchableOpacity
                style={styles.yesButton}
                onPress={handleConfirmClick}
              >
                <Text style={styles.buttonText}>네</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  styledModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 27,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 300,
    borderRadius: 8,
  },
  modalHeader: {
    flexDirection: 'column',
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
    overflow: 'scroll',
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  closeButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  noButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#cccccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  yesButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReusableModal2;
