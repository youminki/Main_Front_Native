import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Theme from '../../styles/Theme';
import StatsSection from '../../components/LockerRoom/StatsSection';

import LockerRoomIcons from '../../assets/LockerRoomIcons.svg';
import ClosetIcon from '../../assets/LockerRoom/ClosetIcon.svg';
import HistoryIcon from '../../assets/LockerRoom/HistoryIcon.svg';
import PointsIcon from '../../assets/LockerRoom/PointsIcon.svg';
import TicketIcon from '../../assets/LockerRoom/TicketIcon.svg';
import PaymentIcon from '../../assets/LockerRoom/PaymentIcon.svg';
import ReviewIcon from '../../assets/LockerRoom/ReviewIcon.svg';

const menuItems = [
  { icon: ClosetIcon, label: '내 옷장', path: '/my-closet' },
  { icon: HistoryIcon, label: '이용내역', path: '/usage-history' },
  { icon: PointsIcon, label: '포인트', path: '/point' },
  { icon: TicketIcon, label: '이용권', path: '/my-ticket' },
  { icon: PaymentIcon, label: '결제수단', path: '/payment-method' },
  { icon: ReviewIcon, label: '상품리뷰', path: '/product-review' },
];

const LockerRoom: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>락커룸</Title>
          <Subtitle>나에게 맞는 스타일을 찾을 때는 멜픽!</Subtitle>
        </Header>

        <StatsRow>
          <StatsSection
            visits='구독자'
            sales='26,000'
            dateRange='요약정보'
            visitLabel='그룹'
            salesLabel='보유 포인트'
          />
          <MenuIcon src={LockerRoomIcons} alt='메뉴 이미지' />
        </StatsRow>

        <Divider />

        <GridMenu>
          {menuItems.map((item, idx) => (
            <GridItem key={idx} onClick={() => navigate(item.path)}>
              <IconLabelRow>
                <IconImage src={item.icon} alt={item.label} />
                <Label>{item.label}</Label>
              </IconLabelRow>
              <PickButton>
                PICK <Arrow>→</Arrow>
              </PickButton>
            </GridItem>
          ))}
        </GridMenu>
      </Container>
    </ThemeProvider>
  );
};

export default LockerRoom;

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background: #fff;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin: 0;
  color: #000;

  @media (min-width: 1024px) {
    font-size: 32px;
    margin-bottom: 10px;
  }
`;

const Subtitle = styled.p`
  font-size: 12px;
  line-height: 28px;
  margin: 0;
  color: #cccccc;

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MenuIcon = styled.img`
  width: 64px;
  height: 58px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 20px 0;

  @media (min-width: 1024px) {
    margin: 50px 0;
  }
`;

const GridMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  /* 데스크탑: 3열, 셀 높이는 콘텐츠 기준으로 늘어남 */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;

  /* 셀을 꽉 채우기 위해 높이를 자동으로 늘림 */
  width: 100%;
  height: 100%;
`;

const IconLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
`;

const IconImage = styled.img`
  object-fit: contain;

  @media (min-width: 1024px) {
    width: 150px;
    height: 150px;
  }
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #000;
  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const PickButton = styled.div`
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: #fafafa;
  font-size: 12px;
  font-weight: 600;
  @media (min-width: 1024px) {
    padding: 12px 24px;
    font-size: 16px;
  }
`;

const Arrow = styled.span`
  margin-left: 4px;
`;
