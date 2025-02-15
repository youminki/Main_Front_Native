import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StatsSection from '../../../components/Melpik/StatsSection';
import FixedBottomBar from '../../../components/FixedBottomBar';

const SalesSettlement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(6);
  const navigate = useNavigate();

  const visits = '230,400';
  const sales = '02.07';
  const dateRange = '정산금 정보';

  const visitLabel = '미정산금';
  const salesLabel = '다음 정산일';

  const settlementDate = '2024.12.01 ~ 2025.05.31';

  const settlements = [
    {
      id: 1,
      status: 'pending',
      date: '2025-02 (1차)',
      subDate: '2025-02-07',
      amount: '67,200원',
      deduction: '공제 2,800원',
    },
    {
      id: 2,
      status: 'confirmed',
      date: '2025-01 (2차)',
      subDate: '2025-01-24 (18:30:40)',
      amount: '86,400원',
      deduction: '공제 3,600원',
    },
    {
      id: 3,
      status: 'confirmed',
      date: '2025-01 (1차)',
      subDate: '2025-01-10 (18:30:40)',
      amount: '144,000원',
      deduction: '공제 6,000원',
    },
    {
      id: 4,
      status: 'confirmed',
      date: '2024-12 (2차)',
      subDate: '2024-12-27 (18:30:40)',
      amount: '94,080원',
      deduction: '공제 3,920원',
    },
    {
      id: 5,
      status: 'confirmed',
      date: '2024-12 (1차)',
      subDate: '2024-12-11',
      amount: '67,200원',
      deduction: '공제 2,800원',
    },
    {
      id: 6,
      status: 'confirmed',
      date: '2024-11 (2차)',
      subDate: '2024-11-24',
      amount: '86,400원',
      deduction: '공제 3,600원',
    },
    {
      id: 7,
      status: 'confirmed',
      date: '2024-11 (1차)',
      subDate: '2024-11-10',
      amount: '144,000원',
      deduction: '공제 6,000원',
    },
  ];

  const filteredSettlements =
    selectedPeriod === 3 ? settlements.slice(0, 3) : settlements;

  return (
    <Container>
      <Header>
        <Title>판매정산</Title>
        <Subtitle>내 채널을 통해 나는 브랜드가 된다</Subtitle>
      </Header>

      {/* 상단 통계 영역 */}
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

      <Section>
        <SettlementHeader>
          <DateRange>{settlementDate}</DateRange>
          <PeriodSelector>
            <PeriodButton
              active={selectedPeriod === 3}
              onClick={() => setSelectedPeriod(3)}
            >
              3개월
            </PeriodButton>
            <PeriodButton
              active={selectedPeriod === 6}
              onClick={() => setSelectedPeriod(6)}
            >
              6개월
            </PeriodButton>
          </PeriodSelector>
        </SettlementHeader>

        <SettlementList>
          {filteredSettlements.map((settlement) => (
            <SettlementItem
              key={settlement.id}
              onClick={() =>
                navigate(`/sales-settlement-detail/${settlement.id}`)
              }
            >
              <LeftSection>
                <StatusDate>
                  <StatusTag
                    pending={settlement.status === 'pending'}
                    confirmed={settlement.status === 'confirmed'}
                  >
                    {settlement.status === 'pending' ? '정산예정' : '정산확정'}
                  </StatusTag>
                  <Date>{settlement.date}</Date>
                </StatusDate>
                <SubDate>{settlement.subDate}</SubDate>
              </LeftSection>
              <RightSection>
                <AmountWrapper>
                  {settlement.status === 'pending' && (
                    <PendingLabel>예정</PendingLabel>
                  )}
                  <Amount>{settlement.amount}</Amount>
                </AmountWrapper>
                <Deduction>{settlement.deduction}</Deduction>
              </RightSection>
            </SettlementItem>
          ))}
        </SettlementList>
      </Section>
      <FixedBottomBar
        text='정산 신청'
        color='black'
        onClick={() => navigate(`/settlement-request`)}
      />
    </Container>
  );
};

export default SalesSettlement;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  border: 1px solid #dddddd;
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
  color: #aaa;
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
const SettlementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  background: #f3f3f3;
  border-bottom: 1px solid #dddddd;
  padding: 20px;

  white-space: nowrap;
`;

const DateRange = styled.p`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 13px;
  text-align: left;
  color: #000000;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PeriodSelector = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const PeriodButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  margin-left: 8px;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  text-align: right;
  color: ${({ active }) => (active ? '#fff' : '#000')};
  background: ${({ active }) => (active ? '#000' : '#fff')};
  border: 1px solid ${({ active }) => (active ? '#000' : '#ccc')};
  border-radius: 14px;
  cursor: pointer;
  white-space: nowrap;
`;

const SettlementList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const SettlementItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px;
  background: #fff;

  border-bottom: 1px solid #dddddd;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightSection = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
`;
const AmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const PendingLabel = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
  flex: 1;
  text-align: left;

  margin-top: 10px;
`;

const StatusDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StatusTag = styled.span<{ pending?: boolean; confirmed?: boolean }>`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 8px;
  line-height: 9px;
  padding: 2px;

  border: 1px solid
    ${({ pending, confirmed }) =>
      pending ? '#D40148' : confirmed ? '#297FD5' : '#000'};

  color: ${({ pending, confirmed }) =>
    pending ? '#D40148' : confirmed ? '#297FD5' : '#000'};
`;

const Date = styled.p`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;

  color: #000000;
  margin-top: 6px;
  margin-bottom: 0px;
`;

const SubDate = styled.p`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 11px;
  margin-top: 10px;

  color: #999999;
`;

const Amount = styled.p`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 22px;
  text-align: right;
  color: #000000;
  flex: 1;
  white-space: nowrap;

  margin-left: 6px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const Deduction = styled.p`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 11px;

  text-align: right;

  color: #999999;
  margin-top: 0px;
`;
