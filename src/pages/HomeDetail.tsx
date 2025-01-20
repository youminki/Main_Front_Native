import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Theme from '../styles/Theme';
import ExIMG1 from '../assets/Home/ExIMG1.svg';
import ExIMG2 from '../assets/Home/ExIMG2.svg';
import ExIMG3 from '../assets/Home/ExIMG3.svg';

import Header from '../components/Home/HomeDetail/Header';
import ImageSlider from '../components/Home/HomeDetail/ImageSlider';
import ProductInfo from '../components/Home/HomeDetail/ProductInfo';
import PriceTrendChart from '../components/Home/HomeDetail/PriceTrendChart';
import ProductOptions from '../components/Home/HomeDetail/ProductOptions';
import PaymentMethod from '../components/Home/HomeDetail/PaymentMethod';
import SizeInfo from '../components/Home/HomeDetail/SizeInfo';
import MaterialInfo from '../components/Home/HomeDetail/MaterialInfo';
import ProductDetails from '../components/Home/HomeDetail/ProductDetails';
import BottomBar from '../components/Home/HomeDetail/BottomBar';

const HomeDetail: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const images = [ExIMG1, ExIMG2, ExIMG3];

  const handleSwipeLeft = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleSwipeRight = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    let startX = e.clientX;

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
  }, []);

  const item = {
    image: images[currentImageIndex],
    brand: '산드로(SANDRO)',
    description: '언발 플레어 미니 원피스',
    originalPrice: 760000,
    discountPrice: 608000,
    discountPercent: 20,
  };

  const priceHistory = [
    { date: '출고', price: 760000 },
    { date: '05.20', price: 684000 },
    { date: '06.20', price: 608000 },
    { date: '07.20', price: 608000 },
    { date: '현재', price: 608000 },
  ];

  return (
    <DetailContainer>
      <Header />
      <ImageSlider
        images={images}
        currentImageIndex={currentImageIndex}
        handleSwipeLeft={handleSwipeLeft}
        handleSwipeRight={handleSwipeRight}
        handleMouseDown={handleMouseDown}
      />
      <ContentContainer>
        <ProductInfo item={item} />
        <PaymentMethod />
        <LinContainer />
        <ProductOptions
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <LinContainer />
        <PriceTrendChart data={priceHistory} />
        <LinContainer />
        <SizeInfo />
        <LinContainer />
        <MaterialInfo />
        <LinContainer />
        <ProductDetails />
        <LinContainer />
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
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 80px;
  border: 1px solid ${Theme.colors.gray1};
`;

const ContentContainer = styled.div`
  padding: 0 27px;
`;
const LinContainer = styled.div`
  border: 1px solid ${Theme.colors.gray0};
  margin: 30px 0;
`;
