import React, { memo } from 'react';
import styled from 'styled-components';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';

export interface ImageSliderProps {
  images: string[];
  currentImageIndex: number;
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  handleMouseDown: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

/**
 * 이미지 슬라이더 컴포넌트
 */
const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  currentImageIndex,
  handleSwipeLeft,
  handleSwipeRight,
  handleMouseDown,
}) => {
  // 스와이프 핸들러 설정
  const swipeHandlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <SliderContainer {...swipeHandlers} onMouseDown={handleMouseDown}>
      <SlidesWrapper currentIndex={currentImageIndex}>
        {images.map((src, idx) => (
          <SlideItem key={idx} src={src} index={idx} />
        ))}
      </SlidesWrapper>

      <DotsWrapper>
        {images.map((_, idx) => (
          <Dot key={idx} active={idx === currentImageIndex} />
        ))}
      </DotsWrapper>
    </SliderContainer>
  );
};

/**
 * 개별 슬라이드 아이템
 */
interface SlideItemProps {
  src: string;
  index: number;
}
const SlideItem: React.FC<SlideItemProps> = ({ src, index }) => (
  <Slide>
    <Image src={src} alt={`Slide ${index + 1}`} loading='lazy' />
  </Slide>
);

export default memo(ImageSlider);

// Styled Components
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SlidesWrapper = styled.div<{ currentIndex: number }>`
  display: flex;
  transform: translateX(-${(p) => p.currentIndex * 100}%);
  transition: transform 0.4s ease;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
`;

const Image = styled.img`
  max-width: 100%;
  object-fit: contain;
`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  margin: 0 4px;
  border-radius: 50%;
  background: ${(p) => (p.active ? '#FFD700' : '#FFFFFF')};
  border: 1px solid #ccc;
`;
