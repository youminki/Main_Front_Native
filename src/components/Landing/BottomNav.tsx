import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BottomNav: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>
        현재 N명의 인플루언서들이{'\n'}melpik을 신청했어요!
      </Text>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>melpik 시작하기</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        사전예약 마감까지 N일 00:00시간 남았어요!
      </Text>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    width: 440,
    height: 250,
    backgroundColor: '#f5ab35',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 23,
    textAlign: 'center',
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 12,
  },
  startButton: {
    width: 250,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  startButtonText: {
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 15,
    lineHeight: 17,
    textAlign: 'center',
    color: '#000000',
  },
  bottomText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
    color: '#ffffff',
    opacity: 0.9,
  },
});
