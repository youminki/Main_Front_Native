// src/pages/Home/HomeDetail.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';
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
import ShoppingBasket from '../../assets/Home/HomeDetail/ShoppingBasket.svg';
import { addToCloset } from '../../api/closet/closetApi';

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
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');

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
          moveX > 0 ? handleSwipeRight() : handleSwipeLeft();
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

  const handleCartClick = async () => {
    if (!product) return;

    try {
      await addToCloset(product.id);
      alert('찜 목록에 추가되었습니다!');
      navigate('/my-closet');
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 409) {
        alert('이미 찜한 상품입니다.');
        navigate('/my-closet');
      } else if (status === 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('찜 추가 중 오류가 발생했습니다.');
        console.error('찜 추가 실패:', error);
      }
    }
  };

  const handleOrderClick = () => {
    console.log('🛍️ 주문하기 진행!');
    // 결제 또는 주문 화면으로 이동
  };

  if (loading) return <Spinner />;
  if (!product) return <div>제품을 찾을 수 없습니다.</div>;

  const productInfoItem = {
    brand: product.brand,
    product_num: product.product_num,
    name: product.name,
    originalPrice: product.price.originalPrice,
    discountPercent: product.price.discountRate,
    discountPrice: product.price.finalPrice,
  };

  const sizeOptions = product.sizes.map((item) => item.size);
  const colorOptions = product.color
    ? product.color.split(',').map((c) => c.trim())
    : ['Red', 'Blue', 'Black'];

  const materialData = {
    두께감: product.thickness,
    신축성: product.elasticity,
    안감: product.lining,
    촉감: product.fit,
    비침: product.transparency,
  };

  const detailsData = {
    품번: product.product_num,
    계절감: product.season,
    제조사: product.manufacturer,
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
          sizeOptions={sizeOptions}
          colorOptions={colorOptions}
        />
        <LinContainer />
        <SizeInfo
          productSizes={product.sizes}
          size_picture={product.size_picture}
        />
        <LinContainer />
        <MaterialInfo materialData={materialData} />
        <LinContainer />
        <ProductDetails detailsData={detailsData} />
      </ContentContainer>
      <BottomBar
        cartIconSrc={ShoppingBasket}
        orderButtonLabel='제품 주문하기'
        onCartClick={handleCartClick}
        onOrderClick={handleOrderClick}
      />
    </DetailContainer>
  );
};

export default HomeDetail;

// 스타일 컴포넌트
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
