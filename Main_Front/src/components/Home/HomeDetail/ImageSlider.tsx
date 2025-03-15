import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';
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
    <SliderContainer {...handlers} onMouseDown={handleMouseDown}>
      <SliderWrapper currentIndex={currentImageIndex}>
        {images.map((src, index) => (
          <SliderItem key={index}>
            <Image src={src} alt={`Slide ${index + 1}`} loading='lazy' />
          </SliderItem>
        ))}
      </SliderWrapper>
      <IndicatorContainer>
        {images.map((_, index) => (
          <Indicator key={index} active={index === currentImageIndex} />
        ))}
      </IndicatorContainer>
    </SliderContainer>
  );
};

export default ImageSlider;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  cursor: grab;
  background-color: ${Theme.colors.gray0};
`;

const SliderWrapper = styled.div<{ currentIndex: number }>`
  display: flex;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-${(props) => props.currentIndex * 100}%);
`;

const SliderItem = styled.div`
  flex: 0 0 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* 전체 이미지가 보이도록 조정 */
  object-position: center; /* 중앙 정렬 */
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
  background-color: ${({ active }) =>
    active ? Theme.colors.yellow : Theme.colors.white};
  border-radius: 50%;
  border: 1px solid #999;
`;
