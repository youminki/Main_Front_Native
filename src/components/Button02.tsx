import React from 'react';
import styled from 'styled-components';

interface Button02Props {
  children: React.ReactNode;
  onClick?: () => void; // onClick은 선택적 속성으로 정의
}

const Button02: React.FC<Button02Props> = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button02;

const StyledButton = styled.button`
  min-width: 69px;
  min-height: 34px;
  background-color: #f6ae24;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  margin-right: 11px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e59c20;
  }

  &:active {
    background-color: #cc8c1c;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
