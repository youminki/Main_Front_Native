import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaChevronRight, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ReusableModal2 from '../components/ReusableModal2';

// 모달 타입 정의
type ModalType = 'profileImage' | 'nickname' | 'password' | null;

const MyinfoList: React.FC = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모달 초기화
  useEffect(() => {
    setInputValue('');
    setPreviewUrl('');
  }, [modalType]);

  // 메뉴 목록
  const items = [
    {
      label: '회원정보 조회',
      description: '',
      path: '/Myinfo',
    },
    {
      label: '비밀번호 변경',
      description: '',
      path: '/password-change',
    },
    {
      label: '멜픽주소 변경',
      description: '',
      path: '/password-change',
    },

    { label: '배송지 관리', grey: true },
    { label: '환불 계좌 관리', grey: true },
    { label: '알림 설정', grey: true },
  ];

  const handleConfirm = () => {
    if (modalType === 'profileImage')
      console.log('프로필 이미지 변경:', inputValue);
    if (modalType === 'nickname') console.log('닉네임 변경:', inputValue);
    if (modalType === 'password') console.log('비밀번호 변경:', inputValue);
    setModalType(null);
  };

  const renderModalContent = () => {
    if (modalType === 'profileImage') {
      return (
        <ModalBody>
          <AvatarSection onClick={() => fileInputRef.current?.click()}>
            {previewUrl ? (
              <AvatarImg src={previewUrl} alt='프리뷰' />
            ) : (
              <AvatarPlaceholder>
                <FaUserCircle />
              </AvatarPlaceholder>
            )}
            <CameraIcon>
              <FaCamera />
            </CameraIcon>
          </AvatarSection>
          <HiddenInput
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setInputValue(file.name);
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
          />
        </ModalBody>
      );
    }

    if (modalType === 'nickname') {
      return (
        <ModalBody>
          <FieldLabel>새 닉네임</FieldLabel>
          <Input
            type='text'
            value={inputValue}
            placeholder='닉네임을 입력해주세요'
            onChange={(e) => setInputValue(e.target.value)}
          />
        </ModalBody>
      );
    }

    if (modalType === 'password') {
      return (
        <ModalBody>
          <FieldLabel>새 비밀번호</FieldLabel>
          <Input
            type='password'
            value={inputValue}
            placeholder='비밀번호를 입력해주세요'
            onChange={(e) => setInputValue(e.target.value)}
          />
        </ModalBody>
      );
    }

    return null;
  };

  return (
    <>
      <Container>
        <Header>설정</Header>
        <ProfileSection>
          <AvatarIcon>
            <FaUserCircle />
          </AvatarIcon>
          <ProfileInfo>
            <Name>빙 천</Name>
            <UserId>ID: dbalsrl7648</UserId>
          </ProfileInfo>
        </ProfileSection>

        <ButtonRow>
          {/* 모달 그대로 쓰고 싶다면 남겨두세요 */}
          <ActionButton onClick={() => setModalType('profileImage')}>
            프로필 이미지 변경
          </ActionButton>
          <ActionButton onClick={() => setModalType('nickname')}>
            닉네임 변경
          </ActionButton>
        </ButtonRow>

        <List>
          {items.map((item, idx) => (
            <ListItem
              key={idx}
              grey={item.grey}
              onClick={() => !item.grey && item.path && navigate(item.path)}
            >
              <ItemBox>
                <ItemText>
                  <Title grey={item.grey}>{item.label}</Title>
                  {item.description && <Desc>{item.description}</Desc>}
                </ItemText>
                {!item.grey && (
                  <Chevron>
                    <FaChevronRight />
                  </Chevron>
                )}
              </ItemBox>
            </ListItem>
          ))}
        </List>
      </Container>

      <ReusableModal2
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        onConfirm={handleConfirm}
        title={
          modalType === 'profileImage'
            ? '프로필 이미지 변경'
            : modalType === 'nickname'
              ? '닉네임 변경'
              : '비밀번호 변경'
        }
      >
        {renderModalContent()}
      </ReusableModal2>
    </>
  );
};

export default MyinfoList;

// Styled Components (생략 없이 포함)
const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 16px;
  background: #fff;
`;
const Header = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
`;
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
const AvatarIcon = styled.div`
  font-size: 56px;
  color: #ccc;
`;
const ProfileInfo = styled.div`
  margin-left: 16px;
`;
const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;
const UserId = styled.p`
  font-size: 14px;
  color: #666;
  margin: 4px 0 0;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;
const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 15px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ListItem = styled.div<{ grey?: boolean }>`
  padding: 12px;
  border-radius: 6px;
  background: ${({ grey }) => (grey ? '#f9f9f9' : '#fff')};
  border: 1px solid ${({ grey }) => (grey ? '#eee' : '#ddd')};
  cursor: ${({ grey }) => (grey ? 'default' : 'pointer')};
`;
const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ItemText = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span<{ grey?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ grey }) => (grey ? '#aaa' : '#333')};
`;
const Desc = styled.span`
  font-size: 13px;
  color: #888;
  margin-top: 4px;
`;
const Chevron = styled.div`
  font-size: 16px;
  color: #bbb;
`;
const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AvatarSection = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
  cursor: pointer;
`;
const AvatarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #999;
  border: 2px dashed #ccc;
`;
const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
`;
const CameraIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px;
  border-radius: 50%;
  color: #fff;
`;
const HiddenInput = styled.input`
  display: none;
`;
const FieldLabel = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
  align-self: flex-start;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;
