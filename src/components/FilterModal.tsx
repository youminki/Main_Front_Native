import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const seasonData = ['봄', '여름', '가을', '겨울'];
const sizeData = ['44(S)', '55(M)', '66(L)', '77(XL)'];
const colorMap: Record<string, string> = {
  화이트: '#FFFFFF',
  블랙: '#000000',
  그레이: '#808080',
  네이비: '#001F5B',
  아이보리: '#ECEBE4',
  베이지: '#C8AD7F',
  브라운: '#7B4A2F',
  카키: '#4B5320',
  그린: '#2E8B57',
  블루: '#0000FF',
  퍼플: '#800080',
  버건디: '#800020',
  레드: '#FF0000',
  핑크: '#FFC0CB',
  옐로우: '#FFFF00',
  오렌지: '#FFA500',
};
const styleData = [
  '페미닌',
  '미니멀',
  '심플 베이직',
  '비지니스 캐주얼',
  '캐주얼',
];
const materialData = [
  '린넨',
  '쉬폰',
  '벨벳',
  '코튼',
  '실크',
  '새틴',
  '트위드',
  '팬시',
  '니트',
  '데님',
];

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const [selectedSeason, setSelectedSeason] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // 모달 닫기 (오버레이 또는 닫기 버튼 클릭)
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 400);
  };

  // 선택/해제 토글 로직
  const toggleSelected = (
    selectedList: string[],
    value: string,
    setFn: (list: string[]) => void
  ) => {
    if (selectedList.includes(value)) {
      setFn(selectedList.filter((item) => item !== value));
    } else {
      setFn([...selectedList, value]);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleClose}>
      <Container onClick={(e) => e.stopPropagation()} isClosing={isClosing}>
        <ModalHandle>
          <HandleBar />
        </ModalHandle>
        <Header>
          <Title>필터</Title>
        </Header>

        <Divider />

        {/* 계절 */}
        <Section>
          <SectionTitleWithParen text='계절 (셋팅 : 없음)' />
          <ButtonRow>
            {seasonData.map((season) => (
              <FilterButton
                key={season}
                selected={selectedSeason.includes(season)}
                onClick={() =>
                  toggleSelected(selectedSeason, season, setSelectedSeason)
                }
              >
                {season}
              </FilterButton>
            ))}
          </ButtonRow>
        </Section>

        <DashedDivider />

        {/* 사이즈 */}
        <Section>
          <SectionTitleWithParen text='사이즈 (셋팅 : 없음)' />
          <ButtonRow>
            {sizeData.map((size) => (
              <FilterButton
                key={size}
                selected={selectedSize.includes(size)}
                onClick={() =>
                  toggleSelected(selectedSize, size, setSelectedSize)
                }
              >
                {size}
              </FilterButton>
            ))}
          </ButtonRow>
        </Section>

        <DashedDivider />

        {/* 색상 */}
        <Section>
          <SectionTitleWithParen text='색상 (셋팅 : 없음)' />
          <ColorButtonGrid>
            {Object.keys(colorMap).map((color) => (
              <ColorButton
                key={color}
                selected={selectedColors.includes(color)}
                onClick={() =>
                  toggleSelected(selectedColors, color, setSelectedColors)
                }
              >
                {color}
              </ColorButton>
            ))}
          </ColorButtonGrid>
        </Section>

        <DashedDivider />

        {/* 스타일 */}
        <Section>
          <SectionTitleWithParen text='스타일 (셋팅 : 없음)' />
          <ButtonRow>
            {styleData.map((style) => (
              <FilterButton
                key={style}
                selected={selectedStyle.includes(style)}
                onClick={() =>
                  toggleSelected(selectedStyle, style, setSelectedStyle)
                }
              >
                {style}
              </FilterButton>
            ))}
          </ButtonRow>
        </Section>

        <DashedDivider />

        {/* 소재 */}
        <Section>
          <SectionTitleWithParen text='소재 (셋팅 : 없음)' />
          <ButtonRow>
            {materialData.map((mat) => (
              <FilterButton
                key={mat}
                selected={selectedMaterial.includes(mat)}
                onClick={() =>
                  toggleSelected(selectedMaterial, mat, setSelectedMaterial)
                }
              >
                {mat}
              </FilterButton>
            ))}
          </ButtonRow>
        </Section>
        <Divider />
        <CloseButtonWrapper>
          <NoButton onClick={onClose}>취소</NoButton>
          <YesButton onClick={onClose}>설정적용</YesButton>
        </CloseButtonWrapper>
      </Container>
    </Overlay>
  );
};

export default FilterModal;

const ParenText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #999999;
`;

interface SectionTitleWithParenProps {
  text: string;
}
const SectionTitleWithParen: React.FC<SectionTitleWithParenProps> = ({
  text,
}) => {
  const parts = text.split(/(\(.*?\))/g);
  return (
    <SectionTitle>
      {parts.map((part, index) =>
        part.startsWith('(') && part.endsWith(')') ? (
          <ParenText key={index}>{part}</ParenText>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </SectionTitle>
  );
};

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  60% {
    transform: translateY(-2%);
  }
  80% {
    transform: translateY(1%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

const ModalHandle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const HandleBar = styled.div`
  position: fixed;
  top: 6px;
  width: 40px;
  height: 4px;
  background: #dddddd;
  border-radius: 2px;
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

interface ContainerProps {
  isClosing: boolean;
}

const Container = styled.div<ContainerProps>`
  max-width: 600px;
  width: 100%;
  height: 600px;
  padding: 40px;
  background: #ffffff;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  animation: ${({ isClosing }) =>
    isClosing
      ? css`
          ${slideDown} 0.4s ease-out forwards
        `
      : css`
          ${slideUp} 0.4s ease-out forwards
        `};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-size: 16px;
  font-weight: 800;
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  margin: 16px 0;
  border: 1px solid #dddddd;
`;

const DashedDivider = styled.hr`
  border: none;
  border-top: 1px dashed #dddddd;
  margin: 10px 0;
`;

const Section = styled.div`
  margin: 10px 0;
`;

const SectionTitle = styled.div`
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 10px;
  color: #000;
`;

interface FilterButtonProps {
  selected: boolean;
}
const FilterButton = styled.button<FilterButtonProps>`
  min-width: 60px;
  height: 36px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 18px;
  border: 1px solid #000;
  background: ${({ selected }) => (selected ? '#000' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s;
  &:last-child {
    margin-right: 0;
  }
`;

const ColorButton = styled.button<FilterButtonProps>`
  min-width: 60px;
  height: 36px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 18px;
  background: ${({ selected }) => (selected ? '#000' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  border: 1px solid #000;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s,
    border 0.3s;
  &:last-child {
    margin-right: 0;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColorButtonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  margin-top: 10px;
`;

const NoButton = styled.button`
  flex: 1;
  height: 50px;
  background: #cccccc;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const YesButton = styled.button`
  flex: 1;
  height: 50px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;
