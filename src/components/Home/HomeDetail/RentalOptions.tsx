import React, { useState } from "react";
import styled from "styled-components";
import ReusableModal from "../../../components/ReusableModal";
import RentalSelectDateIcon from "../../../assets/Home/HomeDetail/RentalSelectDateIcon.svg";
import Theme from "../../../styles/Theme";

const RentalOptions = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(""); // 대여 기간
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]); // 선택된 날짜
  const reservedDates = [22, 23, 24]; // 예약된 날짜

  const toggleModal = () => {
    if (selectedPeriod) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDates([]);
  };

  const handleDateClick = (day) => {
    if (!reservedDates.includes(day)) {
      const periodDays = selectedPeriod === "3박4일" ? 4 : 6; // 대여 옵션에 따른 기간 설정
      const newSelectedDates = Array.from(
        { length: periodDays },
        (_, i) => day + i
      ).filter((date) => date <= 31); // 31일까지만 선택 가능

      setSelectedDates(newSelectedDates);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = 31;
    const firstDay = 4; // 예시: 목요일 시작
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDay }, (_, i) => (
      <EmptyDay key={i} />
    ));

    return [
      ...emptyDays,
      ...days.map((day) => (
        <DayBox
          key={day}
          selected={selectedDates.includes(day)}
          reserved={reservedDates.includes(day)}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </DayBox>
      )),
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
          <option value="">대여기간 선택</option>
          <option value="3박4일">3박4일</option>
          <option value="5박6일">5박6일</option>
        </Select>
        <Button onClick={toggleModal} disabled={!selectedPeriod}>
          <span>대여일정 선택</span>
          <Icon src={RentalSelectDateIcon} alt="대여일정 아이콘" />
        </Button>
      </Wrapper>
      {isModalOpen && (
        <ReusableModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`대여일정 - ${selectedPeriod}`}
          actions={
            <>
              <CancelButton onClick={closeModal}>취소</CancelButton>
              <ConfirmButton
                onClick={() => {
                  console.log("선택된 날짜:", selectedDates);
                  closeModal();
                }}
              >
                선택완료
              </ConfirmButton>
            </>
          }
        >
          <CalendarContainer>
            {["일", "월", "화", "수", "목", "금", "토"].map((name, index) => (
              <DayName key={index} isWeekend={index === 0 || index === 6}>
                {name}
              </DayName>
            ))}
            {renderCalendar()}
          </CalendarContainer>
          <Notice>
            ※ 서비스 시작일 전에 받아보실 수 있게 발송해 드립니다.
            <br />※ 일정 선택시 이용하시는 실제 일자보다 하루정도 여유있게
            신청하시는 것을 추천 드립니다.
          </Notice>
        </ReusableModal>
      )}
    </Container>
  );
};

export default RentalOptions;

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Label = styled.label`
  font-family: "NanumSquare Neo OTF";
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
  padding: 10px;
  border: 1px solid ${Theme.colors.gray4};
  border-radius: 5px;
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  background-color: ${({ disabled }) =>
    disabled ? Theme.colors.gray3 : "#ffffff"};
  border: 1px solid ${Theme.colors.gray4};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const DayName = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${(props) => (props.isWeekend ? Theme.colors.gray1 : "black")};
`;

const EmptyDay = styled.div``;

const DayBox = styled.div`
  border: 1px solid
    ${(props) => (props.selected ? Theme.colors.yellow : Theme.colors.gray4)};
  background-color: ${(props) =>
    props.selected ? Theme.colors.yellow : "#fff"};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  width: 100%;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: "NanumSquare Neo OTF";
  font-weight: 800;
  font-size: 12px;
`;

const Notice = styled.p`
  margin-top: 20px;
  font-size: 12px;
  color: ${Theme.colors.gray1};
  line-height: 1.5;
`;

const CancelButton = styled.button`
  flex: 1;
  height: 45px;
  margin-right: 10px;
  border: none;
  background-color: #ccc;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  flex: 1;
  height: 45px;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
`;
