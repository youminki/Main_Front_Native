// src/components/Home/Home.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Notice from '../../components/Home/Notice';
import ItemList from '../../components/Home/ItemList';
import Footer from '../../components/Home/Footer';
import FilterContainer from '../../components/Home/FilterContainer';
import SubHeader from '../../components/Home/SubHeader';
import { getProducts } from '../../api/upload/productApi';
import { ProductListItem } from '../../api/upload/productApi';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [seasonToggle, setSeasonToggle] = useState<boolean>(false);
  const [barPosition, setBarPosition] = useState<number>(0);
  const [products, setProducts] = useState<ProductListItem[]>([]);

  // 선택된 카테고리 아이콘 위치 계산 (barPosition 업데이트)
  useEffect(() => {
    const selectedElement = document.querySelector(
      `[data-category="${selectedCategory}"]`
    ) as HTMLElement;
    if (selectedElement) {
      const { offsetLeft, offsetWidth } = selectedElement;
      setBarPosition(offsetLeft + offsetWidth / 2 - 25);
    }
  }, [selectedCategory]);

  // 선택된 카테고리에 따른 제품 데이터 불러오기
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getProducts(selectedCategory);
        setProducts(products);
      } catch (error) {
        console.error('제품 데이터를 불러오는데 실패했습니다:', error);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <Notice />
        <SubHeaderContainer>
          <SubHeader
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            barPosition={barPosition}
          />
        </SubHeaderContainer>
        <FilterContainer
          seasonToggle={seasonToggle}
          setSeasonToggle={setSeasonToggle}
        />
        <Content>
          <ItemList items={products} />
        </Content>
      </ContentWrapper>
      <Footer />
      <ScrollToTopButton onClick={scrollToTop}>
        <ArrowIcon xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path d='M12 4l-8 8h6v8h4v-8h6z' />
        </ArrowIcon>
      </ScrollToTopButton>
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;

const SubHeaderContainer = styled.div`
  margin: 20px 0;
`;

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

  @media (min-width: 600px) {
    right: calc((100vw - 600px) / 2 + 20px);
  }
`;

const ArrowIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: #ffffff;
`;
