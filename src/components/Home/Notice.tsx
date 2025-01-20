import React from 'react';
import styled from 'styled-components';
import Arrow from '../../assets/Home/Arrow.svg';

const Notice: React.FC = () => {
  return (
    <NoticeContainer>
      <NoticeTag>공지</NoticeTag>
      <NoticeText>2024년 7월 1차 업데이트 예정 공개</NoticeText>

      <Icons>
        <Icon src={Arrow} alt="스케줄" />
      </Icons>
    </NoticeContainer>
  );
};

export default Notice;

const NoticeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 0.5px solid #ccc;
  border-radius: 6px;
  padding: 25px 20px;
`;

const NoticeTag = styled.div`
  background-color: #000;
  color: #fff;
  padding: 5px 8px;
  border-radius: 4px;
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  line-height: 11px;
`;

const NoticeText = styled.div`
  flex: 1;
  margin-left: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;
`;

const Icons = styled.div`
  font-size: 14px;
  color: #aaa;
`;

const Icon = styled.img`
  width: auto;
  height: auto;
`;
