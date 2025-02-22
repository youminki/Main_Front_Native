import React from 'react';
import styled from 'styled-components';
import StatsSection from '../../../components/Melpik/StatsSection';

// 동적 데이터
const visitLabel = '사용중인 이용권';
const salesLabel = '시즌';
const visits = '2';
const sales = '2025 1분기';
const dateRange = 'SPRING';

const MyTicket: React.FC = () => {
  return (
    <MyTicketContainer>
      <Header>
        <Title>이용권</Title>
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
    </MyTicketContainer>
  );
};

export default MyTicket;

const MyTicketContainer = styled.div`
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
