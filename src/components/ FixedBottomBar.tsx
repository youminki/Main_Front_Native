import React from 'react';
import styled from 'styled-components';

interface FixedBottomBarProps {
  text: string;
  color?: 'yellow' | 'black';
  onClick?: () => void;
}

const FixedBottomBar: React.FC<FixedBottomBarProps> = ({
  text,
  color = 'black',
  onClick,
}) => {
  return (
    <BottomBar>
      <SettleButton color={color} onClick={onClick}>
        {text}
      </SettleButton>
    </BottomBar>
  );
};

export default FixedBottomBar;

const BottomBar = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  max-width: 800px;
  background: #eeeeee;
  padding: 10px 0px 34px 0px;
  text-align: center;
`;

const SettleButton = styled.button<{ color: 'yellow' | 'black' }>`
  width: 90%;
  padding: 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ color }) =>
    color === 'yellow' ? '#FFD700' : 'black'};
  color: ${({ color }) => (color === 'yellow' ? 'black' : 'white')};
  border: none;
`;
