import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StatsSection from '../../../components/StatsSection';

type PeriodSectionProps = {
  selectedPeriod: number;
  setSelectedPeriod: (period: number) => void;
};

const PeriodSection: React.FC<PeriodSectionProps> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  return (
    <SettlementHeader>
      <PeriodSelector>
        <PeriodButton
          active={selectedPeriod === 1}
          onClick={() => setSelectedPeriod(1)}
        >
          전체
        </PeriodButton>
        <PeriodButton
          active={selectedPeriod === 2}
          onClick={() => setSelectedPeriod(2)}
        >
          서비스
        </PeriodButton>
        <PeriodButton
          active={selectedPeriod === 3}
          onClick={() => setSelectedPeriod(3)}
        >
          주문/결제
        </PeriodButton>
        <PeriodButton
          active={selectedPeriod === 4}
          onClick={() => setSelectedPeriod(4)}
        >
          배송/반품
        </PeriodButton>
        <PeriodButton
          active={selectedPeriod === 5}
          onClick={() => setSelectedPeriod(5)}
        >
          이용권
        </PeriodButton>
      </PeriodSelector>
    </SettlementHeader>
  );
};

const FrequentlyAskedQuestions: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate('/customerService/FrequentlyAskedQuestionsDetail');
  };

  return (
    <FrequentlyAskedQuestionsContainer>
      <Header>
        <Title>자주묻는질문</Title>
        <Subtitle>새로운 소식 및 서비스 안내를 드립니다.</Subtitle>
      </Header>

      <StatsSection
        visits='999'
        sales='999'
        dateRange='NEW 2025. 03.'
        visitLabel='전체'
        salesLabel='최근 업데이트'
      />
      <Divider />

      <Section>
        <PeriodSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        <FrequentlyAskedQuestionsListContainer>
          {/* FrequentlyAskedQuestionsItem 클릭 시 handleItemClick 실행 */}
          <FrequentlyAskedQuestionsItem onClick={handleItemClick}>
            <TextWrapper>
              <ItemTitle>
                <BoldText>공지</BoldText> / 새로운 시즌 의류 업데이트 (2025 봄)
              </ItemTitle>
              <ItemDate>2025.02.01</ItemDate>
            </TextWrapper>
            <Bullet />
          </FrequentlyAskedQuestionsItem>

          <FrequentlyAskedQuestionsItem onClick={handleItemClick}>
            <TextWrapper>
              <ItemTitle>
                <BoldText>공지</BoldText> / 새로운 시즌 의류 업데이트 (2025 봄)
              </ItemTitle>
              <ItemDate>2025.02.01</ItemDate>
            </TextWrapper>
            <Bullet />
          </FrequentlyAskedQuestionsItem>
        </FrequentlyAskedQuestionsListContainer>
      </Section>
    </FrequentlyAskedQuestionsContainer>
  );
};

export default FrequentlyAskedQuestions;

const FrequentlyAskedQuestionsContainer = styled.div`
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
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 27px;
  color: #000000;
  margin-bottom: 0px;
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 80px;
  margin-top: 30px;
`;

const SettlementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f3;
  border: 1px solid #dddddd;
  padding: 20px;
  white-space: nowrap;
`;

const PeriodSelector = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-right: 10px;
`;

const PeriodButton = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  margin-right: 8px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: ${({ active }) => (active ? '#fff' : '#000')};
  background: ${({ active }) => (active ? '#000' : '#fff')};
  border: 1px solid ${({ active }) => (active ? '#000' : '#ccc')};
  border-radius: 14px;
  cursor: pointer;
  white-space: nowrap;
`;

const FrequentlyAskedQuestionsListContainer = styled.div`
  max-height: 932px;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 10px;

  border: 1px solid #dddddd;
  background: #ffffff;
`;

const FrequentlyAskedQuestionsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 76px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.96);

  border-bottom: 1px solid #dddddd;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  white-space: pre-wrap;
  word-break: break-all;
`;

const ItemTitle = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const ItemDate = styled.div`
  margin-top: 10px;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #aaaaaa;
`;

const BoldText = styled.span`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`;

const Bullet = styled.div`
  font-size: 20px;
  color: #cccccc;
  margin: auto 19px auto 0;
  &::before {
    content: '>';
  }
`;
