// src/components/Home/MypageModal.tsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MypageBox from '../assets/MypageBox.svg';
import MystyleBox from '../assets/MystyleBox.svg';
import ReusableModal2 from '../components/ReusableModal';

type MypageModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MypageModal: React.FC<MypageModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isPlaceholderOpen, setPlaceholderOpen] = useState(false); // 추가
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleOverlayClick = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 400);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 로그아웃
  const handleLogoutOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoutModalOpen(true);
  };
  const handleLogoutConfirm = () => {
    console.log('로그아웃 실행됨');
    setLogoutModalOpen(false);
    onClose();
    navigate('/login');
  };

  // 아직 구현 전 모달 띄우기
  const handlePlaceholderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaceholderOpen(true);
  };
  const handlePlaceholderClose = () => {
    setPlaceholderOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={handleOverlayClick}>
        <ModalContainer onClick={handleModalClick} isClosing={isClosing}>
          <ModalHandle>
            <HandleBar />
          </ModalHandle>
          <ModalHeader>
            <Title>마이페이지</Title>
          </ModalHeader>
          <Divider />

          <ModalContentArea>
            <PlaceholderImage
              src={MypageBox}
              alt='마이페이지 이미지'
              onClick={handlePlaceholderClick}
            />
            <PlaceholderImage
              src={MystyleBox}
              alt='마이스타일 이미지'
              onClick={handlePlaceholderClick}
            />
          </ModalContentArea>
          <Divider />

          <LogoutButton onClick={handleLogoutOpen}>로그아웃</LogoutButton>
        </ModalContainer>
      </Overlay>

      {/* 로그아웃 확인 모달 */}
      {isLogoutModalOpen && (
        <ReusableModal2
          isOpen={isLogoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handleLogoutConfirm}
          title='알림'
        >
          로그아웃을 하시겠습니까?
        </ReusableModal2>
      )}

      {/* 아직 구현 전 알림 모달 */}
      {isPlaceholderOpen && (
        <ReusableModal2
          isOpen={isPlaceholderOpen}
          onClose={handlePlaceholderClose}
          title='준비 중입니다'
        >
          아직 구현 전인 기능이에요.
        </ReusableModal2>
      )}
    </>
  );
};

export default MypageModal;

// ──────────────────────────── 스타일 정의 ────────────────────────────

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
`;
const slideDown = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(100%); }
`;

interface ModalProps {
  isClosing: boolean;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 9999;
`;

const ModalContainer = styled.div<ModalProps>`
  width: 100%;
  max-width: 600px;
  min-height: 400px;
  padding: 40px;
  background: #fff;
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
  width: 40px;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
`;
const ModalHeader = styled.div`
  margin: 16px;
`;
const Title = styled.h2`
  font-size: 16px;
  font-weight: 800;
  margin: 0;
`;
const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background: #ddd;
  border: none;
  margin: 0;
`;

const ModalContentArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
`;
const PlaceholderImage = styled.img`
  width: auto;
  height: auto;
  object-fit: cover;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 56px;
  margin: 16px auto;
  background: #000;
  color: #fff;
  font-weight: 800;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
