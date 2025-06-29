import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.divider} />
      <Text style={styles.footerText}>
        <Text style={styles.highlight}> (주) 팀리프트 </Text> | 235-87-01284 |
        2020-서울금천-0973{'\n'}
        서울 금천구 디지털로9길 41, 1008호
      </Text>
      <Text style={styles.footerCopyright}>
        © 2024 MELPICK. All Rights Reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  divider: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    marginBottom: 20,
  },
  footerText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    color: '#999999',
  },
  highlight: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    color: '#000000',
  },
  footerCopyright: {
    marginTop: 20,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    color: '#f6ae24',
  },
});

export default Footer;
