// src/pages/PersonalLink.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UnifiedHeader from '../components/UnifiedHeader';

// SVG 아이콘들을 React Native 컴포넌트로 대체
const PersonalLinkShareIcon = () => (
  <View
    style={{ width: 24, height: 24, backgroundColor: '#ccc', borderRadius: 12 }}
  />
);

const PersonalLinkProfileIcon = () => (
  <View
    style={{ width: 24, height: 24, backgroundColor: '#ccc', borderRadius: 12 }}
  />
);

const PersonalLinkAlramIcon = () => (
  <View
    style={{ width: 24, height: 24, backgroundColor: '#ccc', borderRadius: 12 }}
  />
);

export interface UIItem {
  id: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  isLiked: boolean;
}

const dummyItems = [
  {
    id: 1,
    image: '이미지경로1.jpg',
    brand: 'SANDRO',
    description: 'SF23SRD07869 / 원피스',
    category: 'onepiece',
    price: 489000,
    discount: 10,
  },
  {
    id: 2,
    image: '이미지경로2.jpg',
    brand: 'SANDRO',
    description: 'SF23SRD05961 / 원피스',
    category: 'onepiece',
    price: 589000,
    discount: 10,
  },
  {
    id: 3,
    image: '이미지경로3.jpg',
    brand: 'MICHAA',
    description: 'MP-Xxxxxx / 원피스',
    category: 'onepiece',
    price: 959000,
    discount: 10,
  },
  {
    id: 4,
    image: '이미지경로4.jpg',
    brand: 'MOX.SPIN',
    description: '1244HSS009 / 원피스',
    category: 'onepiece',
    price: 1259000,
    discount: 10,
  },
  // 추가 아이템이 필요하면 더 넣기
];

const { width: screenWidth } = Dimensions.get('window');

const PersonalLink: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'personalLink' | 'productIntro'>(
    'personalLink'
  );

  // UIItem 형태로 변환
  const uiDummyItems: UIItem[] = dummyItems.map(
    ({ id, image, brand, description, price, discount }) => ({
      id: id.toString(),
      image,
      brand,
      description,
      price,
      discount,
      isLiked: false,
    })
  );

  // 카드 클릭 시 동작 (예: 모달 열기 or 상세 페이지 네비게이트)
  const handleItemClick = () => {
    // TODO: 상세 페이지로 이동 등 구현
  };

  const renderProductItem = ({ item }: { item: UIItem }) => (
    <TouchableOpacity style={styles.itemCard} onPress={handleItemClick}>
      <View style={styles.imageWrapper}>
        <Text style={styles.imagePlaceholder}>📷</Text>
      </View>
      <Text style={styles.brandText}>{item.brand}</Text>
      <Text style={styles.descriptionText}>
        {item.description.includes('/')
          ? item.description.split('/')[1]
          : item.description}
      </Text>
      <View style={styles.priceWrapper}>
        <Text style={styles.originalPriceText}>
          {item.price.toLocaleString()}원
        </Text>
        <View style={styles.subPriceWrapper}>
          <Text style={styles.nowLabel}>NOW</Text>
          <Text style={styles.discountLabel}>{item.discount}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.topInner}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>📤</Text>
          </TouchableOpacity>

          <View style={styles.centerColumn}>
            <View style={styles.userImageWrapper}>
              <Text style={styles.userImagePlaceholder}>👤</Text>
            </View>
            <Text style={styles.userName}>bominism71</Text>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Wrapper */}
      <View style={styles.contentWrapper}>
        {/* Tab Section */}
        <View style={styles.tabSection}>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'personalLink' && styles.tabItemActive,
            ]}
            onPress={() => setActiveTab('personalLink')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'personalLink' && styles.tabTextActive,
              ]}
            >
              개인링크
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === 'productIntro' && styles.tabItemActive,
            ]}
            onPress={() => setActiveTab('productIntro')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'productIntro' && styles.tabTextActive,
              ]}
            >
              제품소개
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'personalLink' && (
          <ScrollView style={styles.linkListWrapper}>
            <View style={styles.linkItem}>
              <View style={styles.linkLabelBox}>
                <Text style={styles.linkLabelText}>LINK 01</Text>
              </View>
              <View style={styles.linkTextWrapper}>
                <Text style={styles.linkTitle}>업무 및 비지니스 제휴 문의</Text>
                <Text style={styles.linkDesc}>form.naver.com/respon..</Text>
              </View>
              <Text style={styles.linkArrow}>{'>'}</Text>
            </View>
            {/* ... 기타 LinkItem */}
          </ScrollView>
        )}

        {activeTab === 'productIntro' && (
          <View style={styles.productListWrapper}>
            <Text style={styles.introText}>
              👉 직접 입어보고 맘에 드는 것만 소개해드려요 👈
            </Text>
            <FlatList
              data={uiDummyItems}
              renderItem={renderProductItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 ME1PIK.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topSection: {
    width: '100%',
    height: 240,
    backgroundColor: '#f6ae24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topInner: {
    marginTop: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerColumn: {
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  userImageWrapper: {
    width: 96,
    height: 96,
    backgroundColor: '#ffffff',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImagePlaceholder: {
    fontSize: 40,
  },
  userName: {
    marginTop: 8,
    fontWeight: '700',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  contentWrapper: {
    flex: 1,
  },
  tabSection: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 16,
  },
  tabItem: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemActive: {
    backgroundColor: '#ffffff',
    borderColor: '#f6ae24',
  },
  tabText: {
    fontWeight: '800',
    fontSize: 14,
    color: '#999',
  },
  tabTextActive: {
    color: '#000',
  },
  linkListWrapper: {
    flex: 1,
    padding: 16,
  },
  linkItem: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: '#dddddd',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  linkLabelBox: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#000000',
    borderRadius: 20,
  },
  linkLabelText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
  },
  linkTextWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  linkTitle: {
    fontWeight: '800',
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  linkDesc: {
    fontWeight: '400',
    fontSize: 12,
    color: '#999999',
    textDecorationLine: 'underline',
  },
  linkArrow: {
    fontSize: 25,
    color: '#aaaaaa',
  },
  productListWrapper: {
    flex: 1,
    padding: 16,
  },
  introText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  itemCard: {
    width: (screenWidth - 48) / 2,
    marginBottom: 12,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 40,
  },
  brandText: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: '900',
  },
  descriptionText: {
    marginTop: 5,
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
  },
  originalPriceText: {
    fontWeight: '900',
    fontSize: 14,
  },
  subPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  nowLabel: {
    fontSize: 9,
  },
  discountLabel: {
    fontWeight: '800',
    fontSize: 11,
    color: '#f6ae24',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#f6ae24',
  },
});

export default PersonalLink;
