// src/pages/Brand/BrandDetail.tsx

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaTh } from 'react-icons/fa';

import UnifiedHeader from '../../components/UnifiedHeader';
import StatsSection from '../../components/Brand/StatsSection';
import SubHeader from '../../components/Home/SubHeader';
import ItemList, { UIItem } from '../../components/Home/ItemList';
import FilterContainer from '../../components/Home/FilterContainer';
import BrandIcon from '/src/assets/BrandIcon.svg';
import { getBrandList, Brand as ApiBrand } from '../../api/brand/brandApi';
import {
  getProductsByBrand,
  Product as ApiProduct,
} from '../../api/product/product';

import HomeDetail from '../Home/HomeDetail';
import CancleIconIcon from '../../assets/Header/CancleIcon.svg';
import ShareIcon from '../../assets/Header/ShareIcon.svg';
import HomeIcon from '../../assets/Header/HomeIcon.svg';

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface LocalBrand {
  id: number;
  name: string;
  category: string;
  group: string;
  company?: string;
  productCount: number;
}

const BrandDetail: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const idNum = brandId ? parseInt(brandId, 10) : NaN;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // UnifiedHeader 검색창에서 ?search=... 이 설정되면 여기서 읽어옴
  const searchTerm = searchParams.get('search')?.trim().toLowerCase() || '';

  // 브랜드 정보 상태
  const [brand, setBrand] = useState<LocalBrand | null>(null);
  const [loadingBrand, setLoadingBrand] = useState<boolean>(true);
  const [errorBrand, setErrorBrand] = useState<string>('');

  // 제품 목록 상태
  const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ApiProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [errorProducts, setErrorProducts] = useState<string>('');

  // 카테고리 필터: 초기값은 URL의 category 파라미터 or 'All'
  const initialCat = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);

  // 열 선택 관련 상태
  const [viewCols, setViewCols] = useState<number>(4);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 모바일 뷰 여부
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => {
    setViewCols(isMobileView ? 2 : 4);
  }, [isMobileView]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // URL 쿼리 'category' 변경 시 selectedCategory에 반영
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  // selectedCategory 변경 시 URL 동기화 (search 파라미터는 유지)
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory && selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // 브랜드 정보 로드
  useEffect(() => {
    if (isNaN(idNum)) {
      setErrorBrand('유효하지 않은 브랜드 ID입니다.');
      setLoadingBrand(false);
      return;
    }
    setLoadingBrand(true);
    (async () => {
      try {
        const data: ApiBrand[] = await getBrandList();
        const found = data.find((b) => b.id === idNum);
        if (found) {
          setBrand({
            id: found.id,
            name: found.brandName,
            category: found.brand_category || '',
            group: found.groupName || '',
            company: '',
            productCount: found.productCount || 0,
          });
        } else {
          setErrorBrand('해당 브랜드를 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('브랜드 정보 조회 실패:', err);
        setErrorBrand('브랜드 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoadingBrand(false);
      }
    })();
  }, [idNum]);

  // 제품 목록 로드 (selectedCategory 및 searchTerm 반영은 이후 useEffect에서)
  useEffect(() => {
    if (!brand) return;
    setLoadingProducts(true);
    setErrorProducts('');
    (async () => {
      try {
        const categoryKey =
          selectedCategory === 'All' ? 'All' : selectedCategory;
        const data = await getProductsByBrand(brand.id, categoryKey);
        setAllProducts(data);
      } catch (err) {
        console.error('제품 목록 조회 실패:', err);
        setErrorProducts('제품 목록을 불러오는 중 오류가 발생했습니다.');
        setAllProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, [brand, selectedCategory]);

  // 검색어(searchTerm) 또는 allProducts 변경 시 filteredProducts 업데이트
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((p) => {
        const name = (p.name || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        return name.includes(searchTerm) || desc.includes(searchTerm);
      });
      setFilteredProducts(filtered);
    }
  }, [allProducts, searchTerm]);

  // 상세 모달 ID
  const modalId = searchParams.get('id');
  const isModalOpen = Boolean(modalId);

  // 제품 클릭: 모달 열기 (URL에 id 설정). 기존 category/search 유지
  const handleItemClick = (prodId: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory && selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    }
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    params.set('id', prodId);
    setSearchParams(params, { replace: true });
  };

  // 모달 닫기: query에서 id 제거, category/search 유지
  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('id');
    setSearchParams(params, { replace: true });
  };

  // 공유 핸들러
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
      } catch (err) {
        console.error('클립보드 복사 실패', err);
      }
    }
  };

  // 로딩/오류 처리
  if (loadingBrand) {
    return (
      <Container>
        <StatText>브랜드 정보를 불러오는 중...</StatText>
      </Container>
    );
  }
  if (errorBrand) {
    return (
      <Container>
        <Title>브랜드를 찾을 수 없습니다.</Title>
        <Subtitle>{errorBrand}</Subtitle>
      </Container>
    );
  }
  if (!brand) {
    return null;
  }

  // UIItem 매핑 (filteredProducts 기준)
  const uiItems: UIItem[] = filteredProducts.map((it) => ({
    id: it.id.toString(),
    image: it.image || '',
    brand: brand.name,
    description: it.description || '',
    price: it.price || 0,
    discount: it.discount || 0,
    isLiked: false,
  }));

  // 열 옵션
  const colOptions = isMobileView ? [1, 2, 3] : [4, 5, 6];
  const selectCols = (n: number) => {
    setViewCols(n);
    setMenuOpen(false);
  };

  // UI 렌더링
  return (
    <>
      {/* UnifiedHeader: 검색어 입력 시 URL의 ?search=... 으로 반영 */}
      <UnifiedHeader
        variant='oneDepth'
        title={brand.name}
        onBack={() => navigate('/brand')}
      />

      <Container>
        <Header>
          <Title>{brand.name}</Title>
          <Subtitle>새로운 시즌 제품들을 내 손안에!</Subtitle>
        </Header>

        <StatsSection
          BrandIcon={BrandIcon}
          brandCount={1}
          productCount={brand.productCount}
        />
        <Divider />

        <SubHeader
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            // 카테고리 변경 시 search 파라미터 초기화하거나 유지할지 결정. 여기서는 초기화하지 않고 유지.
            setSelectedCategory(cat);
            scrollToTop();
          }}
          onCategoryClick={scrollToTop}
        />

        {/* 필터 및 열 선택 */}
        <ControlsContainer ref={menuRef}>
          <DropdownToggle onClick={() => setMenuOpen((prev) => !prev)}>
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

        <Content>
          {loadingProducts ? (
            <StatText>제품 목록을 불러오는 중...</StatText>
          ) : errorProducts ? (
            <StatText>{errorProducts}</StatText>
          ) : filteredProducts.length === 0 ? (
            // 검색어나 카테고리 필터 결과가 없을 때 메시지
            searchTerm ? (
              <StatText>"{searchTerm}"에 대한 결과가 없습니다.</StatText>
            ) : (
              <StatText>조건에 맞는 제품이 없습니다.</StatText>
            )
          ) : (
            <ItemList
              items={uiItems}
              columns={viewCols}
              onItemClick={handleItemClick}
            />
          )}
        </Content>

        <ScrollToTopButton onClick={scrollToTop}>
          <ArrowIcon viewBox='0 0 24 24'>
            <path d='M12 4l-8 8h6v8h4v-8h6z' />
          </ArrowIcon>
        </ScrollToTopButton>
      </Container>

      {/* 상세 모달 */}
      {isModalOpen && modalId && (
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
                    onClick={() => navigate('/home')}
                  />
                </RightSection>
              </ModalHeaderContainer>
            </ModalHeaderWrapper>
            <ModalBody>
              <HomeDetail id={modalId} />
            </ModalBody>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
};

export default BrandDetail;

// styled components (기존 그대로)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 1rem;
  margin: auto;
  max-width: 1000px;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #ccc;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 30px 0 0;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin: 12px 0;
  position: relative;
`;

const DropdownToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
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
  right: 0;
  top: calc(100% + 4px);
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style: none;
  padding: 8px 0;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 120px;
  animation: ${fadeInDown} 0.25s ease-out;
  z-index: 10;
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    opacity 0.3s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
`;

const ArrowIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: #fff;
`;

const StatText = styled.div`
  font-size: 14px;
  color: #666;
  padding: 15px 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  overscroll-behavior: contain;
`;

const ModalBox = styled.div`
  background: #fff;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  overflow-y: auto;
  position: relative;
  overscroll-behavior: contain;
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
