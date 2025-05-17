// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Spinner from '../../components/Spinner';
import ItemList, { UIItem } from '../../components/Home/ItemList';
import Footer from '../../components/Home/Footer';
import SubHeader from '../../components/Home/SubHeader';
import { getProducts, ProductListItem } from '../../api/upload/productApi';
import HomeDetail from './HomeDetail';
import CancleIconIcon from '../../assets/Header/CancleIcon.svg';
import ShareIcon from '../../assets/Header/ShareIcon.svg';
import HomeIcon from '../../assets/Header/HomeIcon.svg';
import ArrowIconSvg from '../../assets/ArrowIcon.svg';
import ReusableModal from '../../components/ReusableModal';
import FilterContainer from '../../components/Home/FilterContainer';
import { FaTh } from 'react-icons/fa';

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ITEMS_PER_LOAD = 20;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const menuRef = useRef<HTMLDivElement>(null);

  // 로그인→홈 이동 시에만 전달된 showNotice 플래그로 모달 열기
  const showNoticeFlag = (location.state as any)?.showNotice;
  const [isNoticeOpen, setNoticeOpen] = useState<boolean>(
    Boolean(showNoticeFlag)
  );

  // 공유 모달 상태
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  // 모바일 뷰 여부
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // 컬럼 수
  const [viewCols, setViewCols] = useState(isMobileView ? 2 : 4);
  useEffect(() => {
    setViewCols(isMobileView ? 2 : 4);
  }, [isMobileView]);

  // 메뉴 열림 토글
  const [menuOpen, setMenuOpen] = useState(false);

  // 카테고리/검색
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('categori') || 'Entire'
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  // 제품 & 페이징
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // 상세 모달
  const modalId = searchParams.get('id');
  const isModalOpen = Boolean(modalId);
  const [isFeatureModalOpen, setFeatureModalOpen] = useState(false);

  // URL 동기화
  useEffect(() => {
    const c = searchParams.get('categori') || 'Entire';
    const s = searchParams.get('search') || '';
    setSelectedCategory(c);
    setSearchQuery(s);
  }, [searchParams]);

  // 제품 로드 (카테고리 변경 시)
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

  // 필터 & 무한스크롤 준비
  const filtered = products.filter(
    (item) =>
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const hasMore = page * ITEMS_PER_LOAD < filtered.length;
  const displayedProducts = filtered.slice(0, page * ITEMS_PER_LOAD);

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

  const uiItems: UIItem[] = displayedProducts.map((p) => ({
    id: p.id.toString(),
    image: p.image,
    brand: p.brand,
    description: p.description,
    price: p.price,
    discount: p.discount,
    isLiked: p.isLiked,
  }));

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // 상세 모달 핸들러
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

  // 컬럼 옵션 선택
  const selectCols = (n: number) => {
    setViewCols(n);
    setMenuOpen(false);
  };
  const colOptions = isMobileView ? [1, 2, 3] : [4, 5, 6];

  // 공유하기 핸들러
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('공유 실패', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setShareModalOpen(true);
      } catch (err) {
        console.error('클립보드 복사 실패', err);
      }
    }
  };

  return (
    <MainContainer>
      {/* 알림 공지 모달 */}
      <ReusableModal
        isOpen={isNoticeOpen}
        onClose={() => setNoticeOpen(false)}
        title='알림 공지'
      >
        <ModalContent>
          <NoticeTitle>PG사 결제 지연 안내</NoticeTitle>
          <NoticeParagraph>
            금일 오전에 카드등록 및 결제가 PG사 연결 지연으로 오후에 진행하게
            되었습니다.
          </NoticeParagraph>
          <NoticeParagraph>
            중요한 결제이니만큼 신중하게 처리 후 좋은 서비스로 보답
            드리겠습니다.
          </NoticeParagraph>
          <NoticeParagraph>
            계속 기다리게 해드려서 죄송합니다. <br />
            조금만 더 기다려 주세요 :)
          </NoticeParagraph>
        </ModalContent>
      </ReusableModal>

      {/* 공유 링크 복사 안내 모달 */}
      <ReusableModal
        isOpen={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title='링크 복사됨'
      >
        현재 페이지 URL이 클립보드에 복사되었습니다.
      </ReusableModal>

      {/* 서브헤더(카테고리) */}
      <SubHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSearchQuery('');
          setSearchParams({ categori: cat }, { replace: true });
        }}
        onCategoryClick={() => setSearchQuery('')}
      />

      {/* 필터 및 열 선택 */}
      <ControlsContainer ref={menuRef}>
        <DropdownToggle onClick={() => setMenuOpen((o) => !o)}>
          <FaTh size={20} />
        </DropdownToggle>
        <FilterContainer />
        {menuOpen && (
          <DropdownMenu>
            {colOptions.map((n) => (
              <DropdownItem
                key={n}
                active={viewCols === n}
                onClick={() => selectCols(n)}
              >
                <OptionNumber>{n}</OptionNumber>
                <OptionText>열로 보기</OptionText>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </ControlsContainer>

      {/* 제품 리스트 or 로딩 스피너 */}
      <ContentWrapper>
        {isLoading ? (
          <Spinner />
        ) : (
          <ItemList
            items={uiItems}
            columns={viewCols}
            onItemClick={handleOpenModal}
          />
        )}
      </ContentWrapper>

      {/* 푸터 */}
      <Footer />

      {/* 스크롤 탑 버튼 */}
      <ScrollToTopButton onClick={scrollToTop}>
        <ArrowIconImg src={ArrowIconSvg} alt='위로 이동' />
      </ScrollToTopButton>

      {/* 상세 모달 */}
      {isModalOpen && modalId && (
        <>
          <ModalOverlay>
            <ModalBox>
              <ModalHeaderWrapper>
                <ModalHeaderContainer>
                  <LeftSection>
                    <CancleIcon
                      src={CancleIconIcon}
                      alt='취소'
                      onClick={handleCloseModal}
                    />
                  </LeftSection>
                  <CenterSection />
                  <RightSection>
                    <Icon src={ShareIcon} alt='공유' onClick={handleShare} />
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
          <ReusableModal
            isOpen={isFeatureModalOpen}
            onClose={() => setFeatureModalOpen(false)}
            title='준비 중입니다'
          >
            아직 구현 전인 기능이에요.
          </ReusableModal>
        </>
      )}
    </MainContainer>
  );
};

export default Home;

// styled components…
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem 1rem;
  padding-top: calc(70px + 2rem);
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin: 8px 0;
  position: relative;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 150px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  background: #f6ae24;
  border-radius: 6px;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    opacity 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  @media (min-width: 1000px) {
    right: calc((100vw - 1000px) / 2 + 20px);
  }
`;

const ArrowIconImg = styled.img``;

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

const ModalBody = styled.div`
  padding-top: 70px;
`;

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

const CancleIcon = styled.img`
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
  right: calc(50px + 0);
  top: calc(5px + 36px);
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
`;

const OptionNumber = styled.span`
  padding: 0 4px;
  font-weight: 700;
`;

const OptionText = styled.span`
  margin-left: 4px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  line-height: 1.6;
  color: #333;
  font-size: 14px;
`;

const NoticeTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

const NoticeParagraph = styled.p`
  margin: 0;
`;
