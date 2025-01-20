import React from "react";
import styled from "styled-components";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const ReusableModal: React.FC<ModalProps> = ({
  isOpen,
  // onClose,
  title,
  children,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <StyledModal>
      <ModalContent>
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
        <ModalActions>{actions}</ModalActions>
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
  padding: 20px;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;
