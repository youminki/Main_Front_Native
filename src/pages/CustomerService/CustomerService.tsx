import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Theme from '../../styles/Theme';
import StatsSection from '../../components/StatsSection';

import CustomerServiceIcon from '../../assets/CustomerServiceIcons.svg';
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
            <Icon src={CustomerServiceIcon} alt='고객센터 아이콘' />
          </ImageWrapper>
        </StatsRow>

        <Divider />

        <GridMenu>
          {menuItems.map((item, idx) => (
            <GridItem key={idx} onClick={() => navigate(item.path)}>
              <IconImage src={item.icon} alt='' />
            </GridItem>
          ))}
        </GridMenu>
      </Container>
    </ThemeProvider>
  );
};

export default CustomerService;

const Container = styled.div`
  width: 100%;

  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
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
  margin-bottom: 0;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #666;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 64px;
  height: auto;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 20px 0;

  @media (min-width: 1024px) {
    margin: 50px 0;
  }
`;

const GridMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  max-width: 1000px;
  margin: 0 auto 20px;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconImage = styled.img`
  width: 100%;
  height: auto;
`;
