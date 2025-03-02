import React, { useState } from 'react';
import styled from 'styled-components';
import FilterIcon from '../../assets/FilterIcon.svg';
import FilterModal from '../../components/FilterModal';

interface FilterContainerProps {
  seasonToggle: boolean;
  setSeasonToggle: (toggle: boolean) => void;
}

export const SeasonToggle = ({
  isActive,
  toggle,
}: {
  isActive: boolean;
  toggle: () => void;
}) => (
  <StyledSeasonToggle onClick={toggle} $isActive={isActive}>
    <ToggleCircle $isActive={isActive} />
    <ToggleText $isActive={isActive}>{isActive ? '켜짐' : '꺼짐'}</ToggleText>
  </StyledSeasonToggle>
);

const FilterContainer: React.FC<FilterContainerProps> = ({
  seasonToggle,
  setSeasonToggle,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SeasonToggle
          isActive={seasonToggle}
          toggle={() => setSeasonToggle(!seasonToggle)}
        />
        <ToggleLabel>대여전용</ToggleLabel>
      </div>
      {/* FilterIconContainer 클릭 시 모달 열기 */}
      <FilterIconContainer onClick={() => setIsFilterOpen(true)}>
        <span>필터</span>
        <img src={FilterIcon} alt='필터' />
      </FilterIconContainer>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </Container>
  );
};

export default FilterContainer;

// Styled Components for FilterContainer
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledSeasonToggle = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 60px;
  height: 30px;
  background-color: ${({ $isActive }) => ($isActive ? '#222' : '#D9D9D9')};
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ToggleCircle = styled.div<{ $isActive: boolean }>`
  position: absolute;
  width: 28px;
  height: 28px;
  background: #fff;
  border-radius: 50%;
  left: ${({ $isActive }) => ($isActive ? '32px' : '2px')};
  transition: left 0.3s ease;
`;

const ToggleText = styled.span<{ $isActive: boolean }>`
  font-size: 10px;
  color: #000;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${({ $isActive }) => ($isActive ? '6px' : 'unset')};
  left: ${({ $isActive }) => (!$isActive ? '6px' : 'unset')};
`;

const ToggleLabel = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  margin-left: 10px;
`;

const FilterIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  color: #000;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
  }

  &:hover img {
    background-color: #e6e6e6;
  }
`;
