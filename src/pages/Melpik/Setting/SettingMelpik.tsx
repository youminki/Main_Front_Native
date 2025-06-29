import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Clipboard,
} from 'react-native';
import StatsSection from '../../../components/StatsSection';
import InputField from '../../../components/InputField';
import ReusableModal from '../../../components/ReusableModal';
import DeleteIcon from '../../../assets/Melpik/DeleteIcon.svg';

const SettingMelpik: React.FC = () => {
  const visits = '@styleweex';
  const sales = '4개';
  const dateRange = '개인 등록 링크';

  const visitLabel = '인스타 계정';
  const salesLabel = '등록된 링크';

  const [melpickAddress] = useState('styleweex');

  const [accountInfo, setAccountInfo] = useState({
    bank: '국민은행',
    accountNumber: '',
    accountOwner: '',
  });

  const [linkInfo, setLinkInfo] = useState({
    linkName: '',
    linkUrl: '',
  });

  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);

  const [profileImage, setProfileImage] = useState<string>('');

  const handleImageChangeClick = () => {
    // React Native에서는 이미지 피커를 사용해야 합니다
    Alert.alert('알림', '이미지 선택 기능은 별도 구현이 필요합니다.');
  };

  const maskAccountNumber = (number: string) => {
    if (number.length > 5) {
      return `${number.slice(0, 5)} ****`;
    }
    return number;
  };

  const [links, setLinks] = useState([
    {
      id: 1,
      label: '링크 1',
      url: 'https://youtu.be/Kw482drmWqw',
      title: '밍또의 세상',
    },
    {
      id: 2,
      label: '링크 2',
      url: 'https://youtu.be/UfLf_60xa2a',
      title: '서비스 소개 링크',
    },
    {
      id: 3,
      label: '링크 3',
      url: 'https://myteatime.kr/conm',
      title: '2024 티타임지 인터뷰',
    },
    {
      id: 4,
      label: '링크 4',
      url: 'https://myteatime.kr/cont1m',
      title: '2024 네이버 인터뷰',
    },
  ]);

  const handleDelete = (linkId: number) => {
    setLinks(links.filter((link) => link.id !== linkId));
  };

  const handleCopyLink = async () => {
    const linkToCopy = `melpick.com/${melpickAddress}`;

    try {
      await Clipboard.setString(linkToCopy);
      Alert.alert('성공', '링크가 복사되었습니다.');
    } catch (error) {
      Alert.alert('오류', '링크 복사에 실패했습니다.');
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('오류', '링크를 열 수 없습니다.');
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>멜픽 설정</Text>
          <Text style={styles.subtitle}>내 채널을 통해 나는 브랜드가 된다</Text>
        </View>

        <View style={styles.statsRow}>
          <StatsSection
            visits={visits}
            sales={sales}
            dateRange={dateRange}
            visitLabel={visitLabel}
            salesLabel={salesLabel}
          />
        </View>
        <View style={styles.divider} />

        <View style={styles.section}>
          <InputField
            label='멜픽 주소 (변경불가)'
            id='melpickAddress'
            type='text'
            placeholder='주소를 입력하세요'
            required
            maxLength={12}
            prefix='melpick.com/'
            editable={false}
            value={melpickAddress}
            buttonLabel='링크복사'
            buttonColor='black'
            onButtonClick={handleCopyLink}
          />

          <InputField
            prefixcontent='이용상태 | 구독자'
            label='멜픽 자동생성 설정'
            id='auto-create-toggle'
            type='text'
            useToggle={true}
          />

          <InputField
            label='정산 계좌정보 (필수)'
            id='account-info'
            type='text'
            placeholder={
              accountInfo.accountNumber
                ? `${maskAccountNumber(accountInfo.accountNumber)} (${
                    accountInfo.bank
                  })`
                : '등록하실 계좌 정보를 입력하세요'
            }
            buttonLabel='등록/변경'
            buttonColor='yellow'
            onButtonClick={() => setAccountModalOpen(true)}
          />

          <InputField
            label='개인 링크 설정 (선택)'
            id='personal-link'
            type='text'
            placeholder={
              linkInfo.linkName
                ? `${linkInfo.linkName} (${linkInfo.linkUrl})`
                : '등록하실 링크를 추가하세요'
            }
            buttonLabel='링크등록'
            buttonColor='black'
            onButtonClick={() => setLinkModalOpen(true)}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.linkList}>
            {links.map((link) => (
              <View key={link.id} style={styles.linkItem}>
                <Text
                  style={[
                    styles.label,
                    links.length === 0 && styles.emptyLabel,
                  ]}
                >
                  {link.label}
                </Text>
                <View style={styles.linkContent}>
                  <Text style={styles.linkTitle}>{link.title}</Text>
                  <Text style={styles.separator}>|</Text>
                  <TouchableOpacity onPress={() => handleLinkPress(link.url)}>
                    <Text style={styles.linkUrl}>{link.url}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(link.id)}
                    style={styles.deleteButton}
                  >
                    <DeleteIcon width={20} height={20} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <ReusableModal
        visible={isAccountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        title='계좌 정보'
      >
        <Text>계좌 정보를 확인하세요.</Text>
      </ReusableModal>

      <ReusableModal
        visible={isLinkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        title='링크 정보'
      >
        <Text>링크 정보를 확인하세요.</Text>
      </ReusableModal>
    </View>
  );
};

export default SettingMelpik;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsRow: {
    paddingHorizontal: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  linkList: {
    gap: 15,
  },
  linkItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyLabel: {
    color: '#999',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  linkTitle: {
    fontSize: 14,
    color: '#333',
  },
  separator: {
    marginHorizontal: 8,
    color: '#999',
  },
  linkUrl: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  deleteButton: {
    marginLeft: 'auto',
    padding: 5,
  },
  modalContent: {
    padding: 20,
  },
});
