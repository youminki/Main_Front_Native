import React from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/Melpik/StatsSection';

const SalesSettlement: React.FC = () => {
  // 동적 데이터 (프롭스로 전달할 값)
  const visits = '230,400';
  const sales = '02.07';
  const dateRange = '정산금 정보';

  const visitLabel = '미정산금';
  const salesLabel = '다음 정산일';
  return (
    <Container>
      <Header>
        <Title>판매정산</Title>
        <Subtitle>내 채널을 통해 나는 브랜드가 된다</Subtitle>
      </Header>
      <StatsRow>
        <StatsSection
          visits={visits}
          sales={sales}
          dateRange={dateRange}
          visitLabel={visitLabel}
          salesLabel={salesLabel}
        />
      </StatsRow>
      <Divider />

      <SettlementList>
        <SettlementItem>
          <Date>2025-02 (1차)</Date>
          <Amount>67,200원</Amount>
        </SettlementItem>
        <SettlementItem>
          <Date>2025-01 (2차)</Date>
          <Amount>86,400원</Amount>
        </SettlementItem>
        <SettlementItem>
          <Date>2025-01 (1차)</Date>
          <Amount>144,000원</Amount>
        </SettlementItem>
      </SettlementList>
      <SettleButton>정산 신청</SettleButton>
    </Container>
  );
};

export default SalesSettlement;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #000;
  margin-bottom: 0px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;
const Amount = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const SettlementList = styled.div`
  margin-bottom: 20px;
`;

const SettlementItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
`;

const Date = styled.p`
  font-size: 16px;
`;

const SettleButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 30px 0;
`;
