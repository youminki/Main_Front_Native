import React, { useState } from "react";
import styled from "styled-components";
import ReusableModal from "../../../components/ReusableModal";
import RentalSelectDateIcon from "../../../assets/Home/HomeDetail/RentalSelectDateIcon.svg";

const RentalOptions = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>(""); // 대여 기간
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<number[]>([]); // 선택된 날짜

  const toggleModal = () => {
    if (selectedPeriod) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDates([]); // 모달 닫을 때 선택된 날짜 초기화
  };

  const handleDateClick = (day: number) => {
    const periodDays = selectedPeriod === "3박4일" ? 4 : 5;

    // 선택된 날짜를 기준으로 대여 기간만큼 선택
    const newSelectedDates = Array.from(
      { length: periodDays },
      (_, i) => day + i
    ).filter((date) => date <= 31); // 최대 날짜는 31일까지만 포함

    setSelectedDates(newSelectedDates);
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
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <DayBox
                key={day}
                selected={selectedDates.includes(day)}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </DayBox>
            ))}
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
  padding: 8px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button<{ disabled: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#ffffff")};
  color: ${({ disabled }) => (disabled ? "#666" : "#000")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#f6f6f6")};
  }
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

const DayBox = styled.div<{ selected: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ selected }) => (selected ? "#f6ae24" : "#ccc")};
  background-color: ${({ selected }) => (selected ? "#f6ae24" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#e6951b" : "#eee")};
  }
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

const Notice = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 20px;
  line-height: 1.5;
`;
