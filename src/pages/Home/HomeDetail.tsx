// src/pages/HomeDetail.tsx
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useProductInfo,
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
import BottomBar from '../../components/Home/HomeDetail/BottomBar';
import { addCartItem } from '../../api/cart/cart';

const { width: screenWidth } = Dimensions.get('window');

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
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const id = propId || route.params?.id;
  const { data, isLoading, isError } = useProductInfo(Number(id));

  const product = useMemo(() => {
    if (!data) return null;
    const api = data.product as APIProductDetail;
    const rawFabric = api.fabricComposition;
    let mappedFabric: Record<'겉감' | '안감' | '배색' | '부속', string>;
    if (Array.isArray(rawFabric)) {
      const [겉감 = '', 안감 = '', 배색 = '', 부속 = ''] = rawFabric;
      mappedFabric = { 겉감, 안감, 배색, 부속 };
    } else {
      mappedFabric = {
        겉감: (rawFabric as Record<string, string>)['겉감'] || '',
        안감: (rawFabric as Record<string, string>)['안감'] || '',
        배색: (rawFabric as Record<string, string>)['배색'] || '',
        부속: (rawFabric as Record<string, string>)['부속'] || '',
      };
    }
    const labelGuide = api.size_label_guide as
      | Record<string, string>
      | undefined;
    const { ...rest } = api;
    return {
      ...rest,
      fabricComposition: mappedFabric,
      size_label_guide: labelGuide,
    } as ProductDetail;
  }, [data]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedService, setSelectedService] = useState<
    'rental' | 'purchase' | ''
  >('');
  const [warnModalOpen, setWarnModalOpen] = useState(false);
  const [warnMessage, setWarnMessage] = useState('');
  const [servicePeriod, setServicePeriod] = useState<string>('');

  // 이미지 슬라이드
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

  // 서비스 변경
  const handleServiceChange = (service: string) => {
    if (service === 'rental' && (!selectedSize || !selectedColor)) {
      setWarnMessage('사이즈와 색상을 먼저 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }
    setSelectedService(service as 'rental' | 'purchase');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>제품을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const productInfoItem = {
    brand: product.brand,
    product_num: product.product_num,
    name: product.name,
    retailPrice: product.retailPrice,
    discountPercent: product.discountPercent,
    discountPrice: product.discountPrice,
  };

  const itemData = {
    id: product.id,
    brand: product.brand,
    nameCode: product.product_num,
    nameType: product.name,
    type: selectedService as 'rental' | 'purchase',
    servicePeriod,
    size: selectedSize,
    color: selectedColor,
    price: selectedService === 'rental' ? 0 : product.retailPrice,
    imageUrl: product.mainImage,
  };

  const handleCartIconClick = async () => {
    if (!selectedService) {
      setWarnMessage('서비스 방식을 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }
    if (!selectedSize || !selectedColor) {
      setWarnMessage('사이즈와 색상을 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }
    if (selectedService === 'rental' && !servicePeriod) {
      setWarnMessage('대여 기간을 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }

    // rental이나 purchase에 따라 요청 객체 생성
    const [start, end] = servicePeriod
      ? servicePeriod.split(' ~ ').map((d) => d.replace(/\./g, '-'))
      : [undefined, undefined];
    const cartReq = {
      productId: product.id,
      serviceType: selectedService,
      rentalStartDate: selectedService === 'rental' ? start : undefined,
      rentalEndDate: selectedService === 'rental' ? end : undefined,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      totalPrice: selectedService === 'purchase' ? product.retailPrice : 0,
    };

    try {
      await addCartItem(cartReq);
      setCartModalOpen(true);
    } catch (error) {
      Alert.alert('오류', '장바구니에 추가하는데 실패했습니다.');
    }
  };

  const handleOrderClick = () => {
    if (!selectedService) {
      setWarnMessage('서비스 방식을 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }
    if (!selectedSize || !selectedColor) {
      setWarnMessage('사이즈와 색상을 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }
    if (selectedService === 'rental' && !servicePeriod) {
      setWarnMessage('대여 기간을 선택해주세요.');
      setWarnModalOpen(true);
      return;
    }

    // 결제 페이지로 이동
    navigation.navigate('Payment', { itemData } as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ImageSlider
          images={images}
          currentIndex={currentImageIndex}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />

        <ProductInfo productInfo={productInfoItem} />

        <ProductOptions
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeSelect={setSelectedSize}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />

        <ServiceSelection
          selectedService={selectedService}
          onServiceChange={handleServiceChange}
        />

        {selectedService === 'rental' && (
          <RentalOptions
            servicePeriod={servicePeriod}
            onPeriodChange={setServicePeriod}
          />
        )}

        <PaymentMethod />

        <SizeInfo
          sizePicture={product.size_picture}
          sizeLabelGuide={product.size_label_guide}
        />

        <MaterialInfo fabricComposition={product.fabricComposition} />

        <ProductDetails
          elasticity={product.elasticity}
          transparency={product.transparency}
          thickness={product.thickness}
          lining={product.lining}
          fit={product.fit}
          color={product.color}
        />
      </ScrollView>

      <BottomBar
        onCartClick={handleCartIconClick}
        onOrderClick={handleOrderClick}
        selectedService={selectedService}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        servicePeriod={servicePeriod}
      />

      {/* 경고 모달 */}
      <ReusableModal
        visible={warnModalOpen}
        onClose={() => setWarnModalOpen(false)}
        title='알림'
      >
        <Text style={styles.modalText}>{warnMessage}</Text>
      </ReusableModal>

      {/* 장바구니 추가 완료 모달 */}
      <ReusableModal
        visible={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        title='장바구니 추가 완료'
      >
        <Text style={styles.modalText}>상품이 장바구니에 추가되었습니다.</Text>
      </ReusableModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default HomeDetail;
