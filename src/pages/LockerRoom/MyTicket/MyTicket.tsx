// src/pages/LockerRoom/MyTicket.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';
import TicketIllustration from '../../../assets/LockerRoom/TicketIllustration.svg';
import AddTicketIllustration from '../../../assets/LockerRoom/AddTicketIllustration.svg';
import CardIcon from '../../../assets/LockerRoom/CardIcon.svg';
import BarcodeImg from '../../../assets/LockerRoom/barcodeIcon.svg';
import { getUserTickets, TicketItem } from '../../../api/ticket/ticket';

const visitLabel = '사용중인 이용권';
const salesLabel = '시즌';
const visits = '2';
const sales = '2025 1분기';
const dateRange = 'SPRING';

const MyTicket: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketItem[]>([]);

  useEffect(() => {
    getUserTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.error('티켓 조회 실패:', err));
  }, []);

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
        {tickets.map((ticket) => {
          const {
            id,
            startDate,
            endDate,
            ticketList: { name, price, isLongTerm },
          } = ticket;

          const path = isLongTerm
            ? '/my-ticket/SubscriptionPass'
            : '/my-ticket/OnetimePass';
          const subtitle = isLongTerm ? '(매월결제)' : '(일반결제)';
          const formattedPrice = `${price.toLocaleString()}원`;
          const formattedDate = `${startDate.replace(/-/g, '.')} ~ ${endDate.replace(/-/g, '.')}`;

          return (
            <TicketCard key={id} onClick={() => navigate(path)}>
              <Left>
                <SeasonRow>
                  <SeasonText>2025 SPRING</SeasonText>
                  <CardIconImg src={CardIcon} alt='card icon' />
                </SeasonRow>
                <TicketTitle>{name}</TicketTitle>
                <TicketSubtitle>{subtitle}</TicketSubtitle>
                <TicketPrice>{formattedPrice}</TicketPrice>
                <Barcode src={BarcodeImg} alt='barcode' />
              </Left>
              <Right>
                <DateText>{formattedDate}</DateText>
                <Illustration
                  src={TicketIllustration}
                  alt='ticket illustration'
                />
              </Right>
            </TicketCard>
          );
        })}

        {/* 이용권 추가 버튼 */}
        <TicketCard onClick={() => navigate('/my-ticket/PurchaseOfPasses')}>
          <AddLeft>
            <PlusBox>
              <PlusSign>＋</PlusSign>
            </PlusBox>
            <AddText>이용권 추가</AddText>
          </AddLeft>
          <AddRight>
            <Illustration
              src={AddTicketIllustration}
              alt='Add ticket illustration'
            />
          </AddRight>
        </TicketCard>
      </TicketWrapper>
    </MyTicketContainer>
  );
};

export default MyTicket;

// ─── Styled Components ─────────────────────────────────────────────

const MyTicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 1rem;
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #000;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #ccc;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
`;

const TicketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const TicketCard = styled.div`
  position: relative;
  display: flex;
  min-width: 350px;
  height: 160px;
  border: 1px solid #ddd;
  overflow: hidden;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: calc(50% - 15px);
    width: 30px;
    height: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    z-index: 1;
  }
  &::before {
    top: -15px;
  }
  &::after {
    bottom: -15px;
  }
`;

const Left = styled.div`
  width: 50%;
  padding: 16px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const SeasonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`;

const SeasonText = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #000;
`;

const CardIconImg = styled.img`
  width: 12px;
  height: 12px;
`;

const TicketTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #000;
  margin: 0;
`;

const TicketSubtitle = styled.p`
  font-size: 8px;
  line-height: 9px;
  color: #666;
  margin: 8px 0;
`;

const TicketPrice = styled.p`
  font-size: 24px;
  font-weight: 900;
  color: #000;
  margin: 0;
`;

const Barcode = styled.img`
  width: 70px;
  height: auto;
  margin-top: auto;
`;

const Right = styled.div`
  width: 50%;
  padding: 16px;
  box-sizing: border-box;
  background: #f6ae24;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-left: 1px dashed #fff;
`;

const DateText = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const Illustration = styled.img`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const AddLeft = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const PlusBox = styled.div`
  width: 24px;
  height: 24px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const PlusSign = styled.span`
  font-size: 24px;
  color: #ccc;
`;

const AddText = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #999;
`;

const AddRight = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
