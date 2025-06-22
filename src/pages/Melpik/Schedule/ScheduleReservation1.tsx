import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from '../../../components/Melpik/Schedule/Reservation1/Calendar';
import Stepper from '../../../components/Melpik/Schedule/Reservation1/Stepper';
import Summary from '../../../components/Melpik/Schedule/Reservation1/Summary';
import DateSelection from '../../../components/Melpik/Schedule/Reservation1/DateSelection';
import BottomBar from '../../../components/Melpik/Schedule/Reservation1/BottomBar';

const ScheduleReservation1: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [reservedDates] = useState<number[]>([]);
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(9);
  const seasonProgress = { total: 6, completed: 2, pending: 0 };
  const navigate = useNavigate();

  const handleDateClick = (day: number) => {
    if (!reservedDates.includes(day)) {
      setSelectedDates((prev) =>
        prev.length >= 2 ? [prev[1], day] : [...prev, day]
      );
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(e.target.value));
  };

  const handleBottomClick = () => {
    navigate('/schedule/reservation2', { state: { selectedDates } });
  };

  return (
    <Container>
      <Stepper currentStep={1} />
      <DateSelection
        year={year}
        month={month}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
      />
      <Calendar
        year={year}
        month={month}
        selectedDates={selectedDates}
        reservedDates={reservedDates}
        onDateClick={handleDateClick}
      />
      <Summary selectedDates={selectedDates} seasonProgress={seasonProgress} />
      <BottomBar onNext={handleBottomClick} />
    </Container>
  );
};

export default ScheduleReservation1;

const Container = styled.div`
  padding: 1rem;
  max-width: 600px;
  margin: auto;
`;
