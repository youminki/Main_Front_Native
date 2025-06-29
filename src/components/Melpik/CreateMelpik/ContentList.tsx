import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../pages/AppLayout';
import Theme from '../../../styles/Theme';
import CreateMelpik1 from '../../../assets/Landing/CreateMelpik1.svg';
import CreateMelpik2 from '../../../assets/Landing/CreateMelpik2.svg';
import SettingIcon from '../../../assets/Landing/SettingIcon.svg';

interface ContentItem {
  image: any;
  imgtitle: string;
  title: string;
  dressSize: string;
  topSize: string;
  bottomSize: string;
  brand: string;
  exposure: number;
  period: string;
}

const Content: React.FC<{ item: ContentItem }> = ({ item }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleClick = () => {
    if (item.imgtitle === '컨템포러리') {
      navigation.navigate('CreateMelpikSettings' as any);
    }
  };

  return (
    <TouchableOpacity style={styles.contentContainer} onPress={handleClick}>
      <View style={styles.imageWrapper}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.textOverlay}>
            <Text style={styles.smallText}>Fashion Brand</Text>
            <Text style={styles.largeText}>{item.imgtitle}</Text>
          </View>
          <SettingIcon width={40} height={40} style={styles.settingsIcon} />
        </View>
        <View style={styles.descriptionBox}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.details}>
            <View style={styles.containerRow}>
              <View style={styles.descriptionLine}>
                <Text style={styles.label}>원피스</Text>
                <Text style={styles.data}>{item.dressSize}</Text>
              </View>
              <Text style={styles.separator}>|</Text>
              <View style={styles.descriptionLine}>
                <Text style={styles.label}>상의</Text>
                <Text style={styles.data}>{item.topSize}</Text>
              </View>
              <Text style={styles.separator}>|</Text>
              <View style={styles.descriptionLine}>
                <Text style={styles.label}>하의</Text>
                <Text style={styles.data}>{item.bottomSize}</Text>
              </View>
            </View>
            <View style={styles.containerRow}>
              <View style={styles.descriptionLine}>
                <Text style={styles.label}>브랜드</Text>
                <Text style={styles.data}>{item.brand}</Text>
              </View>
            </View>
            <View style={styles.containerRow}>
              <View style={styles.descriptionLine}>
                <Text style={styles.label}>상품 노출수</Text>
                <Text style={styles.data}>{item.exposure}회</Text>
              </View>
              <Text style={styles.separator}>|</Text>
              <View style={styles.descriptionLine}>
                <Text style={styles.label}>노출기간</Text>
                <Text style={styles.data}>월 {item.period}회</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ContentList: React.FC = () => {
  const data: ContentItem[] = [
    {
      image: CreateMelpik1,
      imgtitle: '컨템포러리',
      title: '컨템포러리 ',
      dressSize: 'M (55)',
      topSize: 'M (55)',
      bottomSize: 'M (55)',
      brand: 'MICHA, MAJE, SANDRO',
      exposure: 6,
      period: '2',
    },
    {
      image: CreateMelpik2,
      imgtitle: '골프웨어',
      title: '골프웨어 ',
      dressSize: 'M (55)',
      topSize: 'M (55)',
      bottomSize: 'M (55)',
      brand: 'MICHA, MAJE, SANDRO',
      exposure: 6,
      period: '2',
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollableContent}
    >
      {data.map((item, index) => (
        <Content key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default ContentList;

const styles = StyleSheet.create({
  scrollableContent: {
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'column',
    width: 300,
    minWidth: 300,
    maxWidth: 300,
    height: '100%',
    marginRight: 20,
    overflow: 'hidden',
  },
  imageWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  smallText: {
    fontWeight: '900',
    fontSize: 10,
    color: '#000000',
  },
  largeText: {
    fontWeight: '300',
    fontSize: 30,
    lineHeight: 33,
    color: '#ffffff',
  },
  settingsIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
  },
  descriptionBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'column',
    gap: 4,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  descriptionLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  label: {
    fontWeight: '400',
    fontSize: 13,
    color: '#888',
    marginRight: 4,
  },
  data: {
    fontWeight: '600',
    fontSize: 13,
    color: '#222',
  },
  separator: {
    marginHorizontal: 6,
    color: '#ccc',
  },
});
