// src/components/InputField.tsx
import React from 'react';
import styled from 'styled-components';
import Button02 from './Button02';

type InputFieldProps = {
  label: string;
  id: string;
  type: string;
  error?: { message: string };
  buttonLabel?: string;
  onButtonClick?: () => void;
  prefix?: string;
  as?: React.ElementType;
  isEmailField?: boolean;
  [key: string]: any;
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      id,
      type,
      error,
      buttonLabel,
      onButtonClick,
      prefix,
      as,
      isEmailField,
      ...rest
    },
    ref
  ) => (
    <InputContainer>
      <Label htmlFor={id} isEmpty={!label}>
        {label.split('(')[0] || '​'}
        {label.includes('(') && (
          <GrayText>{`(${label.split('(')[1]}`}</GrayText>
        )}
      </Label>
      {type === 'password' ? (
        <PasswordWrapper>
          <Input as={as} type={type} id={id} ref={ref} {...rest} />
        </PasswordWrapper>
      ) : (
        <InputRow>
          {prefix && <PrefixText>{prefix}</PrefixText>}
          <InputWrapper>
            <Input as={as} type={type} id={`${id}-local`} ref={ref} {...rest} />
            {buttonLabel && (
              <ButtonWrapper>
                <Button02 onClick={onButtonClick}>{buttonLabel}</Button02>
              </ButtonWrapper>
            )}
          </InputWrapper>
          {isEmailField && <AtSymbol>@</AtSymbol>}
          {isEmailField && (
            <InputWrapper>
              <EmailDropdown id={`${id}-domain`} defaultValue="naver.com">
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
              </EmailDropdown>
            </InputWrapper>
          )}
        </InputRow>
      )}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </InputContainer>
  )
);

InputField.displayName = 'InputField';

export default InputField;

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label<{ isEmpty: boolean }>`
  margin-bottom: 10px;
  font-family: 'NanumSquare Neo OTF';
  font-size: 10px;
  font-weight: 700;
  line-height: 11.05px;

  text-align: left;
  visibility: ${({ isEmpty }) => (isEmpty ? 'hidden' : 'visible')};
`;

const GrayText = styled.span`
  padding-left: 3px;
  color: ${({ theme }) => theme.colors.gray2};
  font-style: normal;
  font-weight: 400;
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
  color: ${({ theme }) => theme.colors.black};
`;

const AtSymbol = styled.span`
  margin: 0 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
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
  padding-right: 10px;
`;

const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  border-radius: 4px;
  height: 57px;
  overflow: hidden;
`;

const Input = styled.input`
  font-size: 16px;
  border: none;
  padding: 0 11px;
  flex: 1;
  height: 100%;
  width: 100%;

  &::placeholder {
    font-family: 'NanumSquare Neo OTF';
    font-size: 13px;

    font-weight: 400;
    line-height: 14.37px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
`;

const EmailDropdown = styled.select`
  font-size: 16px;
  border: none;
  padding: 0 11px;
  flex: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ErrorMessage = styled.span`
  color: blue;
  font-size: 12px;
  margin-top: 5px;
`;
