// src/components/Home/MypageModal.tsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import MypageBox from '../assets/MypageBox.svg';
import MystyleBox from '../assets/MystyleBox.svg';

type MypageModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MypageModal: React.FC<MypageModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  // 모달이 열릴 때 isClosing 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  // 오버레이 클릭 시 slideDown 애니메이션 후 모달 닫힘
  const handleOverlayClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400); // 애니메이션 지속시간과 동일 (0.4초)
  };

  // 모달 내부 클릭 시 이벤트 전파 중단
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer onClick={handleModalClick} isClosing={isClosing}>
        <ModalHandle>
          <HandleBar />
        </ModalHandle>
        <ModalHeader>
          <Title>마이페이지</Title>
        </ModalHeader>
        <Divider />

        <ModalContent>
          <PlaceholderImage src={MypageBox} alt='임시 이미지1' />
          <PlaceholderImage src={MystyleBox} alt='임시 이미지2' />
        </ModalContent>
        <Divider />

        <LogoutButton onClick={handleOverlayClick}>로그아웃</LogoutButton>
      </ModalContainer>
    </Overlay>
  );
};

export default MypageModal;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

interface ModalProps {
  isClosing: boolean;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: flex-end;

  z-index: 9999;
`;

const ModalContainer = styled.div<ModalProps>`
  max-width: 600px;
  width: 100%;
  min-height: 400px;
  padding: 40px;

  background: #ffffff;
  border-radius: 20px 20px 0 0;

  display: flex;
  flex-direction: column;
  position: relative;

  animation: ${({ isClosing }) =>
    isClosing
      ? css`
          ${slideDown} 0.4s ease-out forwards
        `
      : css`
          ${slideUp} 0.4s ease-out forwards
        `};
`;

const ModalHandle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const HandleBar = styled.div`
  position: fixed;
  top: 6px;
  width: 40px;
  height: 4px;
  background: #dddddd;
  border-radius: 2px;
`;

const ModalHeader = styled.div`
  margin: 16px;
`;

const Title = styled.h2`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  color: #000;
  margin: 0;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background: #dddddd;
  border: none;
  margin: 0;
`;

const ModalContent = styled.div`
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
`;

const PlaceholderImage = styled.img`
  width: auto;
  height: auto;
  object-fit: cover;
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 56px;
  margin: 16px auto;
  background: #000000;
  color: #ffffff;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
