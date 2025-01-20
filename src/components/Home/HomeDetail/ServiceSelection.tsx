import React from "react";
import styled from "styled-components";
import Theme from "../../../styles/Theme";

type ServiceSelectionProps = {
  selectedService: string;
  setSelectedService: (service: string) => void;
};

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  selectedService,
  setSelectedService,
}) => {
  return (
    <ServiceContainer>
      <label>서비스 옵션 (선택)</label>
      <Select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">서비스 선택</option>
        <option value="rental">대여</option>
        <option value="purchase">구매</option>
      </Select>
    </ServiceContainer>
  );
};

export default ServiceSelection;

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 11px;
    color: ${Theme.colors.black};
    margin-bottom: 10px;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 57px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid ${Theme.colors.black};
  border-radius: 4px;
  background-color: ${Theme.colors.white};
  font-size: 14px;
  color: ${Theme.colors.black};

  &:focus {
    outline: none;
    border-color: ${Theme.colors.black || "#007bff"};
  }
`;
