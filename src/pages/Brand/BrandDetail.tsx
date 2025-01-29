import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import StatsSection from '../../components/Brand/StatsSection';
import BrandIcon from '/src/assets/BrandIcon.svg';

interface Brand {
  name: string;
  category: string;
  group: string;
  company: string;
  productCount: number; // 브랜드별 제품 개수
}

const brands: Brand[] = [
  {
    name: 'SANDRO',
    category: '컨템포러리',
    group: 'A',
    company: '아이디룩',
    productCount: 1200,
  },
  {
    name: 'MAJE',
    category: '컨템포러리',
    group: 'A',
    company: '아이디룩',
    productCount: 850,
  },
  {
    name: 'MICHA',
    category: '컨템포러리',
    group: 'A',
    company: '시선인터내셔널',
    productCount: 900,
  },
  {
    name: 'it MICHA',
    category: '캐릭터',
    group: 'A',
    company: '시선인터내셔널',
    productCount: 1100,
  },
  {
    name: 'MOJO.S.PHINE',
    category: '컨템포러리',
    group: 'B',
    company: '대현',
    productCount: 1300,
  },
  {
    name: 'DEW L',
    category: '컨템포러리',
    group: 'B',
    company: '대현',
    productCount: 750,
  },
  {
    name: 'ZOOC',
    category: '캐릭터',
    group: 'B',
    company: '대현',
    productCount: 980,
  },
];

const BrandDetail: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();

  // 현재 URL의 brandName과 일치하는 브랜드 정보 찾기
  const brand = brands.find((b) => b.name === brandName);

  if (!brand) {
    return (
      <Container>
        <Title>브랜드를 찾을 수 없습니다.</Title>
        <Subtitle>유효하지 않은 브랜드 이름입니다.</Subtitle>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{brandName}</Title>
        <Subtitle>새로운 시즌 제품들을 내 손안에!</Subtitle>
      </Header>

      <StatsSection
        brandCount={brands.length}
        productCount={brand.productCount}
        BrandIcon={BrandIcon}
      />
      <Divider />
    </Container>
  );
};

export default BrandDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fff;
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
