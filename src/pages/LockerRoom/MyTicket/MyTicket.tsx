import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';

import RegularPass from '../../../assets/LockerRoom/RegularPass.svg';
import OnetimePass from '../../../assets/LockerRoom/OnetimePass.svg';
import AddPass from '../../../assets/LockerRoom/AddPass.svg';

const visitLabel = '사용중인 이용권';
const salesLabel = '시즌';
const visits = '2';
const sales = '2025 1분기';
const dateRange = 'SPRING';

const MyTicket: React.FC = () => {
  const navigate = useNavigate();

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

      <TicketWrapper>
        <TicketCard onClick={() => navigate('/my-ticket/SubscriptionPass')}>
          <img src={RegularPass} alt='정기 구독권 이미지' />
        </TicketCard>

        <TicketCard onClick={() => navigate('/my-ticket/OnetimePass')}>
          <img src={OnetimePass} alt='1회 이용권 이미지' />
        </TicketCard>

        <TicketCard onClick={() => navigate('/my-ticket/PurchaseOfPasses')}>
          <img src={AddPass} alt='이용권 추가 이미지' />
        </TicketCard>
      </TicketWrapper>
    </MyTicketContainer>
  );
};

export default MyTicket;

const MyTicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fff;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 24px;
  line-height: 27px;
  color: #000000;
  margin-bottom: 0;
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

const TicketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
  cursor: pointer;
`;

const TicketCard = styled.div`
  display: inline-block;
  position: relative;
  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;
