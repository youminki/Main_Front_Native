// src/pages/HomeDetail.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';
import {
  getProductInfo,
  ProductDetail as APIProductDetail,
} from '../../api/upload/productApi';
import ImageSlider from '../../components/Home/HomeDetail/ImageSlider';
import ProductInfo from '../../components/Home/HomeDetail/ProductInfo';
import ProductOptions from '../../components/Home/HomeDetail/ProductOptions';
import PaymentMethod from '../../components/Home/HomeDetail/PaymentMethod';
import SizeInfo from '../../components/Home/HomeDetail/SizeInfo';
import MaterialInfo from '../../components/Home/HomeDetail/MaterialInfo';
import ProductDetails from '../../components/Home/HomeDetail/ProductDetails';
import ServiceSelection from '../../components/Home/HomeDetail/ServiceSelection';
import RentalOptions from '../../components/Home/HomeDetail/RentalOptions';
import ReusableModal from '../../components/ReusableModal';
import ReusableModal2 from '../../components/ReusableModal2';
import BottomBar from '../../components/Home/HomeDetail/BottomBar';
import ShoppingBasket from '../../assets/Home/HomeDetail/ShoppingBasket.svg';
import { addCartItem, CartItemRequest } from '../../api/cart/cart';

interface ProductDetail {
  id: number;
  name: string;
  product_num: string;
  brand: string;
  mainImage: string;
  retailPrice: number;
  discountPrice: number;
  discountPercent: number;
  product_img: string[];
  sizes: { size: string; measurements: Record<string, any> }[];
  size_picture: string;
  category: string;
  season: string;
  manufacturer: string;
  description: string;
  fabricComposition: Record<'겉감' | '안감' | '배색' | '부속', string>;
  elasticity: string;
  transparency: string;
  thickness: string;
  lining: string;
  fit: string;
  color: string;
  product_url: string;
  size_label_guide?: Record<string, string>;
}

type HomeDetailProps = { id?: string };

