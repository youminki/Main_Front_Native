import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const START_DATE = new Date('2025-03-25T00:00:00');
const TARGET_DATE = new Date('2025-04-19T00:00:00');
const PER_HOUR = 3;
const MAX_PEOPLE = 432;

interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}

const Footer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  const [people, setPeople] = useState(0);
  const navigation = useNavigation();

  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const diff = TARGET_DATE.getTime() - now;

    if (diff <= 0) {
      return { d: 0, h: 0, m: 0, s: 0 };
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return { d, h, m, s };
  };

  const calculatePeopleCount = (): number => {
    const now = Date.now();
    const start = START_DATE.getTime();
    const target = TARGET_DATE.getTime();

    if (now >= target) return MAX_PEOPLE;
    if (now <= start) return 0;

    const elapsedHours = (now - start) / (1000 * 60 * 60);
    let count = elapsedHours * PER_HOUR;

    if (count > MAX_PEOPLE) {
      count = MAX_PEOPLE;
    }

    return Math.floor(count);
  };

  useEffect(() => {
    const updateState = () => {
      setTimeLeft(calculateTimeLeft());
      setPeople(calculatePeopleCount());
    };

    updateState();

    const timerId = setInterval(updateState, 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleRegisterClick = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.infoText}>
        전체 5,474명 / 신규{' '}
        <Text style={styles.boldSpan}>
          {people.toString().padStart(2, '0')}명
        </Text>
        의 이용자가 멜픽했어요{'\n'}
        사전예약 마감까지{' '}
        <Text style={styles.boldSpan}>
          {timeLeft.d}일 {timeLeft.h.toString().padStart(2, '0')}:
          {timeLeft.m.toString().padStart(2, '0')}:
          {timeLeft.s.toString().padStart(2, '0')}
        </Text>{' '}
        남았어요!
      </Text>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegisterClick}
      >
        <Text style={styles.registerButtonText}>로그인 하러가기</Text>
      </TouchableOpacity>

      <View style={styles.companyInfo}>
        <Text style={styles.companyInfoText}>
          (주) 팀리프트 . 235-87-01284 . 2020-서울금천-0973{'\n'}
          서울 금천구 디지털로9길 41, 1008호{'\n'}
          <Text style={styles.copyrightText}>© 2024 ME1PIK.</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    height: 309,
    marginBottom: 0,
    backgroundColor: '#f5ab35',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 23,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
  },
  boldSpan: {
    fontWeight: '800',
  },
  registerButton: {
    width: 250,
    height: 45,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 18,
    color: '#000000',
  },
  companyInfo: {
    alignSelf: 'flex-start',
    marginLeft: 42,
    marginTop: 20,
  },
  companyInfoText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    color: '#000000',
    textAlign: 'left',
  },
  copyrightText: {
    marginTop: 20,
  },
});

export default Footer;
