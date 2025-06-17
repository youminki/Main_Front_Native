// src/pages/Brand/BrandDetail.tsx

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import styled, { keyframes } from 'styled-components';
import { FaTh } from 'react-icons/fa';

import UnifiedHeader from '../../components/UnifiedHeader'; // UnifiedHeader import 경로를 실제 경로에 맞춰 조정
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

  const [brand, setBrand] = useState<LocalBrand | null>(null);
  const [loadingBrand, setLoadingBrand] = useState<boolean>(true);
  const [errorBrand, setErrorBrand] = useState<string>('');

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [errorProducts, setErrorProducts] = useState<string>('');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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

  // 브랜드 상세 정보 로드
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

  // 제품 목록 로드
  useEffect(() => {
    if (!brand) return;
    setLoadingProducts(true);
    setErrorProducts('');
    (async () => {
      try {
        const data = await getProductsByBrand(brand.id, selectedCategory);
        setProducts(data);
      } catch (err) {
        console.error('제품 목록 조회 실패:', err);
        setErrorProducts('제품 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, [brand, selectedCategory]);

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

  // UIItem 매핑: UIItem.imageurl 필드에 API의 imageUrl 또는 실제 필드명을 매핑
  const uiItems: UIItem[] = products.map((it) => ({
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

  return (
    <>
      {/* UnifiedHeader에 onBack prop 지정: 뒤로가기 시 /brand 로 이동 */}
      <UnifiedHeader
        variant='oneDepth'
        title={brand.name}
        onBack={() => navigate('/brand')}
      />

      {/* Header가 fixed 되어 있다면, 아래 Container에 padding-top을 주어 내용이 겹치지 않도록 조정 */}
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
            setSelectedCategory(cat);
            scrollToTop();
          }}
          onCategoryClick={scrollToTop}
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

        <Content>
          {loadingProducts ? (
            <StatText>제품 목록을 불러오는 중...</StatText>
          ) : errorProducts ? (
            <StatText>{errorProducts}</StatText>
          ) : products.length === 0 ? (
            <StatText>해당 조건의 제품이 없습니다.</StatText>
          ) : (
            <ItemList
              items={uiItems}
              columns={viewCols}
              onDelete={() => {
                /* 필요시 구현 */
              }}
              onItemClick={() => {
                /* 필요시 구현 */
              }}
            />
          )}
        </Content>

        <ScrollToTopButton onClick={scrollToTop}>
          <ArrowIcon viewBox='0 0 24 24'>
            <path d='M12 4l-8 8h6v8h4v-8h6z' />
          </ArrowIcon>
        </ScrollToTopButton>
      </Container>
    </>
  );
};

export default BrandDetail;

// styled components

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
