// src/components/.../RentalOptions.tsx
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { isSameDay, isAfter, isBefore, addDays as _addDays } from 'date-fns';
import Holidays from 'date-holidays';
import ReusableModal2 from '../../../components/Home/HomeDetail/HomeDetailModal';
import ReusableModal from '../../../components/ReusableModal';
import RentalSelectDateIcon from '../../../assets/Home/HomeDetail/RentalSelectDateIcon.svg';
import {
  getUnavailableDates,
  createRentalSchedule,
  RentalScheduleCreateRequest,
} from '../../../api/scedule/scedule';
import 'react-datepicker/dist/react-datepicker.css';

// 한국 로케일 & 공휴일 설정
registerLocale('ko', ko);
const hd = new Holidays('KR');

// 전역 스타일
const GlobalStyle = createGlobalStyle`
  .react-datepicker__day--outside-month { visibility: hidden !important; }
  .day-today { background-color: #FFA726 !important; color: #000 !important; }
  .day-holiday, .day-sunday { color: red !important; }
  .day-reserved { color: #ccc !important; }  /* 예약불가일을 회색(#ccc)으로 표시 */
  .day-start, .day-end {
    background: #fff !important; color: #000 !important;
    border: 1px solid #F6AE24 !important; border-radius: .25rem !important;
  }
  .day-between { background: #F6AE24 !important; color: #000 !important; }
  .day-blue { color: #000000 !important; }
`;

interface SquareIconProps {
  disabled?: boolean;
}
interface RentalOptionsProps {
  productId: number;
  selectedSize: string;
  selectedColor: string;
}

