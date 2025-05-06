import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaCamera, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ReusableModal2 from '../components/ReusableModal2';

type ModalType = 'profileImage' | 'nickname' | 'password' | 'melpick' | null;

interface ListItemData {
  label: string;
  type?: ModalType;
  grey?: boolean;
  action?: () => void;
}

const MyinfoList: React.FC = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<ModalType>(null);

  // 프로필 이미지
  const [profileFileName, setProfileFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 닉네임
  const [newNickname, setNewNickname] = useState('');

  // 비밀번호 변경
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  // 멜픽 주소 변경
  const currentMelpick = 'dbalsrl7648'; // TODO: API로 fetch
  const [newMelpick, setNewMelpick] = useState('');

  useEffect(() => {
    // 모달 열릴 때마다 초기화
    setProfileFileName('');
    setPreviewUrl('');
    setNewNickname('');
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setNewMelpick('');
  }, [modalType]);

  const handleConfirm = () => {
    if (modalType === 'profileImage') {
      console.log('프로필 이미지 변경:', profileFileName);
    } else if (modalType === 'nickname') {
      console.log('닉네임 변경:', newNickname);
    } else if (modalType === 'password') {
      console.log('현재 비밀번호:', currentPw);
      console.log('새 비밀번호:', newPw);
      console.log('비밀번호 확인:', confirmPw);
    } else if (modalType === 'melpick') {
      console.log('새 멜픽 주소:', newMelpick);
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'profileImage':
        return (
          <ContentWrapper>
            <FieldGroup>
              <AvatarSection onClick={() => fileInputRef.current?.click()}>
                {previewUrl ? (
                  <AvatarImg src={previewUrl} alt='프리뷰' />
                ) : (
                  <AvatarPlaceholder>
                    <FaUserCircle />
                  </AvatarPlaceholder>
                )}
                <CameraBadge>
                  <FaCamera />
                </CameraBadge>
              </AvatarSection>
              <HiddenInput
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setProfileFileName(file.name);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
              />
            </FieldGroup>
          </ContentWrapper>
        );
      case 'nickname':
        return (
          <ContentWrapper>
            <FieldGroup>
              <FieldLabel>새 닉네임</FieldLabel>
              <TextInput
                type='text'
                value={newNickname}
                placeholder='닉네임을 입력해주세요'
                onChange={(e) => setNewNickname(e.target.value)}
              />
            </FieldGroup>
          </ContentWrapper>
        );
      case 'password':
        return (
          <ContentWrapper>
            <FieldGroup>
              <FieldLabel>현재 비밀번호</FieldLabel>
              <TextInput
                type='password'
                value={currentPw}
                placeholder='현재 비밀번호를 입력해주세요'
                onChange={(e) => setCurrentPw(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>새 비밀번호</FieldLabel>
              <TextInput
                type='password'
                value={newPw}
                placeholder='새 비밀번호를 입력해주세요'
                onChange={(e) => setNewPw(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>비밀번호 확인</FieldLabel>
              <TextInput
                type='password'
                value={confirmPw}
                placeholder='새 비밀번호를 다시 입력해주세요'
                onChange={(e) => setConfirmPw(e.target.value)}
              />
            </FieldGroup>
          </ContentWrapper>
        );
      case 'melpick':
        return (
          <ContentWrapper>
            <FieldGroup>
              <FieldLabel>현재 멜픽 주소</FieldLabel>
              <CurrentInfo>melpick.com/{currentMelpick}</CurrentInfo>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>새 멜픽 주소</FieldLabel>
              <PrefixRow>
                <Prefix>melpick.com/</Prefix>
                <TextInput
                  type='text'
                  value={newMelpick}
                  placeholder='주소를 입력해주세요'
                  onChange={(e) => setNewMelpick(e.target.value)}
                />
              </PrefixRow>
            </FieldGroup>
          </ContentWrapper>
        );
      default:
        return null;
    }
  };

  const modalTitles: Record<Exclude<ModalType, null>, string> = {
    profileImage: '프로필 이미지 변경',
    nickname: '닉네임 변경',
    password: '비밀번호 변경',
    melpick: '멜픽 주소 변경',
  };

  const listItems: ListItemData[] = [
    {
      label: '회원정보 조회',
      grey: false,
      action: () => navigate('/Myinfo'),
    },
    {
      label: '비밀번호 변경',
      type: 'password',
    },
    {
      label: '멜픽 주소 변경',
      type: 'melpick',
    },
    { label: '배송지 관리', grey: true },
    { label: '환불 계좌 관리', grey: true },
    { label: '알림 설정', grey: true },
  ];

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
          <ActionButton onClick={() => setModalType('profileImage')}>
            프로필 이미지 변경
          </ActionButton>
          <ActionButton onClick={() => setModalType('nickname')}>
            닉네임 변경
          </ActionButton>
        </ButtonRow>

        <List>
          {listItems.map((item, idx) => (
            <ListItem
              key={idx}
              grey={item.grey}
              onClick={() => {
                if (item.grey) return;
                if (item.action) item.action();
                else if (item.type) setModalType(item.type);
              }}
            >
              <ItemBox>
                <Label grey={item.grey}>{item.label}</Label>
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
        title={modalType ? modalTitles[modalType] : ''}
        width='90%'
        height='auto'
      >
        {renderModalContent()}
      </ReusableModal2>
    </>
  );
};

export default MyinfoList;

// Styled Components
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
  gap: 12px;
`;
const ListItem = styled.div<{ grey?: boolean }>`
  padding: 12px;
  border-radius: 6px;
  background: ${({ grey }) => (grey ? '#f5f5f5' : '#fff')};
  border: 1px solid ${({ grey }) => (grey ? '#ddd' : '#ccc')};
  cursor: ${({ grey }) => (grey ? 'default' : 'pointer')};
`;
const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.span<{ grey?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ grey }) => (grey ? '#aaa' : '#333')};
`;
const Chevron = styled.div`
  font-size: 16px;
  color: #bbb;
`;

const ContentWrapper = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CurrentInfo = styled.p`
  font-size: 14px;
  color: #555;
  background: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
`;

const AvatarSection = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
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
  color: #999;
  font-size: 48px;
  border: 2px dashed #ccc;
`;
const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
`;
const CameraBadge = styled.div`
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
  color: #333;
  align-self: flex-start;
`;
const TextInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;
const PrefixRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Prefix = styled.span`
  font-weight: 700;
  color: #000;
`;
