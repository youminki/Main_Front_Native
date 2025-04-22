import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';

import ItemList from '../../components/Home/ItemList';
import Footer from '../../components/Home/Footer';
import FilterContainer from '../../components/Home/FilterContainer';
import SubHeader from '../../components/Home/SubHeader';
import { getProducts } from '../../api/upload/productApi';
import { ProductListItem } from '../../api/upload/productApi';
import HomeDetail from './HomeDetail';
import SearchBar from '../../components/Home/SearchBar';

// twoDepth header assets
import CancleIconIcon from '../../assets/Header/CancleIcon.svg';
import ShareIcon from '../../assets/Header/ShareIcon.svg';
import HomeIcon from '../../assets/Header/HomeIcon.svg';

const ITEMS_PER_LOAD = 10;

const Home: React.FC = () => {
  const navigate = useNavigate();

  // 초기 카테고리를 SubHeader의 전체 아이콘과 맞추기 위해 'Entire'로 설정합니다.
  const [selectedCategory, setSelectedCategory] = useState<string>('Entire');
  const [barPosition, setBarPosition] = useState<number>(0);
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // modal state
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const displayedProducts = products.slice(0, page * ITEMS_PER_LOAD);

  // 카테고리 아이콘 아래 표시되는 인디케이터 위치 계산
  useEffect(() => {
    const el = document.querySelector(
      `[data-category="${selectedCategory}"]`
    ) as HTMLElement;
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setBarPosition(offsetLeft + offsetWidth / 2 - 25);
    }
  }, [selectedCategory]);

  // SubHeader에서 선택된 카테고리 값을 API에서 사용하는 값으로 매핑합니다.
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

  // fetch products
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const categoryForAPI = categoryMapping[selectedCategory];
        const prods = await getProducts(categoryForAPI);
        if (categoryForAPI !== 'all') {
          const filteredProds = prods.filter(
            (product) => product.category === categoryForAPI
          );
          setProducts(filteredProds);
        } else {
          setProducts(prods);
        }
      } catch (e) {
        console.error('제품 데이터를 불러오는데 실패했습니다:', e);
      } finally {
        setIsLoading(false);
      }
    })();
    setPage(1);
    window.scrollTo({ top: 0 });
  }, [selectedCategory]);

  // infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (isLoading) return;
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        if (page * ITEMS_PER_LOAD < products.length) {
          setIsLoading(true);
          setTimeout(() => {
            setPage((p) => p + 1);
            setIsLoading(false);
          }, 500);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [products, page, isLoading]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleOpenModal = (id: string) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <SearchBar />
        <SubHeaderContainer>
          <SubHeader
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            barPosition={barPosition}
          />
        </SubHeaderContainer>
        <FilterContainer />
        <Content>
          <ItemList items={displayedProducts} onItemClick={handleOpenModal} />
          {isLoading && <Spinner />}
        </Content>
      </ContentWrapper>
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
                    src={CancleIconIcon}
                    alt='취소'
                    onClick={handleCloseModal}
                  />
                </LeftSection>
                <CenterSection />
                <RightSection>
                  <Icon src={ShareIcon} alt='공유' onClick={() => {}} />
                  <Icon src={HomeIcon} alt='홈' onClick={() => navigate('/')} />
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

const SubHeaderContainer = styled.div`
  /* margin: 20px 0; */
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

  @media (min-width: 600px) {
    right: calc((100vw - 600px) / 2 + 20px);
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
  max-width: 600px;
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
