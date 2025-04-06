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

const ITEMS_PER_LOAD = 10;

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [seasonToggle, setSeasonToggle] = useState<boolean>(false);
  const [barPosition, setBarPosition] = useState<number>(0);
  const [products, setProducts] = useState<ProductListItem[]>([]);

  // 무한스크롤용 페이지
  const [page, setPage] = useState<number>(1);

  // 실제 화면에 뿌릴 아이템 (페이지 * ITEMS_PER_LOAD 만큼)
  const displayedProducts = products.slice(0, page * ITEMS_PER_LOAD);

  // 카테고리 바 위치 계산
  useEffect(() => {
    const selectedElement = document.querySelector(
      `[data-category="${selectedCategory}"]`
    ) as HTMLElement;
    if (selectedElement) {
      const { offsetLeft, offsetWidth } = selectedElement;
      setBarPosition(offsetLeft + offsetWidth / 2 - 25);
    }
  }, [selectedCategory]);

  // 카테고리 변경 시 제품 데이터 fetch
  useEffect(() => {
    async function fetchProducts() {
      try {
        const prods = await getProducts(selectedCategory);
        setProducts(prods);
      } catch (error) {
        console.error('제품 데이터를 불러오는데 실패했습니다:', error);
      }
    }
    fetchProducts();
    // 새 카테고리면 페이지도 1로 리셋
    setPage(1);
    // 스크롤을 위로 올려서 새 데이터 시작 위치로
    window.scrollTo({ top: 0 });
  }, [selectedCategory]);

  // 스크롤 감지해서 페이지 증가
  useEffect(() => {
    const handleScroll = () => {
      // 바닥 근처에 닿으면
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setPage((prev) =>
          prev * ITEMS_PER_LOAD < products.length ? prev + 1 : prev
        );
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products]);

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
          {/* 전체 제품이 아니라 displayedProducts만 렌더 */}
          <ItemList items={displayedProducts} />
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
