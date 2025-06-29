import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface BottomBarProps {
  onCartClick: () => Promise<void>;
  onOrderClick: () => void;
  selectedService: '' | 'rental' | 'purchase';
  selectedSize: string;
  selectedColor: string;
  servicePeriod: string;
}

const BottomBar: React.FC<BottomBarProps> = ({
  onCartClick,
  onOrderClick,
  selectedService,
  selectedSize,
  selectedColor,
  servicePeriod,
}) => {
  const getOrderButtonLabel = () => {
    if (!selectedService) return '서비스 선택';
    if (!selectedSize || !selectedColor) return '사이즈/색상 선택';
    if (selectedService === 'rental' && !servicePeriod) return '대여 기간 선택';
    return selectedService === 'rental' ? '대여하기' : '구매하기';
  };

  const isOrderDisabled =
    !selectedService ||
    !selectedSize ||
    !selectedColor ||
    (selectedService === 'rental' && !servicePeriod);

  return (
    <View style={styles.bottomBarContainer}>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={onCartClick}
        activeOpacity={0.7}
      >
        <Text style={styles.cartButtonText}>장바구니</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.orderButton,
          isOrderDisabled && styles.orderButtonDisabled,
        ]}
        onPress={onOrderClick}
        disabled={isOrderDisabled}
        activeOpacity={0.8}
      >
        <Text style={styles.orderButtonText}>{getOrderButtonLabel()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    zIndex: 9998,
    paddingVertical: 10,
    paddingBottom: 34,
    paddingHorizontal: 27,
    maxWidth: 600,
    alignSelf: 'center',
  },
  cartButton: {
    width: 75,
    height: 56,
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '800',
  },
  orderButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#f6ae24',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 21,
  },
  orderButtonDisabled: {
    backgroundColor: '#dddddd',
  },
  orderButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default BottomBar;
