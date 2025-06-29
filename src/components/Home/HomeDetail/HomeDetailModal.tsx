import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
};

const ReusableModal2: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width = '100%',
  height = 360,
}) => {
  const modalWidth = typeof width === 'string' ? screenWidth : width;
  const modalHeight = typeof height === 'string' ? screenHeight * 0.8 : height;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.styledModal}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity
          style={[
            styles.modalContent,
            { width: modalWidth, height: modalHeight },
          ]}
          onPress={() => {}}
          activeOpacity={1}
        >
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  styledModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 27,
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    maxWidth: 1000,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 6,
  },
});

export default ReusableModal2;
