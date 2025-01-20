import React from 'react';
import styled from 'styled-components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
};

const ReusableModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = '376px',
  height = '360px',
}) => {
  if (!isOpen) return null;

  return (
    <StyledModal>
      <ModalContent width={width} height={height}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        <CloseButtonWrapper>
          <CloseButton onClick={onClose}>확인</CloseButton>
        </CloseButtonWrapper>
      </ModalContent>
    </StyledModal>
  );
};

export default ReusableModal;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 27px;
  z-index: 9999;
`;

const ModalContent = styled.div<{ width: string; height: string }>`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const ModalBody = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  max-height: 230px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid ${({ theme }) => theme.colors.gray0};
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray0};
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;
