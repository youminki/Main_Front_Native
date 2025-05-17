// src/components/InputField.tsx
import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import Button02 from './Button02';
import { CustomSelect } from './CustomSelect';

type InputFieldProps = {
  label: string;
  id: string;
  type?: string;
  error?: { message: string };
  buttonLabel?: string;
  buttonColor?: 'yellow' | 'blue' | 'red';
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prefix?: string;
  prefixcontent?: string | React.ReactNode;
  suffixcontent?: string | React.ReactNode; // suffixcontent prop 추가
  as?: React.ElementType;
  useToggle?: boolean;
  options?: string[];
  onSelectChange?: (value: string) => void;
  readOnly?: boolean;
  [key: string]: any;
  disabledOptions?: string[];
};

function parsePrefixContent(content: string) {
  const tokens = content.split(/(해당없음|\(.*?\)|\|)/g);
  let applyGray = false;
  return tokens.map((token, i) => {
    if (token === '|') {
      applyGray = true;
      return <GraySpan key={i}>{token}</GraySpan>;
    }
    if (applyGray) {
      return <GraySpan key={i}>{token}</GraySpan>;
    }
    if (
      (token.startsWith('(') && token.endsWith(')')) ||
      token === '해당없음'
    ) {
      return <GraySpan key={i}>{token}</GraySpan>;
    }
    return <React.Fragment key={i}>{token}</React.Fragment>;
  });
}

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
      suffixcontent, // 비구조화
      as,
      useToggle = false,
      options,
      onSelectChange,
      readOnly = false,
      disabledOptions = [],
      ...rest
    },
    ref
  ) => {
    const [selectedOption, setSelectedOption] = useState<string>(
      options && options.length > 0 ? options[0] : ''
    );

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      setSelectedOption(val);
      onSelectChange?.(val);
    };

    const renderPrefixContent = () => {
      if (!prefixcontent) return null;
      if (typeof prefixcontent === 'string') {
        return (
          <PrefixContentText>
            {parsePrefixContent(prefixcontent)}
          </PrefixContentText>
        );
      }
      return <PrefixContentText>{prefixcontent}</PrefixContentText>;
    };

    const renderSuffixContent = () => {
      if (!suffixcontent) return null;
      return <SuffixContentText>{suffixcontent}</SuffixContentText>;
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
            {prefixcontent && renderPrefixContent()}

            {options ? (
              <CustomSelect
                id={id}
                value={selectedOption}
                onChange={handleSelectChange}
                disabled={readOnly}
                {...rest}
              >
                {options.map((option: string) => (
                  <option
                    key={option}
                    value={option}
                    disabled={disabledOptions.includes(option)}
                  >
                    {option}
                  </option>
                ))}
              </CustomSelect>
            ) : (
              <Input
                as={as}
                type={type}
                id={id}
                ref={ref}
                disabled={readOnly}
                {...rest}
              />
            )}

            {suffixcontent && renderSuffixContent()}

            {buttonLabel && onButtonClick && (
              <ButtonWrapper>
                <Button02 onClick={onButtonClick} color={buttonColor}>
                  {buttonLabel}
                </Button02>
              </ButtonWrapper>
            )}

            {useToggle && <ToggleWrapper />}
          </InputWrapper>
        </InputRow>

        <ErrorContainer>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </ErrorContainer>
      </InputContainer>
    );
  }
);

export default InputField;

// Styled Components

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label<{ $isEmpty: boolean }>`
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 700;
  visibility: ${({ $isEmpty }) => ($isEmpty ? 'hidden' : 'visible')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const GrayText = styled.span`
  padding-left: 3px;
  color: #888888;
  font-size: 12px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
`;

const PrefixText = styled.span`
  margin-right: 10px;
  font-size: 16px;
  font-weight: 700;
  color: #000000;
`;

const PrefixContentText = styled.span`
  margin-left: 10px;
  font-weight: 800;
  font-size: 13px;
  color: #000000;
`;

const SuffixContentText = styled.span`
  margin-left: auto; /* 우측 정렬 */
  margin-right: 10px;
  font-size: 13px;
  color: #999999; /* 회색 */
`;

const GraySpan = styled.span`
  color: #999999;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #dddddd;
  border-radius: 4px;
  height: 57px;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  height: 100%;
`;

const ToggleWrapper = styled.div`
  position: absolute;
  right: 40px;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  padding: 0 11px;
  font-size: 13px;
  background-color: white;
  color: #000000;

  &:disabled {
    color: #999999;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

const ErrorContainer = styled.div`
  min-height: 18px;
  margin-top: 6px;
  margin-left: 4px;
`;

const ErrorMessage = styled.span`
  color: blue;
  font-size: 12px;
`;
