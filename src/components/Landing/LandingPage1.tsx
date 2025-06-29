import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../pages/AppLayout';
import LandingBackground from '../../assets/Landing/LandingBackground.jpg';
import LeftLabel from '../../assets/Landing/LeftLabel.svg';

const LandingPage1: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRegisterClick = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.wrapper}>
      <LeftLabel style={styles.leftLabelImage} />

      <ImageBackground source={LandingBackground} style={styles.container}>
        <View style={styles.contentBox}>
          <Text style={styles.bigTitle}>
            이젠 <Text style={styles.brandSpan}>브랜드 옷</Text>을{'\n'}
            사고, 팔고, 빌리는
          </Text>
          <Text style={styles.subTitle}>멜픽에서 새롭게 경험하세요</Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterClick}
          >
            <Text style={styles.buttonText}>로그인 하러가기</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LandingPage1;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    margin: 20,
    overflow: 'visible',
  },
  leftLabelImage: {
    position: 'absolute',
    top: -35,
    left: -35,
    zIndex: 2,
  },
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: 1000,
    minHeight: 440,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  contentBox: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bigTitle: {
    fontWeight: '800',
    fontSize: 32,
    lineHeight: 35,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
  },
  brandSpan: {
    color: '#f6ac36',
  },
  subTitle: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 47,
  },
  registerButton: {
    width: '100%',
    maxWidth: 320,
    height: 56,
    backgroundColor: 'rgba(34, 34, 34, 0.9)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  buttonText: {
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 18,
    color: '#ffffff',
  },
});
