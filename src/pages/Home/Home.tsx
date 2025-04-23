// src/pages/Home/Home.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';

import ItemList from '../../components/Home/ItemList';
import Footer from '../../components/Home/Footer';
import FilterContainer from '../../components/Home/FilterContainer';
import SubHeader from '../../components/Home/SubHeader';
import SearchBar from '../../components/Home/SearchBar';
import { getProducts } from '../../api/upload/productApi';
import { ProductListItem } from '../../api/upload/productApi';
import HomeDetail from './HomeDetail';

import CancelIconSrc from '../../assets/Header/CancleIcon.svg';
import ShareIconSrc from '../../assets/Header/ShareIcon.svg';
import HomeIconSrc from '../../assets/Header/HomeIcon.svg';

const ITEMS_PER_LOAD = 10;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('categori') || 'Entire'
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [barPosition, setBarPosition] = useState<number>(0);

  const [allProducts, setAllProducts] = useState<ProductListItem[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<ProductListItem[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // URL 쿼리 반영
  useEffect(() => {
    setSelectedCategory(searchParams.get('categori') || 'Entire');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // 카테고리 indicator 위치 계산
  useEffect(() => {
    const el = document.querySelector(
      `[data-category="${selectedCategory}"]`
    ) as HTMLElement | null;
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setBarPosition(offsetLeft + offsetWidth / 2 - 25);
    }
  }, [selectedCategory]);

  const categoryMapping: { [key: string]: string } = {
    Entire: 'all',
    MiniDress: 'MiniDress',
    MidiDress: 'MidiDress',
    LongDress: 'LongDress',
    TowDress: 'TowDress',
    JumpSuit: 'JumpSuit',
    Blouse: 'Blouse',
    KnitTop: 'KnitTop',
    ShirtTop: 'ShirtTop',
    MiniSkirt: 'MiniSkirt',
    MidiSkirt: 'MidiSkirt',
    Pants: 'Pants',
    Jacket: 'Jacket',
    Coat: 'Coat',
  };

  // 데이터 페치
  useEffect(() => {
    setIsFetching(true);
    (async () => {
      try {
        const key = categoryMapping[selectedCategory];
        const prods = await getProducts(key);
        setAllProducts(
          key === 'all' ? prods : prods.filter((p) => p.category === key)
        );
      } catch (e) {
        console.error('제품 데이터 로드 실패', e);
      } finally {
        setIsFetching(false);
      }
    })();
    window.scrollTo({ top: 0 });
  }, [selectedCategory]);

  // 초기 노출
  useEffect(() => {
    setVisibleProducts(allProducts.slice(0, ITEMS_PER_LOAD));
  }, [allProducts]);

  // 무한 스크롤
  useEffect(() => {
    const onScroll = () => {
      if (isFetching) return;
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        const next = allProducts.slice(
          visibleProducts.length,
          visibleProducts.length + ITEMS_PER_LOAD
        );
        if (next.length) setVisibleProducts((v) => [...v, ...next]);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [allProducts, visibleProducts, isFetching]);

  // 검색 필터 적용
  const displayedProducts = visibleProducts.filter(
    (item) =>
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const openModal = (id: string) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  return (
    <MainContainer>
      <SearchBar onSearch={setSearchQuery} />
      <SubHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        barPosition={barPosition}
        onCategoryClick={() => setSearchQuery('')}
      />
      <FilterContainer />
      <Content>
        <ItemList items={displayedProducts} onItemClick={openModal} />
        {isFetching && <Spinner />}
      </Content>
      <Footer />
      <ScrollToTopButton onClick={scrollToTop}>
        <ArrowIcon viewBox='0 0 24 24'>
          <path d='M12 4l-8 8h6v8h4v-8h6z' />
        </ArrowIcon>
      </ScrollToTopButton>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeaderWrapper>
              <ModalHeaderContainer>
                <LeftSection>
                  <CancelIcon
                    src={CancelIconSrc}
                    alt='취소'
                    onClick={closeModal}
                  />
                </LeftSection>
                <CenterSection />
                <RightSection>
                  <Icon src={ShareIconSrc} alt='공유' />
                  <Icon
                    src={HomeIconSrc}
                    alt='홈'
                    onClick={() => navigate('/')}
                  />
                </RightSection>
              </ModalHeaderContainer>
            </ModalHeaderWrapper>
            {selectedItemId && <HomeDetail id={selectedItemId} />}
          </ModalContent>
        </ModalOverlay>
      )}
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
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
  color: #fff;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    opacity 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }

  @media (min-width: 1440px) {
    right: calc((100vw - 1440px) / 2 + 20px);
  }
`;

const ArrowIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: #fff;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  overflow-y: auto;
`;

const ModalHeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 27px;
  background: #fff;
  z-index: 2100;
`;
const ModalHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 27px;
`;
const LeftSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 19px;
`;
const CancelIcon = styled.img`
  cursor: pointer;
`;
const Icon = styled.img`
  cursor: pointer;
`;
