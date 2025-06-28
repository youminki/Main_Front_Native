import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface PaymentCompleteProps {
  onClose?: () => void;
}

const PaymentComplete: React.FC<PaymentCompleteProps> = ({ onClose }) => {
  const navigation = useNavigation();
  const slideAnim = React.useRef(new Animated.Value(-80)).current;

  React.useEffect(() => {
    const slideAnimation = Animated.loop(
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 4000,
        useNativeDriver: true,
      })
    );
    slideAnimation.start();

    return () => slideAnimation.stop();
  }, [slideAnim]);

  const handleClose = () => {
    if (onClose) {
      // 부모 컴포넌트에서 전달된 닫기 콜백 실행
      onClose();
    } else {
      // 홈으로 이동
      navigation.navigate('Home' as never);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <Animated.View
            style={[
              styles.completeIcon,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <Text style={styles.iconText}>✅</Text>
          </Animated.View>
        </View>
        <Text style={styles.title}>
          결제가 <Text style={styles.strong}>완료</Text> 되었습니다.
        </Text>
        <Text style={styles.subtitle}>
          신청하신 제품을 신속하게 준비하여,{'\n'}빠르게 전달 드리겠습니다.
        </Text>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleClose}>
          <Text style={styles.confirmButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  iconWrapper: {
    width: '100%',
    height: 80,
    marginBottom: 24,
    overflow: 'hidden',
  },
  completeIcon: {
    position: 'absolute',
    top: 0,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 60,
  },
  title: {
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 22,
    color: '#000',
    marginBottom: 22,
    textAlign: 'center',
  },
  strong: {
    fontWeight: '700',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    color: '#999999',
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  confirmButton: {
    backgroundColor: '#f6ac36',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentComplete;
