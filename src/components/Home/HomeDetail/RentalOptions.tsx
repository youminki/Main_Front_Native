import { useState } from "react";
import styled from "styled-components";
import ReusableModal from "../../../components/ReusableModal";
import RentalSelectDateIcon from "../../../assets/Home/HomeDetail/RentalSelectDateIcon.svg";

const RentalOptions = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<number[]>([]);

  const toggleModal = () => {
    if (selectedPeriod) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateClick = (day: number) => {
    setSelectedDates((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day].slice(-2)
    );
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
        <Button onClick={toggleModal} selected={!!selectedPeriod}>
          <span>대여일정 선택</span>
          <Icon src={RentalSelectDateIcon} alt="대여일정 아이콘" />
        </Button>
      </Wrapper>
      {isModalOpen && (
        <ReusableModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`대여일정 - ${selectedPeriod}`}
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
          <ModalActions>
            <CancelButton onClick={closeModal}>취소</CancelButton>
            <ConfirmButton
              onClick={() => {
                console.log("선택된 날짜:", selectedDates);
                closeModal();
              }}
            >
              선택완료
            </ConfirmButton>
          </ModalActions>
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
  margin-top: 54px;
`;

const Label = styled.label`
  font-family: "NanumSquare Neo OTF";
  font-weight: 700;
  font-size: 10px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  flex: 1;
  padding: 8px;
  height: 57px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button<{ selected: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 57px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ selected }) => (selected ? "#ffffff" : "#ccc")};
  color: ${({ selected }) => (selected ? "#000" : "#fff")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#f6f6f6" : "#d9a71b")};
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
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  flex: 1;
  height: 50px;
  margin-right: 10px;
  border: none;
  background-color: #ccc;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  flex: 1;
  height: 50px;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
`;
