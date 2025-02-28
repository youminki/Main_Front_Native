// SubHeader.tsx
import React from 'react';
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
  { src: OnepieceIcon, alt: '원피스', category: 'onepiece1' },
  { src: JumpsuitIcon, alt: '점프수트', category: 'jumpsuit1' },
  { src: TwopieceIcon, alt: '투피스', category: 'twopiece1' },
  { src: BlouseIcon, alt: '블라우스', category: 'blouse1' },
  // 필요시 추가
];

interface SubHeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  barPosition: number; // Home.tsx에서 넘겨주지만 여기서는 사용하지 않습니다.
}

const ICON_WIDTH = 80;

const SubHeader: React.FC<SubHeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <SubHeaderWrapper>
      <IconsContainer>
        {homeIcons.map((icon, index) => (
          <IconContainer
            key={index}
            data-category={icon.category}
            $isSelected={selectedCategory === icon.category}
            onClick={() => setSelectedCategory(icon.category)}
          >
            <Icon src={icon.src} alt={icon.alt} />
            <IconText>{icon.alt}</IconText>
            {selectedCategory === icon.category && <SelectedIndicator />}
          </IconContainer>
        ))}
      </IconsContainer>
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

const IconsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  /* 필요시 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const IconContainer = styled.div<{ $isSelected: boolean }>`
  flex: 0 0 auto;
  width: ${ICON_WIDTH}px;
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

const SelectedIndicator = styled.div`
  margin-top: 4px;
  width: 50px;
  height: 2px;
  background-color: #000;
  border-radius: 3px;
`;

const Divider = styled.div`
  border-bottom: 1px solid #eeeeee;
`;
