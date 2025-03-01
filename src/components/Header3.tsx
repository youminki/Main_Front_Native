import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CancleIconIcon from '../assets/Header/CancleIcon.svg';

interface HeaderProps {
  title?: string; // 선택적 속성으로 변경
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  // 뒤로가기 버튼 클릭 핸들러
  const handleBackClick = (): void => {
    navigate(-1);
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LeftSection>
          <CancleIcon
            src={CancleIconIcon}
            alt='뒤로가기'
            onClick={handleBackClick}
          />
        </LeftSection>

        <CenterSection>
          <Title>{title || ''}</Title>
        </CenterSection>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;

// 스타일 정의
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  z-index: 100;
  background-color: #fff;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const CancleIcon = styled.img`
  cursor: pointer;
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'NanumSquare Neo OTF';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  margin: 0;
`;
