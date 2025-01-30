// src/components/BottomBar.tsx
import React from 'react';
import styled from 'styled-components';
import ResetButton from '../../assets/ResetButton.png';

type BottomBarProps = {
  buttonText?: string;
  imageSrc?: string;
  onClick?: () => void;
};

const BottomBar: React.FC<BottomBarProps> = ({
  buttonText = '작성완료',
  imageSrc,
  onClick,
}) => {
  return (
    <BottomBarContainer>
      <CartButton>
        <CartImage src={imageSrc || ResetButton} alt='icon' />
      </CartButton>
      <OrderButton onClick={onClick}>{buttonText}</OrderButton>
    </BottomBarContainer>
  );
};

export default BottomBar;

const BottomBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 34px;

  background-color: ${({ theme }) => theme.colors.gray4};
`;

const CartButton = styled.button`
  width: 75px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.gray4};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 21px;
`;

const CartImage = styled.img``;

const OrderButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.yellow};
  border: none;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  margin-right: 11px;
`;
