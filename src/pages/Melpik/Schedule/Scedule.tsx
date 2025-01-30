import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Theme from '../../../styles/Theme';
import ScheduleIcon from '../../../assets/Melpik/schedule.svg';
import BletIcon from '../../../assets/Melpik/blet.svg';
import StatsSection from '../../../components/Melpik/StatsSection';

const Schedule: React.FC = () => {
  // 동적 데이터 (프롭스로 전달할 값)
  const visits = 4;
  const sales = 2;
  const dateRange = '2025.01.06 ~ 01.10';

  const visitLabel = '총 스케줄';
  const salesLabel = '진행중인 스케줄';
  const navigate = useNavigate();

  const handleIconClick = (): void => {
    navigate('/schedule/confirmation');
  };
  const handleBottomClick = (): void => {
    navigate('/schedule/reservation1');
  };

  return (
    <ScheduleContainer>
      <Header>
        <Title>판매 스케줄</Title>
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
      </StatsRow>
      <Divider />
      <ScheduleContent>
        <ScheduleList>
          {['reserved', 'inProgress', 'notStarted'].map((status, index) => (
            <ScheduleItemContainer
              key={index}
              scheduleStatus={
                status as 'reserved' | 'inProgress' | 'notStarted'
              }
            >
              <IconContainer>
                <IconWrapper
                  scheduleStatus={
                    status as 'reserved' | 'inProgress' | 'notStarted'
                  }
                >
                  <Icon src={ScheduleIcon} alt={`${status} Icon`} />
                </IconWrapper>
                <ConnectorLine />
              </IconContainer>
              <Container>
                <MiniTitle>
                  {status === 'reserved'
                    ? '예약된 스케줄'
                    : status === 'inProgress'
                      ? '진행된 스케줄'
                      : '미진행 스케줄'}
                </MiniTitle>
                <ScheduleItem>
                  <Details>
                    <SeasonWrapper>
                      <Season>2024 가을 시즌 {index + 1}.</Season>
                      <IconRightWrapper onClick={handleIconClick}>
                        <IconRight src={BletIcon} alt='Blet Icon' />
                      </IconRightWrapper>
                    </SeasonWrapper>
                    <DateWrapper>
                      <DateTitle>스케줄 일정</DateTitle>
                      <DateText>9월 2일 (월) ~ 9월 13일 (금)</DateText>
                    </DateWrapper>
                    <ConnectorLine1 />
                    <InfoRow>
                      <InfoColumn>
                        <DateTitle>스케줄 노출일자</DateTitle>
                        <DateText>9월 4일 (수)</DateText>
                      </InfoColumn>
                      <InfoColumn>
                        <DateTitle>선택한 작품</DateTitle>
                        <DateText>6가지</DateText>
                      </InfoColumn>
                    </InfoRow>
                  </Details>
                </ScheduleItem>
              </Container>
            </ScheduleItemContainer>
          ))}
        </ScheduleList>
      </ScheduleContent>
      <BottomBarContainer>
        <OrderButton onClick={handleBottomClick}>스케줄 예약하기</OrderButton>
      </BottomBarContainer>
      <BeenContainer />
    </ScheduleContainer>
  );
};

export default Schedule;

interface ScheduleItemProps {
  scheduleStatus: 'reserved' | 'inProgress' | 'notStarted';
}

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const Container = styled.div`
  min-width: 290px;
  width: 100%;
  height: 220px;
`;

const ScheduleContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  margin: 30px 20px 0 0;
`;

const ScheduleItemContainer = styled.div<ScheduleItemProps>`
  display: flex;
  align-items: flex-start;
`;

const IconWrapper = styled.div<ScheduleItemProps>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ scheduleStatus }) =>
    scheduleStatus === 'reserved'
      ? Theme.colors.gray
      : scheduleStatus === 'inProgress'
        ? Theme.colors.yellow
        : Theme.colors.gray4};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const ConnectorLine1 = styled.div`
  border: 1px solid ${Theme.colors.gray4};
  margin: 4px 0;
`;

const ConnectorLine = styled.div`
  border: 2px solid ${Theme.colors.gray4};
  height: 212px;
`;

const ScheduleItem = styled.div`
  background-color: white;
  border: 1px solid ${Theme.colors.gray4};
  flex-grow: 1;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 31px 21px 34px 21px;
`;

const SeasonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Season = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 18px;
`;

const IconRightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${Theme.colors.gray1};
  margin-left: 10px;
  border-radius: 4px;
`;

const IconRight = styled.img`
  width: 20px;
  height: 22px;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DateTitle = styled.span`
  color: ${Theme.colors.gray2};
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  margin-bottom: 10px;
`;

const DateText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

const MiniTitle = styled.div`
  display: flex;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  padding: 9px 10px;
`;

const BottomBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 34px;
  background-color: #eeeeee;
  z-index: 9999;
`;

const OrderButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: black;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  margin: 0 21px;
`;

const BeenContainer = styled.div`
  height: 100px;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin: 30px 0;
`;
