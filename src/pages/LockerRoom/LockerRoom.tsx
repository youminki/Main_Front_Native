import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Theme from '../../styles/Theme';
import StatsSection from '../../components/LockerRoom/StatsSection';

import LockerRoomIcons from '../../assets/LockerRoomIcons.svg';
import ClosetIcon from '../../assets/LockerRoom/ClosetIconBox.svg';
import HistoryIcon from '../../assets/LockerRoom/HistoryIconBox.svg';
import PointsIcon from '../../assets/LockerRoom/PointsIconBox.svg';
import TicketIcon from '../../assets/LockerRoom/TicketIconBox.svg';
import PaymentIcon from '../../assets/LockerRoom/PaymentIconBox.svg';
import ReviewIcon from '../../assets/LockerRoom/ReviewIconBox.svg';

const LockerRoom: React.FC = () => {
  const navigate = useNavigate();

  const visits = '구독자';
  const sales = '26,000';
  const dateRange = '요약정보';
  const visitLabel = '그룹';
  const salesLabel = '보유 포인트';

  const menuItems = [
    { icon: ClosetIcon, label: '내 옷장', path: '/my-closet' },
    { icon: HistoryIcon, label: '이용 내역', path: '/usage-history' },
    { icon: PointsIcon, label: '포인트', path: '/point' },
    { icon: TicketIcon, label: '티켓', path: '/my-ticket' },
    { icon: PaymentIcon, label: '결제수단', path: '/payment-method' },
    { icon: ReviewIcon, label: '상품 리뷰', path: '/product-review' },
  ];

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>락커룸</Title>
          <Subtitle>나에게 맞는 스타일을 찾을 때는 멜픽!</Subtitle>
        </Header>

        <StatsRow>
          <StatsSection
            visits={visits}
            sales={sales}
            dateRange={dateRange}
            visitLabel={visitLabel}
            salesLabel={salesLabel}
          />
          <ImageWrapper>
            <MenuImage src={LockerRoomIcons} alt='메뉴 이미지' />
          </ImageWrapper>
        </StatsRow>

        <Divider />

        <GridMenu>
          {menuItems.map((item, index) => (
            <GridItem key={index} onClick={() => navigate(item.path)}>
              <IconImage src={item.icon} alt={item.label} />
            </GridItem>
          ))}
        </GridMenu>
      </Container>
    </ThemeProvider>
  );
};

export default LockerRoom;

const Container = styled.div`
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
  font-size: 24px;
  font-weight: 800;
  color: #000;
  margin-bottom: 0px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #ccc;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuImage = styled.img`
  width: 64px;
  height: 58px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 30px 0;
`;

const GridMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;

  margin-bottom: 20px;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.2s;
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 8px;
`;
