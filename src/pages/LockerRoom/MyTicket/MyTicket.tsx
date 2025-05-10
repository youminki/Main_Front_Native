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
  display: grid;
  /* 상단 헤더+스탯은 auto, Divider는 1px, 나머지는 1fr */
  grid-template-rows: auto auto 1px 1fr;
  height: 100vh; /* 화면 전체 높이를 사용 */
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
  color: #000;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
  margin: 0;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
`;

const TicketWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;

  /* 남은 공간을 채우고, 넘칠 땐 스크롤 */
  overflow-y: auto;
  padding-right: 4px; /* 스크롤바 여유 */
`;

const TicketCard = styled.div`
  position: relative;
  img {
    display: block;
    max-width: 350px;
    height: auto;
    margin: 0 auto;
    object-fit: contain;
  }
`;
