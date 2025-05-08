import React from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';

export interface ServiceSelectionProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  selectedService,
  setSelectedService,
}) => {
  return (
    <ServiceContainer>
      <label>서비스 방식 (선택)</label>
      <Select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value=''>서비스 선택 (대여 or 구매)</option>
        <option value='rental'>대여</option>
        <option value='purchase' disabled>
          구매 (준비중)
        </option>
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
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 10px;
    display: block;
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
  font-size: 16px;
  color: ${Theme.colors.black};

  &:focus {
    outline: none;
    border-color: ${Theme.colors.black};
  }

  // disabled 상태 스타일링 (선택사항)
  option:disabled {
    color: ${Theme.colors.gray};
  }
`;
