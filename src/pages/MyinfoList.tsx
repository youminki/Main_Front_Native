import React from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaChevronRight } from 'react-icons/fa';

const MyinfoList: React.FC = () => {
  const items = [
    {
      label: '회원정보 변경',
      description: '이름, 생년월일, 휴대폰번호, 이메일',
      onClick: () => {},
    },
    { label: '비밀번호 변경', onClick: () => {} },
    {
      label: '나의 맞춤 정보',
      description: '체형, 피부, 취향 정보 입력하고 상품 추천 받기',
      onClick: () => {},
    },
    { label: '간편 로그인 설정', onClick: () => {} },
    { label: '배송지 관리', onClick: () => {} },
    { label: '환불 계좌 관리', onClick: () => {} },
    { label: '알림 설정', onClick: () => {} },
  ];

  return (
    <Container>
      <Header>설정</Header>
      <ProfileSection>
        <Avatar>
          <FaUserCircle />
        </Avatar>
        <ProfileInfo>
          <Name>빙 천</Name>
          <UserId>ID: dbalsrl7648</UserId>
        </ProfileInfo>
      </ProfileSection>

      <ButtonRow>
        <ActionButton onClick={() => {}}>프로필 이미지 변경</ActionButton>
        <ActionButton onClick={() => {}}>닉네임 변경</ActionButton>
      </ButtonRow>

      <List>
        {items.map((item, idx) => (
          <ListItem key={idx} onClick={item.onClick}>
            <ItemContent>
              <div>
                <ItemLabel>{item.label}</ItemLabel>
                {item.description && <ItemDesc>{item.description}</ItemDesc>}
              </div>
              <Chevron>
                <FaChevronRight />
              </Chevron>
            </ItemContent>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MyinfoList;

// Styled components
const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 16px;
  background: #fff;
`;
const Header = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
`;
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
const Avatar = styled.div`
  font-size: 56px;
  color: #ccc;
`;
const ProfileInfo = styled.div`
  margin-left: 16px;
`;
const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
`;
const UserId = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;
const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 15px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f0f0f0;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
`;
const ListItem = styled.div`
  cursor: pointer;
`;
const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
`;
const ItemLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;
const ItemDesc = styled.div`
  font-size: 13px;
  color: #888;
  margin-top: 4px;
`;
const Chevron = styled.div`
  font-size: 16px;
  color: #bbb;
`;
