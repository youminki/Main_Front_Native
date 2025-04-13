// src/components/Home/HomeDetail/RentalOptions.tsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from 'react-icons/fa';
import ReusableModal2 from '../../../components/Home/HomeDetail/HomeDetailModal';
import ReusableModal from '../../../components/ReusableModal';
import RentalSelectDateIcon from '../../../assets/Home/HomeDetail/RentalSelectDateIcon.svg';
import Theme from '../../../styles/Theme';

const RentalOptions: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [yearMonth, setYearMonth] = useState<string>('');
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const minDays =
    selectedPeriod === '3박4일' ? 4 : selectedPeriod === '5박6일' ? 6 : 0;
  const maxDays = 10;

  useEffect(() => {
    if (isModalOpen) {
      const seasonMonths = getSeasonMonths();
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const defaultYM =
        seasonMonths.find((ym) => {
          const m = Number(ym.split('-')[1]);
          return m >= currentMonth;
        }) || seasonMonths[0];
      setYearMonth(defaultYM);
      setSelectedRange({ start: null, end: null });
    }
  }, [isModalOpen]);

  const getSeasonMonths = (): string[] => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    let seasonMonths: number[] = [];
    if ([3, 4, 5].includes(currentMonth)) {
      seasonMonths = [3, 4, 5];
    } else if ([6, 7, 8].includes(currentMonth)) {
      seasonMonths = [6, 7, 8];
    } else if ([9, 10, 11].includes(currentMonth)) {
      seasonMonths = [9, 10, 11];
    } else {
      seasonMonths = [12, 1, 2];
    }
    return seasonMonths.map((m) => {
      let year = currentYear;
      if (m === 12 && currentMonth !== 12) {
        year = currentYear - 1;
      }
      return `${year}-${String(m).padStart(2, '0')}`;
    });
  };

  const toggleModal = () => {
    if (selectedPeriod) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formatDate = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  };

  const getHolidaysForMonth = (year: number, month: number): Date[] => {
    const holidays: Date[] = [];
    if (month === 1) {
      holidays.push(new Date(year, 0, 1));
    }
    if (month === 3) {
      holidays.push(new Date(year, 2, 1));
    }
    if (month === 10) {
      holidays.push(new Date(year, 9, 3));
      holidays.push(new Date(year, 9, 9));
    }
    if (month === 12) {
      holidays.push(new Date(year, 11, 25));
    }
    return holidays;
  };

  const isHoliday = (date: Date): boolean => {
    const holidays = getHolidaysForMonth(
      date.getFullYear(),
      date.getMonth() + 1
    );
    return holidays.some(
      (h) =>
        h.getFullYear() === date.getFullYear() &&
        h.getMonth() === date.getMonth() &&
        h.getDate() === date.getDate()
    );
  };

  const getTotalDays = (): number => {
    if (selectedRange.start && selectedRange.end) {
      const diff = selectedRange.end.getTime() - selectedRange.start.getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  };

  const handleDateClick = (day: number) => {
    const [year, month] = yearMonth.split('-').map(Number);
    const clickedDate = new Date(year, month - 1, day);
    if (clickedDate.getDay() === 0 || isHoliday(clickedDate)) {
      setErrorMessage('일요일 및 공휴일은 시작일로 선택할 수 없습니다!');
      setErrorModalOpen(true);
      return;
    }
    if (minDays === 0) return;
    const endDate = addDays(clickedDate, minDays - 1);
    setSelectedRange({ start: clickedDate, end: endDate });
  };

  const handleMinus = () => {
    if (!selectedRange.start || !selectedRange.end) return;
    const total = getTotalDays();
    if (total <= minDays) {
      setErrorMessage(
        selectedPeriod === '3박4일'
          ? '최소일정은 3박4일입니다.'
          : '최소일정은 5박6일입니다.'
      );
      setErrorModalOpen(true);
      return;
    }
    const newEnd = addDays(selectedRange.end, -1);
    setSelectedRange({ ...selectedRange, end: newEnd });
  };

  const handlePlus = () => {
    if (!selectedRange.start || !selectedRange.end) return;
    const total = getTotalDays();
    if (total >= maxDays) {
      setErrorMessage('최대 10일까지 추가 가능합니다.');
      setErrorModalOpen(true);
      return;
    }
    const newEnd = addDays(selectedRange.end, 1);
    setSelectedRange({ ...selectedRange, end: newEnd });
  };

  const handlePrevMonth = () => {
    const seasonMonths = getSeasonMonths();
    const currentIndex = seasonMonths.indexOf(yearMonth);
    if (currentIndex > 0) {
      setYearMonth(seasonMonths[currentIndex - 1]);
    }
  };

  const handleNextMonth = () => {
    const seasonMonths = getSeasonMonths();
    const currentIndex = seasonMonths.indexOf(yearMonth);
    if (currentIndex < seasonMonths.length - 1) {
      setYearMonth(seasonMonths[currentIndex + 1]);
    }
  };

  const renderCalendar = () => {
    const [year, month] = yearMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const emptyDays = Array.from({ length: firstDay }, (_, i) => (
      <EmptyDay key={`empty-${i}`} />
    ));
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [
      ...emptyDays,
      ...days.map((day) => {
        const currentDate = new Date(year, month - 1, day);
        const dayOfWeek = currentDate.getDay();
        const holiday = isHoliday(currentDate);
        const isSunday = dayOfWeek === 0;
        const isWeekend = isSunday || dayOfWeek === 6;
        let isSelected = false;
        let isBoundary = false;
        const inRange =
          selectedRange.start &&
          selectedRange.end &&
          currentDate >= selectedRange.start &&
          currentDate <= selectedRange.end;
        if (inRange) {
          isSelected = true;
          const isStart =
            currentDate.getTime() === selectedRange.start!.getTime();
          const isEnd = currentDate.getTime() === selectedRange.end!.getTime();
          if (isStart && (isSunday || holiday)) {
            isSelected = false;
          } else if (isStart || isEnd) {
            isBoundary = true;
          }
        }
        const isLastDay =
          selectedRange.end &&
          currentDate.getTime() === selectedRange.end.getTime();
        const reserved = (isSunday || holiday) && !isLastDay && !isSelected;
        return (
          <DayBox
            key={day}
            selected={isSelected}
            isBoundary={isBoundary}
            reserved={reserved}
            isWeekend={isWeekend}
            isSunday={isSunday}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </DayBox>
        );
      }),
    ];
  };

  const displaySelectedDates = () => {
    if (selectedRange.start && selectedRange.end) {
      return `${formatDate(selectedRange.start)} ~ ${formatDate(selectedRange.end)}`;
    }
    return '날짜를 선택해주세요';
  };

  return (
    <Container>
      <Label>대여옵션 (선택)</Label>
      <Wrapper>
        <Select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value=''>대여기간 선택</option>
          <option value='3박4일'>3박4일</option>
          <option value='5박6일'>5박6일</option>
        </Select>
        <Button onClick={toggleModal} disabled={!selectedPeriod}>
          <span>대여일정 선택</span>
          <Icon src={RentalSelectDateIcon} alt='대여일정 아이콘' />
        </Button>
      </Wrapper>

      {isModalOpen && (
        <ReusableModal2
          isOpen={isModalOpen}
          onClose={closeModal}
          width='100%'
          height='auto'
        >
          <ModalHeader>
            <ModalTitle>
              대여일정 - {getTotalDays() ? `${getTotalDays()}일` : ''}
            </ModalTitle>
          </ModalHeader>

          <SelectedBlock>
            <LabelBox>선택일정 (일정추가 선택사항)</LabelBox>
            <DateBox>
              {displaySelectedDates()}
              <IconWrapper>
                <MinusIconStyled onClick={handleMinus} />
                <PlusIconStyled onClick={handlePlus} />
              </IconWrapper>
            </DateBox>
          </SelectedBlock>

          <Pagination>
            <IconButton onClick={handlePrevMonth}>
              <FaChevronLeft />
            </IconButton>
            <CurrentMonth>{yearMonth.replace('-', '.')}월</CurrentMonth>
            <IconButton onClick={handleNextMonth}>
              <FaChevronRight />
            </IconButton>
          </Pagination>

          <CalendarContainer>
            {['일', '월', '화', '수', '목', '금', '토'].map((name, idx) => (
              <DayName key={idx} isWeekend={idx === 0 || idx === 6}>
                {name}
              </DayName>
            ))}
            {renderCalendar()}
          </CalendarContainer>

          <Notice>
            ※ 서비스 시작일 전에 받아보실 수 있게 발송해 드립니다.
          </Notice>
          <Notice>
            <br />※ 일정 선택 시 실제 이용일보다 하루 정도 여유 있게 신청하시는
            것을 추천드립니다.
          </Notice>

          <ButtonRow>
            <CancelButton onClick={closeModal}>취소</CancelButton>
            <ConfirmButton
              onClick={() => {
                console.log('선택된 날짜:', displaySelectedDates());
                closeModal();
              }}
            >
              선택완료
            </ConfirmButton>
          </ButtonRow>
        </ReusableModal2>
      )}

      {errorModalOpen && (
        <ReusableModal
          isOpen={errorModalOpen}
          onClose={closeErrorModal}
          title='알림'
          width='80%'
          height='200px'
        >
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </ReusableModal>
      )}
    </Container>
  );
};

