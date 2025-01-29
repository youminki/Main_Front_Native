// src/components/Home/SubHeader.tsx
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
];

interface SubHeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  barPosition: number;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
  barPosition,
}) => {
  return (
    <Container>
      <Header>
        {homeIcons.map((icon) => (
          <IconContainer
            key={icon.category}
            $isSelected={selectedCategory === icon.category}
            data-category={icon.category}
            onClick={() => setSelectedCategory(icon.category)}
          >
            <Icon src={icon.src} alt={icon.alt} />
            <IconText>{icon.alt}</IconText>
          </IconContainer>
        ))}
      </Header>
      <Divider />
      <Bar style={{ left: `${barPosition}px` }} />
    </Container>
  );
};

export default SubHeader;

// Styled Components
const Container = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const Divider = styled.div`
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
`;

const IconContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;

  ${({ $isSelected }) =>
    $isSelected &&
    `
    color: #000;
  `}

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
`;

const IconText = styled.span`
  font-size: 12px;
  color: #333;
`;

const Bar = styled.div`
  position: absolute;
  bottom: -15px;
  width: 50px;
  height: 3px;
  background-color: #000;
  border-radius: 3px;
  transition: left 0.3s ease-in-out;
`;
