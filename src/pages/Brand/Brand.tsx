import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getBrandList, Brand as ApiBrand } from '../../api/brand/brandApi';

interface LocalBrand {
  id: number;
  name: string;
  category: string; // API의 brand_category
  group: string; // API의 groupName
  company: string; // 필요 시 매핑
}

const Brand: React.FC = () => {
  const [apiBrands, setApiBrands] = useState<ApiBrand[]>([]);
  const [brands, setBrands] = useState<LocalBrand[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'group' | 'category'>('group');

  // API 호출
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrandList();
        setApiBrands(data);
      } catch (err) {
        console.error('브랜드 리스트 조회 실패:', err);
      }
    };
    fetchBrands();
  }, []);

  // 매핑: ApiBrand → LocalBrand
  useEffect(() => {
    const mapped: LocalBrand[] = apiBrands.map((b) => ({
      id: b.id,
      name: b.brandName,
      category: b.brand_category || '',
      group: b.groupName || '',
      company: '', // 필요 시 실제 필드 사용
    }));
    setBrands(mapped);
  }, [apiBrands]);

  // 검색: name, group, category 포함 여부로 필터링
  const filteredBrands = brands.filter((brand) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      brand.name.toLowerCase().includes(term) ||
      brand.group.toLowerCase().includes(term) ||
      brand.category.toLowerCase().includes(term)
    );
  });

  // 그룹핑: sortBy에 따라 groupName별 또는 category별로 묶기
  const groupedBrands: Record<string, LocalBrand[]> = filteredBrands.reduce(
    (acc: Record<string, LocalBrand[]>, brand) => {
      const key =
        sortBy === 'group' ? brand.group || '기타' : brand.category || '기타';
      if (!acc[key]) acc[key] = [];
      acc[key].push(brand);
      return acc;
    },
    {}
  );

  // 정렬: 그룹 키와 그룹 내 브랜드 정렬
  const sortedGroupedBrands: Record<string, LocalBrand[]> = {};
  Object.keys(groupedBrands)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .forEach((key) => {
      const arr = groupedBrands[key]
        .slice()
        .sort((x, y) =>
          x.name.localeCompare(y.name, undefined, { sensitivity: 'base' })
        );
      sortedGroupedBrands[key] = arr;
    });

  // 정렬 토글 함수
  const toggleSort = () => {
    setSortBy((prev) => (prev === 'group' ? 'category' : 'group'));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>브랜드</Text>
          <Text style={styles.subtitle}>새로운 시즌 제품들을 내 손안에!</Text>
        </View>

        {/* StatsSection: 전체 통계 */}
        <View style={styles.statsSection}>
          <Text style={styles.statsText}>
            브랜드 {brands.length}개 | 제품{' '}
            {apiBrands.reduce((sum, b) => sum + (b.productCount || 0), 0)}개
          </Text>
        </View>

        <View style={styles.divider} />

        {/* ControlSection: 검색어와 정렬 토글 */}
        <View style={styles.controlSection}>
          <Text style={styles.controlText}>
            정렬: {sortBy === 'group' ? '그룹별' : '카테고리별'}
          </Text>
        </View>

        {/* BrandList: 그룹핑된 결과 */}
        <View style={styles.brandList}>
          {Object.entries(sortedGroupedBrands).map(([groupName, brandList]) => (
            <View key={groupName} style={styles.brandGroup}>
              <Text style={styles.groupTitle}>{groupName}</Text>
              {brandList.map((brand) => (
                <View key={brand.id} style={styles.brandItem}>
                  <Text style={styles.brandName}>{brand.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#ccc',
  },
  statsSection: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 16,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#dddddd',
    marginVertical: 30,
  },
  controlSection: {
    marginBottom: 20,
  },
  controlText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  brandList: {
    flex: 1,
  },
  brandGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  brandItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  brandName: {
    fontSize: 16,
    color: '#333',
  },
});

export default Brand;
