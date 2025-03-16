import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Button02Props {
  children: React.ReactNode;
  onClick?: () => void;
  // 기본 노란색, 성공 시 파란색, 실패 시 빨간색
  color: 'yellow' | 'blue' | 'red';
}

const Button02: React.FC<Button02Props> = ({ children, onClick, color }) => {
  return (
    <StyledButton onClick={onClick} color={color}>
      {children}
    </StyledButton>
  );
};

export default Button02;

const pressAnimation = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

const StyledButton = styled.button<{ color: 'yellow' | 'blue' | 'red' }>`
  min-width: 69px;
  min-height: 34px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-weight: 800;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
  margin-right: 11px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  ${({ color }) =>
    color === 'yellow'
      ? css`
          background-color: #f6ae24;
          &:hover {
            background-color: #e59c20;
          }
          &:active {
            background-color: #cc8c1c;
            animation: ${pressAnimation} 0.2s ease;
          }
        `
      : color === 'blue'
        ? css`
            background-color: #007bff;
            &:hover {
              background-color: #0069d9;
            }
            &:active {
              background-color: #005cbf;
              animation: ${pressAnimation} 0.2s ease;
            }
          `
        : css`
            background-color: #ff4d4d;
            &:hover {
              background-color: #ff3333;
            }
            &:active {
              background-color: #cc2929;
              animation: ${pressAnimation} 0.2s ease;
            }
          `}

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
