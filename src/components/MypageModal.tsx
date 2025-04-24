// src/components/Home/MypageModal.tsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MypageBox from '../assets/MypageBox.svg';
import MystyleBox from '../assets/MystyleBox.svg';
import ReusableModal2 from '../components/ReusableModal2'; // 추가된 import

type MypageModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MypageModal: React.FC<MypageModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); // 로그아웃 모달 상태
  const navigate = useNavigate();

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

  // 로그아웃 버튼 클릭 시 로그아웃 모달 열기
  const handleLogoutOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoutModalOpen(true);
  };

  // 로그아웃 모달 내 "네" 버튼 클릭 시 로그아웃 로직 실행 후 /login 페이지로 이동
  const handleLogoutConfirm = () => {
    // 로그아웃 로직 (예: 인증 토큰 삭제 등)을 이곳에서 처리할 수 있음
    console.log('로그아웃 실행됨');
    setLogoutModalOpen(false);
    onClose();
    navigate('/login');
  };

  // MypageBox 클릭 시 /MyInfo로 이동
  const handleMyInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/MyInfo');
  };

  // MystyleBox 클릭 시 /MyStyle로 이동
  const handleMyStyleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/MyStyle');
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
              onClick={handleMyInfoClick}
            />
            <PlaceholderImage
              src={MystyleBox}
              alt='마이스타일 이미지'
              onClick={handleMyStyleClick}
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
          title={'알림'}
        >
          로그아웃을 하시겠습니까?
        </ReusableModal2>
      )}
    </>
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
  max-width: 1000px;
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

const ModalContentArea = styled.div`
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
  cursor: pointer;
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 56px;
  margin: 16px auto;
  background: #000000;
  color: #ffffff;

  font-weight: 800;
  font-size: 16px;
  line-height: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
