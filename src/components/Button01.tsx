import React from 'react';
import styled from 'styled-components';

interface Button01Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button01: React.FC<Button01Props> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default Button01;

const StyledButton = styled.button`
  width: 100%;
  height: 56px;
  padding: 15px;

  font-size: 16px;
  font-weight: 800;
  line-height: 17.68px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  /* 색상 하드코딩 */
  color: #ffffff; /* white */
  background-color: #f6ae24; /* yellow */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #ffc947; /* hover yellow (원하는 값으로 조정) */
    transform: translateY(-2px);
  }

  &:active {
    background-color: #d99a1e; /* active yellow (원하는 값으로 조정) */
    transform: translateY(0);
  }

  &:disabled {
    background-color: #cccccc; /* gray2 */
    cursor: not-allowed;
    transform: none;
  }
`;
