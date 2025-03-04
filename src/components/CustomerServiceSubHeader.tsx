import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../assets/CustomerService/SearchIcon.svg'; // 아이콘 경로

type PeriodSectionProps = {
  selectedPeriod: number;
  setSelectedPeriod: (period: number) => void;
};

const PeriodSection: React.FC<PeriodSectionProps> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  return (
    <SettlementHeader>
      {/* 왼쪽: 버튼 영역 */}
      <PeriodSelector>
        <PeriodButton
          active={selectedPeriod === 3}
          onClick={() => setSelectedPeriod(3)}
        >
          공지
        </PeriodButton>
        <PeriodButton
          active={selectedPeriod === 6}
          onClick={() => setSelectedPeriod(6)}
        >
          안내
        </PeriodButton>
      </PeriodSelector>

      {/* 오른쪽: 검색 바 영역 */}
      <SearchBarContainer>
        <SearchInput placeholder='검색' />
        <SearchIconImg src={SearchIcon} alt='search' />
      </SearchBarContainer>
    </SettlementHeader>
  );
};

export default PeriodSection;

// 상단 영역 컨테이너
const SettlementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 원하는 경우 높이나 폭을 조절할 수 있습니다 */
  background: #f3f3f3;
  border: 1px solid #dddddd;
  padding: 20px;
  white-space: nowrap;
`;

// 버튼 그룹
const PeriodSelector = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-right: 10px;
`;

// 버튼 스타일
const PeriodButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  margin-left: 8px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  line-height: 11px;
  color: ${({ active }) => (active ? '#fff' : '#000')};
  background: ${({ active }) => (active ? '#000' : '#fff')};
  border: 1px solid ${({ active }) => (active ? '#000' : '#ccc')};
  border-radius: 14px;
  cursor: pointer;
  white-space: nowrap;

  white-space: nowrap;
  min-width: 60px;
  height: 36px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 18px;
`;

// 검색 바 컨테이너
const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;

  height: 40px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dddddd;
`;

// 검색 입력 필드
const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  padding: 0 10px;
`;

// 검색 아이콘
const SearchIconImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 12px;
  cursor: pointer;
`;
