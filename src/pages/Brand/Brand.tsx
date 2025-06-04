// src/pages/Brand/Brand.tsx

import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Theme from '../../styles/Theme';
import BrandIcon from '/src/assets/BrandIcon.svg';
import { BrandList } from '../../components/Brand/BrandList';
import { ControlSection } from '../../components/Brand/ControlSection';
import StatsSection from '../../components/Brand/StatsSection';
import { getBrandList, Brand as ApiBrand } from '../../api/brand/brandApi';

interface LocalBrand {
  id: number;
  name: string;
  category: string;
  group: string;
  company: string;
}

const Brand: React.FC = () => {
  // API에서 받아온 원본 데이터
  const [apiBrands, setApiBrands] = useState<ApiBrand[]>([]);
  // UI에서 사용하는 형태로 매핑한 로컬 상태
  const [brands, setBrands] = useState<LocalBrand[]>([]);

  // ControlSection, BrandList를 위한 상태
  const [filter, setFilter] = useState<string>(''); // category 필터
  const [sortBy, setSortBy] = useState<'group' | 'category'>('group');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 1) 컴포넌트가 마운트될 때 API 호출
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

  // 2) apiBrands가 바뀔 때, LocalBrand 형태로 매핑
  useEffect(() => {
    const mapped: LocalBrand[] = apiBrands.map((b) => ({
      id: b.id,
      name: b.brandName,
      // 백엔드에서 category, company 정보가 없다면 임시로 빈 문자열('')을 넣거나,
      // 실제 내려주는 필드명으로 변경해 주세요.
      category: '',
      group: b.groupName,
      company: '',
    }));
    setBrands(mapped);
  }, [apiBrands]);

  // 3) 필터링 & 검색어 적용
  const filteredBrands: LocalBrand[] = brands.filter(
    (brand) =>
      // category 필터가 비어있거나(category가 '')
      (!filter || brand.category === filter) &&
      // 검색어가 비어있거나(name 또는 company에 검색어 포함)
      (!searchTerm ||
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 4) 그룹핑 (sortBy에 따라 'group' 또는 'category'로 묶음)
  const groupedBrands: Record<string, LocalBrand[]> = filteredBrands.reduce(
    (acc: Record<string, LocalBrand[]>, brand) => {
      const key = brand[sortBy]; // 'group' 또는 'category'
      if (!acc[key]) acc[key] = [];
      acc[key].push(brand);
      return acc;
    },
    {}
  );

  // 5) sort 기준 토글 함수
  const toggleSort = () => {
    setSortBy((prev) => (prev === 'group' ? 'category' : 'group'));
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>브랜드</Title>
          <Subtitle>새로운 시즌 제품들을 내 손안에!</Subtitle>
        </Header>

        {/* StatsSection: total 브랜드 개수(로컬 매핑 후)와 예시 productCount 전달 */}
        <StatsSection
          brandCount={brands.length}
          productCount={9480}
          BrandIcon={BrandIcon}
        />

        <Divider />

        {/* ControlSection: 정렬 토글, 검색어 입력 */}
        <ControlSection
          toggleSort={toggleSort}
          sortBy={sortBy}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          // 만약 category 필터를 UI에서 쓰려면 아래 prop 추가
          filter={filter}
          setFilter={setFilter}
        />

        {/* BrandList: 그룹핑된 결과를 넘겨줌 */}
        <BrandList groupedBrands={groupedBrands} />
      </Container>
    </ThemeProvider>
  );
};

export default Brand;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fff;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #000;
  margin-bottom: 0px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 30px 0;
`;