const RentalOptions: React.FC<RentalOptionsProps> = ({
  productId,
  selectedSize,
  selectedColor,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const minDays =
    selectedPeriod === '3박4일' ? 4 : selectedPeriod === '5박6일' ? 6 : 0;
  const maxDays = 10;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minSelectableDate = _addDays(today, 3);
  const getTotalDays = (s: Date, e: Date) =>
    Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const formatDate = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;

  // 서버에서 기존 예약 불가일 로드 (마지막 날짜에 +3일 추가)
  useEffect(() => {
    if (!productId || !selectedSize || !selectedColor) return;
    getUnavailableDates({
      productId,
      sizeLabel: selectedSize,
      color: selectedColor,
    })
      .then((list) => {
        // 기본 예약불가일
        const baseDates = list.map((d) => new Date(d));
        // 마지막 날짜 계산
        let extendedDates: Date[] = [];
        if (baseDates.length > 0) {
          const maxTime = Math.max(...baseDates.map((d) => d.getTime()));
          const maxDate = new Date(maxTime);
          // 마지막날 +1, +2, +3일 추가
          for (let i = 1; i <= 3; i++) {
            extendedDates.push(_addDays(maxDate, i));
          }
        }
        setReservedDates([...baseDates, ...extendedDates]);
      })
      .catch(console.error);
  }, [productId, selectedSize, selectedColor]);

  // 날짜 초이스핸들러
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start) {
      if (isBefore(start, minSelectableDate)) {
        setErrorMessage(
          '대여 시작일은 오늘 기준 3일 이후부터 선택 가능합니다.'
        );
        return setErrorModalOpen(true);
      }
      if (start.getDay() === 0 || hd.isHoliday(start)) {
        setErrorMessage('시작일로 일요일·공휴일은 선택할 수 없습니다!');
        return setErrorModalOpen(true);
      }
      if (reservedDates.some((d) => isSameDay(d, start))) {
        setErrorMessage('이미 예약된 날짜입니다.');
        return setErrorModalOpen(true);
      }
    }
    if (start && !end && minDays > 0) {
      const autoEnd = _addDays(start, minDays - 1);
      if (reservedDates.some((d) => isSameDay(d, autoEnd))) {
        setErrorMessage('자동 설정된 종료일이 예약된 날짜와 겹칩니다.');
        return setErrorModalOpen(true);
      }
      return setSelectedRange({ start, end: autoEnd });
    }
    if (start && end) {
      let newEnd = end;
      // 공휴일/일요일/예약일 건너뛰기
      while (
        newEnd.getDay() === 0 ||
        hd.isHoliday(newEnd) ||
        reservedDates.some((d) => isSameDay(d, newEnd))
      ) {
        newEnd = _addDays(newEnd, 1);
      }
      const total = getTotalDays(start, newEnd);
      if (minDays && total < minDays) {
        setErrorMessage(`최소 일정은 ${selectedPeriod} 입니다.`);
        return setErrorModalOpen(true);
      }
      if (total > maxDays) {
        setErrorMessage('최대 10일까지 추가 가능합니다.');
        return setErrorModalOpen(true);
      }
      setSelectedRange({ start, end: newEnd });
    }
  };

  // 빨간 날짜(예약불가/일요일/공휴일) 클릭 시 경고
  const handleDayClick = (e: React.MouseEvent) => {
    const t = e.target as HTMLElement;
    if (!t.classList.contains('react-datepicker__day')) return;
    if (
      t.classList.contains('day-reserved') ||
      t.classList.contains('day-holiday') ||
      t.classList.contains('day-sunday')
    ) {
      setErrorMessage('선택할 수 없는 날짜입니다.');
      setErrorModalOpen(true);
    }
  };

  // +/- 조절
  const adjustEnd = (delta: number) => {
    const { start, end } = selectedRange;
    if (!start || !end) return;
    const total = getTotalDays(start, end);
    if (total + delta < minDays || total + delta > maxDays) return;
    setSelectedRange({ start, end: _addDays(end, delta) });
  };

  // 선택완료 → 생성 + reservedDates에 추가
  const handleConfirm = async () => {
    const { start, end } = selectedRange;
    if (!start || !end) {
      setErrorMessage('날짜를 모두 선택해주세요.');
      return setErrorModalOpen(true);
    }
    if (end.getDay() === 0 || hd.isHoliday(end)) {
      setErrorMessage('종료일이 일요일 또는 공휴일일 수 없습니다!');
      return setErrorModalOpen(true);
    }
    const total = getTotalDays(start, end);
    if (minDays && total < minDays) {
      setErrorMessage(`최소 일정은 ${selectedPeriod} 입니다.`);
      return setErrorModalOpen(true);
    }
    if (total > maxDays) {
      setErrorMessage('최대 10일까지 추가 가능합니다.');
      return setErrorModalOpen(true);
    }

    const req: RentalScheduleCreateRequest = {
      productId,
      sizeLabel: selectedSize,
      color: selectedColor,
      startDate: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`,
      endDate: `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`,
      quantity: 1,
    };

    try {
      await createRentalSchedule(req);

      // 신규 예약 구간 전체 날짜를 reservedDates에 추가
      const newReserved: Date[] = [];
      for (let d = new Date(start); d <= end; d = _addDays(d, 1)) {
        newReserved.push(new Date(d));
      }
      setReservedDates((prev) => [...prev, ...newReserved]);

      setIsModalOpen(false);
    } catch (e) {
      setErrorMessage('스케줄 생성에 실패했습니다.');
      setErrorModalOpen(true);
    }
  };

  const currentTotal =
    selectedRange.start && selectedRange.end
      ? getTotalDays(selectedRange.start, selectedRange.end)
      : 0;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Label>대여옵션 (선택)</Label>
        <Wrapper>
          <Select
            value={selectedPeriod}
            onChange={(e) => {
              setSelectedPeriod(e.target.value);
              setSelectedRange({ start: null, end: null });
            }}
          >
            <option value=''>대여기간 선택</option>
            <option value='3박4일'>3박4일</option>
            <option value='5박6일'>5박6일</option>
          </Select>
          <Button
            disabled={!selectedPeriod}
            onClick={() => setIsModalOpen(true)}
          >
            <span>대여일정 선택</span>
            <Icon src={RentalSelectDateIcon} alt='달력 아이콘' />
          </Button>
        </Wrapper>

        {isModalOpen && (
          <ReusableModal2
            isOpen
            onClose={() => setIsModalOpen(false)}
            width='100%'
            height='auto'
          >
            <ModalWrapper>
              <ModalHeader>
                <ModalTitle>
                  대여일정 -{' '}
                  {selectedRange.start && selectedRange.end
                    ? `${currentTotal}일`
                    : '선택해주세요'}
                </ModalTitle>
              </ModalHeader>

              <ModalContent>
                <SelectedBlock>
                  <RangeBox>
                    {selectedRange.start && selectedRange.end ? (
                      <RangeText>{`${formatDate(selectedRange.start)} ~ ${formatDate(selectedRange.end)}`}</RangeText>
                    ) : (
                      <Placeholder>날짜를 선택해주세요</Placeholder>
                    )}
                    <IconWrapper>
                      <SquareIcon
                        disabled={currentTotal <= minDays}
                        onClick={() => adjustEnd(-1)}
                      >
                        <FaMinus />
                      </SquareIcon>
                      <SquareIcon
                        disabled={currentTotal >= maxDays}
                        onClick={() => adjustEnd(1)}
                      >
                        <FaPlus />
                      </SquareIcon>
                    </IconWrapper>
                  </RangeBox>
                </SelectedBlock>

                <CalendarContainer onClick={handleDayClick}>
                  <DatePicker
                    locale='ko'
                    inline
                    monthsShown={2}
                    selectsRange
                    startDate={selectedRange.start}
                    endDate={selectedRange.end}
                    onChange={handleDateChange}
                    dayClassName={(date) => {
                      if (isSameDay(date, today)) return 'day-today';
                      if (
                        selectedRange.start &&
                        isSameDay(date, selectedRange.start)
                      )
                        return 'day-start';
                      if (
                        selectedRange.end &&
                        isSameDay(date, selectedRange.end)
                      )
                        return 'day-end';
                      if (
                        selectedRange.start &&
                        selectedRange.end &&
                        isAfter(date, selectedRange.start) &&
                        isBefore(date, selectedRange.end)
                      )
                        return 'day-between';
                      if (reservedDates.some((d) => isSameDay(d, date)))
                        return 'day-reserved';
                      if (
                        isAfter(date, _addDays(minSelectableDate, -1)) &&
                        date.getDay() !== 0 &&
                        !hd.isHoliday(date)
                      )
                        return 'day-blue';
                      if (hd.isHoliday(date)) return 'day-holiday';
                      if (date.getDay() === 0) return 'day-sunday';
                      return '';
                    }}
                  />
                </CalendarContainer>

                <Legend>
                  <LegendItem>
                    <Dot color='#007bff' /> 대여 가능 날짜
                  </LegendItem>
                  <LegendItem>
                    <Dot color='red' /> 일요일·공휴일
                  </LegendItem>
                  <LegendItem>
                    <Dot color='#ccc' /> 예약 불가 날짜 (기존+마지막일+3일)
                  </LegendItem>
                  <LegendItem>
                    <Dot color='#FFA726' /> 오늘 기준 3일 이후부터 선택 가능
                  </LegendItem>
                </Legend>
                <Notice>
                  ※ 서비스 시작일 전에 받아보실 수 있게 발송해 드립니다.
                </Notice>
                <Notice>
                  ※ 일정 선택 시 하루 정도 여유 있게 신청을 권장드립니다.
                </Notice>
              </ModalContent>

              <ButtonRow>
                <CancelButton onClick={() => setIsModalOpen(false)}>
                  취소
                </CancelButton>
                <ConfirmButton onClick={handleConfirm}>선택완료</ConfirmButton>
              </ButtonRow>

              {errorModalOpen && (
                <ReusableModal
                  isOpen
                  onClose={() => setErrorModalOpen(false)}
                  title='알림'
                  width='80%'
                  height='200px'
                >
                  <ErrorMsg>{errorMessage}</ErrorMsg>
                </ReusableModal>
              )}
            </ModalWrapper>
          </ReusableModal2>
        )}
      </Container>
    </>
  );
};

export default RentalOptions;

// Styled Components (생략 없이 모두 포함)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;
const Label = styled.label`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Select = styled.select`
  flex: 1;
  padding: 20px 10px;
  border: 1px solid #000;
  border-radius: 5px;
  font-size: 16px;
`;
const Button = styled.button<{ disabled?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 16px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 4px;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  color: ${(p) => (p.disabled ? '#aaa' : '#000')};
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
`;
const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
`;
const ModalTitle = styled.h2`
  margin: 0;
  font-weight: 800;
  font-size: 18px;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;
const SelectedBlock = styled.div`
  padding: 0 20px;
  margin: 20px 0;
`;
const RangeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 16px;
`;
const RangeText = styled.span`
  font-size: 16px;
  font-weight: 700;
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const Placeholder = styled.span`
  font-size: 16px;
  color: #aaa;
`;
const IconWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
const SquareIcon = styled.div<SquareIconProps>`
  width: 32px;
  height: 32px;
  background: ${(p) => (p.disabled ? '#ccc' : '#000')};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(p) => (p.disabled ? 'none' : 'auto')};
`;
const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    .react-datepicker__month-container {
      display: inline-block !important;
      float: none !important;
      vertical-align: top;
    }
  }
  @media (max-width: 480px) {
    .react-datepicker__month-container {
      display: block !important;
      float: none !important;
    }
  }
  .react-datepicker__current-month {
    text-align: center;
    font-weight: 700;
    margin-bottom: 8px;
  }
`;
const Legend = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;
const LegendItem = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;
const Dot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(p) => p.color};
  display: inline-block;
`;
const Notice = styled.p`
  margin: 0 20px 8px;
  font-size: 12px;
  color: #666;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 10;
`;
const CancelButton = styled.button`
  flex: 1;
  height: 48px;
  background: #ccc;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
`;
const ConfirmButton = styled.button`
  flex: 1;
  height: 48px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
`;
const ErrorMsg = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
