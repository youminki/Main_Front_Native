import React from 'react';
import styled from 'styled-components';
import Theme from '../../../../styles/Theme';

interface CalendarProps {
  year: number;
  month: number;
  selectedDates: number[];
  reservedDates: number[];
  onDateClick: (day: number) => void;
}

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month - 1, 1).getDay();
};

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  selectedDates,
  reservedDates,
  onDateClick,
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const emptyDays = Array.from({ length: firstDay }, (_, i) => (
    <EmptyDay key={i} />
  ));

  const [startDate, endDate] = selectedDates;
  const isWithinRange = (day: number): boolean => {
    return (
      startDate !== undefined &&
      endDate !== undefined &&
      day > startDate &&
      day < endDate
    );
  };

  return (
    <CalendarContainer>
      {['일', '월', '화', '수', '목', '금', '토'].map((name, index) => (
        <DayName key={index} isWeekend={index === 0 || index === 6}>
          {name}
        </DayName>
      ))}
      {emptyDays}
      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
        <DayBox
          key={day}
          selected={selectedDates.includes(day)}
          reserved={reservedDates.includes(day)}
          inRange={isWithinRange(day)}
          onClick={() => onDateClick(day)}
        >
          {day}
        </DayBox>
      ))}
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(40px, 1fr));
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 39px;
  padding: 10px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 5px;
  }
`;

const DayName = styled.div<{ isWeekend: boolean }>`
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding: 5px;
  color: ${(props) => (props.isWeekend ? Theme.colors.gray1 : 'black')};

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const EmptyDay = styled.div`
  min-width: 40px;
  height: 50px;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const DayBox = styled.div<{
  selected: boolean;
  reserved: boolean;
  inRange: boolean;
}>`
  border: 1px solid
    ${(props) => (props.inRange ? Theme.colors.yellow : Theme.colors.gray4)};
  background-color: ${(props) =>
    props.reserved
      ? Theme.colors.gray3
      : props.selected
        ? Theme.colors.yellow
        : '#fff'};
  color: ${(props) =>
    props.selected ? '#fff' : props.reserved ? '#fff' : '#000'};
  width: 100%;
  min-width: 40px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.reserved ? 'default' : 'pointer')};
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (!props.reserved ? Theme.colors.gray2 : '')};
  }

  @media (max-width: 768px) {
    height: 40px;
    font-size: 12px;
  }
`;
