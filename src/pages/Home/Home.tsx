// src/pages/Home.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useProducts } from '../../api/upload/productApi';
import ItemList, { UIItem } from '../../components/Home/ItemList';
import Footer from '../../components/Home/Footer';
import SubHeader from '../../components/Home/SubHeader';
import ReusableModal from '../../components/ReusableModal';
import FilterContainer from '../../components/Home/FilterContainer';

const { width: screenWidth } = Dimensions.get('window');

/**
 * Home(상품 리스트) 페이지 - React Native 버전
 * - react-query로 상품 데이터 관리(캐싱/중복방지)
 * - 검색/필터 useMemo 적용
 * - 무한스크롤 FlatList 적용
 * - 상태 최소화, 타입 보강, 주석 추가
 */
const Home: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // 로그인 후 안내 모달
  const [isLoginNoticeOpen, setLoginNoticeOpen] = useState(false);
  const showNotice = route.params?.showNotice;

  // 공유 모달 상태
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  // 컬럼 수 (모바일에서는 2개)
  const [viewCols, setViewCols] = useState(2);

  // 카테고리/검색
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // react-query 상품 데이터
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProducts(selectedCategory === 'All' ? 'all' : selectedCategory);

  // 검색/필터된 상품 목록 (useMemo로 연산 최소화)
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const term = searchQuery.trim().toLowerCase();
    return products.filter(
      (item) =>
        item.brand.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }, [products, searchQuery]);

  // UIItem 변환 (모든 상품을 한 번에 불러옴)
  const uiItems: UIItem[] = useMemo(
    () =>
      filteredProducts.map((p) => ({
        id: p.id.toString(),
        image: p.image,
        brand: p.brand,
        description: p.description,
        price: p.price,
        discount: p.discount,
        isLiked: p.isLiked,
      })),
    [filteredProducts]
  );

  // 상세 모달
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const isModalOpen = Boolean(selectedItemId);
  const [isFeatureModalOpen, setFeatureModalOpen] = useState(false);

  // 홈 진입 시 로그인 안내 모달 열기
  useEffect(() => {
    if (showNotice) {
      setLoginNoticeOpen(true);
    }
  }, [showNotice]);

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          상품을 불러오는 데 실패했습니다: {String(error)}
        </Text>
      </View>
    );
  }

  // 상세 모달 핸들러
  const handleOpenModal = (id: string) => {
    setSelectedItemId(id);
  };

  const handleCloseModal = () => {
    setSelectedItemId(null);
    setFeatureModalOpen(false);
  };

  // 컬럼 옵션 선택
  const selectCols = (n: number) => {
    setViewCols(n);
  };

  const colOptions = [1, 2, 3];

  // 공유하기 핸들러
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: '멜픽 - 패션 대여 서비스',
        url: 'https://melpik.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('공유 실패', '공유할 수 없습니다.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* 로그인 안내 모달 */}
      <ReusableModal
        visible={isLoginNoticeOpen}
        onClose={() => setLoginNoticeOpen(false)}
        title='멜픽 - 이용안내'
      >
        <Text style={styles.modalText}>
          멜픽 서비스에서 대여 이용 시 아래 순서로 진행하세요:
        </Text>
        <View style={styles.infoList}>
          <Text style={styles.infoItem}>• 결제카드 등록</Text>
          <Text style={styles.infoItem}>• 이용권 결제</Text>
          <Text style={styles.infoItem}>• 대여제품 신청</Text>
        </View>
      </ReusableModal>

      {/* 공유 완료 모달 */}
      <ReusableModal
        visible={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title='공유 완료'
      >
        <Text style={styles.modalText}>링크가 클립보드에 복사되었습니다.</Text>
      </ReusableModal>

      {/* 상품 상세 모달 */}
      {isModalOpen && selectedItemId && (
        <ReusableModal
          visible={isModalOpen}
          onClose={handleCloseModal}
          title='상품 상세'
        >
          <Text style={styles.modalText}>
            상품 ID: {selectedItemId}의 상세 정보
          </Text>
        </ReusableModal>
      )}

      {/* 메인 컨텐츠 */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <SubHeader
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <FilterContainer
          viewCols={viewCols}
          onViewColsChange={setViewCols}
          colOptions={colOptions}
          onShare={handleShare}
        />

        <ItemList
          items={uiItems}
          viewCols={viewCols}
          onItemPress={handleOpenModal}
          isLoading={isLoading}
        />

        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 16,
  },
  infoList: {
    marginTop: 16,
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default Home;
