// src/pages/Brand/BrandDetail.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';

import UnifiedHeader from '../../components/UnifiedHeader';
import StatsSection from '../../components/Brand/StatsSection';
import SubHeader from '../../components/Home/SubHeader';
import ItemList, { UIItem } from '../../components/Home/ItemList';
import FilterContainer from '../../components/Home/FilterContainer';
import { getBrandList, Brand as ApiBrand } from '../../api/brand/brandApi';
import {
  getProductsByBrand,
  Product as ApiProduct,
} from '../../api/product/product';

import HomeDetail from '../Home/HomeDetail';

interface LocalBrand {
  id: number;
  name: string;
  category: string;
  group: string;
  company?: string;
  productCount: number;
}

const BrandDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const brandId = (route.params as any)?.brandId as string;
  const idNum = brandId ? parseInt(brandId, 10) : NaN;

  // 브랜드 정보 상태
  const [brand, setBrand] = useState<LocalBrand | null>(null);
  const [loadingBrand, setLoadingBrand] = useState<boolean>(true);
  const [errorBrand, setErrorBrand] = useState<string>('');

  // 제품 목록 상태
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ApiProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [errorProducts, setErrorProducts] = useState<string>('');

  // 카테고리 필터
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // 열 선택 관련 상태
  const [viewCols, setViewCols] = useState<number>(2);

  // 모바일 뷰 여부
  const [isMobileView, setIsMobileView] = useState(true);
  useEffect(() => {
    const { width } = Dimensions.get('window');
    setIsMobileView(width < 768);
    setViewCols(width < 768 ? 2 : 4);
  }, []);

  // 브랜드 정보 로드
  useEffect(() => {
    if (isNaN(idNum)) {
      setErrorBrand('유효하지 않은 브랜드 ID입니다.');
      setLoadingBrand(false);
      return;
    }
    setLoadingBrand(true);
    (async () => {
      try {
        const data: ApiBrand[] = await getBrandList();
        const found = data.find((b) => b.id === idNum);
        if (found) {
          setBrand({
            id: found.id,
            name: found.brandName,
            category: found.brand_category || '',
            group: found.groupName || '',
            company: '',
            productCount: found.productCount || 0,
          });
        } else {
          setErrorBrand('해당 브랜드를 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('브랜드 정보 조회 실패:', err);
        setErrorBrand('브랜드 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoadingBrand(false);
      }
    })();
  }, [idNum]);

  // 제품 목록 로드
  useEffect(() => {
    if (!brand) return;
    setLoadingProducts(true);
    setErrorProducts('');
    (async () => {
      try {
        const categoryKey =
          selectedCategory === 'All' ? 'All' : selectedCategory;
        const data = await getProductsByBrand(brand.id, categoryKey);
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error('제품 목록 조회 실패:', err);
        setErrorProducts('제품 목록을 불러오는 중 오류가 발생했습니다.');
        setAllProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, [brand, selectedCategory]);

  // 제품 클릭: 상세 페이지로 이동
  const handleItemClick = (prodId: string) => {
    navigation.navigate('HomeDetail' as never, { id: prodId } as never);
  };

  // 공유 핸들러
  const handleShare = async () => {
    try {
      const shareUrl = `https://melpik.com/brand/${brandId}`;
      await Clipboard.setStringAsync(shareUrl);
      Alert.alert('알림', '링크가 복사되었습니다.');
    } catch (err) {
      console.error('클립보드 복사 실패', err);
      Alert.alert('오류', '링크 복사에 실패했습니다.');
    }
  };

  // 로딩/오류 처리
  if (loadingBrand) {
    return (
      <View style={styles.container}>
        <Text style={styles.statText}>브랜드 정보를 불러오는 중...</Text>
      </View>
    );
  }
  if (errorBrand) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>브랜드를 찾을 수 없습니다.</Text>
        <Text style={styles.subtitle}>{errorBrand}</Text>
      </View>
    );
  }
  if (!brand) {
    return null;
  }

  // UIItem 매핑 (filteredProducts 기준)
  const uiItems: UIItem[] = filteredProducts.map((it) => ({
    id: it.id.toString(),
    image: it.image || '',
    brand: brand.name,
    description: it.description || '',
    price: it.price || 0,
    discount: it.discount || 0,
    isLiked: false,
  }));

  // UI 렌더링
  return (
    <>
      {/* UnifiedHeader */}
      <UnifiedHeader
        variant='oneDepth'
        title={brand.name}
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{brand.name}</Text>
          <Text style={styles.subtitle}>새로운 시즌 제품들을 내 손안에!</Text>
        </View>

        <StatsSection brandCount={1} productCount={brand.productCount} />
        <View style={styles.divider} />

        <SubHeader
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* 필터 */}
        <View style={styles.controlsContainer}>
          <FilterContainer />
        </View>

        <View style={styles.content}>
          {loadingProducts ? (
            <Text style={styles.statText}>제품 목록을 불러오는 중...</Text>
          ) : errorProducts ? (
            <Text style={styles.statText}>{errorProducts}</Text>
          ) : filteredProducts.length === 0 ? (
            <Text style={styles.statText}>조건에 맞는 제품이 없습니다.</Text>
          ) : (
            <ItemList
              items={uiItems}
              columns={viewCols}
              onItemClick={handleItemClick}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default BrandDetail;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    width: '100%',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    margin: 0,
  },
  subtitle: {
    fontSize: 12,
    color: '#ccc',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 30,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginVertical: 12,
  },
  content: {
    flex: 1,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    padding: 15,
  },
});
