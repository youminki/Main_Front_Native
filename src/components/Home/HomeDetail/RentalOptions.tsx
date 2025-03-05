import React, { useState } from 'react';
import styled from 'styled-components';
import ReusableModal2 from '../../../components/Home/HomeDetail/HomeDetailModal';
import ReusableModal from '../../../components/ReusableModal';
import RentalSelectDateIcon from '../../../assets/Home/HomeDetail/RentalSelectDateIcon.svg';
import Theme from '../../../styles/Theme';

interface DayBoxProps {
  selected: boolean;
  reserved: boolean;
  isWeekend: boolean;
  isSunday?: boolean; // 일요일 여부 추가
}
interface DayNameProps {
  isWeekend: boolean;
}

const RentalOptions: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<{
    [key: string]: number[];
  }>({});
  const [yearMonth, setYearMonth] = useState<string>('2025-01');
  const reservedDates = [22, 23, 24];
  const [isAddingDates, setIsAddingDates] = useState<boolean>(false);

  // 에러 모달 상태 (일요일 선택 시)
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const getYearMonthList = () => {
    const years = Array.from({ length: 5 }, (_, i) => 2025 + i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const yearMonthList: string[] = [];
    years.forEach((year) => {
      months.forEach((month) => {
        yearMonthList.push(`${year}-${String(month).padStart(2, '0')}`);
      });
    });
    return yearMonthList;
  };

  const toggleModal = () => {
    if (selectedPeriod) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // 필요시 선택 날짜 초기화: setSelectedDates({});
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };

  /**
   * 날짜 클릭 핸들러
   */
  const handleDateClick = (day: number) => {
    const currentDates = selectedDates[yearMonth] || [];
    if (!reservedDates.includes(day)) {
      if (isAddingDates) {
        // 일정 추가 모드: 첫 날짜 선택 후 바로 다음 날짜만 추가 가능
        if (currentDates.length === 0) {
          setSelectedDates((prev) => ({
            ...prev,
            [yearMonth]: [day],
          }));
        } else {
          const lastSelected = Math.max(...currentDates);
          if (day === lastSelected + 1) {
            setSelectedDates((prev) => ({
              ...prev,
              [yearMonth]: [...currentDates, day],
            }));
          }
        }
      } else {
        // 일반 모드: 선택된 기간에 맞춰 날짜 연속 선택 (3박4일: 4일, 5박6일: 6일)
        const periodDays = selectedPeriod === '3박4일' ? 4 : 6;
        const newSelectedDates = Array.from(
          { length: periodDays },
          (_, i) => day + i
        ).filter((date) => date <= getDaysInMonth());
        setSelectedDates((prev) => ({
          ...prev,
          [yearMonth]: newSelectedDates,
        }));
      }
    }
  };

  const getDaysInMonth = (): number => {
    const [year, month] = yearMonth.split('-').map(Number);
    return new Date(year, month, 0).getDate();
  };

  /**
   * 달력 렌더링 함수 (일요일 선택 시 에러 모달 띄움)
   */
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const [year, month] = yearMonth.split('-').map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, (_, i) => (
      <EmptyDay key={`empty-${i}`} />
    ));
    const currentDates = selectedDates[yearMonth] || [];

    return [
      ...emptyDays,
      ...days.map((day) => {
        const dayIndex = (firstDay + day - 1) % 7;
        const isSunday = dayIndex === 0; // 일요일
        const isWeekend = dayIndex === 0 || dayIndex === 6;
        return (
          <DayBox
            key={day}
            selected={currentDates.includes(day)}
            reserved={reservedDates.includes(day)}
            isWeekend={isWeekend}
            isSunday={isSunday}
            onClick={() => {
              if (isSunday) {
                // 일요일 선택 시 에러 모달 띄움
                setErrorModalOpen(true);
              } else {
                handleDateClick(day);
              }
            }}
          >
            {day}
          </DayBox>
        );
      }),
    ];
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
              대여일정 - {selectedPeriod.replace('박', '일').replace('일', '')}
            </ModalTitle>
          </ModalHeader>
          <MenuBar>
            <DropdownContainer>
              <DropdownLabel>일정선택</DropdownLabel>
              <Dropdown
                value={yearMonth}
                onChange={(e) => setYearMonth(e.target.value)}
              >
                {getYearMonthList().map((ym) => (
                  <option key={ym} value={ym}>
                    {ym.replace('-', '.')}월
                  </option>
                ))}
              </Dropdown>
            </DropdownContainer>
            <DropdownContainer>
              <DropdownLabel>일정추가 (선택)</DropdownLabel>
              <Dropdown
                value={isAddingDates ? '추가중' : '추가없음'}
                onChange={(e) => setIsAddingDates(e.target.value === '추가중')}
              >
                <option value='추가없음'>추가없음</option>
                <option value='추가중'>추가중</option>
              </Dropdown>
            </DropdownContainer>
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
            <br />※ 일정 선택시 이용하시는 실제 일자보다 하루정도 여유있게
            신청하시는 것을 추천 드립니다.
          </Notice>
          <ButtonRow>
            <CancelButton onClick={closeModal}>취소</CancelButton>
            <ConfirmButton
              onClick={() => {
                console.log('선택된 날짜:', selectedDates);
                closeModal();
              }}
            >
              선택완료
            </ConfirmButton>
          </ButtonRow>
        </ReusableModal2>
      )}

      {/* 에러 모달: 일요일 선택 시 */}
      {errorModalOpen && (
        <ReusableModal
          isOpen={errorModalOpen}
          onClose={closeErrorModal}
          title='경고'
          width='80%'
          height='200px'
        >
          <ErrorMessage>일요일은 선택할 수 없습니다</ErrorMessage>
        </ReusableModal>
      )}
    </Container>
  );
};

export default RentalOptions;

/* ============ 스타일 정의 ============ */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Label = styled.label`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border: 1px solid ${Theme.colors.gray4};
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button<{ disabled?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  background-color: ${({ disabled }) =>
    disabled ? Theme.colors.gray3 : '#ffffff'};
  border: 1px solid ${Theme.colors.gray4};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 2px solid #e0e0e0;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const DropdownContainer = styled.div`
  width: 45%;
`;

const DropdownLabel = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 5px;
`;

const Dropdown = styled.select`
  width: 100%;
  height: 50px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
  padding: 0 10px;
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
`;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 20px;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 13px;
  line-height: 13px;
  text-align: center;
`;

const DayName = styled.div<DayNameProps>`
  text-align: center;
  font-weight: bold;
  color: ${(props) => (props.isWeekend ? Theme.colors.gray1 : '#000')};
`;

const DayBox = styled.div<DayBoxProps>`
  border: 1px solid
    ${(props) =>
      props.isSunday
        ? Theme.colors.gray3
        : props.selected
          ? Theme.colors.yellow
          : props.isWeekend
            ? Theme.colors.gray3
            : Theme.colors.gray4};
  background-color: ${(props) =>
    props.isSunday
      ? Theme.colors.gray3
      : props.selected
        ? Theme.colors.yellow
        : '#fff'};
  color: ${(props) =>
    props.isSunday ? '#fff' : props.selected ? '#fff' : '#000'};
  width: 100%;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.isSunday ? 'default' : 'pointer')};
  font-family: 'NanumSquare Neo OTF';
  font-weight: 800;
  font-size: 12px;
`;

const EmptyDay = styled.div``;

const Notice = styled.p`
  margin: 0 20px;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 20px;
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
`;

const ErrorMessage = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
