import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AllClosetIcon from '../../assets/SubHeader/AllClosetIcon.svg';
import OnepieceIcon from '../../assets/SubHeader/OnepieceIcon.svg';
import JumpsuitIcon from '../../assets/SubHeader/JumpsuitIcon.svg';
import TwopieceIcon from '../../assets/SubHeader/TwopieceIcon.svg';
import BlouseIcon from '../../assets/SubHeader/BlouseIcon.svg';

const homeIcons = [
  { src: AllClosetIcon, alt: '전체 옷장', category: 'all' },
  { src: OnepieceIcon, alt: '원피스', category: 'onepiece' },
  { src: JumpsuitIcon, alt: '점프수트', category: 'jumpsuit' },
  { src: TwopieceIcon, alt: '투피스', category: 'twopiece' },
  { src: BlouseIcon, alt: '블라우스', category: 'blouse' },
  { src: OnepieceIcon, alt: '원피스', category: 'onepiece' },
  { src: JumpsuitIcon, alt: '점프수트', category: 'jumpsuit' },
  { src: TwopieceIcon, alt: '투피스', category: 'twopiece' },
  { src: BlouseIcon, alt: '블라우스', category: 'blouse' },
  // 필요에 따라 추가 가능
];

interface SubHeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ICONS_PER_PAGE = 5;
const INDICATOR_WIDTH = 50;

const SubHeader: React.FC<SubHeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(homeIcons.length / ICONS_PER_PAGE);
  const iconsRef = useRef<HTMLDivElement>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);

  // 현재 페이지에 해당하는 아이콘들만 추출
  const displayedIcons = homeIcons.slice(
    currentPage * ICONS_PER_PAGE,
    currentPage * ICONS_PER_PAGE + ICONS_PER_PAGE
  );

  useEffect(() => {
    if (!iconsRef.current) return;
    const selectedElement = iconsRef.current.querySelector(
      `[data-category="${selectedCategory}"]`
    ) as HTMLElement;
    if (selectedElement) {
      // offsetLeft, offsetWidth를 사용해 Indicator 위치 계산
      const newLeft =
        selectedElement.offsetLeft +
        (selectedElement.offsetWidth - INDICATOR_WIDTH) / 2;
      setIndicatorLeft(newLeft);
    }
  }, [selectedCategory, currentPage]);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleIconClick = (iconCategory: string, globalIndex: number) => {
    setSelectedCategory(iconCategory);
    const page = Math.floor(globalIndex / ICONS_PER_PAGE);
    if (page !== currentPage) setCurrentPage(page);
  };

  return (
    <SubHeaderWrapper>
      <SliderWrapper>
        <ArrowButton onClick={handlePrev} disabled={currentPage === 0}>
          ◀
        </ArrowButton>
        <IconsContainer ref={iconsRef}>
          {displayedIcons.map((icon, index) => {
            const globalIndex = currentPage * ICONS_PER_PAGE + index;
            return (
              <IconContainer
                key={globalIndex}
                data-category={icon.category}
                $isSelected={selectedCategory === icon.category}
                onClick={() => handleIconClick(icon.category, globalIndex)}
              >
                <Icon src={icon.src} alt={icon.alt} />
                <IconText>{icon.alt}</IconText>
              </IconContainer>
            );
          })}
          <IndicatorBar style={{ left: `${indicatorLeft}px` }} />
        </IconsContainer>
        <ArrowButton
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
        >
          ▶
        </ArrowButton>
      </SliderWrapper>
      <Divider />
    </SubHeaderWrapper>
  );
};

export default SubHeader;

// Styled Components
const SubHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    color: #ccc;
    cursor: default;
  }
`;

const IconsContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const IconContainer = styled.div<{ $isSelected: boolean }>`
  flex: 0 0 calc(100% / ${ICONS_PER_PAGE});
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-bottom: 5px;
`;

const IconText = styled.span`
  font-size: 12px;
  color: #333;
`;

const IndicatorBar = styled.div`
  position: absolute;
  bottom: 0;
  width: ${INDICATOR_WIDTH}px;
  height: 3px;
  background-color: #000;
  border-radius: 3px;
  transition: left 0.3s ease-in-out;
`;

const Divider = styled.div`
  border-bottom: 1px solid #eeeeee;
`;
