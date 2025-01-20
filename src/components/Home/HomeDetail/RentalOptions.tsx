import React, { useState } from "react";
import styled from "styled-components";
import ReusableModal from "../../../components/ReusableModal";
import RentalSelectDateIcon from "../../../assets/Home/HomeDetail/RentalSelectDateIcon.svg";

type RentalOptionsProps = {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
};

const RentalOptions: React.FC<RentalOptionsProps> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    if (!selectedPeriod) {
      setIsModalOpen(true);
    }
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
        <Button onClick={toggleModal}>
          <span>대여일정 선택</span>
          <Icon src={RentalSelectDateIcon} alt="대여일정 아이콘" />
        </Button>
      </Wrapper>
      {isModalOpen && (
        <ReusableModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="알림"
        >
          <p>대여기간을 먼저 선택하신 후 설정할 수 있습니다.</p>
        </ReusableModal>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 54px;
`;

const Label = styled.label`
  font-family: "NanumSquare Neo OTF";
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
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
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 57px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f6ae24;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export default RentalOptions;
