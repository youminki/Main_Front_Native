import React, { useState } from 'react';
import styled from 'styled-components';
import Theme from '../../styles/Theme';
import { ThemeProvider } from 'styled-components';
import BrandIcon from '/src/assets/BrandIcon.svg';
import { BrandList } from '../../components/Brand/BrandList';
import { ControlSection } from '../../components/Brand/ControlSection';
import StatsSection from '../../components/Brand/StatsSection';

interface Brand {
  name: string;
  category: string;
  group: string;
  company: string;
}

const Brand: React.FC = () => {
  const [filter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'group' | 'category'>('group');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const brands: Brand[] = [
    { name: 'SANDRO', category: '컨템포러리', group: 'A', company: '아이디룩' },
    { name: 'MAJE', category: '컨템포러리', group: 'A', company: '아이디룩' },
    {
      name: 'MICHA',
      category: '컨템포러리',
      group: 'A',
      company: '시선인터내셔널',
    },
    {
      name: 'it MICHA',
      category: '캐릭터',
      group: 'A',
      company: '시선인터내셔널',
    },
    {
      name: 'MOJO.S.PHINE',
      category: '컨템포러리',
      group: 'B',
      company: '대현',
    },
    { name: 'DEW L', category: '컨템포러리', group: 'B', company: '대현' },
    { name: 'ZOOC', category: '캐릭터', group: 'B', company: '대현' },
  ];

  const filteredBrands: Brand[] = brands.filter(
    (brand) =>
      (!filter || brand.category === filter) &&
      (!searchTerm ||
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const groupedBrands: Record<string, Brand[]> = filteredBrands.reduce(
    (acc: Record<string, Brand[]>, brand) => {
      const key = brand[sortBy];
      if (!acc[key]) acc[key] = [];
      acc[key].push(brand);
      return acc;
    },
    {} as Record<string, Brand[]>
  );

  const toggleSort = () => {
    setSortBy((prevSort) => (prevSort === 'group' ? 'category' : 'group'));
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>브랜드</Title>
          <Subtitle>새로운 시즌 제품들을 내 손안에!</Subtitle>
        </Header>

        <StatsSection
          brandCount={brands.length}
          productCount={9480}
          BrandIcon={BrandIcon}
        />

        <Divider />

        <ControlSection
          toggleSort={toggleSort}
          sortBy={sortBy}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

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
  padding: 2rem;
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
