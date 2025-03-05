import React, { useState } from 'react';
import styled from 'styled-components';
import Theme from '../../../styles/Theme';

const PaymentMethod: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('12');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <PaymentMethodContainer>
      <PaymentMethodText>결제방식 (선택)</PaymentMethodText>
      <InstallmentOptions>
        <NowOptionWrapper onClick={() => handleOptionClick('NOW')}>
          <NowOption active={selectedOption === 'NOW'}>
            {selectedOption === 'NOW' && <Circle />}
            <OptionText>NOW</OptionText>
          </NowOption>
        </NowOptionWrapper>
        <OptionContainer>
          {['6', '12', '18', '24', '36'].map((option) => (
            <OptionWrapper
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              <Option active={selectedOption === option}>
                {selectedOption === option && <Circle />}
                <OptionText>{option}</OptionText>
              </Option>
            </OptionWrapper>
          ))}
        </OptionContainer>
      </InstallmentOptions>
    </PaymentMethodContainer>
  );
};

export default PaymentMethod;

const PaymentMethodContainer = styled.div`
  margin-top: 54px;
  margin-bottom: 24px;
`;

const PaymentMethodText = styled.div`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 11px;
  /* identical to box height */

  color: #000000;
  margin-bottom: 10px;
`;

const InstallmentOptions = styled.div`
  display: flex;
  align-items: center;
`;

const NowOptionWrapper = styled.div`
  position: relative;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const NowOption = styled.div<{ active: boolean }>`
  padding: 0px 20px;
  color: ${Theme.colors.black};
  background-color: ${Theme.colors.gray3};
  border: 1px solid ${Theme.colors.gray1};
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border-radius: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  background-color: ${Theme.colors.gray3};
  border: 1px solid ${Theme.colors.gray1};
  border-radius: 50px;
  height: 30px;
  width: 100%;
  position: relative;
`;

const OptionWrapper = styled.div`
  position: relative;
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Option = styled.div<{ active: boolean }>`
  padding: 10px;
  color: ${Theme.colors.black};
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const OptionText = styled.div`
  position: relative;
  z-index: 2;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 15px;
  text-align: center;

  color: ${Theme.colors.black};
`;

const Circle = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border: 5px solid ${Theme.colors.yellow};
  background-color: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
