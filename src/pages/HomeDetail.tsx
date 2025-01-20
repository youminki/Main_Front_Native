import React, { useState, useCallback } from "react";
import styled from "styled-components";
import ExIMG1 from "../assets/Home/ExIMG1.svg";
import ExIMG2 from "../assets/Home/ExIMG2.svg";
import ExIMG3 from "../assets/Home/ExIMG3.svg";
import ImageSlider from "../components/Home/HomeDetail/ImageSlider";
import ProductInfo from "../components/Home/HomeDetail/ProductInfo";
import ProductOptions from "../components/Home/HomeDetail/ProductOptions";
import PaymentMethod from "../components/Home/HomeDetail/PaymentMethod";
import SizeInfo from "../components/Home/HomeDetail/SizeInfo";
import MaterialInfo from "../components/Home/HomeDetail/MaterialInfo";
import ProductDetails from "../components/Home/HomeDetail/ProductDetails";
import BottomBar from "../components/Home/HomeDetail/BottomBar";
import ServiceSelection from "../components/Home/HomeDetail/ServiceSelection";
import RentalOptions from "../components/Home/HomeDetail/RentalOptions";

const HomeDetail: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>(""); // 서비스 선택 상태
  const [selectedPeriod, setSelectedPeriod] = useState<string>(""); // 대여 기간 선택 상태

  const images = [ExIMG1, ExIMG2, ExIMG3];

  // 슬라이드 관련 로직
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
    const startX = e.clientX;

    const handleMouseMove = (e: MouseEvent) => {
      const moveX = e.clientX - startX;
      if (Math.abs(moveX) > 50) {
        if (moveX > 0) {
          handleSwipeRight();
        } else {
          handleSwipeLeft();
        }
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, []);

  const item = {
    image: images[currentImageIndex],
    brand: "산드로(SANDRO)",
    description: "SNS21N9 / 원피스",
    originalPrice: 760000,
    discountPrice: 608000,
    discountPercent: 20,
  };

  return (
    <DetailContainer>
      {/* 이미지 슬라이더 */}
      <ImageSlider
        images={images}
        currentImageIndex={currentImageIndex}
        handleSwipeLeft={handleSwipeLeft}
        handleSwipeRight={handleSwipeRight}
        handleMouseDown={handleMouseDown}
      />

      {/* 본문 콘텐츠 */}
      <ContentContainer>
        <ProductInfo item={item} />

        {/* 서비스 선택 */}
        <ServiceSelectionWrapper>
          <ServiceSelection
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />
        </ServiceSelectionWrapper>

        {/* 조건부 렌더링 */}
        <ConditionalContainer>
          {selectedService === "rental" && (
            <RentalOptions
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            />
          )}
          {selectedService === "purchase" && <PaymentMethod />}
          {selectedService === "" && <Message>서비스를 선택하세요</Message>}
        </ConditionalContainer>

        <LinContainer />

        {/* 구매 옵션 */}
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
        <LinContainer />
      </ContentContainer>
      <BottomBar />
    </DetailContainer>
  );
};

export default HomeDetail;

// 스타일 컴포넌트
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  padding-bottom: 80px;
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
