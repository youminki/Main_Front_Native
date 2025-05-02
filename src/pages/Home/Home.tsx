import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';

import ItemList, { UIItem } from '../../components/Home/ItemList';
import Footer from '../../components/Home/Footer';
import SubHeader from '../../components/Home/SubHeader';
import { getProducts, ProductListItem } from '../../api/upload/productApi';
import HomeDetail from './HomeDetail';

import CancleIconIcon from '../../assets/Header/CancleIcon.svg';
import ShareIcon from '../../assets/Header/ShareIcon.svg';
import HomeIcon from '../../assets/Header/HomeIcon.svg';
import ReusableModal2 from '../../components/ReusableModal2';
import { FaTh } from 'react-icons/fa';
// 필터 모달 컨테이너
import FilterContainer from '../../components/Home/FilterContainer';
import { keyframes } from 'styled-components';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ITEMS_PER_LOAD = 20;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewCols, setViewCols] = useState<number>(3);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('categori') || 'Entire'
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('search') || ''
  );
  const [barPosition, setBarPosition] = useState<number>(0);

  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modalId = searchParams.get('id');
  const isModalOpen = Boolean(modalId);
  const [isFeatureModalOpen, setFeatureModalOpen] = useState<boolean>(false);

  const selectCols = (n: number) => {
    setViewCols(n);
    setMenuOpen(false);
  };

  useEffect(() => {
    const c = searchParams.get('categori') || 'Entire';
    const s = searchParams.get('search') || '';
    setSelectedCategory(c);
    setSearchQuery(s);
  }, [searchParams]);

  useEffect(() => {
    const categoryKey =
      selectedCategory === 'Entire' ? 'all' : selectedCategory;
    setIsLoading(true);
    (async () => {
      try {
        const prods = await getProducts(categoryKey);
        setProducts(
          categoryKey === 'all'
            ? prods
            : prods.filter((p) => p.category === categoryKey)
        );
        setPage(1);
        window.scrollTo({ top: 0 });
      } catch (err) {
        console.error('제품 데이터를 불러오는데 실패했습니다:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedCategory]);

  useEffect(() => {
    const el = document.querySelector(
      `[data-category=\"${selectedCategory}\"]`
    ) as HTMLElement;
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setBarPosition(offsetLeft + offsetWidth / 2 - 25);
    }
  }, [selectedCategory]);

  const filtered = products.filter(
    (item) =>
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const hasMore = page * ITEMS_PER_LOAD < filtered.length;
  const displayedProducts = filtered.slice(0, page * ITEMS_PER_LOAD);

  const uiItems: UIItem[] = displayedProducts.map((p) => ({
    id: p.id.toString(),
    image: p.image,
    brand: p.brand,
    description: p.description,
    price: p.price,
    discount: p.discount,
    isLiked: p.isLiked,
  }));

  useEffect(() => {
    if (!hasMore) return;
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMore]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleOpenModal = (id: string) => {
    const params: any = {
      ...(searchParams.get('categori') && { categori: selectedCategory }),
      ...(searchParams.get('search') && { search: searchQuery }),
      id,
    };
    setSearchParams(params, { replace: true });
  };

  const handleCloseModal = () => {
    const params = Object.fromEntries(searchParams.entries());
    delete params.id;
    setSearchParams(params, { replace: true });
    setFeatureModalOpen(false);
  };

  return (
    <MainContainer>
      <SubHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSearchQuery('');
          setSearchParams({ categori: cat }, { replace: true });
        }}
        barPosition={barPosition}
        onCategoryClick={() => setSearchQuery('')}
      />
      <ControlsContainer ref={menuRef}>
        <DropdownToggle onClick={() => setMenuOpen((o) => !o)}>
          <FaTh size={20} />
        </DropdownToggle>
        <FilterContainer />
        {menuOpen && (
          <DropdownMenu>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <DropdownItem
                key={n}
                active={viewCols === n}
                className={n > 3 ? 'hide-mobile' : ''}
                onClick={() => selectCols(n)}
              >
                <OptionNumber>{n}</OptionNumber>
                <OptionText>열로 보기</OptionText>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </ControlsContainer>

      <ContentWrapper>
        <ItemList
          items={uiItems}
          columns={viewCols}
          onItemClick={handleOpenModal}
        />
        {isLoading && <Spinner />}
      </ContentWrapper>
      <Footer />
      <ScrollToTopButton onClick={scrollToTop}>
        <ArrowIcon viewBox='0 0 24 24'>
          <path d='M12 4l-8 8h6v8h4v-8h6z' />
        </ArrowIcon>
      </ScrollToTopButton>
      {isModalOpen && modalId && (
        <>
          <ModalOverlay>
            <ModalBox>
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
                    <Icon
                      src={ShareIcon}
                      alt='공유'
                      onClick={() => setFeatureModalOpen(true)}
                    />
                    <Icon
                      src={HomeIcon}
                      alt='홈'
                      onClick={() => navigate('/')}
                    />
                  </RightSection>
                </ModalHeaderContainer>
              </ModalHeaderWrapper>
              <ModalBody>
                <HomeDetail id={modalId} />
              </ModalBody>
            </ModalBox>
          </ModalOverlay>
          <ReusableModal2
            isOpen={isFeatureModalOpen}
            onClose={() => setFeatureModalOpen(false)}
            title='준비 중입니다'
          >
            아직 구현 전인 기능이에요.
          </ReusableModal2>
        </>
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

  padding-top: calc(60px + 2rem);
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin: 8px 0px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 150px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9),
    rgba(244, 244, 244, 0.9)
  );
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
  @media (min-width: 1000px) {
    right: calc((100vw - 1000px) / 2 + 20px);
  }
`;

const ArrowIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: #ff9d00;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;
const ModalBox = styled.div`
  background: #fff;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  overflow-y: auto;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ModalHeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  z-index: 2100;
`;
const ModalHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;
const ModalBody = styled.div``;
const LeftSection = styled.div`
  cursor: pointer;
`;
const CenterSection = styled.div`
  flex: 1;
`;
const RightSection = styled.div`
  display: flex;
  gap: 19px;
`;
const CancelIcon = styled.img`
  cursor: pointer;
`;
const Icon = styled.img`
  cursor: pointer;
`;

const DropdownToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e6e6e6;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  right: calc(60px + 0px);
  top: calc(110px + 36px);
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style: none;
  padding: 8px 0;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 140px;
  z-index: 10;

  animation: ${fadeInDown} 0.25s ease-out;
`;

const DropdownItem = styled.li<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ active }) => (active ? '#ff9d00' : '#333')};
  background: ${({ active }) => (active ? '#fff7e6' : 'transparent')};
  &:hover {
    background: #f5f5f5;
  }
  &.hide-mobile {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
const OptionNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  padding: 0 4px;
  font-weight: 700;
`;

const OptionText = styled.span`
  display: flex;
  align-items: center;
  margin-left: 0;
`;
