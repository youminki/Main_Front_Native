// src/pages/MyinfoList.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import userInfoIcon from '../assets/Myinfo/UserInfoChangeIcon.svg';
import passwordIcon from '../assets/Myinfo/PasswordChangeIcon.svg';
import deliveryIcon from '../assets/Myinfo/DeliveryAdminIcon.svg';
import { FaPlus, FaUserCircle, FaLongArrowAltRight } from 'react-icons/fa';
import ChangePasswordModal from '../components/Myinfo/ChangePasswordModal';
import ChangeAddressModal from '../components/Myinfo/ChangeAddressModal';
import ChangeInfoModal from '../components/Myinfo/ChangeInfoModal';
import ChangeProfileImageModal from '../components/Myinfo/ChangeProfileImageModal';
import ChangeRefundAccountModal from '../components/Myinfo/ChangeRefundAccountModal';

type ModalType =
  | 'info'
  | 'password'
  | 'address'
  | 'nickname'
  | 'profileImage'
  | 'refundAccount'
  | null;

const MENU_ITEMS = [
  {
    key: 'info',
    title: '회원정보 변경',
    desc: '이름, 생년월일, 성별, 휴대전화, 서비스 지역',
    iconSrc: userInfoIcon,
  },
  {
    key: 'password',
    title: '비밀번호 변경',
    desc: '8자리 이상 (문자, 숫자, 특수문자 조합)',
    iconSrc: passwordIcon,
  },
  {
    key: 'address',
    title: '배송지 관리',
    desc: '배송지명, 우편번호, 상세주소',
    iconSrc: deliveryIcon,
  },
];

const MyinfoList: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [account] = useState('4532**-**-***544 (국민)');
  const [notifyOn, setNotifyOn] = useState(false);

  return (
    <PageContainer>
      {/* PROFILE */}
      <ProfileSection>
        <AvatarWrapper onClick={() => setModalType('profileImage')}>
          <FaUserCircle size={70} color='#999' />
          <PlusBadge>
            <FaPlus size={12} />
          </PlusBadge>
        </AvatarWrapper>
        <ProfileBox>
          <ProfileText>
            <Email>goodxx21@styleweex.com</Email>
            <Nickname>닉네임 : 퍼시몬 </Nickname>
          </ProfileText>
        </ProfileBox>
      </ProfileSection>

      <ContentDivider />

      {/* MENU LIST */}
      <MenuList>
        {MENU_ITEMS.map(({ key, title, desc, iconSrc }) => (
          <MenuItem key={key} onClick={() => setModalType(key as ModalType)}>
            <IconBox>
              <IconImg src={iconSrc} alt={title} />
            </IconBox>
            <TextBox>
              <MenuTitle>{title}</MenuTitle>
              <MenuDesc>{desc}</MenuDesc>
            </TextBox>
            <Panel>
              <PickText>PICK</PickText>
              <FaLongArrowAltRight size={24} />
            </Panel>
          </MenuItem>
        ))}
      </MenuList>

      {/* 환불 계좌정보 */}
      <Section>
        <SectionHeader>환불 계좌정보</SectionHeader>
        <SectionBody>
          <AccountText>{account}</AccountText>
          <ActionBtn onClick={() => setModalType('refundAccount')}>
            변경
          </ActionBtn>
        </SectionBody>
      </Section>

      {/* 알림 설정 */}
      <Section>
        <SectionHeader>알림 설정</SectionHeader>
        <SectionBody>
          <StatusText>
            상태 | <StrongText>알림 받기</StrongText>
          </StatusText>
          <ToggleWrapper onClick={() => setNotifyOn((v) => !v)}>
            <ToggleBg on={notifyOn} />
            <ToggleCircle on={notifyOn}>
              <ToggleText>{notifyOn ? 'ON' : 'OFF'}</ToggleText>
            </ToggleCircle>
          </ToggleWrapper>
        </SectionBody>
      </Section>

      {/* 회원정보 변경 모달 */}
      <ChangeInfoModal
        isOpen={modalType === 'info'}
        onClose={() => setModalType(null)}
      />

      {/* 비밀번호 변경 모달 */}
      <ChangePasswordModal
        isOpen={modalType === 'password'}
        onClose={() => setModalType(null)}
      />

      {/* 배송지 관리 모달 */}
      <ChangeAddressModal
        isOpen={modalType === 'address'}
        onClose={() => setModalType(null)}
      />

      {/* 프로필 이미지 변경 모달 */}
      <ChangeProfileImageModal
        isOpen={modalType === 'profileImage'}
        onClose={() => setModalType(null)}
      />

      {/* 환불 계좌정보 변경 모달 */}
      <ChangeRefundAccountModal
        isOpen={modalType === 'refundAccount'}
        onClose={() => setModalType(null)}
      />
    </PageContainer>
  );
};

export default MyinfoList;

/* ─────────────────── Styled Components for MyinfoList ─────────────────── */
const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
`;

const ProfileSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 24px 0;
`;
const AvatarWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;
const PlusBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 24px;
  height: 24px;
  background: #f6ae24;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const ProfileBox = styled.div`
  flex: 1;
  margin-left: 12px;
  border: 1px solid #ddd;
  border-radius: 10px 0 10px 0;
  padding: 20px 12px;
  position: relative;
`;
const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
`;
const Email = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: #999;
`;
const Nickname = styled.div`
  font-size: 12px;
  line-height: 22px;
  font-weight: 700;
  color: #000;
  margin-top: 4px;
`;
const ActionBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 69px;
  height: 34px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
`;

const ContentDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin-bottom: 16px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr 124px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 0 0 30px 0;
  overflow: hidden;
  cursor: pointer;
`;
const IconBox = styled.div`
  width: 70px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconImg = styled.img`
  width: 50px;
  height: 60px;
`;
const TextBox = styled.div`
  padding: 16px;
`;
const MenuTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #000;
`;
const MenuDesc = styled.div`
  font-size: 9px;
  color: #ccc;
  margin-top: 4px;
`;

const Panel = styled.div`
  width: 124px;
  height: 100px;
  background: #f6ae24;
  border-radius: 0 0 30px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
  color: #fff;
  letter-spacing: 1px;
`;
const PickText = styled.div`
  font-weight: 900;
  font-size: 10px;
  line-height: 11px;
  margin-left: 40px;
  margin-bottom: 6px;
`;

const Section = styled.section`
  margin-top: 32px;
`;
const SectionHeader = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #000;
  margin-bottom: 8px;
`;
const SectionBody = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 20px 12px;
`;
const AccountText = styled.div`
  flex: 1;
  font-size: 13px;
  font-weight: 800;
  color: #000;
`;

const StatusText = styled.div`
  flex: 1;
  font-size: 13px;
  color: #000;
`;
const StrongText = styled.span`
  font-weight: 800;
`;

const ToggleWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  cursor: pointer;
`;
const ToggleBg = styled.div<{ on: boolean }>`
  position: absolute;
  width: 60px;
  height: 30px;
  background: ${({ on }) => (on ? '#222' : '#ccc')};
  border-radius: 15px;
`;
const ToggleCircle = styled.div<{ on: boolean }>`
  position: absolute;
  top: 1px;
  left: ${({ on }) => (on ? '30px' : '2px')};
  width: 28px;
  height: 28px;
  background: #fff;
  border-radius: 50%;
`;
const ToggleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: 700;
  color: #000;
`;
