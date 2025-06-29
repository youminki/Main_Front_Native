import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PersonalInformationProcessingPolicyDetail: React.FC = () => {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.section}>
        <Text style={styles.label}>공지사항</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>
            새로운 시즌 의류 업데이트 (2025 봄)
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>등록일</Text>
        <View style={styles.box}>
          <Text style={styles.boxText}>2025.02.01</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>상세내용</Text>
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>
            공지사항에 들어가는 상세한 내용이 들어가는 영역으로
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.noticeMessage}>
        <Text style={styles.bullet}>※</Text>
        <Text style={styles.noticeText}>
          해당 공지는 새로운 업데이트에 관한 내용으로 상황에 따라 변경될 수
          있으며, 자세한 문의는 서비스팀을 통해 안내 드립니다.
        </Text>
      </View>
    </View>
  );
};

export default PersonalInformationProcessingPolicyDetail;

const styles = StyleSheet.create({
  detailContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 16,
    maxWidth: 1000,
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 11,
    color: '#000',
    marginBottom: 10,
  },
  box: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 10,
    
  },
  boxText: {
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 14,
    color: '#000',
  },
  contentBox: {
    minHeight: 320,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 10,
    
  },
  contentText: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 20,
    color: '#000',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 30,
  },
  noticeMessage: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 23,
    color: '#999',
    marginRight: 5,
  },
  noticeText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 23,
    color: '#999',
  },
});
