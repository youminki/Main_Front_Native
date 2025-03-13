import React from 'react';
import styled from 'styled-components';

/**
 * 간단한 모달 컨테이너 컴포넌트
 * - 모달 외부 영역 클릭 시 닫힘
 * - 모달 내부는 children으로 원하는 UI를 자유롭게 구성
 */
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
};

const ReusableModal2: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width = '100%',
  height = '360px',
}) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 외부(배경) 클릭 시 닫기
    e.stopPropagation();
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 내부 클릭 시, 이벤트 버블링 방지
    e.stopPropagation();
  };

  return (
    <StyledModal onClick={handleBackgroundClick}>
      <ModalContent width={width} height={height} onClick={handleContentClick}>
        {children}
      </ModalContent>
    </StyledModal>
  );
};

export default ReusableModal2;

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

  z-index: 99999;
`;

const ModalContent = styled.div<{ width: string; height: string }>`
  background-color: #ffffff;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: 600px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 6px;
`;
