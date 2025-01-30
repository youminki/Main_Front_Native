import React from 'react';
import styled from 'styled-components';

interface StatsSectionProps {
  visits: string | number;
  sales: string | number;
  dateRange: string;
  visitLabel: string;
  salesLabel: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  visits,
  sales,
  dateRange,
  visitLabel,
  salesLabel,
}) => (
  <StatsContainer>
    <StatBox white>
      <Row>
        <StatLabel>{visitLabel}</StatLabel>
        <StatNumber>{visits}</StatNumber>
      </Row>
    </StatBox>
    <StatBox gray>
      <Row>
        <StatLabel>{salesLabel}</StatLabel>
        <StatNumber>{sales}</StatNumber>
      </Row>
      <DateLabel>{dateRange}</DateLabel>
    </StatBox>
  </StatsContainer>
);

export default StatsSection;

// 스타일 정의
const StatsContainer = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
`;

const StatBox = styled.div<{ white?: boolean; gray?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ white, gray }) =>
    white ? '#fff' : gray ? '#f6f6f6' : '#fff'};
  border: 1px solid #ddd;
  padding: 15px 20px;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatNumber = styled.div`
  font-weight: 800;
  font-size: 12px;
  color: #f6ae24;
`;

const StatLabel = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: #000000;
  margin-right: 5px;
`;

const DateLabel = styled.div`
  position: absolute;
  top: -5px;
  right: 10px;
  font-weight: 900;
  font-size: 6px;
  color: #fff;
  background: #f6ae24;
  text-align: center;
  padding: 3px;
`;
