import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import Button02 from './Button02';
import { SeasonToggle } from '../components/Home/FilterContainer';

type InputFieldProps = {
  label: string;
  id: string;
  type?: string;
  error?: { message: string };
  buttonLabel?: string;
  buttonColor?: 'yellow' | 'black';
  onButtonClick?: () => void;
  prefix?: string;
  prefixcontent?: string;
  as?: React.ElementType;
  isEmailField?: boolean;
  useToggle?: boolean;
  options?: string[];
  onSelectChange?: (value: string) => void;
  [key: string]: any;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      id,
      type = 'text',
      error,
      buttonLabel,
      buttonColor = 'yellow',
      onButtonClick,
      prefix,
      prefixcontent,
      as,
      isEmailField,
      useToggle = false,
      options,
      onSelectChange,
      ...rest
    },
    ref
  ) => {
    const [toggle, setToggle] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
      options ? options[0] : ''
    );

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(e.target.value);
      if (onSelectChange) {
        onSelectChange(e.target.value);
      }
    };

    return (
      <InputContainer>
        <Label htmlFor={id} $isEmpty={!label}>
          {label.split('(')[0] || '​'}
          {label.includes('(') && (
            <GrayText>{`(${label.split('(')[1]}`}</GrayText>
          )}
        </Label>

        <InputRow>
          {prefix && <PrefixText>{prefix}</PrefixText>}
          <InputWrapper>
            {prefixcontent && (
              <PrefixcontentText>{prefixcontent}</PrefixcontentText>
            )}
            {options ? (
              <Select
                id={id}
                value={selectedOption}
                onChange={handleSelectChange}
              >
                {options.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            ) : (
              <Input as={as} type={type} id={id} ref={ref} {...rest} />
            )}
            {buttonLabel && (
              <ButtonWrapper>
                <Button02 onClick={onButtonClick} color={buttonColor}>
                  {buttonLabel}
                </Button02>
              </ButtonWrapper>
            )}
            {useToggle && (
              <ToggleWrapper>
                <SeasonToggle
                  isActive={toggle}
                  toggle={() => setToggle(!toggle)}
                />
              </ToggleWrapper>
            )}
          </InputWrapper>
          {isEmailField && <AtSymbol>@</AtSymbol>}
          {isEmailField && (
            <InputWrapper>
              <EmailDropdown id={`${id}-domain`} defaultValue='naver.com'>
                <option value='gmail.com'>gmail.com</option>
                <option value='naver.com'>naver.com</option>
                <option value='daum.net'>daum.net</option>
              </EmailDropdown>
            </InputWrapper>
          )}
        </InputRow>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </InputContainer>
    );
  }
);

export default InputField;

// ✅ 스타일 정의
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const Label = styled.label<{ $isEmpty: boolean }>`
  margin-bottom: 10px;
  font-family: 'NanumSquare Neo OTF';
  font-size: 10px;
  font-weight: 700;
  line-height: 11.05px;
  text-align: left;
  visibility: ${({ $isEmpty }) => ($isEmpty ? 'hidden' : 'visible')};
`;

const GrayText = styled.span`
  padding-left: 3px;
  color: #888888; /* 고정된 회색 */
  font-size: 10px;
  line-height: 14px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
`;

const PrefixText = styled.span`
  margin-right: 10px;
  font-size: 16px;
  font-weight: 700;
  color: #000000; /* 고정된 검정색 */
`;

const PrefixcontentText = styled.span`
  margin-left: 10px;
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 13px;
  line-height: 14px;
  color: #000000;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #dddddd; /* 고정된 회색 */
  border-radius: 4px;
  height: 57px;
  overflow: hidden;
  flex: 1;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

const ToggleWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

const AtSymbol = styled.span`
  margin: 0 10px;
  font-size: 16px;
  color: #000000; /* 고정된 검정색 */
`;

const Input = styled.input`
  font-size: 16px;
  border: none;
  padding: 0 11px;
  flex: 1;
  height: 100%;
  width: 100%;
`;

/* 
  1) 블랙 테두리와 라운드 처리 
  2) 오른쪽에 아이콘을 배치하기 위해 padding 우측 여백 확보 
  3) 배경에 블랙 화살표 아이콘(다운 방향) 
  4) focus 시 outline 제거 & 테두리 검정색 유지
*/
const Select = styled.select`
  font-size: 16px;
  border: 1px solid #000000;
  border-radius: 4px;
  height: 57px;
  width: 100%;
  padding: 0 40px 0 16px; /* 오른쪽에 아이콘 들어갈 공간 확보 */
  color: #888888; /* 기본 폰트 색상(플레이스홀더 느낌) */
  appearance: none;
  background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D'10'%20height%3D'6'%20viewBox%3D'0%200%2010%206'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cpath%20d%3D'M0%200l5%206l5-6z'%20fill%3D'%23000'%20/%3E%3C/svg%3E")
    no-repeat right 16px center/10px 6px;
  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const ErrorMessage = styled.span`
  color: blue;
  font-size: 12px;
  margin-top: 5px;
`;

const EmailDropdown = styled.select`
  font-size: 16px;
  border: none;
  padding: 0 11px;
  flex: 1;
  height: 100%;
  background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D'10'%20height%3D'6'%20viewBox%3D'0%200%2010%206'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cpath%20d%3D'M0%200l5%206l5-6z'%20fill%3D'%23000'%20/%3E%3C/svg%3E")
    no-repeat right 16px center/10px 6px;
`;
