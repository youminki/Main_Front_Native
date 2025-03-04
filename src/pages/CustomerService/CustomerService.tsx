import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Theme from '../../styles/Theme';
import StatsSection from '../../components/LockerRoom/StatsSection';

import LockerRoomIcons from '../../assets/CustomerServiceIcons.svg';
import FrequentlyAskedQuestionsBox from '../../assets/CustomerService/FrequentlyAskedQuestionsBox.svg';
import NoticeBox from '../../assets/CustomerService/NoticeBox.svg';
import PersonalInformationProcessingPolicyBox from '../../assets/CustomerService/PersonalInformationProcessingPolicyBox.svg';
import TermsAndConditionsOfUseBox from '../../assets/CustomerService/TermsAndConditionsOfUseBox.svg';

const CustomerService: React.FC = () => {
  const navigate = useNavigate();

  const visits = '999';
  const sales = '999';
  const dateRange = 'NEW 2025. 03.';
  const visitLabel = '공지사항';
  const salesLabel = '자주 묻는 질문';

  const menuItems = [
    {
      icon: FrequentlyAskedQuestionsBox,
      path: '/CustomerService/FrequentlyAskedQuestions',
    },
    { icon: NoticeBox, path: '/CustomerService/Notice' },
    {
      icon: PersonalInformationProcessingPolicyBox,
      path: '/CustomerService/PersonalInformationProcessingPolicy',
    },
    {
      icon: TermsAndConditionsOfUseBox,
      path: '/CustomerService/TermsAndConditionsOfUse',
    },
  ];

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Header>
          <Title>고객센터</Title>
          <Subtitle>새로운 소식 및 서비스 안내를 드립니다.</Subtitle>
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
              <IconImage src={item.icon} />
            </GridItem>
          ))}
        </GridMenu>
      </Container>
    </ThemeProvider>
  );
};

export default CustomerService;

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
