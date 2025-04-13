// src/components/Home/SubHeader.tsx
import React from 'react';
import styled from 'styled-components';

import Entire from '../../assets/SubHeader/Entire.svg';
import MiniDress from '../../assets/SubHeader/MiniDress.svg';
import MidiDress from '../../assets/SubHeader/MidiDress.svg';
import LongDress from '../../assets/SubHeader/LongDress.svg';
import TowDress from '../../assets/SubHeader/TowDress.svg';

import JumpSuit from '../../assets/SubHeader/JumpSuit.svg';
import Blouse from '../../assets/SubHeader/Blouse.svg';
import KnitTop from '../../assets/SubHeader/KnitTop.svg';
import ShirtTop from '../../assets/SubHeader/ShirtTop.svg';

import MiniSkirt from '../../assets/SubHeader/MiniSkirt.svg';
import MidiSkirt from '../../assets/SubHeader/MidiSkirt.svg';
import Pants from '../../assets/SubHeader/Pants.svg';
import Jacket from '../../assets/SubHeader/Jacket.svg';
import Coat from '../../assets/SubHeader/Coat.svg';

const homeIcons = [
  { src: Entire, alt: '전체', category: 'Entire' },
  { src: MiniDress, alt: '미니원피스', category: 'MiniDress' },
  { src: MidiDress, alt: '미디원피스', category: 'MidiDress' },
  { src: LongDress, alt: '롱 원피스', category: 'LongDress' },
  { src: TowDress, alt: '투피스', category: 'TowDress' },

  { src: JumpSuit, alt: '점프수트', category: 'JumpSuit' },
  { src: Blouse, alt: '블라우스', category: 'Blouse' },
  { src: KnitTop, alt: '니트 상의', category: 'KnitTop' },
  { src: ShirtTop, alt: '셔츠 상의', category: 'ShirtTop' },

  { src: MiniSkirt, alt: '미니 스커트', category: 'MiniSkirt' },
  { src: MidiSkirt, alt: '미디 스커트', category: 'MidiSkirt' },
  { src: Pants, alt: '팬츠', category: 'Pants' },
  { src: Jacket, alt: '자켓', category: 'Jacket' },
  { src: Coat, alt: '코트', category: 'Coat' },
];

interface SubHeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  barPosition: number;
}

const ICON_WIDTH = 80;
const INDICATOR_WIDTH = 50;

const SubHeader: React.FC<SubHeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const selectedIndex = homeIcons.findIndex(
    (icon) => icon.category.trim() === selectedCategory.trim()
  );

  const indicatorPosition =
    selectedIndex >= 0
      ? selectedIndex * ICON_WIDTH + (ICON_WIDTH - INDICATOR_WIDTH) / 2
      : 0;

  return (
    <SubHeaderWrapper>
      <IconsWrapper>
        {homeIcons.map((icon, index) => (
          <IconContainer
            key={index}
            data-category={icon.category}
            onClick={() => setSelectedCategory(icon.category)}
          >
            <Icon src={icon.src} alt={icon.alt} />
            <IconText>{icon.alt}</IconText>
          </IconContainer>
        ))}
        <Indicator position={indicatorPosition} />
      </IconsWrapper>
      <Divider />
    </SubHeaderWrapper>
  );
};

export default SubHeader;

const SubHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const IconsWrapper = styled.div`
  position: relative;
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const IconContainer = styled.div`
  flex: 0 0 auto;
  width: ${ICON_WIDTH}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
`;

const Icon = styled.img`
  width: 100%;
  height: 60px;
  object-fit: contain;
  margin-bottom: 5px;
`;

const IconText = styled.span`
  font-size: 11px;
  color: #333;
`;

const Indicator = styled.div<{ position: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ position }) => position}px;
  width: ${INDICATOR_WIDTH}px;
  height: 2px;
  background-color: #000;
  border-radius: 3px;
  transition: left 0.3s ease-in-out;
`;

const Divider = styled.div`
  border-bottom: 1px solid #eeeeee;
`;
