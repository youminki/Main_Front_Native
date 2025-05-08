// src/components/Home/HomeDetail/RentalOptions.tsx
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { isSameDay, isAfter, isBefore } from 'date-fns';
import Holidays from 'date-holidays';
import ReusableModal2 from '../../../components/Home/HomeDetail/HomeDetailModal';
import ReusableModal from '../../../components/ReusableModal';
import RentalSelectDateIcon from '../../../assets/Home/HomeDetail/RentalSelectDateIcon.svg';
import 'react-datepicker/dist/react-datepicker.css';

// 한글 로케일 & 공휴일 설정
registerLocale('ko', ko);
const hd = new Holidays('KR');

// 공휴일·주말·선택일 스타일 지정
const GlobalStyle = createGlobalStyle`
  .day-holiday { color: red !important; }
  .day-sunday  { color: red !important; }
  
  .day-start, .day-end {
    background-color: #ffffff !important;
    color: #000000 !important;
    border: 1px solid #F6AE24 !important;
    
  }
  .day-between {
    background-color: #F6AE24 !important;
    color: #000000 !important;
  }
`;

const RentalOptions: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const minDays =
    selectedPeriod === '3박4일' ? 4 : selectedPeriod === '5박6일' ? 6 : 0;
  const maxDays = 10;

  const addDays = (d: Date, n: number) => {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  };

  const getTotalDays = (s: Date, e: Date) =>
    Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const formatDate = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
      d.getDate()
    ).padStart(2, '0')}`;

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && (start.getDay() === 0 || hd.isHoliday(start))) {
      setErrorMessage('시작일로 일요일과 공휴일은 선택할 수 없습니다!');
      setErrorModalOpen(true);
      return;
    }
    if (start && !end && minDays > 0) {
      const autoEnd = addDays(start, minDays - 1);
      setSelectedRange({ start, end: autoEnd });
      return;
    }
    if (end && (end.getDay() === 0 || hd.isHoliday(end))) {
      setErrorMessage('일요일과 공휴일은 종료일로 선택할 수 없습니다!');
      setErrorModalOpen(true);
      return;
    }
    if (start && end) {
      const total = getTotalDays(start, end);
      if (minDays && total < minDays) {
        setErrorMessage(
          selectedPeriod === '3박4일'
            ? '최소일정은 3박4일입니다.'
            : '최소일정은 5박6일입니다.'
        );
        setErrorModalOpen(true);
        return;
      }
      if (total > maxDays) {
        setErrorMessage('최대 10일까지 추가 가능합니다.');
        setErrorModalOpen(true);
        return;
      }
      setSelectedRange({ start, end });
    }
  };

  const handleConfirm = () => {
    const end = selectedRange.end;
    if (end && (end.getDay() === 0 || hd.isHoliday(end))) {
      setErrorMessage('종료일이 일요일 또는 공휴일일 수 없습니다!');
      setErrorModalOpen(true);
      return;
    }
    console.log('선택된 날짜:', selectedRange.start, selectedRange.end);
    setIsModalOpen(false);
  };

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
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            width='100%'
            height='auto'
          >
            <ModalWrapper>
              <ModalHeader>
                <ModalTitle>
                  대여일정 -{' '}
                  {selectedRange.start && selectedRange.end
                    ? `${getTotalDays(selectedRange.start, selectedRange.end)}일`
                    : '선택해주세요'}
                </ModalTitle>
              </ModalHeader>

              <ModalContent>
                <SelectedBlock>
                  <RangeBox>
                    {selectedRange.start && selectedRange.end ? (
                      <RangeText>
                        {`${formatDate(selectedRange.start)} ~ ${formatDate(selectedRange.end)}`}
                      </RangeText>
                    ) : (
                      <Placeholder>날짜를 선택해주세요</Placeholder>
                    )}
                    <IconWrapper>
                      <SquareIcon
                        onClick={() =>
                          selectedRange.start &&
                          selectedRange.end &&
                          setSelectedRange({
                            start: selectedRange.start,
                            end: addDays(selectedRange.end, -1),
                          })
                        }
                      >
                        <FaMinus />
                      </SquareIcon>
                      <SquareIcon
                        onClick={() =>
                          selectedRange.start &&
                          selectedRange.end &&
                          setSelectedRange({
                            start: selectedRange.start,
                            end: addDays(selectedRange.end, 1),
                          })
                        }
                      >
                        <FaPlus />
                      </SquareIcon>
                    </IconWrapper>
                  </RangeBox>
                </SelectedBlock>

                <CalendarContainer>
                  <DatePicker
                    locale='ko'
                    inline
                    monthsShown={2}
                    selectsRange
                    startDate={selectedRange.start}
                    endDate={selectedRange.end}
                    onChange={handleDateChange}
                    dayClassName={(date) => {
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
                      if (hd.isHoliday(date)) return 'day-holiday';
                      if (date.getDay() === 0) return 'day-sunday';
                      if (date.getDay() === 6) return 'day-saturday';
                      return '';
                    }}
                  />
                </CalendarContainer>

                <Notice>
                  ※ 서비스 시작일 전에 받아보실 수 있게 발송해 드립니다.
                </Notice>
                <Notice>
                  ※ 일정 선택 시 실제 이용일보다 하루 정도 여유 있게 신청하시는
                  것을 추천드립니다.
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
                  isOpen={errorModalOpen}
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

// Styled Components
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
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#aaa' : '#000')};
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

const SquareIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 20px;

  @media (min-width: 768px) {
    .react-datepicker__month-container {
      display: inline-block !important;
      float: none !important;
      margin: 0 8px;
      vertical-align: top;
    }
  }

  @media (max-width: 480px) {
    .react-datepicker__month-container {
      display: block !important;
      float: none !important;
      margin: 0 auto 8px;
    }
  }

  .react-datepicker__current-month {
    text-align: center;
    font-weight: 700;
    margin-bottom: 8px;
  }
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
