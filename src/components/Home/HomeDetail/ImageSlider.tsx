import React from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

type ImageSliderProps = {
  images: string[];
  currentImageIndex: number;
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  handleMouseDown: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  currentImageIndex,
  handleSwipeLeft,
  handleSwipeRight,
  handleMouseDown,
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  return (
    <SliderWrapper {...handlers} onMouseDown={handleMouseDown}>
      <SliderContainer currentIndex={currentImageIndex}>
        {images.map((src, index) => (
          <Slide key={index}>
            <StyledImage src={src} alt={`Slide ${index + 1}`} loading='lazy' />
          </Slide>
        ))}
      </SliderContainer>
      <IndicatorContainer>
        {images.map((_, index) => (
          <Indicator key={index} active={index === currentImageIndex} />
        ))}
      </IndicatorContainer>
    </SliderWrapper>
  );
};

export default ImageSlider;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  /* overflow: hidden; */
`;

type SliderContainerProps = {
  currentIndex: number;
};

const SliderContainer = styled.div<SliderContainerProps>`
  display: flex;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => props.currentIndex * -100}%);
`;

const Slide = styled.div`
  flex: 0 0 100%;
  width: 100%;
  height: 600px;
  display: flex;

  justify-content: center;
  background-color: #f5f5f5;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const IndicatorContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 10;
`;

type IndicatorProps = {
  active: boolean;
};

const Indicator = styled.div<IndicatorProps>`
  width: 14px;
  height: 14px;
  margin: 0 4px;
  background-color: ${({ active }) => (active ? '#FFC107' : '#FFFFFF')};
  border-radius: 50%;
  border: 1px solid #999;
`;
