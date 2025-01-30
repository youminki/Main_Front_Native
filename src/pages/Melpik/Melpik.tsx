import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import Theme from '../../styles/Theme';
import StatsSection from '../../components/Melpik/StatsSection';
import CardGrid from '../../components/Melpik/CardGrid.tsx';
import MelpikIcon from '/src/assets/Melpik/MelpikIcon.svg';

const MelpikPage: React.FC = () => {
  // 동적 데이터 (프롭스로 전달할 값)
  const visits = 174;
  const sales = 26;
  const dateRange = '2025.01.06 ~ 01.10';

  const visitLabel = '방문수';
  const salesLabel = '판매된 제품수';

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>멜픽</Title>
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
          <ImageWrapper>
            <MenuImage src={MelpikIcon} alt='메뉴 이미지' />
          </ImageWrapper>
        </StatsRow>
        <Divider />
        <CardGrid />
      </Container>
    </ThemeProvider>
  );
};

export default MelpikPage;

const Container = styled.div`
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
