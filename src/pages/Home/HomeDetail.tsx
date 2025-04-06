// src/pages/Home/HomeDetail.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../components/Spinner'; // import spinner
import { getProductInfo } from '../../api/upload/productApi';
import ImageSlider from '../../components/Home/HomeDetail/ImageSlider';
import ProductInfo from '../../components/Home/HomeDetail/ProductInfo';
import ProductOptions from '../../components/Home/HomeDetail/ProductOptions';
import PaymentMethod from '../../components/Home/HomeDetail/PaymentMethod';
import SizeInfo from '../../components/Home/HomeDetail/SizeInfo';
import MaterialInfo from '../../components/Home/HomeDetail/MaterialInfo';
import ProductDetails from '../../components/Home/HomeDetail/ProductDetails';
import BottomBar from '../../components/Home/HomeDetail/BottomBar';
import ServiceSelection from '../../components/Home/HomeDetail/ServiceSelection';
import RentalOptions from '../../components/Home/HomeDetail/RentalOptions';

// Swagger 명세 기반 제품 상세 인터페이스
interface ProductDetail {
  id: number;
  name: string;
  product_num: string;
  brand: string;
  mainImage: string;
  price: {
    originalPrice: number;
    discountRate: number;
    finalPrice: number;
  };
  product_img: string[];
  sizes: { size: string; measurements: Record<string, any> }[];
  size_picture: string;
  category: string;
  season: string;
  manufacturer: string;
  description: string;
  fabricComposition: string[];
  elasticity: string;
  transparency: string;
  thickness: string;
  lining: string;
  fit: string;
  color: string;
}

type HomeDetailProps = {
  id?: string;
};

const HomeDetail: React.FC<HomeDetailProps> = ({ id: propId }) => {
  const params = useParams<{ id: string }>();
  const id = propId || params.id;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 슬라이더 및 옵션 상태
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');

  // 제품 상세정보 API 호출
  useEffect(() => {
    if (id) {
      getProductInfo(Number(id))
        .then((res) => {
          setProduct(res.product);
          setLoading(false);
        })
        .catch((error) => {
          console.error('제품 상세정보를 불러오는데 실패했습니다:', error);
          setLoading(false);
        });
    }
  }, [id]);

  // 슬라이더 로직
  const images =
    product && product.product_img && product.product_img.length > 0
      ? product.product_img
      : [product?.mainImage || '/default-image.jpg'];

  const handleSwipeLeft = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleSwipeRight = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const handleMouseMove = (e: MouseEvent) => {
        const moveX = e.clientX - startX;
        if (Math.abs(moveX) > 50) {
          if (moveX > 0) {
            handleSwipeRight();
          } else {
            handleSwipeLeft();
          }
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        }
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [handleSwipeLeft, handleSwipeRight]
  );

  if (loading) {
    return <Spinner />;
  }
  if (!product) {
    return <div>제품을 찾을 수 없습니다.</div>;
  }

  // ProductInfo에 전달할 데이터 변환
  const productInfoItem = {
    brand: product.brand,
    description: product.description,
    originalPrice: product.price.originalPrice,
    discountPercent: product.price.discountRate,
    discountPrice: product.price.finalPrice,
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
        <ProductInfo item={productInfoItem} />
        <ServiceSelectionWrapper>
          <ServiceSelection
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        </ServiceSelectionWrapper>
        <ConditionalContainer>
          {selectedService === 'rental' && <RentalOptions />}
          {selectedService === 'purchase' && <PaymentMethod />}
          {selectedService === '' && <Message>서비스를 선택하세요</Message>}
        </ConditionalContainer>
        <LinContainer />
        <ProductOptions
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <LinContainer />
        <SizeInfo />
        <LinContainer />
        <MaterialInfo />
        <LinContainer />
        <ProductDetails />
      </ContentContainer>
      <BottomBar />
    </DetailContainer>
  );
};

export default HomeDetail;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  padding-bottom: 80px;
  overflow-x: hidden;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ContentContainer = styled.div``;

const ServiceSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const ConditionalContainer = styled.div`
  margin-top: 20px;
`;

const LinContainer = styled.div`
  border: 1px solid #e0e0e0;
  margin: 30px 0;
`;

const Message = styled.p`
  text-align: center;
  font-size: 16px;
  color: gray;
`;
