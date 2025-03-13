import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ReusableModal2 from '../../../components/Home/HomeDetail/HomeDetailModal';
import ReusableModal from '../../../components/ReusableModal';
import RentalSelectDateIcon from '../../../assets/Home/HomeDetail/RentalSelectDateIcon.svg';
import Theme from '../../../styles/Theme';

interface DayBoxProps {
  selected: boolean;
  isBoundary: boolean; // 선택 범위의 시작 또는 끝(경계)
  reserved: boolean;
  isWeekend: boolean;
  isSunday?: boolean;
}
interface DayNameProps {
  isWeekend: boolean;
}

const RentalOptions: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 선택된 날짜 범위를 관리 (start와 end)
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  // 현재 모달에 표시되는 연월 (예: "2025-03")
  const [yearMonth, setYearMonth] = useState<string>('');
  // 추가된 일수를 관리 (기본 블록 외 추가된 일수)
  const [extraDays, setExtraDays] = useState<number>(0);
  // 에러 모달 (일요일이 시작 또는 마지막으로 선택된 경우)
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  /**
   * 현재 날짜 기준 시즌에 해당하는 연월 배열 반환
   * 봄: 3,4,5 / 여름: 6,7,8 / 가을: 9,10,11 / 겨울: 12,1,2
   */
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

  // 모달 오픈 시 시즌 내 기본 연월, 선택범위, 추가일수 초기화
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
      setExtraDays(0);
    }
  }, [isModalOpen]);

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

  // 날짜에 days를 더한 새 Date 반환
  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Date를 "YYYY.MM.DD" 형식으로 변환
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  /**
   * 초기 캘린더에서 날짜 클릭 시
   * - 클릭한 날짜가 일요일이면 에러 모달을 띄워 선택 불가 처리
   * - 선택된 대여기간(3박4일: 4일, 5박6일: 6일)에 따라 연속 날짜 블록 선택
   * - 선택 범위의 시작은 일요일이 될 수 없음
   */
  const handleDateClick = (day: number) => {
    const [year, month] = yearMonth.split('-').map(Number);
    const clickedDate = new Date(year, month - 1, day);
    if (clickedDate.getDay() === 0) {
      setErrorModalOpen(true);
      return;
    }
    const blockLength = selectedPeriod === '3박4일' ? 4 : 6;
    const baseEnd = addDays(clickedDate, blockLength - 1);
    // 만약 시작이나 기본 끝이 일요일이면 에러 처리
    if (clickedDate.getDay() === 0 || baseEnd.getDay() === 0) {
      setErrorModalOpen(true);
      return;
    }
    setSelectedRange({ start: clickedDate, end: baseEnd });
    setExtraDays(0);
  };

  /**
   * 추가 버튼 동작
   * - 1일, 2일, 3일 추가 버튼을 통해 선택 범위를 확장하며, 이전 추가 상태를 덮어씀
   * - 추가 시 새로 계산된 마지막 날짜가 일요일이면 에러 모달을 띄워 추가 불가 처리
   */
  const handleAddDays = (daysToAdd: number) => {
    if (!selectedRange.start) return;
    const blockLength = selectedPeriod === '3박4일' ? 4 : 6;
    const newEnd = addDays(selectedRange.start, blockLength - 1 + daysToAdd);
    if (newEnd.getDay() === 0) {
      setErrorModalOpen(true);
      return;
    }
    setSelectedRange({ ...selectedRange, end: newEnd });
    setExtraDays(daysToAdd);
  };

  // 페이지네이션: 시즌 내에서 이전/다음 연월 이동
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

  /**
   * 현재 연월 캘린더 렌더링
   * - 기본적으로 일요일은 예약(회색) 처리됨
   * - 선택 범위에 포함되면 노란색으로 표시
   * - 범위의 시작 또는 끝(경계)이 일요일이면 선택 처리되지 않고 예약(회색)으로 표시함
   * - 단, 선택 범위의 중간에 포함된 일요일은 노란색(선택)으로 표시
   */
  const renderCalendar = () => {
    const [year, month] = yearMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, (_, i) => (
      <EmptyDay key={`empty-${i}`} />
    ));
    return [
      ...emptyDays,
      ...days.map((day) => {
        const currentDate = new Date(year, month - 1, day);
        const dayOfWeek = currentDate.getDay();
        const isSunday = dayOfWeek === 0;
        const isWeekend = isSunday || dayOfWeek === 6;
        const isInRange =
          selectedRange.start &&
          selectedRange.end &&
          currentDate >= selectedRange.start &&
          currentDate <= selectedRange.end;
        let isSelected = isInRange;
        let isBoundary = false;
        if (isInRange) {
          const isStart =
            currentDate.getTime() === selectedRange.start!.getTime();
          const isEnd = currentDate.getTime() === selectedRange.end!.getTime();
          if ((isStart || isEnd) && currentDate.getDay() !== 0) {
            isBoundary = true;
          }
          // 경계가 일요일이면 선택 처리하지 않음
          if ((isStart || isEnd) && currentDate.getDay() === 0) {
            isSelected = false;
          }
        }
        // 기본적으로 일요일은 선택되지 않으면 예약(회색) 처리
        const reserved = isSunday && !isSelected;
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

  // 선택된 날짜 범위를 "YYYY.MM.DD ~ YYYY.MM.DD" 형식으로 표시
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
            <ModalTitle>대여일정</ModalTitle>
            <SelectedDatesDisplay>
              선택된 날짜: {displaySelectedDates()}
            </SelectedDatesDisplay>
            <Pagination>
              <PageButton onClick={handlePrevMonth}>이전</PageButton>
              <CurrentMonth>{yearMonth.replace('-', '.')}월</CurrentMonth>
              <PageButton onClick={handleNextMonth}>다음</PageButton>
            </Pagination>
          </ModalHeader>
          <MenuBar>
            <ButtonGroup>
              <AdditionalButton onClick={() => handleAddDays(1)}>
                1일추가하기
              </AdditionalButton>
              <AdditionalButton onClick={() => handleAddDays(2)}>
                2일추가하기
              </AdditionalButton>
              <AdditionalButton onClick={() => handleAddDays(3)}>
                3일추가하기
              </AdditionalButton>
            </ButtonGroup>
          </MenuBar>
          <CalendarContainer>
            {['일', '월', '화', '수', '목', '금', '토'].map((name, index) => (
              <DayName key={index} isWeekend={index === 0 || index === 6}>
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
          title='경고'
          width='80%'
          height='200px'
        >
          <ErrorMessage>
            일요일은 시작, 마지막 요일에 선택할 수 없습니다!
          </ErrorMessage>
        </ReusableModal>
      )}
    </Container>
  );
};

export default RentalOptions;

/* ============ 스타일 정의 ============ */

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
  transition: all 0.3s ease;
`;

const Button = styled.button<{ disabled?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  font-size: 16px;
  background-color: ${({ disabled }) =>
    disabled ? Theme.colors.gray3 : '#ffffff'};
  border: 1px solid ${Theme.colors.black};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 2px solid #e0e0e0;
  text-align: center;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const SelectedDatesDisplay = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  animation: ${fadeIn} 0.3s ease;
`;

const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  animation: ${fadeIn} 0.3s ease;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  border: 1px solid ${Theme.colors.black};
  background: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const CurrentMonth = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const AdditionalButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${Theme.colors.black};
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 20px;
  font-weight: 800;
  font-size: 13px;
  line-height: 13px;
  text-align: center;
  animation: ${fadeIn} 0.3s ease;
`;

const DayName = styled.div<DayNameProps>`
  text-align: center;
  font-weight: bold;
  color: ${(props) => (props.isWeekend ? Theme.colors.gray1 : '#000')};
  transition: color 0.3s ease;
`;

const DayBox = styled.div<DayBoxProps>`
  width: 100%;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 800;
  font-size: 12px;
  border: 1px solid
    ${(props) =>
      props.isBoundary
        ? Theme.colors.yellow
        : props.reserved
          ? Theme.colors.gray3
          : props.selected
            ? Theme.colors.yellow
            : Theme.colors.gray4};
  background-color: ${(props) =>
    props.isBoundary
      ? '#fff'
      : props.reserved
        ? Theme.colors.gray3
        : props.selected
          ? Theme.colors.yellow
          : '#fff'};
  color: ${(props) =>
    props.isBoundary
      ? Theme.colors.yellow
      : props.reserved
        ? '#fff'
        : props.selected
          ? '#fff'
          : '#000'};
  transition: all 0.3s ease;
`;

const EmptyDay = styled.div``;

const Notice = styled.p`
  margin: 0 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #999999;
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
  transition: background-color 0.3s ease;
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
  transition: background-color 0.3s ease;
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  animation: ${fadeIn} 0.3s ease;
`;