const HomeDetail: React.FC<HomeDetailProps> = ({ id: propId }) => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // UI 상태
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedService, setSelectedService] = useState<
    'rental' | 'purchase' | ''
  >('');
  const [servicePeriod, setServicePeriod] = useState<string>('');

  // 모달 상태
  const [warnModalOpen, setWarnModalOpen] = useState(false);
  const [warnMessage, setWarnMessage] = useState('');
  const [cartConfirmOpen, setCartConfirmOpen] = useState(false);
  const [cartAlert, setCartAlert] = useState({ open: false, message: '' });

  // 이미지 슬라이드
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = useMemo<string[]>(() => {
    if (!product) return [];
    return product.product_img.length
      ? product.product_img
      : [product.mainImage];
  }, [product]);

  const handleSwipeLeft = useCallback(() => {
    setCurrentImageIndex((i) => (images.length ? (i + 1) % images.length : 0));
  }, [images.length]);

  const handleSwipeRight = useCallback(() => {
    setCurrentImageIndex((i) =>
      images.length ? (i === 0 ? images.length - 1 : i - 1) : 0
    );
  }, [images.length]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const onMove = (ev: MouseEvent) => {
        if (Math.abs(ev.clientX - startX) > 50) {
          ev.clientX - startX > 0 ? handleSwipeRight() : handleSwipeLeft();
          window.removeEventListener('mousemove', onMove);
          window.removeEventListener('mouseup', onUp);
        }
      };
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [handleSwipeLeft, handleSwipeRight]
  );

  // 상품 정보 조회
  useEffect(() => {
    const id = propId || params.id;
    if (!id) return;
    getProductInfo(Number(id))
      .then((res) => {
        const api = res.product as APIProductDetail & any;
        // fabricComposition 매핑
        const raw = api.fabricComposition;
        let mapped: any;
        if (Array.isArray(raw)) {
          const [겉감 = '', 안감 = '', 배색 = '', 부속 = ''] = raw;
          mapped = { 겉감, 안감, 배색, 부속 };
        } else {
          mapped = {
            겉감: raw['겉감'] || '',
            안감: raw['안감'] || '',
            배색: raw['배색'] || '',
            부속: raw['부속'] || '',
          };
        }
        const { fabricComposition: _f, size_label_guide: guide, ...rest } = api;
        setProduct({
          ...rest,
          fabricComposition: mapped,
          size_label_guide: guide,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [propId, params.id]);

  // 서비스 변경
  const handleServiceChange = (service: string) => {
    if (service === 'rental' && (!selectedSize || !selectedColor)) {
      setWarnMessage('렌탈은 사이즈와 색상을 먼저 선택해야 합니다.');
      setWarnModalOpen(true);
      return;
    }
    setSelectedService(service as 'rental' | 'purchase');
  };

  if (loading) return <Spinner />;
  if (!product) return <div>제품을 찾을 수 없습니다.</div>;

  // 결제/장바구니에 넘길 공통 데이터
  const payload: CartItemRequest = {
    productId: product.id,
    serviceType: selectedService as 'rental' | 'purchase',
    rentalStartDate:
      selectedService === 'rental'
        ? servicePeriod.split('~')[0]?.trim().replace(/\./g, '-')
        : undefined,
    rentalEndDate:
      selectedService === 'rental'
        ? servicePeriod.split('~')[1]?.trim().replace(/\./g, '-')
        : undefined,
    size: selectedSize,
    color: selectedColor,
    quantity: 1,
    totalPrice: selectedService === 'rental' ? 0 : product.retailPrice,
  };

  // 장바구니 버튼
  const onCartClick = () => {
    if (!selectedService) {
      setWarnMessage('서비스 타입을 먼저 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }
    if (selectedService === 'rental' && !servicePeriod) {
      setWarnMessage('렌탈 기간을 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }
    setCartConfirmOpen(true);
  };

  const confirmAddToCart = async () => {
    setCartConfirmOpen(false);
    try {
      await addCartItem(payload);
      setCartAlert({ open: true, message: '장바구니에 추가되었습니다.' });
    } catch {
      setCartAlert({ open: true, message: '장바구니 추가에 실패했습니다.' });
    }
  };

  // 주문하기 버튼
  const onOrderClick = () => {
    if (!selectedService) {
      setWarnMessage('서비스 타입을 먼저 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }
    if (selectedService === 'rental' && !servicePeriod) {
      setWarnMessage('렌탈 기간을 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }
    navigate(`/payment/${product.id}`, { state: payload });
  };

  return (
    <DetailContainer>
      <ImageSlider
        images={images}
        currentImageIndex={currentImageIndex}
        handleSwipeLeft={handleSwipeLeft}
        handleSwipeRight={handleSwipeRight}
        handleMouseDown={handleMouseDown}
      />

      <ContentContainer>
        <ProductInfo
          item={{
            brand: product.brand,
            product_num: product.product_num,
            name: product.name,
            retailPrice: product.retailPrice,
            discountPercent: product.discountPercent,
            discountPrice: product.discountPrice,
          }}
          productId={product.id}
        />

        <ProductOptions
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          sizeOptions={product.sizes.map((s) => s.size)}
          colorOptions={product.color.split(',').map((c) => c.trim())}
        />

        <ServiceSelectionWrapper>
          <ServiceSelection
            selectedService={selectedService}
            setSelectedService={handleServiceChange}
          />
        </ServiceSelectionWrapper>

        <ConditionalContainer>
          {selectedService === 'rental' && (
            <RentalOptions
              productId={product.id}
              selectedSize={selectedSize}
              onSelectPeriod={(formatted) => setServicePeriod(formatted)}
            />
          )}
          {selectedService === 'purchase' && <PaymentMethod />}
          {!selectedService && <Message>서비스를 선택하세요</Message>}
        </ConditionalContainer>

        <Separator />

        <SizeInfo
          productSizes={product.sizes}
          size_picture={product.size_picture}
          labelGuide={product.size_label_guide}
        />

        <Separator />

        <MaterialInfo
          materialData={{
            두께감: product.thickness,
            신축성: product.elasticity,
            안감: product.lining,
            촉감: product.fit,
            비침: product.transparency,
          }}
        />

        <Separator />

        <ProductDetails
          fabricComposition={product.fabricComposition}
          detailsData={{
            품번: product.product_num,
            시즌: product.season,
            제조사: product.manufacturer,
          }}
        />
      </ContentContainer>

      {/* 경고 모달 */}
      {warnModalOpen && (
        <ReusableModal
          isOpen={warnModalOpen}
          onClose={() => setWarnModalOpen(false)}
          title='알림'
          width='80%'
          height='200px'
        >
          <ErrorMsg>{warnMessage}</ErrorMsg>
        </ReusableModal>
      )}

      {/* 장바구니 확인 모달 */}
      {cartConfirmOpen && (
        <ReusableModal2
          isOpen={cartConfirmOpen}
          onClose={() => setCartConfirmOpen(false)}
          onConfirm={confirmAddToCart}
          title='장바구니'
        >
          장바구니에 저장하시겠습니까?
        </ReusableModal2>
      )}

      {/* 장바구니 결과 알림 */}
      {cartAlert.open && (
        <ReusableModal
          isOpen
          onClose={() => setCartAlert({ open: false, message: '' })}
          title='알림'
          width='80%'
          height='200px'
        >
          <ErrorMsg>{cartAlert.message}</ErrorMsg>
        </ReusableModal>
      )}

      <BottomBar
        cartIconSrc={ShoppingBasket}
        orderButtonLabel='제품 주문하기'
        onCartClick={onCartClick}
        onOrderClick={onOrderClick}
      />
    </DetailContainer>
  );
};

export default HomeDetail;

// — Styled Components
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-width: 600px;
  margin: 0 auto 100px;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  padding: 1rem;
`;

const ServiceSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const ConditionalContainer = styled.div`
  margin-top: 20px;
`;

const Separator = styled.div`
  border: 1px solid #ccc;
  margin: 30px 0;
`;

const Message = styled.p`
  text-align: center;
  font-size: 16px;
  color: gray;
`;

const ErrorMsg = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