export default RentalOptions;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 10px;
  display: block;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  flex: 1;
  padding: 20px 10px;
  border: 1px solid ${Theme.colors.black};
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  font-size: 16px;
  background-color: ${({ disabled }) =>
    disabled ? Theme.colors.gray3 : '#fff'};
  border: 1px solid ${Theme.colors.black};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 2px solid #e0e0e0;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalTitle = styled.h2`
  font-weight: 800;
  font-size: 16px;
  margin: 0;
`;

const SelectedBlock = styled.div`
  margin: 20px;
  animation: ${fadeIn} 0.3s ease;
`;

const LabelBox = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 10px;
`;

const DateBox = styled.div`
  border: 1px solid ${Theme.colors.black};
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  font-weight: 900;
  font-size: 14px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const MinusIconStyled = styled(FaMinus)`
  width: 20px;
  height: 20px;
  border: 1px solid ${Theme.colors.black};
  padding: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const PlusIconStyled = styled(FaPlus)`
  width: 20px;
  height: 20px;
  border: 1px solid ${Theme.colors.black};
  padding: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  animation: ${fadeIn} 0.3s ease;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const CurrentMonth = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 20px;
  text-align: center;
  animation: ${fadeIn} 0.3s ease;
`;

const DayName = styled.div<{ isWeekend: boolean }>`
  font-weight: bold;
  color: ${(props) => (props.isWeekend ? Theme.colors.gray1 : '#000')};
`;

