import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
  /** 서버에서 내려오는 수정된 사이즈 라벨 가이드 */
  size_label_guide?: Record<string, string>;
}

type HomeDetailProps = { id?: string };

const HomeDetail: React.FC<HomeDetailProps> = ({ id: propId }) => {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const images = useMemo<string[]>(() => {
    if (!product) return [];
    return product.product_img.length
      ? product.product_img
      : [product.mainImage];
  }, [product]);

  const handleSwipeLeft = useCallback(() => {
    if (images.length) setCurrentImageIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const handleSwipeRight = useCallback(() => {
    if (images.length)
      setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
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

  useEffect(() => {
    const id = propId || params.id;
    if (!id) return;
    getProductInfo(Number(id))
      .then((res) => {
        const api = res.product as APIProductDetail & Record<string, any>;

        // fabricComposition 처리
        const rawFabric = api.fabricComposition;
        let mappedFabric: Record<'겉감' | '안감' | '배색' | '부속', string>;
        if (Array.isArray(rawFabric)) {
          const [겉감 = '', 안감 = '', 배색 = '', 부속 = ''] = rawFabric;
          mappedFabric = { 겉감, 안감, 배색, 부속 };
        } else {
          mappedFabric = {
            겉감: rawFabric['겉감'] || '',
            안감: rawFabric['안감'] || '',
            배색: rawFabric['배색'] || '',
            부속: rawFabric['부속'] || '',
          };
        }

        // size_label_guide 받기
        const labelGuide = api.size_label_guide as
          | Record<string, string>
          | undefined;

        const { fabricComposition: _f, size_label_guide: _l, ...rest } = api;

        setProduct({
          ...rest,
          fabricComposition: mappedFabric,
          size_label_guide: labelGuide,
        });
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [propId, params.id]);

  if (loading) return <Spinner />;
  if (!product) return <div>제품을 찾을 수 없습니다.</div>;

  const productInfoItem = {
    brand: product.brand,
    product_num: product.product_num,
    name: product.name,
    retailPrice: product.retailPrice,
    discountPercent: product.discountPercent,
    discountPrice: product.discountPrice,
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
        <ProductInfo item={productInfoItem} productId={product.id} />

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

        <Separator />

        <ProductOptions
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          sizeOptions={product.sizes.map((s) => s.size)}
          colorOptions={product.color.split(',').map((c) => c.trim())}
        />

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
    </DetailContainer>
  );
};

export default HomeDetail;

/* Styled Components */
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5rem 0 80px;
  max-width: 1000px;
  margin: 0 auto 20px;
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
