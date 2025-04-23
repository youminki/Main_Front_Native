import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import Theme from '../../styles/Theme';
import StatsSection from '../../components/StatsSection';

import MelpikIcon from '../../assets/Melpik/MelpikIcon.svg';

import MelpikCreateIcon from '../../assets/Melpik/MelpikCreateIconBox.svg';
import MelpikScheduelerIcon from '../../assets/Melpik/MelpikScheduelerIconBox.svg';
import MelpikCalculateIcon from '../../assets/Melpik/MelpikCalculateIconBox.svg';
import MelpikOptionIcon from '../../assets/Melpik/MelpikOptionIconBox.svg';
import { useNavigate } from 'react-router-dom';

const MelpikPage: React.FC = () => {
  const navigate = useNavigate();

  const visits = 174;
  const sales = 26;
  const dateRange = '2025.01.06 ~ 01.10';

  const visitLabel = '방문수';
  const salesLabel = '판매된 제품수';

  const menuItems = [
    { icon: MelpikCreateIcon, label: '내 옷장', path: '/create-melpik' },
    { icon: MelpikScheduelerIcon, label: '이용 내역', path: '/sales-schedule' },
    { icon: MelpikCalculateIcon, label: '포인트', path: '/sales-settlement' },
    { icon: MelpikOptionIcon, label: '티켓', path: '/melpik-settings' },
  ];

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>멜픽</Title>
          <Subtitle>내 채널를 통해 나는 브랜드가 된다 </Subtitle>
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
            <MenuImage src={MelpikIcon} alt='메뉴 이미지' />
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

export default MelpikPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
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
  width: 90%;
  margin-bottom: 8px;
`;