const DayBox = styled.div<{
  selected: boolean;
  isBoundary: boolean;
  reserved: boolean;
  isWeekend: boolean;
  isSunday?: boolean;
}>`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid
    ${({ isBoundary, reserved, selected }) =>
      isBoundary
        ? Theme.colors.yellow
        : reserved
          ? Theme.colors.gray3
          : selected
            ? Theme.colors.yellow
            : Theme.colors.gray4};
  background-color: ${({ isBoundary, reserved, selected }) =>
    isBoundary
      ? '#fff'
      : reserved
        ? Theme.colors.gray3
        : selected
          ? Theme.colors.yellow
          : '#fff'};
  color: ${({ isBoundary, reserved, selected }) =>
    isBoundary
      ? Theme.colors.yellow
      : reserved
        ? '#fff'
        : selected
          ? '#fff'
          : '#000'};
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const EmptyDay = styled.div``;

const Notice = styled.p`
  margin: 0 20px;
  font-weight: 400;
  font-size: 14px;
  color: #999;
  animation: ${fadeIn} 0.3s ease;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease;
`;

const CancelButton = styled.button`
  flex: 1;
  height: 45px;
  border: none;
  background-color: #ccc;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  height: 45px;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(0.97);
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  animation: ${fadeIn} 0.3s ease;
`;
