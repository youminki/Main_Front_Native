import React, { useState } from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import PeriodSection from '../../../components/PeriodSection';

// 동적 데이터
const visitLabel = '포인트';
const salesLabel = '포인트 변동';
const visits = '0';
const sales = '9';
const dateRange = 'COUNT';

// 예시 아이템 배열 (필요 시 사용)
const items = [
  { id: 1, name: 'Item1' },
  { id: 2, name: 'Item2' },
  { id: 3, name: 'Item3' },
  { id: 4, name: 'Item4' },
];

const Point: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(6);
  // 예시: 선택된 기간에 따라 아이템 목록을 필터링 (3개월이면 앞의 3개, 6개월이면 전체)
  const filteredItems = selectedPeriod === 3 ? items.slice(0, 3) : items;

  return (
    <PointContainer>
      <Header>
        <Title>포인트</Title>
        <Subtitle>나에게 맞는 스타일을 찾을 때는 멜픽!</Subtitle>
      </Header>

      <StatsSection
        visits={visits}
        sales={sales}
        dateRange={dateRange}
        visitLabel={visitLabel}
        salesLabel={salesLabel}
      />
      <Divider />

      <Section>
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        {/* 필요하다면 filteredItems를 이용한 추가 렌더링 */}
      </Section>
    </PointContainer>
  );
};

export default Point;

const PointContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fff;
  font-family: 'NanumSquare Neo OTF', sans-serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 27px;
  color: #000000;
  margin-bottom: 0px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-top: 30px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 80px;
  margin-top: 30px;
`;
