/* src/components/BottomNav2.tsx */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

type BottomBarProps = {
  buttonText?: string;
  imageSrc?: string;
  cartOnPress?: () => void;
  onPress?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const BottomBar: React.FC<BottomBarProps> = ({
  buttonText = '작성완료',
  imageSrc,
  cartOnPress,
  onPress,
  type = 'button',
  disabled = false,
}) => (
  <View style={styles.bottomBarContainer}>
    <TouchableOpacity style={styles.cartButton} onPress={cartOnPress}>
      {imageSrc && <Text style={styles.cartImage}>🛒</Text>}
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.orderButton, disabled && styles.orderButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.orderButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    maxWidth: 600,
    alignSelf: 'center',
    paddingVertical: 15,
    paddingBottom: 34,
  },
  cartButton: {
    width: 75,
    height: 56,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 21,
  },
  cartImage: {
    fontSize: 24,
  },
  orderButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#000000',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  orderButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  orderButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default BottomBar;
