import React from 'react';
import styled from 'styled-components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const ReusableModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <Container>
      <Background onClick={onClose} />
      <Box>
        {title && <Title>{title}</Title>}
        <Separator />
        <Content>{children}</Content>
        <Actions>
          <Button onClick={onClose}>아니요</Button>
          {actions}
        </Actions>
      </Box>
    </Container>
  );
};

export default ReusableModal;

const Container = styled.div`
  position: absolute;
  width: 430px;
  height: 932px;
  left: 0px;
  top: 0px;
`;

const Background = styled.div`
  position: absolute;
  width: 430px;
  height: 932px;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Box = styled.div`
  position: absolute;
  width: 376px;
  height: 329px;
  left: 27px;
  top: 288px;
  background: #ffffff;
  border-radius: 12px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Separator = styled.div`
  position: absolute;
  width: 336px;
  height: 1px;
  left: 20px;
  top: 80px;
  background: #eeeeee;
`;

const Content = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #333;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #e0e0e0;
  color: #333;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d6d6d6;
  }

  &:last-child {
    background-color: #000;
    color: #fff;

    &:hover {
      background-color: #333;
    }
  }
`;
