// src/components/Home/FilterContainer.tsx
import React from 'react';
import styled from 'styled-components';
import FilterIcon from '../../assets/FilterIcon.svg';

interface FilterContainerProps {
  seasonToggle: boolean;
  setSeasonToggle: (toggle: boolean) => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({
  seasonToggle,
  setSeasonToggle,
}) => {
  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SeasonToggle
          onClick={() => setSeasonToggle(!seasonToggle)}
          $isActive={seasonToggle}
        >
          <ToggleCircle $isActive={seasonToggle} />
          <ToggleText $isActive={seasonToggle}>
            {seasonToggle ? '켜짐' : '꺼짐'}
          </ToggleText>
        </SeasonToggle>
        <ToggleLabel>계절감</ToggleLabel>
      </div>
      <FilterIconContainer>
        <span>필터</span>
        <img src={FilterIcon} alt='필터' />
      </FilterIconContainer>
    </Container>
  );
};

export default FilterContainer;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SeasonToggle = styled.div<{ $isActive: boolean }>`
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
  right: ${({ $isActive }) => ($isActive ? '8px' : 'unset')};
  left: ${({ $isActive }) => (!$isActive ? '8px' : 'unset')};
`;

const ToggleLabel = styled.span`
  font-size: 12px;
  color: #000;
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
