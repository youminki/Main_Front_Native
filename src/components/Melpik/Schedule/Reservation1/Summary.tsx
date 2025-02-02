import React from 'react';
import styled from 'styled-components';
import Theme from '../../../../styles/Theme';

interface SummaryProps {
  selectedDates: number[];
  seasonProgress: {
    total: number;
    completed: number;
    pending: number;
  };
}

const Summary: React.FC<SummaryProps> = ({ selectedDates, seasonProgress }) => {
  return (
    <SummaryContainer>
      <ScheduleInfo>
        <Label>선택된 스케줄</Label>
        <InfoText>
          {selectedDates.length > 1
            ? `${selectedDates[0]}일 ~ ${selectedDates[1]}일`
            : '날짜 선택 필요'}
        </InfoText>
      </ScheduleInfo>
      <ScheduleInfo>
        <Label>시즌 진행 회차</Label>
        <InfoText>
          <ProgressText>
            {seasonProgress.completed} /{' '}
            <GrayText>{seasonProgress.total}</GrayText> 회
          </ProgressText>
          <PendingText>
            <GrayText>미진행 </GrayText>
            {seasonProgress.pending}회
          </PendingText>
        </InfoText>
      </ScheduleInfo>
    </SummaryContainer>
  );
};

export default Summary;

const SummaryContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

const ScheduleInfo = styled.div`
  flex: 1;
`;

const Label = styled.label`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;

  color: #000000;
`;

const InfoText = styled.div`
  min-width: 150px;
  height: 57px;
  padding: 10px;
  border: 1px solid ${Theme.colors.gray4};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;

  color: #000000;
`;

const ProgressText = styled.div`
  font-size: 13px;
`;

const PendingText = styled.div`
  font-size: 13px;
`;

const GrayText = styled.span`
  color: ${Theme.colors.gray3};
`;
