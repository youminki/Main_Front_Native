// src/components/Home/BrandDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import StatsSection from '../../components/Brand/StatsSection';
import SubHeader from '../../components/Home/SubHeader';
import ItemList from '../../components/Home/ItemList';
import BrandIcon from '/src/assets/BrandIcon.svg';

interface Brand {
  name: string;
  category: string;
  group: string;
  company: string;
  productCount: number;
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

const items = [
  {
    id: 1,
    image: '',
    brand: 'SANDRO',
    description: 'SNS21N9 / 원피스',
    category: 'onepiece',
    price: 460000,
    discount: 10,
  },
  {
    id: 2,
    image: '',
    brand: 'ZOOC',
    description: 'ZSC14B1 / 블라우스',
    category: 'blouse',
    price: 380000,
    discount: 15,
  },
  {
    id: 3,
    image: '',
    brand: 'MICHA',
    description: 'MCH88T7 / 투피스',
    category: 'twopiece',
    price: 540000,
    discount: 20,
  },
];

const BrandDetail: React.FC = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const brand = brands.find((b) => b.name === brandName);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [barPosition, setBarPosition] = useState<number>(0);

  useEffect(() => {
    const selectedElement = document.querySelector(
      `[data-category="${selectedCategory}"]`
    ) as HTMLElement;

    if (selectedElement) {
      const { offsetLeft, offsetWidth } = selectedElement;
      setBarPosition(offsetLeft + offsetWidth / 2 - 25);
    }
  }, [selectedCategory]);

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <SubHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        barPosition={barPosition}
      />
      <Content>
        <ItemList items={filteredItems} />
      </Content>
      <ScrollToTopButton onClick={scrollToTop}>
        <ArrowIcon xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path d='M12 4l-8 8h6v8h4v-8h6z' />
        </ArrowIcon>
      </ScrollToTopButton>
    </Container>
  );
};

export default BrandDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;
  position: relative;
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
  margin-top: 30px;
`;

const Content = styled.div`
  flex: 1;
`;

// 스크롤 최상단으로 이동 버튼 (BrandDetail용)
const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 204, 0, 0.9),
    rgba(255, 153, 0, 0.9)
  );
  color: #ffffff;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.3s ease;
  opacity: 0.9;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }

  /* 최대 너비 600px 내 위치 조정 */
  @media (min-width: 600px) {
    right: calc((100vw - 600px) / 2 + 20px);
  }
`;

const ArrowIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: #ffffff;
`;
